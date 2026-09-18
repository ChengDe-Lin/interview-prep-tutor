# OS 面試完整手冊

SRE · Production Engineering · Infrastructure Engineering  
為 ChengDe 編寫｜2026 年 9 月 15 日｜中文講解與英文口試

這本書的目標，是讓你能解釋 Linux 如何執行程式、管理資源，以及在服務變慢或故障時用證據縮小原因。你已有 backend、Kubernetes 與 production 經驗；現在要補的是從「操作過」到「知道底下為什麼如此」的連結。

閱讀方式：第一次逐章讀懂；第二次遮住答案，說出機制；第三次做實驗與情境題。第一次閱讀加筆記可分成 4–6 個約一小時的時段，實驗與口試另計。這是學習安排估計，不是完成時限。三本中的 OS 與 Network 優先，因為 HM 已明確提到；Distributed Systems 隨後深化。

**章節導航**

- [1 考查範圍與研究依據](#1-考查範圍與研究依據)
- [2 作業系統與程式執行](#2-作業系統與程式執行)
- [3 Process Thread 與執行狀態](#3-process-thread-與執行狀態)
- [4 Signals 與優雅關閉](#4-signals-與優雅關閉)
- [5 CPU Scheduling Load 與 Performance](#5-cpu-scheduling-load-與-performance)
- [6 Virtual Memory 與 Memory Pressure](#6-virtual-memory-與-memory-pressure)
- [7 Concurrency Lock 與 IPC](#7-concurrency-lock-與-ipc)
- [8 File Descriptor Filesystem 與 Persistence](#8-file-descriptor-filesystem-與-persistence)
- [9 Disk I/O 與 Storage Bottleneck](#9-disk-io-與-storage-bottleneck)
- [10 Blocking I/O 與 Event Loop](#10-blocking-io-與-event-loop)
- [11 Boot systemd 與 Service Lifecycle](#11-boot-systemd-與-service-lifecycle)
- [12 Container VM 與 Resource Isolation](#12-container-vm-與-resource-isolation)
- [13 從觀測到假設](#13-從觀測到假設)
- [14 六個完整 Troubleshooting 案例](#14-六個完整-troubleshooting-案例)
- [15 進階概念的面試深度](#15-進階概念的面試深度)
- [16 四個可重現的小型實驗](#16-四個可重現的小型實驗)
- [17 口頭驗收與評分](#17-口頭驗收與評分)
- [18 面試前十分鐘回顧](#18-面試前十分鐘回顧)
- [19 延伸閱讀與查資料方法](#19-延伸閱讀與查資料方法)

## 1 考查範圍與研究依據

### 1.1 哪些是已知 哪些是準備判斷

你提供的一手資訊：HM 建議準備 OS、Network。這能確認領域，但還不能確認是 oral deep dive、live terminal troubleshooting，還是兩者都有。

跨公司官方職缺也把 Unix/Linux、IP networking、performance 與 application issues 列為 SRE 能力。這支持我們擴大準備範圍，但**職缺不是公開題庫**。[Google SRE 官方職缺](https://www.google.com/about/careers/applications/jobs/results/87706967249691334)

公開 Apple 候選人討論提到模擬 Linux 除錯，並提醒各團隊流程不同；Meta 社群分享則描述 OS、networking 與 troubleshooting 的 basics 面試。這些是未獨立驗證的個人經驗，只用來選練習形式，不據此預測題目或命中率。[Apple 討論](https://www.reddit.com/r/sre/comments/193ltzy/apple_site_reliability_engineering_interview/)、[Meta 分享](https://www.reddit.com/r/leetcode/comments/1gqtm8s/targeting_meta_insights_from_meta_interview_loops/)

本書技術基礎優先依據 Linux man-pages、kernel documentation、systemd 與工具原作者文件。學科完整性參考 OSTEP 的 virtualization、concurrency、persistence 結構；本文的案例、題目與優先順序是依你的背景設計。[OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/)

### 1.2 準備到什麼深度

| 優先 | 主題 | 必須能做的事 |
|---|---|---|
| P0 | process、thread、syscall、signal | 說明執行與等待；分辨 zombie、D state、crash |
| P0 | CPU、load、memory、OOM | 解釋指標，不憑單一數字定罪 |
| P0 | filesystem、FD、disk I/O | 處理磁碟滿、檔案仍占空間、連線／FD 耗盡 |
| P0 | service 與 host troubleshooting | 依證據選下一個指令；兼顧恢復與驗證 |
| P1 | lock、virtual memory、epoll | 能承接兩到三層原理追問 |
| P1 | cgroups、namespaces、boot | 連接 container、host、kernel 的故障邊界 |
| P2 | NUMA、CPU cache、interrupt、profiling | 理解用途與典型症狀，不背硬體細節 |

P0/P1/P2 是本書的學習優先順序，不是公司的官方考頻。P0 要能獨立回答；P1 能講清機制與代價；P2 能認出問題並知道如何深入。

## 2 作業系統與程式執行

### 2.1 Kernel 與 user space

Application 在 user mode 執行，不能任意操作其他 process 的記憶體或硬體。Kernel 管理 CPU scheduling、virtual memory、device、filesystem、network stack 與權限。程式透過 system call 要求 kernel 做受控操作。

`read()`、`write()`、`openat()`、`socket()`、`mmap()` 是典型接口。Library function 不一定等於 syscall：`printf()` 可能先寫 userspace buffer；`malloc()` 常先重用 allocator 管理的空間，必要時才向 kernel 要更多。

**重要區分：mode switch 不等於 process context switch。** 同一 thread 做 syscall，可從 user mode 進 kernel 再返回，未必換另一個 task。Context switch 是 scheduler 讓另一個 task 執行，要保存／恢復執行狀態，還可能帶來 cache、TLB locality 成本。

### 2.2 從 shell 執行一個程式

以外部命令為例，shell 解析文字、展開參數、安排 redirect 與 pipe，建立 child，child 以 `exec` 載入目標程式；kernel 建立新程式的執行映像，dynamic loader 處理需要的 shared libraries；程式執行後退出，parent 取得 exit status。Shell builtin 不一定經過相同的 fork/exec 流程。

| 操作 | 作用 | 常見誤解 |
|---|---|---|
| `fork()` | 建立 child；初始記憶體內容與 parent 相同，Linux 通常採 copy-on-write | 不是立即深拷貝整份 RAM |
| `exec*()` | 以新程式映像取代目前 process，通常 PID 不變 | 不是再生一個 process |
| `wait*()` | 取得 child 狀態並回收終止後保留的資訊 | 不是讓所有 child 自動停止 |

Fork 後 parent 與 child 的 FD table 分開，但對應 FD 可指向同一 open file description，因此可能共享 file offset。這能解釋為何 inherited FD 要妥善關閉。[fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)、[wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)

**典型追問：為何 fork 一個大 process 不一定立刻增加相同大小的實體記憶體？**

因為 copy-on-write 先共享實體 pages；某一方寫入時才複製相關 page。若之後大量寫入，memory 與 page-fault 成本仍會出現。不能把 COW 說成完全免費。

**英文口試**

> A system call is a controlled transition into the kernel. It does not necessarily switch to another process. Fork creates a child process, while exec replaces the current process image. Copy-on-write avoids eagerly copying all physical memory during fork.

## 3 Process Thread 與執行狀態

### 3.1 Process 與 thread

Process 提供資源與隔離邊界；同一 process 的 threads 共享 address space 與 open file descriptors，每個 thread 有自己的 stack、register state 與執行位置。共享 memory 讓通信方便，也讓 race condition 與 memory corruption 更容易跨 thread 影響。[pthreads(7)](https://man7.org/linux/man-pages/man7/pthreads.7.html)

| 選擇 | 優點 | 成本與適用限制 |
|---|---|---|
| 多 process | 隔離較好；可分散至多 cores | IPC、記憶體與 lifecycle 管理成本 |
| 多 thread | 共享資料方便；適合 blocking I/O 或可平行計算 | synchronization、stack memory、排程成本 |
| event loop | 大量等待中的 I/O 不必各占一條 thread | 一段長 CPU 工作或 blocking call 可拖住同一 loop |

Concurrency 是多項工作交錯前進；parallelism 是同時執行。單 core 也能 concurrent，多 threads 不代表一定 parallel。Node.js 主 event loop 做大量同步計算，就算機器還有空 core，其他 request 仍可能等待；要考慮 worker threads、processes 或移出長工作。

### 3.2 Linux task states

| 狀態 | 意義 | 下一步 |
|---|---|---|
| R | running 或 runnable | 查每 core CPU、run queue、thread 熱點 |
| S | interruptible sleep | 可能正常等 timer、socket、lock；看 stack 與 syscall |
| D | uninterruptible sleep，常見於 kernel I/O 等待 | 看 blocked stack、storage、NFS、kernel log |
| T | stopped／traced | 查 signal、debugger、job control |
| Z | 已結束，parent 尚未 reap | 找 PPID 與 child-reaping 問題 |

`S` 不代表服務壞了，`R` 不代表服務能正確回答，`D` 也不是「一定硬碟壞」。狀態是查詢方向，不是 root cause。[ps(1)](https://man7.org/linux/man-pages/man1/ps.1.html)

### 3.3 Zombie 與 orphan

Zombie 已不執行，主要留下 PID、exit status 等 kernel accounting 資訊。你不能靠 `kill -9` 讓它「再死一次」；要讓 parent 呼叫 wait，或在評估服務影響後修復／重啟 parent。大量 zombie 可能耗盡可用 process identifiers／相關資源。

Orphan 是 parent 已退出而 child 還活著；會被適當的 reaper，例如 namespace init 或 subreaper 接管。Orphan 不等於 zombie。Container 的 PID 1 需要正確轉發 signals、reap children。

```bash
ps -eo pid,ppid,stat,%cpu,%mem,wchan:24,comm
ps -L -p 1234 -o pid,tid,stat,pcpu,wchan:24,comm
pstree -p 1234
```

這裡與後文的 `1234` 都是示例 PID，實際操作要換成自己查到的 PID；輸出欄位可能因工具版本或權限不同而略有差異。

**追問：D state 的 process 收到 SIGKILL 為何不消失？**

Signal 可能已 pending，但 task 在不可中斷的 kernel 等待中，尚不能完成退出；需等待該路徑返回或解決底層阻塞。不要保證再送更多次 signal 有幫助。

## 4 Signals 與優雅關閉

`SIGTERM` 提出終止請求，process 可設 handler 收尾；`SIGKILL` 不能 catch、block 或 ignore；`SIGSTOP` 不能 catch 或 ignore；`SIGCONT` 恢復 stopped task。`SIGINT` 通常來自 terminal Ctrl-C；`SIGHUP` 是否 reload 取決於程式實作。[signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)

Graceful shutdown 是 application protocol：停止接新工作，讓既有工作在 deadline 內完成，flush 必要 state，關閉 resources，再退出。只有發 SIGTERM 並不能保證資料安全。對 queue worker，尚未完成的工作需要有重新投遞或恢復方式。

```bash
kill -TERM 1234
```

這是改變狀態的命令；面試要先說目標與理由。實務先確認 PID、服務副本與 drain 狀態，再使用。`kill -KILL` 是有明確理由時的後續手段。

**案例：部署終止一個 order worker。** 它已提交 DB transaction，但還沒 ack queue。強制 kill 之後 queue 可能重送；OS 層正常終止並不能代替 application idempotency。這正是 OS 與 distributed systems 的交界。

## 5 CPU Scheduling Load 與 Performance

### 5.1 CPU 使用率到底在量什麼

User CPU 表示 application code 的 CPU time；system CPU 表示 kernel 執行時間。I/O wait 是 CPU accounting 的一種觀察，不等於「某顆 disk 的 busy 百分比」。Steal time 常見於 VM：hypervisor 把 virtual CPU 的可執行時間給了別的 workload。Interrupt／softirq 也可能消耗 CPU。

整機平均會藏掉單 core 瓶頸。8 cores 平均 12.5% 可能是一個 core 滿載，對單 event loop 已足以成為瓶頸。Process CPU 百分比是否能超過 100%，也與工具的計算模式有關。

### 5.2 Load average

Linux load average 是 1、5、15 分鐘平滑後的 runnable tasks 加上特定 uninterruptible waits 的數量指標，不是 CPU 百分比。解讀時要看可用 cores、cpuset 與 CPU quota。Load 16 在 64 cores 和在 2 cores 上意義不同。[proc_loadavg(5)](https://man7.org/linux/man-pages/man5/proc_loadavg.5.html)

**高 load、低 CPU 的推理：**可能有很多 D-state tasks 等待 I/O；也可能可用 CPU 被 quota 或 affinity 限制。先看 tasks 的狀態與 cgroup，再看 disk／network filesystem，不能看到 load 就擴 CPU。

### 5.3 實際查詢順序

```bash
uptime
top -H -p 1234
mpstat -P ALL 1 5
pidstat -u -w -p 1234 1 5
vmstat 1 5
```

`mpstat`、`pidstat`、`iostat` 常由 sysstat 套件提供；不是所有最小 container 都有。`vmstat` 首筆通常反映開機後平均，之後才是 interval。

| 觀察 | 有意義的假設 | 還需哪些證據 |
|---|---|---|
| 單 thread user CPU 長期高 | busy loop、序列化、regex、壓縮、計算量增加 | CPU profile、流量／payload 變化 |
| system CPU 高 | syscall 密集、network stack、記憶體／I/O 處理 | syscall 統計、softirq、封包率 |
| context switches 高 | threads 多、鎖競爭、短工作頻繁喚醒 | voluntary／involuntary、run queue、stack |
| host CPU 低，container 很慢 | quota throttling 或 lock／I/O wait | `cpu.stat`、PSI、thread state |
| CPU 正常，p99 高 | 等待或少量長尾、非平均負載問題 | request trace、queue time、dependencies |

Scheduling 決定誰獲得 CPU；nice 影響一般排程的相對優先權，不能修正演算法或保證 latency。CPU affinity 可能改善 locality，也可能把 workload 限在少數 cores。先確認 bottleneck，再談 tuning。

### 5.4 Scheduling 的基本取捨

FIFO 思路簡單，但長工作可擋住後面的短工作；round-robin 以 time slice 輪流，slice 太小增加切換成本，太大降低互動回應性；優先權排程要避免 starvation。Linux 一般工作採公平性導向的 scheduling 機制，具體演算法隨 kernel 演進；面試先掌握 fairness、latency、throughput 三者的拉扯。

Preemption 讓 kernel 在適當時機把 CPU 給另一個 task；context switch 不會讓 lock 自動釋放。CPU-bound 工作需要真正的計算資源，I/O-bound 工作可能更受等待影響。增加 threads 能覆蓋部分 I/O waits，但過量會增加 memory、run queue 與 contention。

**英文口試**

> High load does not necessarily mean high CPU usage. On Linux, tasks in uninterruptible sleep can contribute to load. I would inspect task states, per-core utilization, and container limits before deciding whether this is CPU saturation or an I/O-related stall.

## 6 Virtual Memory 與 Memory Pressure

### 6.1 Virtual address 到 physical memory

每個 process 使用 virtual address space。Page table 把 virtual pages 映射到 physical frames 或其他狀態；TLB 快取 address translation。Page fault 表示目前存取需要 kernel 處理，可能是 demand allocation、copy-on-write、檔案 page 不在 RAM，也可能是無效存取。**Page fault 不等於 crash，也不等於每次讀 disk。** [Kernel memory concepts](https://docs.kernel.org/admin-guide/mm/concepts.html)

一般可區分 minor fault 不需要從 storage 取回 page，major fault 需要相應 I/O。Segmentation fault 則是非法 memory access 等原因形成的 signal；調查應看 core dump／stack，不能只說 RAM 不足。

Stack 常放 function frames、local variables；heap 用於動態配置。多 threads 各有 stack，配置大量 threads 即使 idle，也有記憶體與管理成本。Virtual reservation 不一定都已 resident。

### 6.2 常見欄位

| 名詞 | 讀法 | 不可以直接推論 |
|---|---|---|
| VIRT／VSZ | virtual mappings 的規模 | 不等於真的占用同量 RAM |
| RSS | resident physical pages，shared pages 可重複計入多 process | 加總 RSS 不一定等於獨占使用量 |
| PSS | shared pages 按共享比例分攤 | 仍要理解 mapping 與 snapshot 時點 |
| page cache | filesystem 資料的 RAM cache | 不等於 application leak |
| MemAvailable | kernel 估計無須 swapping 可供新 workload 使用的 memory | 不是絕對承諾 |
| swap used | 有 pages 放入 swap | 不代表此刻正在 thrash |

`MemFree` 很少常是正常的 cache 使用。更該看 MemAvailable、持續 reclaim／swap I/O、major faults、PSI 與 latency 是否一起惡化。[proc_meminfo(5)](https://man7.org/linux/man-pages/man5/proc_meminfo.5.html)

```bash
free -h
vmstat 1 5
cat /proc/1234/status
cat /proc/1234/smaps_rollup
cat /proc/pressure/memory
```

`smaps_rollup` 可能需相應權限。PSI 衡量 tasks 因 CPU、memory 或 I/O 資源壓力停滯的時間；`some` 表示至少部分 tasks stalled，`full` 表示該範圍內所有 non-idle tasks 同時 stalled；支援與 CPU 的語意需看 kernel／cgroup 範圍。它補充 utilization，不能單獨指出是哪段程式造成問題。[Kernel PSI](https://docs.kernel.org/accounting/psi.html)

### 6.3 Memory leak OOM 與 container limit

Memory leak 指不再需要的資源仍被保留；cache 成長可能是刻意行為，但沒有邊界一樣會造成 OOM。GC runtime 的 live heap、allocated heap、RSS 是不同量；allocator fragmentation 或 native allocations 也可能讓 RSS 不下降。

OOM 要分 host memory exhaustion 與 cgroup limit。Container 可在 host 還有大量 RAM 時觸及自身 `memory.max`。退出碼 137 通常符合被 SIGKILL 終止的 shell 編碼，但**不能單靠 137 判定 OOM**；人工 kill 也可能一樣。

證據要串在一起：process／container termination reason、kernel logs、cgroup `memory.events`、memory 趨勢、limit 與 spike。`memory.high` 通常導致 reclaim／throttling 壓力，與 `memory.max` 的硬限制用途不同。[cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html)

**案例：RSS 每天增加，重啟後恢復。** 這只支持成長與 process lifetime 相關；要比較 request 數、cache entry 數、heap snapshot、native memory 與 workload baseline。重啟能緩解，但不是 leak 已被證明或修復。

## 7 Concurrency Lock 與 IPC

### 7.1 為何會有 race condition

兩個 threads 同時做 `counter += 1`，若讀取、加一、寫回不是整體 atomic，就可能互相覆蓋。Race condition 關注 timing 影響結果；data race 在特定語言 memory model 下有更精確定義，不能混同所有 concurrency bugs。

Mutex 保護 critical section；semaphore 管理可用 permits；condition variable 等待某個 predicate；atomic operation 保證某個操作的不可分割性。Atomic increment 不會自動保證「檢查餘額並扣款」這種多步 invariant。

Condition variable 的正確模型是「持鎖檢查條件，不成立則 wait，被喚醒後再檢查」；需要 loop，因為 predicate 可被別的 thread 改變，也可能 spurious wakeup。

### 7.2 Deadlock 及其替代問題

經典 deadlock 條件：mutual exclusion、hold and wait、no preemption、circular wait。實務常用統一 lock order、縮短 critical section、避免持鎖做外部 I/O，或採可恢復的 timeout／try-lock 策略。

Livelock 是一直做事卻沒有有效進展，例如兩個工作不斷退讓再衝突；starvation 是某些工作一直拿不到資源；priority inversion 是高優先 task 等低優先 task 持有的資源。Timeout 能幫你發現停滯，未必安全地撤銷已做的部分工作。

### 7.3 IPC 怎麼選

| 方法 | 合適用途 | 主要代價 |
|---|---|---|
| pipe | 親緣 process 的簡單 byte stream | framing 與 backpressure；buffer 有限 |
| Unix domain socket | 同 host 雙向通信、服務介面 | 序列化與 socket lifecycle |
| shared memory | 大資料或低複製成本 | synchronization、ownership、cleanup 複雜 |
| signal | 簡單 lifecycle 通知 | 不適合豐富 payload 與一般工作佇列 |

**追問：所有 threads 都在 futex 等待，是不是 deadlock？** 不一定。Futex 常是正常的 synchronization 底層。要看等待時間、持鎖者、各 thread stacks、有沒有有效工作與 wakeup，而非看到一次 futex 就下結論。

## 8 File Descriptor Filesystem 與 Persistence

### 8.1 FD 不是檔名

File descriptor 是 process 使用的一個小整數 handle，可指向 regular file、socket、pipe 等 kernel 物件。`0/1/2` 通常是 stdin/stdout/stderr。FD table 與 open file description 是不同層次；後者記錄如 offset、status flags。[open(2)](https://man7.org/linux/man-pages/man2/open.2.html)

同一服務有 10,000 connections，就可能使用數以萬計 FDs；再加 log、files、pipes，就能理解 pool 大小為何不是越大越好。

```bash
ls /proc/1234/fd
cat /proc/1234/limits
lsof -p 1234
```

Shell 的 `ulimit -n` 是目前 shell／其 descendants 的限制，不一定等於 systemd 管理服務的限制。檢查 live process 的 `/proc/PID/limits` 更直接。

### 8.2 Filename inode link

Directory 將檔名連到 inode；inode 持有 metadata 與資料位置等資訊。Hard link 是另一個指向同一 inode 的 directory entry；symlink 儲存另一個路徑，可跨 filesystem，也可能變成 dangling link。刪除檔名是 unlink，若還有 link 或 open reference，資料可能仍存在。

**經典題：刪了 20 GB log，df 為何沒下降？** Process 仍開著被刪除的檔案。可用 `lsof +L1` 查 open-but-unlinked files；讓程式依其機制 reopen／rotate log 或在評估後 restart，才會釋放最後 reference。不要一律殺 process。

```bash
df -h
df -i
du -xhd1 /var
lsof +L1
findmnt
lsblk -f
```

`df` 看 filesystem allocation；`du` 看可遍歷的檔案使用量，兩者可因 deleted-open file、permissions、mount、sparse files 或 filesystem overhead 不同。`df -i` 檢查 inode：容量還有空間，也可能因大量小檔用完 inode 而無法建立新檔。

### 8.3 write 成功等於斷電不丟嗎

Buffered write 可能只是資料進 kernel page cache。`fsync()` 要求將檔案相關 dirty state 推到 storage；建立／rename 檔案後，若要保證 directory entry 在 crash 後保存，還可能需要 sync 相應 directory。確切 durability 仍依 filesystem、storage 與配置。[fsync(2)](https://man7.org/linux/man-pages/man2/fsync.2.html)

Filesystem journaling 主要維持 filesystem recovery 的一致性，不等於 application transaction atomicity，也不能取代 DB 的 WAL、commit protocol。Rename 的可見性原子性和 crash durability 是不同保證。

### 8.4 Permissions

`r/w/x` 對 regular file 是讀、寫、執行；對 directory，`x` 是搜尋／穿越、`r` 是列出名稱、`w` 與 entry 修改相關。刪除檔案通常要看 parent directory 權限，還有 sticky bit 等限制，而非只看檔案本身可不可寫。

查 permission denied，要看 effective user/group、每層 directory、ACL、read-only mount、SELinux／AppArmor 或 container restrictions。`chmod 777` 把證據蓋掉，也不是精確修復。

## 9 Disk I/O 與 Storage Bottleneck

IOPS 是每秒 operations；throughput 是每秒 bytes；latency 是每次完成時間。大量 4 KB random writes 與少量 1 MB sequential writes 可有相近 bandwidth，卻有完全不同的 IOPS 壓力。

```bash
iostat -xz 1 5
pidstat -d -p 1234 1 5
journalctl -k -b --since '-15 min'
```

`await` 包含排隊與服務時間；queue size 升高通常表示 outstanding work 增加；`%util` 對單一串行裝置與有平行能力的 SSD／RAID 解讀不同，不能拿 100% 當所有裝置的普遍飽和門檻。第一筆 iostat 也可能是開機後累計平均。[iostat(1)](https://man7.org/linux/man-pages/man1/iostat.1.html)

**例子：DB latency 上升，CPU 20%，disk await 由 2 ms 到 80 ms。** 先查 workload 是否增加同步 writes、backup／compaction 是否同時執行、volume 是否達 provisioned IOPS，以及 kernel 有沒有 device errors。這些是候選原因；若被測量的是 network block storage，還要考慮 storage path。

盲目增加 application replicas 可能讓同一 disk／DB 的 queue 更長。先識別共享瓶頸與 saturation，再考慮流量控制、停止非必要 I/O、調整資源或 rollback。

## 10 Blocking I/O 與 Event Loop

Blocking read 在資料未就緒時讓 calling thread 等待；nonblocking read 可立即回傳 `EAGAIN`／`EWOULDBLOCK`，表示目前做不了，不必然是故障。Application 必須安排之後再試，不能 tight loop 空轉。

`select`／`poll`／`epoll` 解決的是 I/O readiness multiplexing：一個 thread 等待多個 FDs 的事件。Epoll 管理 interest list 與 ready events，適合大量 sockets；但它不是所有 I/O 都自動變成 asynchronous completion，也不會替你處理 application data。

Level-triggered 在仍 ready 時可持續通知；edge-triggered 通知狀態轉換，常配 nonblocking FD，收到事件後讀／寫到 EAGAIN，否則可能留下資料卻等不到下一次 edge。[epoll(7)](https://man7.org/linux/man-pages/man7/epoll.7.html)

**用你熟悉的 Node.js 來理解：**同時有 5,000 sockets 多半在等資料，event loop 可以用少量 threads 管理；若一個 callback 同步花 800 ms 處理大型 JSON，等待期間其他 callbacks 也受影響。更多 connection pool slots 不會讓這 800 ms 自動消失。

**追問：read 會回完整 request 嗎？** 不保證。對 stream socket 可能只拿到部分 bytes；要自己按 protocol 做 framing。Write 也可能只送出部分資料，nonblocking 模式更要處理 partial writes。TCP 保證 byte stream，不保證 application message boundaries。

## 11 Boot systemd 與 Service Lifecycle

### 11.1 開機順序

一般 Linux 主機依序經 firmware／bootloader、kernel 初始化、必要的 initramfs／root filesystem 準備，進入 PID 1，由 service manager 啟動後續 services。細節依平台不同；Apple Silicon／macOS 有不同的 boot 與服務管理方式。

systemd 是常見的 Linux PID 1／service manager，透過 units 與 dependencies 管理服務。**macOS 不是 Linux**：其 kernel、launchd、工具參數不同。本書的 `/proc`、systemd、cgroups 實作請在 Linux VM／host 上練習；Docker Desktop 的 Linux containers 也跑在 VM 中，未必有完整 systemd。

### 11.2 必須熟的命令

| 目的 | 命令 | 要看什麼 |
|---|---|---|
| 狀態摘要 | `systemctl status myapp.service` | active／failed、PID、近期訊息 |
| 完整設定 | `systemctl cat myapp.service` | ExecStart、User、override |
| 實際屬性 | `systemctl show myapp.service -p MainPID -p Result -p NRestarts -p LimitNOFILE` | 生效值、重啟與限制 |
| 失敗服務 | `systemctl --failed` | 是否有依賴同時出問題 |
| 時段 log | `journalctl -u myapp.service -b --since '-15 min'` | 啟動錯誤、退出原因、timeline |
| 持續 log | `journalctl -u myapp.service -f` | 即時事件 |
| kernel log | `journalctl -k -b` | OOM、I/O errors、driver 問題 |
| 上次開機 | `journalctl -b -1` | 重開前訊息，須有保留紀錄 |

`systemctl status` 有部分 log 摘要，但查完整／指定範圍 log 用 `journalctl`。你之前混到的 `systemctl -u kubelet` 應改成 `journalctl -u kubelet`。[systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)、[journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html)

`start/stop/restart` 改變服務狀態；`enable` 配置開機啟動，不代表現在已 start；`daemon-reload` 讓 systemd 重讀 unit definitions，不等於 application reload。修改設定後是否需 reload／restart，要看程式支援。

### 11.3 程式手動啟動成功 systemd 啟動失敗

比較兩種執行環境：user/group、working directory、PATH／environment、依賴是否準備好、permission、FD／memory limits、sandbox restrictions。不要以「我在 shell 跑得動」推論 service manager 有 bug。

服務顯示 active 只說 lifecycle 狀態。真正健康還要測 request、依賴與結果正確性。一直 restart 可以讓 active 偶爾綠燈，卻沒有穩定服務。

## 12 Container VM 與 Resource Isolation

Container 是共享 host kernel、經 namespaces 等機制隔離的 processes；VM 由 hypervisor 提供 virtual hardware，guest 有自己的 kernel。Container image 打包 userspace 及依賴，不是自帶完整可任意替換的 host kernel。

Namespaces 隔離「看得到什麼」：PID、mount、network、UTS、IPC、user 等。Cgroups 管理「能用多少」與資源 accounting。兩者作用不同，container security 還涉及 capabilities、seccomp、LSM 等機制。[namespaces(7)](https://man7.org/linux/man-pages/man7/namespaces.7.html)

```bash
cat /proc/1234/cgroup
lsns -p 1234
```

先找到實際 cgroup，再讀其中 `cpu.stat`、`cpu.max`、`memory.current`、`memory.max`、`memory.events`。不要假定所有 environments 都是 cgroup v2 或固定路徑。`cpu.stat` 的 throttling 是累計 counter，要觀察 interval 增量與 latency 是否相關。

**與 Kubernetes 的連結：**CPU request 用於 scheduling 與資源分配考量，CPU limit 可能造成 throttling；memory limit 可觸發 container OOM。Node 還有空閒，不代表 pod 的 quota 還有餘量。Pod Pending 要看 scheduling events，不能直接當 CPU execution 問題。

上述 request／limit 的角色可對照 [Kubernetes resource management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)。

Container 裡 `localhost` 屬於自己的 network namespace；同一 pod 的 containers 通常共享 pod network namespace，因而可透過 localhost 溝通。從 host 成功測試，不代表 pod 的 DNS、route、policy 一定相同。

**Node NotReady 能不能 describe？** `kubectl describe node` 向 API server 讀取 object／events，不需要 node 當下能 SSH。Object 可能是最後回報狀態；要區分 control-plane 記錄與 node 現在的實際可達性。

## 13 從觀測到假設

### 13.1 一個有效的除錯回答

先確認影響：哪個服務、哪些 hosts、從何時開始、哪類 requests、latency／errors／correctness 是否改變。接著找 deployment、config、traffic 或 dependency 變化。若影響大且有可逆緩解方式，先止損，同時保存足夠證據。

每次提出假設後，補一句「哪個觀察能支持或推翻它」。不要只有無限延長的 command list。Google SRE troubleshooting 強調以可測試假設迭代，以及優先降低 incident 影響。[Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/)

本書建議你用這個口頭順序：**scope → hypothesis → test → interpretation → mitigation → verification**。這是練習答題結構，不是必須照唸的公式。

### 13.2 USE 與使用者指標

USE 對每個資源檢查 utilization、saturation、errors：CPU 使用率與 runnable queue；memory 使用與 reclaim stalls；disk throughput 與 I/O queue；network bandwidth 與 drops／errors。[Brendan Gregg Linux checklist](https://www.brendangregg.com/USEmethod/use-linux.html)

同時看使用者成功率、p95/p99 latency、實際完成 throughput。資源數字恢復不代表服務已恢復；例如流量全部失敗，CPU 也會下降。

### 13.3 strace profile 與 logs 分別回答什麼

```bash
strace -f -tt -T -p 1234
strace -f -c -p 1234
```

`-f` 跟隨相關子執行單位，`-tt` 加時間，`-T` 顯示 syscall 用時，`-c` 彙總。Attach 可能需權限且有 overhead，應針對短時段與有代表性的 instance。這些命令是診斷模板，不代表本手冊已在你的服務執行過。

參數與 tracing 限制參見 [strace(1)](https://man7.org/linux/man-pages/man1/strace.1.html)。

| 工具 | 擅長 | 看不到／不能單憑它確定 |
|---|---|---|
| logs | application 選擇記錄的事件與錯誤 | 沒寫 log 的路徑；buffer 尚未 flush 的訊息 |
| strace | syscall、return value、等待時間 | 純 userspace CPU hot loop 的完整原因 |
| CPU profiler／perf | CPU time 用在哪個 stack | off-CPU 等待要用相應 profiling 方法 |
| thread dump | threads 在哪些 application／native stack | 單次 snapshot 不保證是持續死鎖 |
| metrics | 趨勢、範圍、時序關係 | correlation 不等於 causation |

**輸出判讀，以下皆為教學用合成片段：**

```text
openat(..., "/etc/myapp/config.yaml", O_RDONLY) = -1 ENOENT
connect(...) = -1 ECONNREFUSED
read(7, ...) = -1 EAGAIN
futex(..., FUTEX_WAIT_PRIVATE, ...) = ...
```

ENOENT：目標或某段路徑不存在，或 namespace／working directory 不符。ECONNREFUSED：連線被明確拒絕，查 listener／reject。EAGAIN：nonblocking operation 現在無法完成。Futex wait：有 synchronization 等待，還需要 stacks 與時間證據。

不必死背 errno 的數字。要認得 ENOENT、EACCES、EMFILE、ENFILE、ENOMEM、ENOSPC、EAGAIN、ETIMEDOUT 的類別，看到能提出合理驗證。

## 14 六個完整 Troubleshooting 案例

以下案例與數值為練習設計；面試先問關鍵資訊，再作答。

### A 一台 host 很慢 load 30 CPU 15%

先確認 cores、host／container 範圍與受影響服務。看 `ps` states、`vmstat`、PSI；若大量 D state，再查 `iostat`、kernel logs、NFS／storage。若 tasks 主要 runnable，但只分到極少 CPU，查 quota／cpuset。

假設：network filesystem 卡住。支持證據是 blocked stacks 指向相同 mount、該 mount 操作 timeout、disk 本地指標不高。緩解可把新流量轉到未受影響 instance；若 shared mount 全體受影響，擴 replicas 可能沒用。驗證看成功率和 request latency，而不是只看 load 下降。

### B Memory 還有空間 pod 卻 OOMKilled

對齊 host memory、pod cgroup limit 與發生時點。查 termination reason、`memory.events`、memory peak、deployment／payload 變化。若 memory limit 512 MiB 而某批 request spike 到 700 MiB，host 有 20 GiB free 也不能保證這個 cgroup 可用。

緩解可以限制並行大工作、rollback regression，或在 node capacity 可承受時調整 limit；不是無條件加 memory。修復要確定 retained objects、批量大小或 cache bound。

### C Log 刪掉仍沒有 disk space

先分辨 bytes 還是 inodes 滿。比較 `df`／`du`，用 `lsof +L1` 找 deleted-open file，定位 owner。依服務支援做 log reopen／rotation；若需 restart，先處理流量與在途工作。驗證 open reference 消失、空間釋放、log 繼續寫入且服務健康。

### D Request 卡住 CPU 很低

低 CPU 只能排除部分持續 CPU-bound 的情況。查 thread stacks、connection pool wait、FD count、依賴 latency；strace 若大量等 socket read，轉到 Network 章；若多個 threads 等相同 lock，找持鎖 thread 與它是否卡在 I/O。

把 pool 從 50 放到 500 可能將瓶頸轉移到 DB。先量 active、idle、waiting connections、hold time 與 DB capacity。

### E 部署後 service 不斷 restart

比較新舊版本，讀 `systemctl status`／`journalctl` 或 container previous logs，確認是 startup exception、permission、OOM、health check，還是外部 manager 主動重啟。保留版本／退出原因後停止擴散；若 rollback 相容，恢復已知良好版本。

驗證要包含 restart count 不再增加、readiness 穩定、真實 requests 成功；「process 暫時活著」不夠。

### F Host SSH 進不去

先區分 DNS、TCP 22、authentication、host unreachable。從有相同 access path 的地方檢查，對照其他 hosts。若有 out-of-band console，看 boot、kernel panic、disk full、CPU／memory exhaustion。不能只憑 SSH timeout 宣判 machine dead。

先從 LB／scheduler 控制影響，再評估 reboot、replacement。Stateful host 還要考慮 fencing、資料安全與 recovery；重新上電前後都要確認原角色不會與替代者衝突。

## 15 進階概念的面試深度

| 概念 | 你要理解到這裡 | 延伸追問 |
|---|---|---|
| CPU cache | locality 影響效能；shared cache lines 可能爭用 | false sharing：不同變數在同 cache line 上互相 invalidation |
| NUMA | CPU 存取本地／遠端 memory 成本不同 | thread placement 與 memory placement 應一起看 |
| Interrupt | device 通知 CPU，kernel 處理事件 | 高 packet rate 可讓 softirq CPU 高 |
| DMA | device 與 memory 傳輸可減少 CPU 搬運工作 | 不代表沒有 CPU／memory bandwidth 成本 |
| mmap | 把檔案或 anonymous memory 映射到 address space | 缺 page 一樣 fault；mapped file 被截短可出問題 |
| Huge pages | 降低部分 translation overhead | allocation、fragmentation 與 workload 適配 |
| Page replacement | reclaim cache／匿名 pages 的選擇影響 latency | 工作集大於 RAM 可能 thrashing |
| Core dump | 保存 crash 時 process 狀態供分析 | 要有對應 binary／symbols；檔案可含敏感記憶體 |
| eBPF | 有條件地在 kernel 觀測事件與延遲 | 需看 kernel 支援、權限、overhead 與工具語意 |

這裡不用背 scheduler 版本演進或 kernel source 函式名。若 interviewer 深問你沒實作過的層次，說明已知原理、承認邊界，再提出你會量什麼。

## 16 四個可重現的小型實驗

在你自己的 Linux 練習 VM 執行。實驗使用有限資源、loopback 或暫存檔，不需要修改 host kernel settings。每次先寫預測，再跑，再解釋結果；這比抄命令有效。

### Lab 1 看見 zombie 及被 reap

第一個 terminal 執行：

```bash
python3 -u - <<'PY'
import os, time
child = os.fork()
if child == 0:
    os._exit(0)
print(f"parent={os.getpid()} child={child}", flush=True)
time.sleep(20)
os.waitpid(child, 0)
print("child reaped", flush=True)
time.sleep(5)
PY
```

第二個 terminal 以印出的 PID 查 `ps -o pid,ppid,stat,comm -p CHILD_PID`，等待後再查。預期：短暫看到 Z，wait 後 child 消失。若你太晚查就看不到，這是 timing，不是概念失效。所有 process 約 25 秒後自行退出。

### Lab 2 比較 CPU busy 與 sleeping

```bash
python3 -u - <<'PY'
import os, time
print("PID", os.getpid(), flush=True)
end = time.monotonic() + 15
while time.monotonic() < end:
    pass
print("sleeping", flush=True)
time.sleep(15)
PY
```

同時觀察該 PID 的 top／ps。預期：先消耗約一個 logical CPU，再變成 sleeping、CPU 使用下降。問自己：為什麼整台機器 CPU 可能仍不高？為什麼 S state 本身不是問題？

### Lab 3 刪掉檔名但 FD 仍可讀

```bash
python3 -u - <<'PY'
import os, tempfile
fd, path = tempfile.mkstemp(prefix="os-lab-")
try:
    os.write(fd, b"still reachable through fd\n")
    os.unlink(path)
    os.lseek(fd, 0, os.SEEK_SET)
    print("path exists:", os.path.exists(path))
    print("read through fd:", os.read(fd, 100).decode())
finally:
    os.close(fd)
    if os.path.exists(path):
        os.unlink(path)
PY
```

預期 path exists 為 False，仍可讀出資料。你應能用 directory entry、inode、open reference 解釋，而不是只記「Linux 特性」。

### Lab 4 在 child process 內觀察 FD limit

```bash
python3 - <<'PY'
import resource
soft, hard = resource.getrlimit(resource.RLIMIT_NOFILE)
target = 64 if soft == resource.RLIM_INFINITY else min(soft, 64)
resource.setrlimit(resource.RLIMIT_NOFILE, (target, hard))
files = []
try:
    for _ in range(128):
        files.append(open('/dev/null'))
except OSError as exc:
    print(type(exc).__name__, exc.errno, exc.strerror)
finally:
    for f in files:
        f.close()
PY
```

只降低這個 Python process 的 soft limit。一般預期 EMFILE；若環境原本限制更特殊，結果可能不同。程式結束後不改變 parent shell。追問：為何真正 service 的 limit 要看 `/proc/PID/limits`？

## 17 口頭驗收與評分

以下是自編的 readiness gate，並非任何公司的錄取標準。每題用 60–90 秒回答，評分 0–3：0 錯誤或答不出；1 定義正確；2 能講機制與例子；3 能說限制並回答追問。不要因為看得懂就給自己 3 分。

| 題號 | 問題 | 合格答案的關鍵 |
|---|---|---|
| 1 | syscall 和 context switch 相同嗎 | mode transition 不必換 task |
| 2 | fork exec wait 各做什麼 | child、image replacement、reap |
| 3 | process 與 thread 如何選 | isolation、sharing、CPU／I/O、runtime |
| 4 | zombie 可以 kill 嗎 | 已終止；parent reap |
| 5 | D state 為何 kill 不掉 | kernel 不可中斷等待，signal pending |
| 6 | load 高一定 CPU 忙嗎 | runnable＋D、cores／quota、指標配合 |
| 7 | RSS VIRT page cache 分別是什麼 | resident／virtual／file cache，不混同 |
| 8 | page fault 是 crash 嗎 | demand paging、COW、invalid access 區分 |
| 9 | host 有 RAM 為何 pod OOM | cgroup limit，查證不能只用 137 |
| 10 | memory leak 怎麼證明 | 趨勢、retained objects、對照 workload |
| 11 | deleted log 為何占空間 | unlink 與 open reference |
| 12 | disk 有容量為何寫不了 | inode、quota、permission、read-only、I/O error |
| 13 | write 成功是否 durable | cache、fsync、directory、storage semantics |
| 14 | CPU 低 request 卡在哪 | pool、lock、I/O、dependencies、trace |
| 15 | epoll 幫忙什麼 | readiness、nonblocking、partial I/O、ET |
| 16 | namespace 與 cgroup 差異 | view isolation 與 resource control |
| 17 | systemctl 與 journalctl 差異 | lifecycle／properties 與 logs |
| 18 | strace 很安靜但 CPU 高呢 | userspace hot loop，改 CPU profile |
| 19 | 如何優雅終止 worker | stop intake、in-flight、deadline、ack／retry |
| 20 | Linux host 變慢第一步 | scope、impact、change、testable hypotheses |

建議門檻：至少 48/60，且 4、5、6、9、13、20 不得低於 2；再完成第 14 章任兩個未看答案的 8 分鐘情境，以及至少三個 labs。隔一天再抽問，仍能獨立解釋，才代表記憶可在面試使用。

### 兩段綜合英文回答

> I would first clarify whether the slowdown affects one process, one host, or the entire service. Then I would correlate the onset with recent changes and inspect CPU, memory, I/O, and task states. For each hypothesis, I would choose a test that can distinguish it from the alternatives. If users are significantly affected, I would apply a reversible mitigation and verify recovery using request success and latency.

> A container shares the host kernel but has isolated views of resources through namespaces. Cgroups account for and control resource usage. That is why a container can be CPU-throttled or OOM-killed even when the host appears to have spare capacity. I would inspect the actual process and cgroup limits rather than relying only on host-level averages.

## 18 面試前十分鐘回顧

1. Process 狀態只是證據入口；S 正常、Z 要 reap、D 要查 blocked kernel path。
2. Syscall 不一定 context switch；fork 不等於 exec；COW 不代表永遠零成本。
3. 看 per-core、run queue、quota；load 不是 CPU percentage。
4. VIRT 不等於 RSS；free 少不等於 memory pressure；137 不等於已證明 OOM。
5. FD 可指向 socket／pipe；pool 太大會把等待搬到 downstream。
6. `df -h` 容量、`df -i` inode、`lsof +L1` deleted-open；write 不等於 durable。
7. `systemctl status` 看狀態，`journalctl -u` 看 service logs，`journalctl -k` 看 kernel。
8. Epoll 是 readiness；blocking callback 會拖住同一 event loop。
9. 每個命令後說「預期看到什麼，結果如何改變下一步」。
10. 緩解後看使用者 success／latency／correctness；不要只看 CPU 變低。

## 19 延伸閱讀與查資料方法

正文已在相關位置附技術來源。需要深讀時，先從對應概念切入，不必順著一整份 kernel manual 從頭讀到尾。

- [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/)：補完整 OS 課程脈絡。
- [Linux man-pages](https://man7.org/linux/man-pages/)：用 `man 2` 查 syscalls、`man 7` 查概念，確認實際語意。
- [Linux kernel documentation](https://docs.kernel.org/)：memory、cgroups、PSI 等實作說明。
- [systemd](https://systemd.io/)：service manager 與 boot 的一手文件。
- [Brendan Gregg USE Linux checklist](https://www.brendangregg.com/USEmethod/use-linux.html)：把 resource 指標與診斷工具連起來。

閱讀完成的判準：你能在沒有本書的情況下，面對新症狀說出兩個合理假設、一個區分它們的測試，以及結果對下一步的影響。
