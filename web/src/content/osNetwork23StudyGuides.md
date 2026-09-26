# OS & Network · 23 Deep Dives

Apple SRE study notes｜23 focused OS, networking, fleet, security, Kubernetes, reliability, and cloud topics. Each source note is preserved below as its own section so you can jump directly to the topic you need.

## 01 RAID：容量、效能、容錯與重建

優先級：P0｜約 10–15 分鐘｜目標：能介紹各 level，並說清楚故障時的取捨。

### 先建立直覺

RAID（Redundant Array of Independent Disks）把多顆磁碟組成一個 logical storage。它解決「如何把資料放在多顆磁碟上」，可以追求並行效能、容錯或兩者。它不自動解決誤刪、錯誤寫入、整台主機失效及跨機房災難。

三個積木：striping 把不同資料分開放，讓磁碟並行工作；mirroring 存相同資料的副本；parity 儲存可重建遺失資料的資訊。例如兩個資料區塊 A、B，加上 P=A XOR B，遺失 A 時可用 B XOR P 重建 A。這個簡化例子說明 parity 的用途，不代表 parity 是完整副本。

### 面試需要記住的比較

以下假設 N 顆等容量 S 的磁碟，忽略 metadata。RAID 10 指常見雙碟 mirror pairs 再 striping 的配置。

| Level | 配置 | 常見最少磁碟數 | 可用容量 | 容錯 |
|---|---|---:|---|---|
| 0 | Striping | 2 | N×S | 任一顆故障即可破壞資料 |
| 1 | 雙碟 mirroring | 2 | S | 任一 1 顆 |
| 5 | Striping＋單 parity | 3 | (N−1)×S | 任一 1 顆 |
| 6 | Striping＋雙 parity | 4 | (N−2)×S | 任意 2 顆 |
| 10 | Stripe across mirror pairs | 4 | N×S/2 | 至少任一 1 顆；多顆取決於位置 |

四顆 2 TB 磁碟：RAID 0 約 8 TB、RAID 5 約 6 TB、RAID 6／10 約 4 TB。TB 與作業系統顯示的 TiB 也不同，實際檔案可用空間還要扣除 filesystem overhead。

RAID 10 若 pairs 是 A/B、C/D，A+C 壞掉仍有 B/D；A+B 壞掉則整個 pair 的資料消失。因此「最多可壞兩顆」沒有說清楚條件，「任意兩顆」更是錯的。

### 效能與 rebuild

小型 random write 更新 RAID 5 的部分 stripe，通常還要更新 parity，可能產生額外讀寫；full-stripe writes 的路徑不同。不能只按磁碟數推算固定倍數。RAID 10 的冗餘路徑较直接，但付出約一半容量。

壞碟後進入 degraded 狀態：服務可能還能用，但可容忍的後續故障減少。替換磁碟後的 rebuild 要讀取其餘磁碟並重建內容，與正式流量爭 I/O，可能讓 p99 增加。剩餘磁碟發生讀取錯誤或再壞一顆，風險會進一步增加。

Hot spare 是準備接替的磁碟，不是額外備份。開始 rebuild 不等於完成 redundancy 恢復。處理時要確認哪個磁碟的 serial number 真正故障，避免拔錯仍健康的磁碟。

### 遇到事故怎麼看

Linux software RAID（md）可用以下唯讀檢查；hardware RAID 則要查 controller 工具。

```bash
cat /proc/mdstat
sudo mdadm --detail /dev/md0
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS
journalctl -k -b
```

`/proc/mdstat` 可以辨識陣列狀態及重建進度；`mdadm --detail` 看 member 狀態；kernel log 對應 I/O errors。不要從「degraded」直接跳到 force assemble，先確認資料保護及平台 runbook。

情境：換碟後 API 延遲上升。合理假設是 rebuild 與 workload 爭 I/O；用重建時間、storage latency、queue 及 application latency 的關聯驗證，並評估降低 rebuild 速度會延長冗餘不足的風險。不是一律優先加快或暫停。

### 自測：先回答，再看下方

1. Explain RAID 0, 1, 5, 6, and 10 and their main trade-offs.
2. Can any two disks fail safely in a four-disk RAID 10 array?
3. Why do we still need backups when using RAID?

### 參考答案與英文短答

1. 依表比較，選型還要考慮小型 random writes、容量成本及 rebuild impact。
2. 不行；同一 mirror pair 都故障就會丟失資料。
3. 誤刪或壞資料可同步寫到所有副本；獨立 backup、歷史版本及 restore test 提供不同保障。

> RAID combines multiple disks to improve performance, fault tolerance, or both. RAID 0 stripes without redundancy, RAID 1 mirrors, and RAID 5 and 6 use parity to tolerate one and two disk failures. RAID 10 stripes across mirrored pairs. I would consider usable capacity, workload, failure tolerance, and rebuild impact. RAID does not replace backups.

### 延伸來源

- [Linux kernel：md RAID 狀態與管理介面](https://docs.kernel.org/admin-guide/md.html)。用於查核 md-specific 行為；教學中的容量與故障例子為自行推演。
- [Dell：RAID levels](https://www.dell.com/support/contents/en-us/videos/videoplayer/understanding-raid-levels/6079788681001)。延伸比較。


---

## 02 Storage stack、LVM、Block／File／Object

優先級：P0｜約 10 分鐘｜目標：從一個檔案路徑追到真正的儲存層。

### 為什麼需要分層

Application 看到 `/data/orders.db`，不代表它知道這是 local SSD、network block device 或 NFS。相同的 ENOSPC、latency 或 I/O error，可能來自不同層。先辨認路徑，再選工具，才不會在 NFS client 上一直研究本機磁碟。

常見配置是 disk → partition → RAID → LVM → filesystem → mount point → file，但這不是固定必要順序。有些跳過 RAID/LVM，有些 filesystem 自己管理多磁碟，雲端 block volume 背後還有不可見的遠端層。

### 每一層負責什麼

| 層 | 責任 | 不保證什麼 |
|---|---|---|
| Disk／block device | 提供可讀寫的 block address space | 不直接提供目錄與檔名 |
| Partition | 切分同一裝置的位址範圍 | 不提供獨立硬體容錯 |
| RAID | 多裝置資料配置與部分故障容忍 | 不替代 backup |
| LVM | 彈性配置 logical volumes | 一般 linear LV 沒有自動冗餘 |
| Filesystem | 檔名、目錄、metadata、空間管理 | 不自動跟著所有底層擴容 |
| Mount | 把 filesystem 接到路徑樹 | 路徑名稱不透露物理位置 |

LVM 三個名稱：PV（Physical Volume）是納入管理的底層裝置；VG（Volume Group）把 PV 集合成可分配的空間；LV（Logical Volume）是交給 filesystem 或 application 使用的虛擬 block device。VG 有空間，不表示每個 LV 已經取得那些空間。

例如 cloud disk 從 100 GB 變 200 GB，partition、PV、LV、filesystem 仍可能停在原大小。需要先找出哪個層還没擴，而不是直接執行所有 resize 指令。是否可 online grow，以及是否支援 shrink，取決於 filesystem 和配置。

### Block、File、Object 的選擇

Block storage 像一顆虛擬磁碟，你通常還要管理 filesystem；多台主機直接同時 mount 一個普通 filesystem 並寫入，可能損壞資料，不能把 block attachment 當共享檔案系統。

File storage 提供檔案／目錄操作，例如 NFS。多 client 的 visibility、locking、cache 和故障重試仍要理解。Object storage 用 key/API 操作 object，適合備份、靜態資產及資料集；不能假設它有一般 filesystem 的 append、rename、lock 語義。套一個 FUSE mount 也不會自動獲得完整 POSIX 保證。

### 一個可操作的排查順序

```bash
findmnt -T /data/orders.db
lsblk -f
df -h /data
df -i /data
sudo pvs
sudo vgs
sudo lvs
```

`findmnt` 看 source、filesystem type、mount options；`lsblk` 對照 block 層；`df -h` 看 filesystem 容量，`df -i` 看 inode。最後三個僅適用 LVM 環境。若工具顯示 NFS，要查 mount/server/network；若是 tmpfs，要關聯記憶體。

另外，mount point 未成功掛載時，application 可能把資料寫到 root filesystem 上同名的普通目錄。結果是 `/` 變滿，而預期的 data disk 幾乎沒使用；這就是先查 mount identity 的價值。

### 自測

1. A disk was expanded, but df still shows the old capacity. What would you check?
2. Why are two partitions on one disk not separate failure domains?
3. Can you replace a shared filesystem with object storage without changing the application?

### 參考答案與英文短答

1. 查實際 mount source，再逐層核對 disk、partition、PV、LV、filesystem；只擴仍受限的層。
2. 它們共享同一實體磁碟，硬體失效會同時影響兩者。
3. 不能直接假定可以，要檢查 API、更新方式、rename/locking 等語義。

> I would first map the file path to its mount and backing storage. A larger block device does not necessarily mean the logical volume and filesystem have grown. I would inspect each layer before making changes. I would also distinguish local block storage from network filesystems and object storage because their failure modes and interfaces differ.

### 延伸來源

- [LVM manual：PV、VG、LV 與查詢工具](https://man7.org/linux/man-pages/man8/lvm.8.html)
- [findmnt manual](https://man7.org/linux/man-pages/man8/findmnt.8.html)


---

## 03 write、Page Cache、fsync、Journal 與 Durability

優先級：P0｜約 10–15 分鐘｜目標：說清楚「成功」是哪一層的成功。

### 從 application 到磁碟

一般 buffered file I/O 可能經過：程式／library buffer → write syscall → kernel page cache → block layer → device cache → 持久媒體。不同系統可能省略或改變部分層，但應先問「目前 acknowledgement 到哪裡」。

程式的 `print` 或 library write 可能只寫進 userspace buffer。`write()` 返回成功通常表示 kernel 接受相應 bytes；它還可能是 partial write，回傳值需要檢查。突然斷電時，留在 volatile RAM 中的資料可能消失。

Dirty page 是已修改、尚未完成 backing storage 同步的 page；writeback 在背景或受壓時把它往儲存端送。短期寫得快，可能只是在填 buffer，不能證明磁碟能長期承受同樣速度。

### 各種 flush 不一樣

| 動作 | 主要意義 |
|---|---|
| `fflush()` | 把 C stdio 的 userspace buffer 送往底層，不等於斷電持久化 |
| `fsync(fd)` | 要求檔案資料與相關 metadata 同步到儲存端，並等待完成 |
| `fdatasync(fd)` | 同步資料及之後正確讀取所必要的 metadata，略去部分其他 metadata |
| `close(fd)` | 釋放 FD；不可把它當成完整 durability 保證 |

`fsync` 的保證仍依賴 filesystem、storage stack 和裝置正確實作 flush。新建或替換檔案時，檔名存在 directory 中；只 fsync 檔案不一定讓 directory entry 也具備 crash durability。

### 原子替換例子

假設要更新設定檔，不能讓 reader 看到寫到一半的 JSON。常見做法是在相同 filesystem 的 temporary file 寫完整內容，檢查錯誤並 fsync；再 rename 到正式名稱，最後 fsync parent directory。權限、owner 和所有 error paths 也要處理。

Rename 的 atomic visibility 表示其他人看到舊名稱對應內容或新內容，不是半次 rename；crash durability 則是掉電後該狀態是否還在。跨 filesystem 的 move 可能變成 copy/delete，不能沿用同一假設。這是兩種不同保證，不要因為「atomic」就直接回答一定不丟資料。

### Journal 與 WAL

Filesystem journal 主要幫助 crash 後恢復 filesystem 一致性，例如避免部分 metadata 更新破壞結構；具体 data journaling 模式依 filesystem 而異。它不替應用保證每次最新 write 都已持久化。

Database WAL 先記錄可重做或恢復所需資訊。Transaction commit 是否等到 WAL flush，取決於 DB durability 設定。Group commit 可讓多筆 transaction 共用一次 flush，減少每筆成本，但具體等待和保證要查 DB。

### 排查「成功寫入卻不見」

先確定是正常 process crash、OS crash、斷電，還是讀到別的 replica／路徑。查 application 是否檢查 write/fsync 返回值、DB 是否使用 async commit、資料是否其實位於 tmpfs，並對齊 incident 時間。

```bash
findmnt -T /data/config.json
iostat -xz 1
sudo strace -f -tt -T -e trace=write,fsync,fdatasync,rename,renameat,renameat2 -p 1234
```

`strace` 可看有沒有呼叫及耗時，可能影響效能並暴露寫入內容，production 要依權限與資料規範使用。觀察到 fsync 不等於完成了一次掉電耐受測試；失敗注入放測試環境。

### 自測

1. Does a successful write system call guarantee persistence after power loss?
2. Why might an atomic rename still need a directory fsync?
3. Why can synchronous commits reduce throughput, and how can batching help?

### 參考答案與英文短答

1. 不保證；資料可能只到 volatile cache，還要依持久化需求同步。
2. Rename 的可見性和 directory metadata 掉電後保存是不同問題。
3. Flush latency 形成等待；group commit 分攤成本，但不是取消 durability 要求。

> A successful write usually means the kernel accepted the data, not that it is durable against power loss. For durability I would check the application's flush policy, fsync errors, and storage guarantees. Atomic visibility and crash durability are separate requirements, and filesystem journaling alone does not guarantee that the latest application data survives.

### 延伸來源

- [fsync／fdatasync manual](https://man7.org/linux/man-pages/man2/fsync.2.html)
- [write manual](https://man7.org/linux/man-pages/man2/write.2.html)
- [rename manual](https://man7.org/linux/man-pages/man2/rename.2.html)


---

## 04 IOPS、Throughput、Latency、HDD／SSD

優先級：P0｜約 10 分鐘｜目標：不再用「MB/s 不高，所以磁碟没問題」判斷。

### 三個量各回答什麼

IOPS 是每秒完成幾次 I/O；throughput 是每秒傳多少 bytes；latency 是一筆 I/O 從提出到完成花多久。小型 random reads 與大型 sequential writes，可能撞到完全不同的限制。

假設每筆 4 KiB、每秒 20,000 次，throughput 約 78.1 MiB/s；每筆 1 MiB、每秒 500 次，則是 500 MiB/s。前者 MB/s 較低，但對 IOPS 的要求更高。

在穩定系統中，可以用 Little's Law 連結觀測：平均 outstanding I/O ≈ 完成 IOPS × 平均 latency（秒）。例如 10,000 IOPS、平均 2 ms，約有 20 個 outstanding I/O。這不是單一裝置一定能達成的效能規格。

### 為什麼 queue 重要

HDD 的 random access 受尋道與旋轉影響；SSD 沒有機械尋道，但仍有 controller、flash、garbage collection、thermal、write endurance 與 bandwidth 的限制。

增加 queue depth 可以讓裝置有更多並行工作，直到有效容量；超過後可能只增加排隊，讓 latency 更差。使用者通常在乎 request p99，不是單獨把 IOPS 拉到最大。

SATA／SAS／NVMe 屬於介面／協定層面的分類；HDD／SSD 是媒介類型。不能說「NVMe 與 SSD 哪個比較快」，因為 NVMe 裝置本身往往就是 SSD。

### 看 iostat 時的重點

```bash
iostat -xz 1
pidstat -d -p 1234 1
vmstat 1
```

`iostat` 第一份報告通常是開機以來平均，後續才是 interval；工具版本欄位可能不同。

| 指標 | 怎麼理解 |
|---|---|
| r/s、w/s | block device 層完成的操作速率，不等於 application syscall 次數 |
| rkB/s、wkB/s | 資料量，配合 I/O size 看 |
| r_await、w_await／await | 平均等待到完成的時間，包含 queue，掩蓋 tail |
| aqu-sz | 平均 queue/outstanding 數量的線索 |
| %util | 裝置有 I/O 活動的時間比例；不是通用的最大能力百分比 |

NVMe／RAID 可同時處理多個 I/O，%util 接近 100% 不足以證明已到極限。CPU 的 iowait（wa）也不是磁碟 latency：CPU 還有別的工作可跑時，磁碟慢仍可能 wa 很低。

### 情境推理

API p99 增加，但磁碟只跑 30 MB/s。先查 workload 是否從 sequential 變為大量小 random I/O，是否突然增加 synchronous flush；再對照 storage latency、queue、IOPS、DB lock／query time。若是遠端 volume，也要查 provider IOPS/bandwidth 限制及網路。

另外，application observed latency 包含 user queue、DB processing 和 network；iostat 平均正常不能證明整條 storage request path 正常。選擇同一時段、同一 volume 比較，避免把不同層的統計當成互相矛盾。

### 自測

1. Can a disk bottleneck occur with low throughput in MB/s?
2. Why might increasing queue depth improve throughput but hurt latency?
3. Does 100% device utilization prove an NVMe device has reached maximum throughput?

### 參考答案與英文短答

1. 可以，小 random I/O、flush latency、IOPS quota 都可能限制完成速率。
2. 適當並行可利用裝置，但 capacity 之後只是在排隊。
3. 不證明；要看 workload、IOPS、latency、queue、裝置能力及基線。

> I would examine IOPS, throughput, latency, and queue depth together. Low bandwidth does not rule out an I/O bottleneck, especially for small random or synchronous operations. I would compare device metrics with application latency and the healthy baseline, and avoid treating percent utilization as a universal saturation indicator.

### 延伸來源

- [iostat manual：欄位定義及 %util 邊界](https://man7.org/linux/man-pages/man1/iostat.1.html)
- [pidstat manual](https://man7.org/linux/man-pages/man1/pidstat.1.html)


---

## 05 Memory Reclaim、Swap、Cgroup Accounting 與 OOM

優先級：P0｜約 15–20 分鐘｜目標：能解釋 RSS 400 MiB、container 接近 1 GiB 並不矛盾。

### RAM 被使用，不等於 RAM 壓力

Linux 利用 RAM 保存 file page cache，減少磁碟讀取。`free` 低不必然有問題；`available` 估計不必 swap 就能提供給新工作的大致空間。Host 的 available 也不是某個 container 剩餘額度。

Clean file-backed pages 通常可以丟棄後重讀；dirty pages 要先 writeback。Anonymous memory 常見於 heap／stack，不能直接當作可重讀檔案丟掉，可能需要 swap。Swap 已經使用不代表此刻 thrashing，要看持續 si/so、fault、stall 及 request latency。

PSI（Pressure Stall Information）呈現 task 因資源等待而停滯的時間。Memory PSI 的 `some` 表示至少一些 task stalled，`full` 表示所有 non-idle tasks 同時 stalled 的時間。它不是「RAM 使用百分比」。

```bash
free -h
vmstat 1
cat /proc/pressure/memory
```

### 為什麼 process RSS 小於 container 用量

Process RSS 是該 process 映射且 resident 的 pages。Cgroup accounting 可包含群組內其他 processes，以及被計入該群組的 file cache、tmpfs/shared memory、kernel memory（如 page tables、部分 socket buffers）。所以只看主 process 的 heap/RSS 會漏東西。

反過來，直接把所有 processes 的 RSS 相加也不精確，shared pages 可能重複計算。`memory.stat` 的細項也有子集，例如 `shmem` 包含於 `file`，不要全加一次。`kubectl top pod` 又可能是多個 containers 的合計，通常顯示 working-set 類指標，不等於 memory.current，也不是 OOM killer 直接採用的判斷值。

情境：主 process RSS 400 MiB，而 Pod 顯示約 950 MiB。先核對同一 pod/container、時間與統計定義，再拆其他 processes、cache、tmpfs、kernel memory。健康 replica 的當下數字不能還原另一台在 OOM 當時的尖峰。

### Kernel 何時 OOM、選誰殺

Cgroup v2 的 `memory.max` 是硬上限。新需求碰到限制時會嘗試 reclaim；無法回收足夠空間，可能觸發該 cgroup 的 OOM。這可以發生在整台 node 還有空 RAM 的時候。`memory.high` 主要造成 reclaim／throttling 壓力，並非相同的 kill 門檻。

Global OOM 則是主機可用分配資源不足、回收仍不能滿足需求的另一種範圍。先用 log 確定是哪一類，不要只看 `OOMKilled` 就認定 container limit 設太低。Kubelet 的 node-pressure eviction 又是不同機制。

一般 victim selection 考慮 process memory burden 與 `oom_score_adj` 等因素；不是永遠殺最後 malloc 的 process，也不只看 RSS。`oom_score_adj=-1000` 在 kernel OOM selection 中有特殊保護。Cgroup 的 `memory.oom.group` 設定還可要求以群組方式處理 eligible tasks。

### 排查：先找對 cgroup，再讀數字

以下以 node 上已知的 container process **host PID 1234**、cgroup v2 為例；先找路徑，再把示意路徑改成實際值。容器內 `/proc/1/cgroup` 因 namespace 可能顯示不同視圖。

```bash
cat /proc/1234/cgroup
findmnt -t cgroup2
# 假設已確認實際 cgroup 是 /sys/fs/cgroup/example
cat /sys/fs/cgroup/example/memory.current
cat /sys/fs/cgroup/example/memory.max
cat /sys/fs/cgroup/example/memory.stat
cat /sys/fs/cgroup/example/memory.events
cat /proc/1234/oom_score_adj
journalctl -k -b
kubectl top pod POD_NAME --containers
kubectl describe pod POD_NAME
```

`memory.events` 的 `max` 是碰到上限事件，`oom` 與 `oom_kill` 各有不同意義，不能全部當 killed 次數；累積 counter 要看 incident 前後增量。還要查 ancestor cgroup 的限制。Cgroup v1 的檔名不同，不能照抄 v2 路徑。

若使用量下降但 app RSS 沒降，可能是 allocator retention/cache，不足以認定 leak。Leak 的證據應包括相似負載下持續成長、live objects／allocation profile，以及停止工作或 GC 後仍不能解釋的保留。

### 自測

1. Why can a container be OOM-killed while the node still has free memory?
2. Why can container memory usage be much higher than one process's RSS?
3. What would distinguish a leak from cache growth or allocator retention?

### 參考答案與英文短答

1. 觸及 cgroup／ancestor 限制且 reclaim 不足，與 host free RAM 不同。
2. 範圍、時間、指標不同；查其他 processes、file/shmem/kernel，避免重複加總。
3. 對照長期負載與 allocation/live-object 證據；單次 RSS 高不夠。

> I would distinguish a cgroup OOM from a host-wide OOM. The kernel accounts for more than one process's RSS, including file cache and kernel memory. I would inspect the relevant cgroup's usage, limit, memory breakdown and OOM events, and correlate them with kernel logs and historical peaks. I would not assume the current healthy replica represents the killed container.

### 延伸來源

- [Linux cgroup v2：memory controller](https://docs.kernel.org/admin-guide/cgroup-v2.html)
- [Linux PSI](https://docs.kernel.org/accounting/psi.html)
- [Linux /proc：OOM score](https://docs.kernel.org/filesystems/proc.html)
- [Kubernetes resource metrics](https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/)


---

## 06 CPU Scheduling、Context Switch、Interrupts

優先級：P1｜約 10 分鐘｜目標：能解釋 CPU 平均值背後的執行限制。

### CPU 到底在執行誰

Scheduler 從 runnable tasks 選出可以執行的工作。Process 通常有獨立 address space；同一 process 的 threads 共用 address space、FD table 等資源，但各有自己的 stack、register state 和排程狀態。Thread 可以因 I/O、lock、timer 等原因睡眠，睡眠時不代表它正使用 CPU。

Syscall 讓程式從 user mode 進入 kernel 執行服務；如果沒有阻塞，可能原 task 做完就回來。Context switch 是把 CPU 交給另一個 task，需要保存／恢復狀態，還可能影響 cache locality。兩者不是一對一關係。

多 threads 不代表更快：CPU-bound 工作超過可用 cores 後，可能增加切換；lock contention、memory bandwidth 和 serial section 也可能限制 scaling。Amdahl's law 的直覺是：無法平行的部分會限制整體加速，不要求先背公式。

### 為什麼 host CPU 低仍然慢

8 cores 上一條 thread 跑滿，host 平均可能只有約 12.5%。先看 per-core 和 per-thread；工具對「100%」的 normalization 不同，也要確認。

三個限制要分清楚：affinity／cpuset 決定 task 能在哪些 cores 跑；CPU quota 限制某段時間內可消耗多少 CPU time；scheduler contention 是其他 runnable tasks 爭同樣 cores。增加 quota 不會自動解除單 thread bottleneck。

Cgroup v2 `cpu.max` 若是 `200000 100000`，代表每 100,000 微秒 period 可用 200,000 微秒 aggregate CPU time，即約 2 cores 的容量。多條 threads 可能較早用完 budget，之後被 throttle。`max 100000` 表示該層未設 quota，仍可能受 ancestor、cpuset 等影響。

### Interrupt／softirq／steal

NIC 收包等硬體事件可觸發 interrupt；kernel 把部分後續工作交由 softirq 等機制處理。大量小 packets 可帶來很高 packet-processing CPU，即使 bandwidth 不算大。觀察某 core 的 system/softirq 熱點，再對照 IRQ distribution、packet rate 和 drops。

VM 的 steal time 表示 hypervisor 沒有提供 guest vCPU 原本可用的執行時間，是 host contention 的線索。NUMA 系統中，CPU 存取不同 memory node 的成本可能不同；只要知道 locality 可能影響效能，不要推定所有硬體都相同。

### 選工具取得證據

```bash
mpstat -P ALL 1
top -H -p 1234
pidstat -u -w -p 1234 1
taskset -pc 1234
cat /proc/interrupts
cat /proc/softirqs
```

`mpstat` 看 per-core 類型；`pidstat -w` 區分 voluntary/nonvoluntary context switches，但高數字本身不是錯誤。`taskset -pc` 這個形式是查詢 affinity。若涉及 quota，另外定位 cgroup，讀 `cpu.max`、`cpu.stat`，看 throttling counter 增量。

情境：部署後 p99 上升，host CPU 20%。若單一 event-loop thread 滿載，調查 CPU profile 和新 callback；若 threads 常被 throttled，核對 quota；若 softirq 高，查 packet-processing path。不要一律增加 replicas 之前就宣稱原因已確定。

### 自測

1. Does every system call cause a context switch?
2. How can CPU be the bottleneck when host utilization is low?
3. What is the difference between CPU affinity and a CPU quota?

### 參考答案與英文短答

1. 不會；mode transition 不一定換 task。
2. 單 core／單 thread、affinity 或 quota 限制可能被 host 平均掩蓋。
3. 前者限制執行位置，後者限制 aggregate execution time。

> I would inspect per-core and per-thread utilization before trusting the host average. A single-thread bottleneck, CPU affinity, or cgroup throttling can cause high latency while other cores remain idle. I would also distinguish application CPU work from system and softirq work before choosing a profiler or a configuration change.

### 延伸來源

- [Linux scheduler overview](https://man7.org/linux/man-pages/man7/sched.7.html)
- [Cgroup v2 CPU controller](https://docs.kernel.org/admin-guide/cgroup-v2.html)


---

## 07 Locks、IPC、Futex 與 epoll

優先級：P1｜約 15 分鐘｜目標：能分辨「等待是正常協調」與「服務沒有進展」。

### 同步工具解決什麼問題

Mutex 讓一次只有一個執行者進入 critical section；semaphore 管理有限數量 permits，例如最多 10 個並行工作；condition variable 用於等待某個由程式維護的條件。

Condition variable 被喚醒時必須重新檢查條件，通常用 while loop：因為條件可能已被其他 thread 改變，或出現 spurious wakeup。喚醒不是把工作或資源直接保證交給你。

Futex 是 fast userspace mutex 這個名稱所指的 Linux wait/wake 機制。很多同步操作在沒有 contention 時只需 userspace atomic operations，有需要睡眠或喚醒時才進 kernel。`wchan` 或 `strace` 顯示 futex waiting，可能只是 idle worker 正常等工作，不能直接判定 deadlock。

### 三種「沒進展」

Deadlock：A 持有 lock 1 等 lock 2，B 持有 lock 2 等 lock 1，依賴循環無法打破。固定 lock ordering 是常見預防方式。

Starvation：系統有人前進，但某 task 長期拿不到資源，例如高優先工作一直插隊。Livelock：tasks 一直退讓、重試或更改狀態，但沒有完成有用工作。三者的 CPU 表現不一定相同。

排查先取得多次 thread stacks，找 lock holder、waiter、工作 queue 與進度變化。單次 stack 只能看快照；對照 request latency 和正常狀態。Service owner 熟悉 runtime profiler，SRE 仍可先縮小 process、thread、resource 範圍後協作。

### 同機 IPC 怎麼選

| 方式 | 常見用途 | 必須處理的問題 |
|---|---|---|
| Pipe | Parent/child 或 pipeline 的 byte stream | framing、buffer 滿、read/write 阻塞 |
| Unix domain socket | 同機 client/server | lifecycle、權限、stream 或 datagram 語義 |
| Shared memory | 共享大量資料、減少部分 copying | synchronization、ownership、process crash |

Shared memory 不代表 data race 自動消失；反而需要清楚的同步與存取協議。

### Blocking、non-blocking、epoll

Blocking read 沒資料時可讓 thread 等待；non-blocking read 無法立即完成時回 EAGAIN/EWOULDBLOCK。這是 socket/FD 的 I/O 模式，不由 TCP 或 UDP 決定。

epoll 讓一條 thread 等待很多 FDs 的 readiness。Readable 代表現在 read 不必因等待資料而阻塞，可能是部分資料、EOF 或錯誤；不代表完整 HTTP request 已到。

Level-triggered 在條件仍成立時可反覆通知；edge-triggered 主要通知狀態變化，通常要配 non-blocking I/O 並讀到 EAGAIN。若只讀一小段就等下一次 edge，buffer 裡剩餘資料可能被擱置。

Event loop 也只是一條執行路徑。Node.js callback 若做長時間 CPU 計算，即使 sockets 已 ready，也沒機會及時執行其他 callbacks。需要 CPU profile、拆分工作或 worker threads 等合適設計。

### 自測

1. Does a thread waiting on futex prove that the process is deadlocked?
2. Does an epoll readable event mean a complete application message arrived?
3. Why can one CPU-heavy callback delay unrelated requests in an event loop?

### 參考答案與英文短答

1. 不證明；要看等待條件、holder 和是否能持續前進。
2. 不代表；TCP 是 byte stream，必須自己處理 framing 和 partial reads。
3. 它占住執行 callbacks 的 thread，其他 ready 工作無法被處理。

> A futex wait can be normal synchronization, so I would inspect thread stacks and progress before calling it a deadlock. With event-driven I/O, readiness is only a signal that an operation can proceed; it does not imply a complete message. I would also check whether a blocking or CPU-heavy callback is delaying the entire event loop.

### 延伸來源

- [epoll manual](https://man7.org/linux/man-pages/man7/epoll.7.html)
- [futex manual](https://man7.org/linux/man-pages/man2/futex.2.html)


---

## 08 Filesystem Permissions、Links 與 Resource Limits

優先級：P1｜約 10–15 分鐘｜目標：分清檔案內容、名稱、路徑與 process 限制。

### 名稱與內容不是同一件事

Directory entry 把 filename 對應到 inode；inode 管理 metadata 和內容位置等資訊。Hard link 是另一個 directory entry 指向同一 inode，不是拷貝內容；通常不能跨 filesystem。Symlink 保存目標 path，目標消失後可變成 dangling link。

刪除檔名是 unlink。只要還有其他 hard link，仍可從別的名字找到資料；最後一個名字消失後，open file reference 仍可能讓內容保留直到 close。這不代表系統藏著一個能查回的原檔名。`rm` 也不等於桌面「移到垃圾桶」。

所以 `df` 和 `du` 有差異時，deleted-but-open file 是一個假設；也要考慮 mount、reserved space、snapshot 等其他因素。`lsof +L1` 可找 link count 小於 1 的 open files，並非所有 filesystem 問題的唯一檢查。

### Directory 的 x 是 search

普通檔案的 r/w/x 對應讀內容、寫內容、執行；directory 的 r 是列出名字，x 是搜尋／穿越已知名字，w 配合 x 才能通常進行增刪 entry。

建立 `/a/b/new`，需要 `/a`、`/a/b` 等路徑元件可 traverse，並對目標 parent `/a/b` 有適當 write＋execute。你已掌握這個重點，延伸是：刪除檔案主要檢查 parent directory 權限，不要求檔案本身 writable。Sticky bit、ACL、immutable flag、LSM policy 等可再限制。

例如 shared directory 中一個 read-only file 仍可能被刪除，因為刪的是名稱關係；`/tmp` 的 sticky bit 則限制不同使用者隨意刪別人的檔案。

### 排查 Permission denied

```bash
id
namei -l /a/b/file
getfacl /a/b/file
getfacl /a/b
findmnt -T /a/b/file
lsattr /a/b/file
```

先確認執行者身份與 supplementary groups，再看每層 directory、ACL、mount ro/noexec 等設定。SELinux/AppArmor 還可能在 UNIX permissions 允許時拒絕；有 audit log 時以 log 驗證。不要先 `chmod 777`，它既可能無效，也會擴大存取權限。

### 三種 limit 不要混

`/proc/PID/limits` 和 `ulimit` 是 rlimit 類限制，例如 open files 的 soft/hard limit；它們不顯示 cgroup CPU quota。Cgroup 限制一組 tasks 的 CPU、memory、pids 等資源；host-wide file table 等限制又是另一層。

```bash
cat /proc/1234/limits
cat /proc/1234/cgroup
ls -1 /proc/1234/fd | wc -l
cat /proc/sys/fs/file-nr
```

FD 數量是瞬間快照，還需要看趨勢與 FD 類型。`EMFILE` 通常指 process FD limit，`ENFILE` 指系統層 open-file 資源限制；面試看到訊息能選對範圍比默背所有 errno 重要。Process 建立失敗也可能來自 pids controller 或其他 limits，不是全部歸 memory。

### 自測

1. Why can a read-only file sometimes be deleted?
2. Does removing the last filename always release disk space immediately?
3. Will ulimit show a container's CPU quota?

### 參考答案與英文短答

1. Unlink 主要受 directory 權限及額外政策控制。
2. 不會，open references 等仍可能持有內容。
3. 不會，要定位 cgroup 查控制檔。

> I would separate file-content permissions from directory-entry permissions. For access failures, I would check the process identity, every directory in the path, ACLs, mount options, and security policy. For resource exhaustion, I would distinguish per-process limits from cgroup limits and host-wide limits before changing any settings.

### 延伸來源

- [Linux path resolution](https://man7.org/linux/man-pages/man7/path_resolution.7.html)
- [unlink manual](https://man7.org/linux/man-pages/man2/unlink.2.html)
- [getrlimit manual](https://man7.org/linux/man-pages/man2/getrlimit.2.html)


---

## 09 Linux Boot 與 systemd：從通電到可服務

優先級：P0｜約 10–15 分鐘｜目標：機器無法 SSH 時能按階段定位。

### 先記一條通用 Linux 路徑

Firmware（BIOS／UEFI）初始化必要硬體並選擇開機來源；bootloader 載入 kernel 與可能使用的 initramfs；kernel 初始化 CPU、memory、drivers 等；early userspace 尋找真正 root filesystem；最後切換到正式 userspace，由 PID 1（常見 systemd）管理 services。

Initramfs 是早期的 RAM-based filesystem，提供在真正 root 尚未可用前需要的工具／drivers，例如辨認 storage、解密或組裝 RAID。不是每個系統都需要相同 early-boot 組件。

這是通用 Linux 概念。Apple Silicon 的具體 secure boot chain 不能直接稱作 PC BIOS→GRUB；面試要分清通用原理與平台實作。

### 卡在哪一層，決定用什麼觀測

| 最後可確認的階段 | 可能問題 | 優先觀測 |
|---|---|---|
| 有電、無 firmware console 進度 | 硬體、firmware、電源 | OOB console、sensor、硬體事件 |
| Bootloader 找不到 OS | boot entry、image／disk | Boot console、boot device |
| Kernel 起來但找不到 root | driver、UUID、RAID、解密 | Early-boot console／initramfs log |
| OS 起來但拿不到 IP | NIC、VLAN、DHCP、配置 | link、address、DHCP capture |
| IP 可達但 SSH 不通 | sshd、listen、firewall | socket、service log、兩端 capture |
| SSH 正常但服務不可用 | application、dependency | unit log、readiness、request path |

不要把 ping 不通直接等同「機器沒開機」；ICMP 可能被過濾。也不要以 SSH 通了就認定 application ready。

### systemd 的重要差別

Unit 是受管理的物件，service 是其中一種。`After=`／`Before=` 定義啟動順序，不單憑這些就拉起另一個 unit。`Wants=`／`Requires=` 表達不同強度的 dependency，通常還需配 ordering；不用先背全部 failure propagation 細節。

`active` 表示 unit 的狀態，實際 readiness 還取決於 service type 與應用回報。`network-online.target` 的意義由 network manager/wait-online 配置影響，也不保證每個遠端 DB 都可連線。

```bash
systemctl --failed
systemctl status example.service
systemctl cat example.service
journalctl -u example.service -b
journalctl -k -b
journalctl -b -1
```

`systemctl status` 給摘要與部分近期 logs；`journalctl -u` 才適合讀完整 unit log。`-b -1` 是上次 boot，只有 journal 被保留時才有資料。`systemctl cat` 幫你看 unit 與 overrides，而非只猜部署時用的是哪個設定。

### Restart loop 的推理

先看每次 exit code、啟動到死亡的時間、相同錯誤與近期變更。可能是配置語法、permission、port collision、missing dependency、OOM 或 health policy。先保留證據並控制 restart storm；大量 restart 本身可能讓 DB、DNS 或外部系統更忙。

重啟是恢復手段，不是原因解釋。更改 unit 後的 `daemon-reload` 是讓 systemd 重新讀配置，不等於替你重啟 service；真正變更依 runbook 執行。

### 自測

1. What happens between power-on and a Linux service becoming available?
2. Does After=database.service automatically start the database?
3. How would you investigate a host that never becomes reachable over SSH?

### 參考答案與英文短答

1. 說 firmware、loader、kernel/early userspace、root、init、service/readiness。
2. 不會，ordering 和 dependency 是不同關係。
3. 先透過 console 確認最後成功階段，再分 boot、network、SSH service；不要只重試 SSH。

> I would locate the last successful boot stage before debugging SSH. Firmware, the bootloader, kernel initialization, root filesystem discovery, networking, and service startup can fail independently. If the OS is not reachable, I would use the platform's console or out-of-band management and then correlate boot logs with recent image or configuration changes.

### 延伸來源

- [systemd：initrd interface](https://github.com/systemd/systemd/blob/main/docs/INITRD_INTERFACE.md)
- [systemd bootup manual](https://www.freedesktop.org/software/systemd/man/latest/bootup.html)
- [systemd unit manual](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html)


---

## 10 DHCP、Relay 與 PXE Network Boot

優先級：P0｜約 10–15 分鐘｜目標：解釋新主機如何取得網路和開機映像。

### 沒有 IP，怎麼先問到 IP

IPv4 DHCP client 初次取得 lease 常用 DORA：Discover 尋找 server；Offer 提出可用地址／參數；Request 表示選擇並申請；ACK 確認租約。過程可以利用本地 broadcast，因此 client 不需要先有可正常路由的 IP。

拿到的不只有 IP，還可能包括 subnet mask、default router、DNS server 與租約時間。收到一個地址不代表 mask、gateway、DNS 都正確；這些是不同驗證點。

Lease 到期前 client 會嘗試 renewal；不是每次都完整重跑最初的 broadcast 流程。Renewal 階段通常先聯絡原 server，後續可進入 rebinding。面試先懂生命週期，不必把所有 timer 百分比當第一優先背誦。

### DHCP relay 解決什麼

一般 router 不直接轉送 subnet 的 L2 broadcast，但 DHCP server 可能集中放在別的網段。Relay 接收 client request 後轉送给 server，並提供可辨識 client subnet 的資訊，讓 server 選正確的 address pool，回程也透過適當 relay 路徑。

因此「其他 VLAN 的機器拿得到 IP」不能證明這個 VLAN 的 relay/pool 也正常；要比較故障的共同範圍。

### 排查範例：新機沒有 lease

```bash
ip -br link
ip -br addr
ip route
sudo tcpdump -ni eth0 'udp port 67 or udp port 68'
```

把 eth0 換成實際 interface。67/68 是 IPv4 DHCP server/client ports，DHCPv6 是另一套協定與 ports。

若沒有 Discover，查 link、driver、interface 配置及 DHCP client 是否啟動。若有 Discover 沒 Offer，查 VLAN、relay、server 是否收到、pool 是否用完及回程。若有 ACK 仍不能通，核對 client 是否真正套用地址、是否有 conflict、mask/gateway/route 是否正確。從 capture 的某一點沒看到封包，仍需考慮擷取介面與位置。

### PXE 是把網路接到 boot 流程

傳統 PXE 常先透過 DHCP 取得網路及 boot server／filename 等資訊，再下載 boot program，進一步載入 kernel、initramfs 或 installer。常見傳輸包含 TFTP；iPXE／UEFI HTTP Boot 等可有不同路徑。不能把「network boot」等同「永遠固定 TFTP」。

例如：DHCP 成功，console 顯示 bootfile download timeout。這時優先確認 boot server/filename、檔案是否存在、傳輸路徑和政策。單純換 DHCP server 未必有用。若 image 下載完成但無法 mount root，問題已前進到 driver、root 指定或 storage/network root dependency。

自動 provisioning 還要辨認機器身份和硬體 architecture。拿到一個能下載的 image，不代表它適合這台主機或符合信任政策。

### 自測

1. Explain how a host obtains an IPv4 address through DHCP.
2. Why is a DHCP relay useful across subnets?
3. DHCP succeeds but PXE boot fails. What would you inspect next?

### 參考答案與英文短答

1. DORA，說明 lease 與附帶 network configuration。
2. Broadcast 不直接被一般 router 轉送，relay 連接 client subnet 與 server。
3. 根據 console 確定 download/execute/kernel/root 哪一階段失敗；檢查 boot 資訊及對應依賴。

> DHCP provides a leased IP address and network settings. For an initial IPv4 lease, the usual exchange is Discover, Offer, Request, and ACK. Across subnets a relay can forward requests to a centralized server. If network boot fails after DHCP succeeds, I would inspect the boot-server information and the next failed download or execution stage.

### 延伸來源

- [RFC 2131：DHCP](https://www.rfc-editor.org/rfc/rfc2131)
- [iPXE documentation](https://ipxe.org/docs)。延伸了解 network boot 的不同傳輸與 scripting。


---

## 11 DNS：Resolver、Cache 與故障分類

優先級：P0｜約 15 分鐘｜目標：區分 application、resolver、authoritative 的問題，能解釋每個測試排除了什麼。

### 角色與流程

Application 通常先交給 OS resolver/NSS；它可能查 `/etc/hosts`、local stub 或 recursive resolver。Recursive resolver 代表 client 往 root、TLD、authoritative server 查詢，並 cache 結果。Authoritative server 對自己負責的 zone 提供正式資料，不必再向上查。

常見 record：A/AAAA 是 IPv4/IPv6，CNAME 是 alias，NS 表示 delegation，PTR 是 reverse lookup。TTL 控制 cache 可使用多久；NXDOMAIN 等 negative result 也可能被 cache，不能只盯著 A record。

### 錯誤要分開

NXDOMAIN 表示名稱不存在；SERVFAIL 表示 resolver 處理失敗；timeout 表示未及時收到有效回應。它們可能都讓 application 顯示「DNS failed」，但排查方向不同。

DNS 可用 UDP，也可因回應太大、截斷或政策需要 TCP。只允許 UDP/53 會造成部分查詢失敗。DNS 成功只代表取得 address；TCP reachability、TLS hostname、HTTP response 仍是不同階段。

### 工具邊界

```bash
dig example.com A
dig example.com AAAA
dig @10.0.0.53 example.com A
dig +tcp example.com A
getent ahosts example.com
cat /etc/resolv.conf
```

`dig` 可直接比較指定 resolver 和 record type，但不完整模擬 application 的 `/etc/hosts`、NSS、runtime cache。`getent` 比較接近系統 resolver path。若 dig 得到新 IP，application 仍用舊 IP，可能是 local cache、runtime connection pool、既有 keep-alive connection，或它查的是另一個 hostname/record type。

排查 DNS latency 可從 client、local resolver、recursive resolver、authoritative server 分層測量；不要只用 ping。若只有某些 clients 舊資料，先比較 cache/TTL 及 resolver 設定。

### 走一次完整查詢：不是「一路往上 cache」

假設第一次查 `api.example.com`，而 recursive resolver 沒有可用 cache。它先向 root 取得 `.com` 的 delegation，再向 `.com` server 取得 `example.com` 的 delegation，最後向該 zone 的 authoritative server 查答案；若遇到 CNAME，還可能要繼續解析 alias 的 target。Resolver 會保存取得的有用 records，之後可以跳過已知的部分，不必每次重走 root。

Root/TLD 不需要知道你的 client 最後要連哪一台 application，也不是整條路上的 server 都因此 cache 最終 A record。這是 delegation 加上 resolver caching，不是把完整答案沿所有 server 回寫。

一個 name 可以有多個 A/AAAA；DNS 更新也不會主動踢掉使用舊 IP 的 TCP connection。TTL 到期只影響相關 cache 的可用性，並不等於所有 clients 在同一秒重新 resolve、重新 connect。

### 三個具體事故怎麼區分

| 現象 | 合理假設 | 下一個有辨識力的測試 |
|---|---|---|
| 新增 hostname 後一部分 clients 仍 NXDOMAIN | 舊 negative cache、問到不同 resolver | 比較指定 resolver 與 authoritative 的結果、remaining TTL |
| 小查詢成功、大回應失敗 | UDP fragmentation、truncation 後 TCP fallback 失敗 | 比較 `dig +tcp`、回應 TC flag 與封包路徑 |
| `dig` 正確、程式連到舊 IP | NSS/runtime cache、連線重用、proxy 自己 resolve | 比較 `getent`、新建連線的目的 IP、runtime 設定 |

`NOERROR` 但沒有想要的 record，也可能是 NODATA，而不是 NXDOMAIN。例如名稱有 A 沒有 AAAA，不代表名稱本身不存在。

如果解析結果涉及 private/split-horizon DNS，從公共 resolver 或外部 laptop 查到不同答案未必是錯誤，要站在 application 所在的 network namespace 和 resolver path 觀察。

### 故障排查示例：Pod 內 request 偶爾要等數秒

先確認延遲真的發生在 lookup，而非 TCP/TLS 或等待 connection pool。再比較同 node、不同 node、同 namespace 的查詢延遲與 timeout，檢查 `/etc/resolv.conf` 的 nameserver、search domains、ndots。Search suffix 可能讓短 hostname 先產生多個查詢；不要直接刪設定，先從 capture 或 resolver metrics 證實。

對同一 hostname 指定 configured resolver 查詢，看 query time、RCODE、answer、TTL；必要時在有權限的位置追 authoritative。`dig +trace` 展示 delegation path，但可能因外部 DNS 存取限制而失敗，也不重現 runtime cache 或 private resolver 行為。

要隔離 DNS 與其他層，可用下列指令指定已確認的測試 IP，仍保留 hostname/SNI；它比直接 `https://IP` 更適合測試同一 virtual host。

```bash
curl --resolve example.com:443:203.0.113.10 https://example.com/
```

上面的 IP 是文件示例，需替換成授權環境的實際 IP。若使用 proxy，還要確認 proxy 是否改變解析與連線路徑。

### 自測

1. Why can `dig` show the new IP while an application still connects to the old one?
2. What is the difference between NXDOMAIN, SERVFAIL, and timeout?
3. Why might blocking TCP/53 break only some DNS queries?

### 自測參考答案

1. `dig` 與程式可能走不同 resolver/NSS；程式可能持有 runtime DNS cache 或重用舊 connection。先確認「新連線」的目的地，不能用現有 socket 證明 stale DNS。
2. NXDOMAIN 是名稱不存在；SERVFAIL 是 server 無法完成解析，例如上游或 validation 問題；timeout 則是沒有及時收到有效回應，需要查傳輸、server overload 或丟包。
3. 小型 UDP 回應可正常，大型回應可能要求 TCP 重查，封鎖 TCP 會只影響這類流程。DNS over TCP 不只用於 zone transfer。

讀完能做到：解釋 delegation、區分三類 failure、提出一個能比較 application 與 resolver 的測試；不要求背 DNS packet 的全部欄位。

### 英文短答

> I would separate name resolution from connection establishment. I would compare `/etc/hosts`, `getent`, the configured recursive resolver, record type, and cache TTL. If DNS returns the expected address, I would then investigate connection reuse, TCP reachability, TLS, and the application’s own resolver cache.

### 延伸來源

- [RFC 2308：negative DNS caching](https://www.rfc-editor.org/rfc/rfc2308.html)
- [RFC 7766：DNS over TCP](https://www.rfc-editor.org/rfc/rfc7766)
- [curl：`--resolve` 的測試用途](https://curl.se/docs/manpage.html)
- [dig manual](https://man7.org/linux/man-pages/man1/dig.1.html)

---

## 12 TCP Flow Control 與 Congestion Control

優先級：P0｜約 15–20 分鐘｜目標：能用 sender、receiver、network 三個位置解釋傳輸限制。

### 兩個 window 解決兩種問題

Flow control 防止 sender 壓垮 receiver。Receiver advertised window（rwnd）反映接收端 buffer 還能容納多少資料；receiver application 讀得慢，window 可能縮小，甚至變成 zero window。

Congestion control 防止 sender 壓垮 network。Sender congestion window（cwnd）依 ACK、loss、RTT 等訊號調整。實際允許的 in-flight data 大致受 `min(rwnd, cwnd)` 限制，還會受 socket buffer 和 application pacing 影響。

所以 zero window 優先懷疑 receiver 讀不及或 buffer 太小；retransmission、cwnd 縮小則可能是 network loss/重排，也要保留其他假設。兩者不能用「TCP 很慢」混成一件事。

高 bandwidth 不保證高 throughput。Bandwidth-delay product（BDP）告訴你要有多少資料在途才能填滿 path：100 Mbps × 100 ms 約 1.25 MB。若 socket/window 太小，TCP 還沒填滿管線就要等待 ACK。

### 看什麼

```bash
ss -ti dst 10.0.0.20
sudo tcpdump -ni any host 10.0.0.20 and tcp
nstat -az TcpRetransSegs
```

`ss -ti` 可提供 RTT、cwnd、retransmission、window 等 socket 線索，格式因 kernel 而異。tcpdump 用來確認 sequence、ACK、window、重傳，最好在兩端或靠近兩端的位置比對；單點 capture 不能證明另一端是否收到。

Keepalive 和 flow control 是不同概念：TCP keepalive 探測 idle peer，HTTP keep-alive 重用 connection，都不等於 congestion control。

### 一個數字例子：快的線路為何跑不滿

假設 RTT 100 ms、可用 in-flight window 只有 64 KiB，粗略 window/RTT 上限約 0.625 MiB/s，約 5.24 Mbps。即使線路標示 100 Mbps，sender 也可能因等待 ACK 無法填滿它。這只是穩定情境的估算，真實 throughput 還受 loss、application pacing、TLS/CPU、磁碟供應速度及 protocol overhead 影響。

BDP 是思考需要多少 in-flight data 的工具，不是要求把所有 buffer 無限加大。Buffer 太大可能增加 queueing delay；buffer size 也不能修復 receiver application 根本沒在讀的問題。

### ACK、重傳與順序

TCP ACK 確認的是接收端 TCP stack 收到哪些 bytes，不代表 application 已讀、DB 已 commit 或 payment 成功；經過 terminating proxy 時，ACK 可能只來自 proxy 的 TCP stack。

TCP 透過 sequence/ACK 和重傳提供可靠有序的 byte stream。Loss 可能透過重複 ACK、SACK 或 timeout 等訊號被偵測；看到一次 retransmission 不能直接定位是哪條 link 壞了。原資料、回程 ACK 都可能遺失，重排也可能使 sender 判斷需要重傳。

不同 congestion-control algorithms 對 loss、RTT 或其他訊號的反應不同。面試先說清楚 congestion window 的目的即可，不需要把所有演算法都描述成相同的固定減半規則。

### Zero window 要找「誰宣告」

如果 receiver 回 ACK 且 advertised window 為零，它表示暫時沒有可接收空間。先確認是哪個方向的 receiver：可能是 server 收 request，也可能是 client 收 response，還可能是其中一段 proxy connection。

例如 client 下載檔案卻忙著做同步 CPU 計算，停止讀 socket；client buffer 滿、宣告 zero window，server 便不能繼續正常送資料。此時增加 server replicas 或 network bandwidth 未必有幫助。要檢查 client read behavior、event loop、buffer 和它的下游寫入速度。

### 用觀測選下一步

| 觀測 | 優先假設 | 下一步 |
|---|---|---|
| Receiver window 小／zero，receive queue 高 | Application 消費慢 | Receiver thread/event-loop profile、read rate |
| Retransmissions 上升、RTT 上升 | Loss、congestion、回程問題 | 兩端 capture、NIC drops、path 比較 |
| Windows 足夠但 sender 沒資料送 | Application-limited | 看 upstream I/O、CPU、產生資料速率 |
| 小 request 成功，大 response 卡 | MTU、path loss 或 buffer/app 問題 | 比較 packet size、重傳位置、PMTU 證據 |

`nstat` counter 通常是所在 network namespace 的累積統計，不是單一 connection；要看時間增量。`ss -ti` 的不同欄位有不同單位，例如 cwnd 常以 segments 表示、window 可是 bytes，不能直接拿顯示數字比大小。Packet capture 中 window scaling 也會影響實際 advertised window 的解讀。

### 自測

1. How would you distinguish a receiver that is too slow from network congestion?
2. Why can throughput be low on a high-bandwidth, high-latency path?
3. What does a zero TCP receive window suggest?

### 自測參考答案

1. Receiver 慢優先看 advertised window、receiver queue、application read rate；network congestion 優先看 RTT、loss/retransmission、cwnd 和 path 證據。兩者可同時存在。
2. Window/RTT、慢啟動、loss 或 application 供應不足都會限制 throughput；bandwidth 只是其中一個上限。
3. 接收端暫時無 buffer 空間，不等於連線中斷或 server 已死。要找出哪一端宣告 zero window，並查它為何讀不及。

讀完能做到：不把 slow receiver、slow network、slow sender 混成同一個原因；知道如何用證據區分。

### 英文短答

> I would distinguish receiver flow control from network congestion. A zero advertised window points to the receiver’s buffer or application not consuming data, while retransmissions and congestion-window reduction may indicate loss or congestion. I would inspect both endpoints with `ss -ti` and packet captures, then correlate them with application read behavior and latency.

### 延伸來源

- [RFC 5681：TCP congestion control](https://www.rfc-editor.org/rfc/rfc5681.html)
- [Linux tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html)
- [RFC 9293：TCP、ACK 與 receive window](https://www.rfc-editor.org/rfc/rfc9293)
- [ss manual：TCP internal information](https://man7.org/linux/man-pages/man8/ss.8.html)

---

## 13 Listen Backlog、SYN Queue 與 Accept Queue

優先級：P0｜約 15 分鐘｜目標：分清握手、accept、讀 request 與處理 request 四個階段。

### Listen 不等於能服務

Server 的典型流程是 `socket → bind → listen → accept`。Listening socket 等待新連線；`accept()` 之後才得到 connected socket。Port 在 `LISTEN` 只代表 kernel 有 socket 接受該 port，application 仍可能沒有及時 accept 或處理。

可粗略區分 handshake 尚未完成的 SYN queue，以及 handshake 完成、等待 application accept 的 queue。不同 kernel、設定和 overflow policy 的行為可能不同，不能面試時一律說 backlog 滿就必然 RST；client 可能 timeout、重試或看到 reset，需用 counter/capture 驗證。

```bash
ss -lntp
ss -nt state syn-recv
nstat -az | grep -Ei 'Listen(Overflows|Drops)'
cat /proc/sys/net/core/somaxconn
```

LISTEN socket 的 `Recv-Q` 通常是等待 accept 的連線數，`Send-Q` 是 backlog 上限；ESTABLISHED socket 的 queue 多半以 bytes 解讀，不能混用。`somaxconn` 是 kernel 上限之一，application 傳給 `listen()` 的 backlog、SYN 設定與 proxy 都可能影響結果。

### 情境推理

如果 port LISTEN 但 client timeout，可能是 application event loop 卡住、accept worker 不足、backlog overflow、firewall drop、proxy queue 或 downstream blocking。先用 `ss` 分辨 SYN-RECV 和 established queue，再看 application CPU/thread dump、accept rate、listen counters、proxy metrics 和 packet capture。

這個問題的價值在於：`ss -lntp` 是必要但不充分的健康檢查。要把「有 listener」與「可以及時接收及完成 request」分開。

### 看懂同一個 ss 表格裡的不同 queue

以下為示意輸出，不代表真實機器觀測：

```text
State   Recv-Q Send-Q Local Address:Port Peer Address:Port
LISTEN  120    128    0.0.0.0:8080       0.0.0.0:*
ESTAB   8192   0      10.0.0.5:8080     10.0.0.8:51000
```

第一列表示 listening socket 有約 120 條連線等待 accept，backlog 上限顯示為 128；它不是 120 bytes。第二列是 connected socket，Recv-Q 8192 通常表示有 8192 bytes 尚未被 application 取走。前者問「能不能接新 connection」，後者問「接起來後有沒有繼續讀」。

即使兩個 queue 都很小，application 仍可能把 request 讀入自己管理的 queue，接著等待 DB connection。Kernel queue 小不能證明 request 沒有排隊，只是排隊位置可能移到 userspace/downstream。

### SYN queue 與 accept queue 的限制

`listen(backlog)` 與 `somaxconn` 影響 completed connections 等待 accept 的容量；incomplete handshakes 還涉及 SYN queue 及相關 TCP 設定。SYN cookies 是在適當條件下降低 handshake state 壓力的機制，並不能替 application 提高 accept 或 business processing rate。

Backlog 加大像增加候位座位：可吸收短暫 burst，但若長期 arrival rate 大於 accept/service rate，仍會累積等待。要查 accept 被 lock、CPU callback、worker exhaustion 還是 deploy pause 阻塞。擴 queue 同時可能把快速失敗變成更長 timeout。

### RST：先看它發生在哪個階段

| Packet pattern／時機 | 常見解釋 | 怎麼驗證 |
|---|---|---|
| SYN 後立即 RST,ACK | 目標 port 沒 listener，或設備明確 reject | 查目的 IP/port、listener、firewall 與 capture |
| 已建立連線後 RST | Abortive close、未讀資料下 close 等 socket 行為 | 對照 application/proxy logs、socket lifecycle |
| 閒置很久後送資料收到 RST | Peer/middlebox 已移除 state，連線池還重用 | 比較各層 idle timeout 和首次重用時間 |
| Burst 時新連線失敗 | Queue/資源壓力或網路丟包 | Counter 增量、queue、kernel 設定與雙端 capture |

RST 表示該 TCP connection 被 reset，不能單憑它推論 root cause。Listen overflow 的 reset 行為可受 `tcp_abort_on_overflow` 等設定影響；沒有 packet evidence 就不要宣稱一定是 backlog。正常 FIN close 和 RST abort 對未完成資料的語義也不同。

### 練習案例：部署後「connection refused」增加

先用 capture 判定是 SYN 階段即被拒絕，還是 established connection 被 reset。若是前者，查新 process 是否 bind 成功、port/interface 是否正確、routing 是否送到尚未 ready 的 instance。若 listener 確實存在，要確認是相同 IP、namespace 和時間；localhost 的 listener 不證明 Pod IP 同一 port 有 listener。

接著對照 rollout 時間、service startup 和 traffic routing；若 client 用舊 keep-alive connection，則查 shutdown/drain 和 idle lifecycle。這些調查有不同修復方式，不應全部用「調大 backlog」回應。

### 自測

1. Why can clients time out while `ss` shows the server port in LISTEN?
2. What is the difference between a listening socket and an accepted socket?
3. What evidence would suggest accept backlog pressure?

### 自測參考答案

1. Listen 只表示 socket 存在；handshake、accept、userspace 或 downstream 仍可阻塞，也可能是網路丟包。
2. Listening socket 接受新 connections；accept 返回的是某條連線的 connected socket，之後才在該 FD 收發資料。
3. 同時看到 waiting accept queue 接近上限、ListenOverflows/ListenDrops 增量、accept rate 不足並與失敗時間一致，才形成較好的證據。單一累積 counter 大不夠。

讀完能做到：看懂 LISTEN 與 ESTABLISHED queue 的單位，並按 RST 發生階段提出假設。

### 英文短答

> LISTEN only proves that a socket exists. I would inspect SYN-RECV and accept queues, listen overflow counters, application accept rate, and proxy or firewall behavior. I would also check whether the event loop or worker threads are blocked, because the process can be listening but unable to accept or process connections promptly.

### 延伸來源

- [listen(2)](https://man7.org/linux/man-pages/man2/listen.2.html)
- [ss(8)](https://man7.org/linux/man-pages/man8/ss.8.html)
- [Linux TCP sysctls：overflow 與 SYN queue](https://docs.kernel.org/networking/ip-sysctl.html)
- [RFC 9293：TCP reset](https://www.rfc-editor.org/rfc/rfc9293)

---

## 14 NAT、Conntrack 與 Ephemeral Ports

優先級：P0｜約 15 分鐘｜目標：能定位 process、node 或 shared egress 的連線資源壓力。

### 三種資源不要混在一起

Process FD 是 application 持有的 socket handle；local ephemeral source port 是 outbound connection 可用的來源 port；NAT/firewall conntrack 是中間設備保存 translation 和 flow state 的資源。某一層耗盡，不代表其他兩層也耗盡。

SNAT 常改寫 outbound source address/port，DNAT 常把 destination 導向內部 service。Return traffic 需要透過 connection state 還原回去。許多 Pods 共用 node 或 gateway 的 NAT IP，單一 Pod 看似正常，shared egress port pool 或 conntrack 仍可能同時耗盡。

TCP tuple 不是只有 local port；不同 destination address/port 在某些條件下可重用同一 local port。不要把 ephemeral port range 直接當成「每個 process 固定只能有 N 個 outbound connections」。NAT policy、tuple、reuse、TIME_WAIT 都會改變實際可用量。

TIME_WAIT 是 kernel TCP state；application 已 close 的 FD 不必持續占用，但大量短連線仍會消耗 kernel state/tuple，並可能讓建立新連線更困難。優先考慮 connection reuse、合理 idle timeout 和負載分散，不要先清除 state table。

```bash
ss -s
ss -ant state time-wait
cat /proc/sys/net/ipv4/ip_local_port_range
cat /proc/sys/net/netfilter/nf_conntrack_count
cat /proc/sys/net/netfilter/nf_conntrack_max
```

最後兩個只有使用 Linux netfilter conntrack 且有權限時才存在；cloud managed NAT 應看 provider metrics。`ss -s` 是本機 socket 狀態，不等於 NAT gateway 狀態。

### 情境推理

很多 Pods 同時 outbound connection refused/timeout，每 Pod 只有幾個 open sockets：查 node/gateway 的 SNAT port allocation、conntrack capacity、egress firewall 和 DNS。若只有一個 Pod，查它的 FD、ephemeral ports、retry storm、connection lifecycle。透過不同 destination 的測試可以幫助區分 local port exhaustion 與 per-destination/NAT policy。

### 用一條 connection 看 NAT 的工作

假設 Pod `10.1.2.3:51000` 要連到服務 `203.0.113.20:443`。Egress gateway 可以把 source 改成 `198.51.100.10:62001`，對端回給 public address/port；gateway 依 state 把目的地還原成 Pod 的 address/port。這些 IP 是示意。

多個 Pods 可以共用一個 public IP，因為 gateway 使用 ports 和 flow tuples 區分 connections。但 port allocation/state table 有容量，且可能按 destination 或其他維度分配。這就像多個 application 共用一個 connection pool，只看單一 application 不足以看到總壓力。

Conntrack 不只做 NAT；stateful firewall 也可能追蹤 flow。TCP socket state 與 conntrack state 不是同一張表：application close 之後，中間設備可能還保留 state 等待 timeout。UDP 沒有 TCP 握手，但 conntrack 仍可按 packet flow 與 timer 追蹤它。

### 三層耗盡的不同線索

| 耗盡位置 | 可能線索 | 證據來源 |
|---|---|---|
| Process FD | 新 socket/open 失敗、EMFILE | `/proc/PID/fd`、limits、application syscall error |
| Local ephemeral tuple | Connect/bind allocation failure、特定目的地高 churn | Port range、socket tuples、TIME_WAIT、connect errno |
| Node conntrack | 多種流量／多 Pods 同時受影響、table full/drop | count/max、kernel log、conntrack statistics |
| Managed NAT port pool | 共用出口的 workload 同時失敗 | Provider port-allocation/drop metrics、destination 分布 |

Errno 不是跨所有 OS/配置唯一固定答案；要結合呼叫位置。Cloud NAT 看不到 Linux sysctl 是正常的，要用該產品暴露的指標。

### 排查案例：大量短請求造成出口間歇失敗

先量測 connection creation/close rate，不只看 concurrent connections。每個 request 都新建 TLS connection，加上 retry storm，可能在較低 request throughput 就造成大量 state churn。對照症狀是否集中在某個 destination、NAT IP、node pool 或時間窗。

若改用適量 persistent connections 能降低 churn，這是合理改善；但 pool 仍須有上限、idle validation、timeout 和公平使用策略。保持過多 idle connections 也會占 NAT state，不能「永遠不 close」。

需要 scale egress 時，評估更多 NAT IP／gateway、workload 分散或 private endpoint 的拓撲，而非盲目改 application nofile。調高 conntrack max 也需要 kernel memory 和 hash/table capacity 評估。直接 flush conntrack 會讓既有流量的 state 消失，不應是例行排障第一步。

### Idle timeout mismatch

例如 client pool 保存連線 30 分鐘，而 NAT 在 10 分鐘 idle 後清掉 state。第 15 分鐘重用時就可能失敗；具體是 drop、RST 或建立新 mapping 的行為依設備而異。比較 client/server/proxy/NAT 的 idle policy，比只看 TCP state 更有用。Keepalive 或 pool lifetime 的設定應配合最短有效生命週期，且 timeout 後的 retry 仍要考慮 request 是否已執行。

### 自測

1. Can low per-Pod FD usage coexist with an outbound connection failure?
2. Does TIME_WAIT mean the application still owns the file descriptor?
3. Which shared component can affect many Pods at once?

### 自測參考答案

1. 可以，FD 是 process 範圍，shared node/gateway state 可先耗盡。先找共同出口與受影響範圍。
2. 不代表；FD 可以已經釋放，TIME_WAIT 保留在 kernel。大量 state 仍可能影響 tuple reuse 或 memory。
3. Node conntrack、SNAT gateway/public IP pool、firewall、DNS 或 shared route 都可能。用時間、node/destination 分布和 counters 區分，不單憑「所有 Pods」認定 NAT。

讀完能做到：解釋 outbound tuple 如何被轉換，分清 concurrency、connection churn 與各層 state。

### 英文短答

> I would distinguish process file descriptors, local ephemeral ports, and NAT or conntrack state. Many Pods can fail together if they share a node or egress NAT port pool. I would check local socket summaries and port range, then inspect conntrack or provider NAT metrics. TIME_WAIT releases the application FD but still represents kernel TCP state.

### 延伸來源

- [Linux conntrack sysctls](https://docs.kernel.org/networking/nf_conntrack-sysctl.html)
- [ip_local_port_range](https://docs.kernel.org/networking/ip-sysctl.html)

---

## 15 L2／L3、CIDR、IPv6 與 Network Namespace

優先級：P1｜約 15 分鐘｜目標：追蹤 packet 經過哪個 namespace、下一跳和封裝層。

### Switch、router、gateway

Switch 通常在 L2 根據 MAC table 轉送 Ethernet frames；router 在 L3 根據 routing table 選擇下一跳，常用 longest-prefix match。Default route 只在沒有更精確 match 時使用；/24 會勝過 `0.0.0.0/0`。

VLAN 分割 L2 broadcast domain；跨 VLAN 通常要 routing。`192.168.1.255` 只有在特定 /24 情境才是 broadcast，不可背成所有 subnet 的結尾。Default gateway 也不一定是 `.1`。

同 subnet 送 IP packet 時，host 先用 ARP 找對方 MAC；跨 subnet 時，host 找的是 gateway MAC，IP destination 仍保留最終目的地。IPv6 使用 NDP（ICMPv6），有 neighbor discovery、Router Advertisement 和 SLAAC；IPv6 沒有 IPv4 式 broadcast。

### Namespace、veth、overlay

Network namespace 讓 process 看到自己的 interfaces、routes、iptables 等 network stack。Container 內 `127.0.0.1` 是該 namespace，Pod 內 localhost 不等於 node localhost。veth 是兩端成對的虛擬介面，常把 container namespace 接到 host bridge 或 routed path。

Overlay 封裝原本的 packet，需為外層 headers 保留 MTU；也可能採 routed CNI、eBPF 或其他方案，不能預設 Kubernetes 永遠是 VXLAN overlay。

```bash
ip route
ip route get 10.20.30.40
ip neigh
ip -br link
ip -s link
lsns -t net
```

`ip route get` 顯示 kernel 對指定 destination 的選路；`ip neigh` 看 neighbor cache；`ip -s link` 看 link-level errors/drops；`lsns` 幫你確認 process 所在 namespace。

### 情境推理

同 node Pod 可通，跨 node Pod 不通：先比對跨 node route、CNI/encapsulation、MTU、node firewall、NIC error。若只有 IPv6 path 失敗，分開檢查 AAAA、NDP、RA、IPv6 route；不要被 IPv4 ping 的成功誤導。

### CIDR 與 longest-prefix match 的例子

假設 routing table 有 default route 指向 gateway A、`10.0.0.0/8` 指向 B、`10.20.30.0/24` 指向 C。目的地 `10.20.30.40` 同時符合三條，普通 routing table lookup 選最精確的 /24。若存在 policy routing、VRF 等，還要先知道查哪個 table；「longest prefix」不是忽略所有 routing policy。

CIDR `/24` 表示前 24 bits 是 network prefix；不是「看起來前三段相同所以同網段」的文字規則。IPv4 `/26` 的傳統 subnet 每段 64 個 addresses，broadcast 可能是 .63/.127/.191/.255。常見 /24 不能當作通用預設。

### ARP table 和 switch MAC table 不同

Host neighbor cache 記錄 IP→link-layer address；switch forwarding table 記錄 MAC→port。Host ARP 是為了構造要送出的 frame，switch 用已學到的 MAC forwarding 資訊轉送 frame。

Cross-subnet path 上，每一段 link 的 source/destination MAC 都可改變；IP source/destination 在沒有 NAT 時保持端到端身份。Router 不需要 ARP 全世界的目的 IP，它需要知道下一跳在目前 link 上的 address。

### IPv6 需要新增的觀念

IPv6 neighbor discovery 使用 ICMPv6 Neighbor Solicitation/Advertisement；Router Advertisement 可提供 prefix、default router 等資訊，SLAAC 可依宣告產生 address。DHCPv6 與 RA 是不同機制，不能把 IPv4 的「DHCP 提供全部 network configuration」直接搬過去。

ICMPv6 還參與 Packet Too Big 等運作；把所有 ICMPv6 一律封鎖可能破壞基本連線功能。IPv6 router 不像 IPv4 那樣替 transit packets 做 fragmentation，sender 需依路徑資訊調整。面試掌握依賴即可，不必背所有 ICMPv6 type numbers。

### Pod 到 Pod 的路徑：先確認實作

Pod namespace 經 interface/veth 到 host，再依 CNI 走 bridge、routing 或 encapsulation，跨 node 後才到對方 Pod。部分環境不用 veth/overlay，hostNetwork Pod 也與普通 Pod 不同；先查 topology 再下結論。

若 underlying MTU 是 1500，overlay 還要加 outer headers，inner packet 通常需要更小的可用 MTU；實際扣多少依 IP version、封裝與配置。TCP SYN 小所以可能成功，大封包開始傳才暴露問題。

```bash
ip -6 route
ip -6 neigh
ip rule
ip route get 10.20.30.40
# 在已確認的 node host PID 所在 network namespace 中查看 routes
sudo nsenter -t 1234 -n ip route
```

`nsenter -n` 只切 network namespace，其他 namespace 視圖不一定跟著改。要從相同視角查 address/routes/firewall，才不會拿 node route 誤判 Pod route。

### 故障案例：同 node 正常，跨 node 失敗

先選一組成功及一組失敗的 endpoints，確認測的是 Pod IP 還是 Service IP。比較 node 之間 underlay reachability、Pod route、封裝是否離開來源 node、是否抵達目的 node，以及 MTU/NetworkPolicy。可以先觀察兩端 node 的 captures；如果封裝 packet 到達但 inner packet 不出現，焦點已縮到 decapsulation/CNI/local forwarding，而非 application 本身。

### 自測

1. Which route wins: a default route or a matching /24 route?
2. Why does a container's localhost not mean the host's localhost?
3. Why can an overlay introduce an MTU problem?

### 自測參考答案

1. 在選定 routing table 中，符合的 /24 比 default 更精確，因此優先。
2. 各 network namespace 有自己的 loopback；普通 Pod 與 node 是不同網路視圖，hostNetwork 是例外。
3. Outer encapsulation 增加 packet size；若 inner MTU 或 PMTU handling 沒配合，可能 drop 或無法傳送大封包。

讀完能做到：說清楚 IP 與 MAC 的角色，知道在哪個 namespace 查 route，並把 overlay overhead 和 MTU 連起來。

### 英文短答

> A more specific route, such as a matching /24, wins over the default route. A network namespace has its own interfaces and routing table, so container localhost is not node localhost. For a cross-node failure I would compare routes, CNI encapsulation, MTU, firewall rules, and link counters.

### 延伸來源

- [Linux network namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html)
- [RFC 4861：IPv6 Neighbor Discovery](https://www.rfc-editor.org/rfc/rfc4861.html)

---

## 16 TLS、PKI、HTTP/1.1、HTTP/2 與 QUIC

優先級：P1｜約 15–20 分鐘｜目標：按 DNS→TCP→TLS→HTTP 找出失敗階段，理解每層保證。

### TLS 在驗證什麼

TLS 提供加密、server authentication，以及在 mTLS 中額外的 client authentication。Certificate 的 SAN 要匹配 hostname，chain 要連到 trusted CA，還要檢查有效時間；system clock 錯也會造成 validity failure。Certificate 通過不代表 application authorization 已授權。

SNI 在 TLS handshake 告訴 server client 要的 hostname，讓同一 IP 可選不同 certificate；HTTP Host header 是 application protocol 的欄位，出現得更晚。用 IP 存取 HTTPS 時可能沒有正確 SNI/hostname，因此 certificate mismatch 或 server 選錯 virtual host。

```bash
curl -v --trace-time https://example.com/
openssl s_client -connect example.com:443 -servername example.com \
  -verify_return_error -verify_hostname example.com
```

`curl -v` 可看 DNS、TCP、TLS、HTTP phase；`--trace-time` 讓 trace 有時間資訊。`openssl s_client` 要指定 SNI/verify hostname，否則「握手成功」不一定等於 application/client 的完整驗證成功。

### TCP、HTTP/1.1、HTTP/2、QUIC

TCP 是 ordered byte stream；一次 `read()` 不對應一次 HTTP request 或完整 message，application 要自己處理 framing。HTTP/1.1 可用 Content-Length 或 chunked encoding。

HTTP/2 用多 streams multiplex 在同一 TCP connection，但 TCP loss 仍會阻擋後續 byte stream 的交付。HTTP/3 建在 QUIC/UDP 上，每個 stream 有自己的 ordering，降低 streams 互相 head-of-line blocking 的影響。UDP 本身不提供可靠有序交付；QUIC 在它上面實作可靠 streams、ACK、遺失恢復和 congestion control。

TCP connect success 只證明握手完成，不能保證之後的大 response 沒有 MTU、loss、proxy 或 application 問題。TLS handshake success 也只代表 TLS 階段，後續 HTTP 仍可能 timeout。

### Certificate chain 和 trust store

Server 常提供 leaf certificate 加上 intermediate certificates，client 使用本地 trusted root 驗證 chain。瀏覽器能連、某台 service 不能連，可能是 trust store 不同、缺 intermediate 或 hostname 驗證差异，不一定是 network firewall。

TLS peer 可以是 ingress/reverse proxy；若在 proxy 終止 TLS，proxy→backend 是另一段 connection，可能另做 TLS 或明文。Client 的握手成功只證明到 termination point 的這一段，不證明 backend pod 已收到 HTTP request。

SNI 選擇 virtual host/certificate，ALPN 協商 application protocol，例如 HTTP/2；HTTP Host 或 HTTP/2 `:authority` 再参与 request routing。若手動改 Host header 卻用錯 TLS hostname，TLS 階段可能先失敗，還沒機會看到 HTTP header。

### 用 curl 量時間：verbose 與統計不同

Verbose/trace 適合看事件、certificate error 和 headers。要穩定取得各階段累積耗時，可用 `--write-out`：

```bash
curl -sS -o /dev/null \
  -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total}\n' \
  https://example.com/
```

在單次新建直連 HTTPS connection、無 redirect 的簡化情境：TCP 階段約為 connect−dns，TLS 約為 tls−connect，等待首 byte 約為 ttfb−tls，response transfer 約為 total−ttfb。最後兩段仍含網路與 request upload 等成本，不能直接命名為「純 server CPU 時間」。Proxy、redirect、connection reuse、不同 HTTP versions 都會改變解讀。

### 逐層排查範例

TCP connect 快但 TLS handshake 卡住：查 client/server capture 是否開始交換 TLS messages、是否卡在大 certificate flight，對照 MTU/loss、server TLS CPU、版本/協定相容性。握手失敗常有明確 alert，但也可能 timeout，不能說 TLS 問題必然立即返回錯誤。

TLS 很快但 TTFB 高：從 termination proxy access log/request id 追到 backend，再拆排隊、application logic、DB/downstream。已知 request id 的端到端時間比只看主機 CPU 更有辨識力。

TLS verification failure：查 validity、SAN、chain/trust、system clock、mTLS client certificate。`curl -k` 是停掉重要驗證，不應當作真正修復；若在受控測試用它驗證假設，仍要回到正確 trust configuration。

### HTTP/2 與 HTTP/3 的取捨

多 streams 不代表無限 application concurrency，server limits、flow control 和 downstream pool 都會限制。HTTP/2 遇到 TCP 層一段 bytes 遺失，後面的資料即使屬於別的 stream，通常也要等待缺口補齊才交付。

QUIC streams 可獨立有序交付，但仍共享 connection/network 的資源和 congestion control，也可能有 application dependency。它降低一種跨 stream blocking，並不保證任何 packet loss 都不影響其他 requests。若環境封鎖 UDP，HTTP/3 使用或 fallback 也要實際測試。

### 自測

1. Why can HTTPS by IP fail while HTTPS by hostname succeeds?
2. Does one TCP read equal one HTTP request?
3. What does HTTP/3 improve compared with HTTP/2 over TCP?

### 自測參考答案

1. Certificate 通常對 hostname，而非任意 IP；SNI 也可能選錯 virtual host。用 `--resolve` 可在保留 hostname 的情況下指定測試 IP。
2. 不等於；TCP 可拆分或合併 delivery，application 要處理 framing、partial read 和 EOF。
3. QUIC 不用一條 TCP ordered byte stream 承載全部 streams，減少其中一條 stream loss 阻塞其他 stream 的交付；仍有 congestion、flow control 與各 stream 內 ordering。

讀完能做到：把 certificate、transport 與 application 三種 failure 分開，並正確解讀 curl 的累積時間。

### 英文短答

> I would separate TCP connection, TLS authentication, and HTTP processing. HTTPS by IP can fail because SNI and certificate hostname validation do not match. TCP is a byte stream, so one read does not equal one HTTP message. HTTP/3 uses QUIC so loss on one stream does not block delivery on every other stream in the same way as TCP.

### 延伸來源

- [RFC 8446：TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446.html)
- [curl verbose/trace options](https://curl.se/docs/manpage.html)
- [RFC 9000：QUIC streams 與 transport](https://www.rfc-editor.org/rfc/rfc9000)

---

## 17 VM、Container 與隔離邊界

優先級：P0｜約 15 分鐘｜目標：能選擇觀測層次，說清楚隔離、資源控制及故障範圍。

### VM 與一般 container

VM 由 hypervisor 提供虛擬硬體，guest 跑自己的 kernel；normal Linux container 是 host kernel 上的一組 processes，靠 namespaces 隔離視圖，靠 cgroups 管理 resource distribution。Container image 帶 userspace libraries，不代表帶自己的 kernel。

因此 VM 通常提供較強 kernel failure/isolation boundary；container 啟動較快、密度較高，但 kernel、device、side-channel、runtime 或 configuration 的共享邊界仍要處理。Namespaces/cgroups 不是完整 security boundary；capabilities、seccomp、LSM、root policy、kernel patch 同樣重要。

### 資源與 noisy neighbor

CPU quota 只能描述 CPU time；container 仍可能競爭 memory bandwidth、page cache、disk queue、NIC queue、host kernel、node-level conntrack。CPU 使用率正常，不代表 I/O 或 memory pressure 正常。

Cgroup memory 也要注意 limit/accounting 及 ancestor；`kubectl top`、process RSS、cgroup memory.current 不是同一測量。Host kernel OOM、cgroup OOM、Kubelet eviction 是不同層次事件。

### 排查範圍

```bash
cat /proc/1/cgroup
lsns -p 1
cat /proc/meminfo
cat /proc/pressure/{cpu,memory,io}
kubectl describe pod POD_NAME
```

容器內 PID 1 和 node host PID 可能不同；要確定你查的是 container namespace 還是 host namespace。Guest 看得到的 kernel log 也不一定包含 host hardware error；需要 node/OOB telemetry。

硬體 failure domain 要從 disk、host、rack、power、switch、zone 分層。把多個 replicas 放在同一台 host，application-level redundancy 仍可能一起消失。

### 把隔離拆成四個問題

| 問題 | 常见機制 | 不應混淆的地方 |
|---|---|---|
| Process 看得到什麼？ | PID、mount、network、user namespaces | 看不到不代表底層資源不共享 |
| 可以使用多少資源？ | Cgroups、rlimits | Limit 不代表專用硬體或預留所有資源 |
| 可以做哪些操作？ | Capabilities、seccomp、LSM、filesystem permissions | Namespace 本身不是完整 authorization policy |
| Kernel 壞了影響誰？ | VM guest kernel／hypervisor 邊界 | 普通 container 共用 kernel，failure domain 較大 |

Capabilities 把部分 root 權力拆成較細的能力；seccomp 限制可用 syscalls；SELinux/AppArmor 等 LSM 提供額外存取政策。面試先會說它們各管哪一層即可，不必先背所有 capability 名稱。

Container 裡的 root 是否映射成 host root，取決於 user namespace、rootless 等配置；privileged container 的權限又更廣。不能只因為程式「在 container」就認定逃逸風險和 host resource access 都已解決。

### CPU limit 不等於專屬 CPU

假設兩個 containers 共用同一組 cores，各設 CPU limit。Limit 限制用量，但沒有自動把某顆 core 獨占分配给其中一個。排程、memory bandwidth、cache、I/O 和 kernel work 仍會互相影響。

Resource request 常參與 Kubernetes 排程與資源分配政策；limit 用於 runtime enforcement，但 CPU 與 memory 的 enforcement 行為不同。不要把 request 當成每一瞬間的 CPU 保證，也不要把 memory limit 當成固定預先配置好的 RAM。

### 案例：一個 Pod 慢，該登入哪裡查

先看只有單 Pod 慢，還是同 node 的多個 Pods 一起慢。前者先比較該 container 的 cgroup、thread/profile、dependency；後者值得查 node PSI、disk/NIC、conntrack、host kernel logs。若整個 VM guest 都慢，而 host accessible metrics 顯示 contention，再往 hypervisor/host 層查。

即使在 container 執行 `free` 或讀 `/proc/meminfo`，也不能不加核對就認定輸出是該 container 的 limit；不同 runtime/proc 視圖可能不同。定位 `/proc/PID/cgroup` 後查該 controller，才對應到實際 enforcement scope。

### VM 與 container 怎麼選

若要執行不可信租戶程式，可考慮 VM/microVM、sandbox runtime 和更細權限邊界，而非只使用普通 container 加 memory limit。代價可能是啟動時間、資源成本、image 管理與觀測复杂度。對可信、同組織 workloads，containers 常有部署與密度優勢，但仍要最小權限和隔離策略。

這不是「VM 絕對安全，container 一定不安全」的二分法。真正要比較 threat model、共享元件、blast radius 和運維能力。三個 replicas 分散到不同 Pods 但同一 host，仍無法容忍 host 故障；須把 placement 對應到想承受的 failure domain。

### 自測

1. What does a normal container share with the host that a VM normally does not?
2. Why can a container with a CPU limit still suffer from host I/O contention?
3. Why might a guest not see a host hardware failure in its own kernel logs?

### 自測參考答案

1. 普通 Linux container 共用 host kernel；VM 通常跑自己的 guest kernel。Container 也常共享實體 disk、NIC 和 memory bandwidth。
2. CPU time quota 沒有隔離 disk queue、storage bandwidth 或 host memory pressure。查相同 node 的其他 workloads 與 host counters。
3. Guest 看到的是虛擬硬體與 guest kernel 事件；實體硬體/firmware 訊號可能只出現在 hypervisor、host 或 out-of-band 系統。

讀完能做到：明確指出「哪個隔離機制處理哪種問題」，並根據影響範圍選 container、node 或 host 觀測。

### 英文短答

> A normal container shares the host kernel, while a VM normally has its own guest kernel behind a hypervisor boundary. Namespaces isolate views and cgroups control resources, but they are not a complete security boundary. I would distinguish container symptoms from node-level CPU, memory, I/O, network, and hardware contention.

### 延伸來源

- [Linux namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html)
- [Kubernetes resource management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Linux capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html)

---

## 18 硬體故障：ECC、Thermal、NIC 與 Out-of-band

優先級：P1｜約 15 分鐘｜目標：能把 hardware signal 與 service symptom 對齊，判斷隔離與替換範圍。

### 需要能辨認的症狀

ECC memory 可偵測或修正其支援類型的 memory error。Corrected error 不代表當下 crash，但持續增加的 counter 是預警；uncorrected error 可能導致資料錯誤、machine check 或重啟，需按平台 runbook 處理。

Thermal/power throttling 會降低 clock 或 performance；程式沒有改、CPU utilisation 也不高，latency 仍可能上升。NIC 問題可能是 link flap、CRC、driver、firmware、queue overflow 或 physical switch port。packet loss 不一定從 application log 看得出來。

BMC/out-of-band management 可在 OS 無法 SSH 時提供 power control、sensor、console 或硬體事件，但能力依平台而異。Firmware/driver regression 也可能同時影響多台相似節點。

### 工具與邊界

```bash
journalctl -k -b
ip -s link show dev eth0
ethtool eth0
ethtool -S eth0
```

Network counters 要看增量與時間；某些 driver counter 名稱和意義不同。`journalctl -k` 是 kernel log，不一定包含 BMC-only event；vendor health tool、sensor 和 fleet inventory 需要合併。

若 application restart 後問題很快重現，可能是 machine-level fault、NIC、disk、temperature 或 shared dependency。先比較同 node/同 firmware/同 rack 的 failure distribution，再決定 drain、quarantine、replace 或 rollback。

### Hardware、OS、application 是一條證據鏈

API latency 是最上層症狀；下面可能是 disk retry、NIC packet loss、memory error handling，或 thermal throttling。單看 request log 常只能看到「downstream 等很久」，需要把事件時間對齊到 node、device、firmware version 和 rack。

| 線索 | 可能問題 | 下一個驗證方向 |
|---|---|---|
| Corrected memory errors 在同一位置反覆增加 | DIMM、channel 或相關硬體問題 | 位置/頻率/趨勢、平台 RAS log、vendor policy |
| 磁碟 timeout、reset、media errors | Device、controller、cable 或 firmware | Kernel log、device health、RAID member 狀態 |
| NIC CRC errors、link flap | Cable、optic、switch port、NIC | Link 兩端 counters、port event、換件驗證 |
| NIC drops 但無 CRC | Queue、driver、CPU 收包能力 | Packet rate、softirq、ring/queue、host load |
| 相同工作量下頻率下降 | Thermal/power limit | 溫度、power telemetry、frequency 與同型機比較 |

Counter 名稱不是跨廠商通用因果證明；例如 `rx_dropped` 可能涵蓋多種原因。要查 driver/vendor 定義並觀察增量，不能把每個 drop 都叫作壞網線。

### ECC 該理解到哪裡

ECC 的可修正範圍依編碼和平台而異。Corrected error 表示硬體/系統成功處理了該事件，不代表模組永久健康；uncorrected 也不必然以相同方式導致整機 crash，取決於資料位置和系統 recovery 能力。

面試不需要猜 DIMM 必須在多少次 corrected errors 後更換。你可以說會按 vendor/runbook threshold、頻率與重複位置，配合 service impact 決定 proactive replacement，並確認重新上線後 error trend 是否消失。

### 案例：一個 node 的 Pods 不斷重啟

先分清 application restart、container OOM、kubelet eviction 和整台 host reboot。若 node boot id/uptime 改變，問題已超出普通 application crash。檢查前次 boot 的 kernel/journal（若保留）、OOB event、power/thermal、firmware 和同 rack 其他主機。

若 replicas 已分散且有容量，可按 runbook drain/quarantine 該 node，先恢復穩定服務再維修。Drain 前仍需考慮 local data、stateful workloads 和可用副本；把所有相似 nodes 同時隔離也可能造成容量事故。

### Out-of-band 的價值與邊界

OOB management 不依賴 host OS 正常提供 SSH，因此能看 console、電源狀態或硬體 sensor。它本身也有網路、權限和可用性依賴，並不是任何故障下都可用。Apple Silicon/特定 fleet 平台可能有不同機制，不能假設都提供同一 BMC/IPMI 指令。

如果同 firmware version 的不同 racks 都開始出錯，值得懷疑共同 firmware regression；如果同 rack 不同版本都斷線，更值得查 shared power/switch。用分組比較縮小 failure domain，比逐台盲目 reboot 有資訊價值。

### 自測

1. Why can a corrected ECC error still matter operationally?
2. Why might restarting an application fail to fix repeated latency spikes?
3. What can out-of-band management provide when the OS is unreachable?

### 自測參考答案

1. 雖然事件被修正，重複位置和增加頻率可能預示硬體健康惡化。需要趨勢與平台判準。
2. Root cause 可能在 disk、NIC、power、thermal、firmware 或 host-level contention；重啟 application 不會移除它。
3. 視平台提供 power、console、sensors 和 hardware logs，可辨認卡在 boot 前或 OS 後；仍需確認 OOB 自身可達性。

讀完能做到：提出一條從 user impact 到 host/device evidence 的排查路徑，不必背 sensor/counter 全表。

### 英文短答

> I would correlate application symptoms with kernel, NIC, thermal, firmware, and out-of-band signals. A corrected ECC error may be an early hardware-health trend. If restarting the application does not change the pattern, I would compare the node with peers and consider draining or quarantining the machine while collecting evidence.

### 延伸來源

- [Linux EDAC documentation](https://docs.kernel.org/driver-api/edac.html)
- [ethtool manual](https://man7.org/linux/man-pages/man8/ethtool.8.html)

---

## 19 Secure Boot、TPM、Measured Boot 與 Attestation

優先級：R｜約 15 分鐘｜目標：能講清楚信任鏈、證據與 verifier policy；不背特定廠牌 API。

### 四個詞的差別

Secure Boot 問「這個 boot component 是否符合信任政策，允不允許載入？」Measured Boot 問「實際載入了哪些 component/configuration，能否留下量測結果？」TPM 是協助保護 keys、保存量測等信任功能的 hardware/firmware root；remote attestation 是把 machine state 的證據給遠端 verifier，由政策判定是否信任。

簽章驗證與 attestation 不同：簽章可證明 image 被可信 key 簽過；attestation 更關心實際啟動鏈與目前測得的狀態。兩者都不代表 software 永遠沒有 vulnerability。

### 面試回答角度

若題目說「不能任意 SSH 到 compute node」，不要自動回答只能放棄 troubleshooting。先想允許的 structured telemetry、版本/硬體 fleet comparison、synthetic checks、health conditions、隔離與安全替換流程。這裡應說公開原則與工程推論，不宣稱知道內部實作。

### 用「誰做判斷」區分四個詞

| 概念 | 核心動作 | 不能單獨證明的事 |
|---|---|---|
| Secure Boot | 開機鏈按信任政策驗證下一個元件 | 被簽章的程式沒有漏洞 |
| Measured Boot | 對實際 component/configuration 做量測記錄 | 量測到的版本符合你的最新政策 |
| TPM | 提供受保護的 keys、measurement 等功能 | 整個 runtime 永遠未被入侵 |
| Remote attestation | 遠端驗證證據及其與政策的相容性 | 所有未被量測的性質都安全 |

Measurement 常以 hash 表達，TPM 類系統可把事件量測延伸進 PCR registers。PCR 不是簡單保存可任意覆寫的完整軟體清單；verifier 通常還需要相應 event log 和對測量流程的信任，才能解釋證據。這些是通用 TPM 概念，不是在宣稱 Apple PCC 使用 PC TPM 的同一套 implementation。

### Attestation 的一次往返

假設 verifier 想把敏感任務派給一台機器。它先給一個 freshness challenge（例如 nonce）；機器使用受保護的 attestation key 對包含相關量測與 challenge 的證據簽章；verifier 驗證 key 的信任關係、簽章、freshness 和允許的 software/configuration policy，再決定是否派工作或釋出資源。

Nonce 的作用是避免單純重播以前健康時收集的 evidence。Key identity、證據與實際服務端點/工作負載之間的 binding 也重要；否則不能只因拿到「某台健康機器的證明」就信任任意 endpoint。

這不是每套產品的固定 message format。你需要理解的是：measurement 產生證據，verification 根據 policy 做判斷，且要處理 freshness 和身份綁定。

### Update、rollback 和信任政策

新 image 即使正確簽章，如果 verifier 尚未允許其 measurement/version，也可能被拒絕。反過來，舊 image 雖然仍有有效簽章，可能已有漏洞而不應再被接受。Signature validity、允許版本清單與 rollback protection 是不同問題。

因此大規模安全更新需協調 image rollout 和 verifier policy rollout，先 canary 驗證。若先全面收緊 policy，可能把還沒更新的健康舊 nodes 全部擋住；若 policy 永遠接受所有舊版本，又會削弱更新效果。

### 和 Apple PCC 有什麼關係

Apple 公開的 PCC 設計重視敏感資料的短暫處理、可驗證的 software 與受限制的維運存取。這能支持一個準備方向：SRE 不能假設任意登入、讀取 userspace memory 或保存 request content 都是可用除錯方式。

以下是工程推論，而非 Apple 內部流程：可以設計不包含敏感內容的 health/latency/error telemetry、版本與 cohort 比較、synthetic tests、隔離及重新佈署流程。先問「允許觀測到哪裡」，再挑符合 privacy boundary 的工具。

### 案例：更新後 nodes 被 verifier 拒絕

先看拒絕原因是無法取得 evidence、簽章/key validation、challenge freshness，還是 measurement 不在 policy 中。比對 image/firmware/configuration 與允許版本，確認 rollout 是否不同步。不要用永久關掉驗證當修復；若需要 rollback，也要確認回退版本符合目前安全政策。

### 自測

1. What does signature verification prove, and what does attestation add?
2. Does Secure Boot prove the running service has no vulnerability?
3. How could an SRE operate a restricted host safely?

### 自測參考答案

1. Signature 驗證可信 key 簽署內容的關係；attestation 提供有關實際量測狀態的證據，需搭配 freshness、identity 與 policy。
2. 不會；合法簽署版本仍可能有漏洞，runtime 的保證也有範圍限制。
3. 使用允許的 telemetry、synthetic tests、cohort comparison 和安全替換；先確認 observability/privacy 規則，再設計排查方式。

讀完能做到：介紹四個術語的差異，解釋 replay 與 policy rollout 的風險，知道這與 restricted operations 的關聯。

### 英文短答

> Signature verification checks whether an image is signed by a trusted key. Measured boot records what actually booted, and remote attestation lets a verifier evaluate that evidence against policy. Secure Boot does not prove that the software is vulnerability-free. For a restricted host, I would use approved telemetry, fleet comparisons, and controlled replacement workflows.

### 延伸來源

- [Red Hat：TPM and measured boot](https://next.redhat.com/2021/05/13/what-can-you-do-with-a-tpm/)
- [Apple Private Cloud Compute security](https://security.apple.com/blog/private-cloud-compute/)

---

## 20 Fleet Provisioning、Configuration Management 與 Drift

優先級：R（JD 背景）｜約 20 分鐘｜目標：說清楚如何把單機操作變成可恢復、可控制風險的 fleet workflow。

### Bare-metal provisioning 的生命週期

Discovery/inventory → 選 image 與 hardware profile → network boot 或 out-of-band 操作 → 安裝 OS/config → 驗證硬體、network、storage → 加入 service pool → 維護、drain、repair、retire 與資料清除。每個階段都要記錄 desired state、actual state、operation id 和失敗原因。

Ironic、Metal3、MAAS、Tinkerbell、xCAT 是不同 provisioning/management 生態；NetBox 比較像 inventory/IPAM，不能把它當成 OS installer。Ansible、Puppet、Chef 都能協助 configuration management，但面試主要懂 desired state、idempotency、drift 和 rollout discipline。

### Timeout 後能不能 retry

不能只看 command timeout。外部 API 可能已成功但 response 遺失；image install 也可能已寫入部分 disk。先查 actual state、provisioning controller、host console、inventory/status API，再決定 retry。Retry 必須有 idempotency 或可恢復 checkpoint；destructive operation 應保守。

大規模變更用 canary、分 rack/zone 批次、stop criteria、quarantine 和 rollback/recovery path。把所有 host 一次改完，會讓共同錯誤變成 fleet outage。

### Desired state、actual state 與 drift

假設期望所有 worker 使用 image v2、設定檔版本 c8，並開啟時間同步。某台機器仍是 v1，或有人臨時登入修改設定，這些 actual state 與管理系統宣告的 desired state 差異就是 configuration drift。

偵測 drift 可以比較 image digest、套件版本、設定檔 checksum 與必要的服務狀態。Checksum 相同只能證明檔案內容相同，不能證明程式已 reload 或實際行為正確。收斂後還要檢查 runtime state 與 health。

不是所有差異都要立刻強制覆蓋。例如 incident 中暫時降低 concurrency，configuration agent 若立刻改回去，可能再次引發故障。應有具時限、可追蹤的 exception，之後將有效修正納入 source of truth，或撤回臨時修改。只在主機上手動改好，下一次重建可能又出問題。

| 系統角色 | 回答的問題 | 常見例子 |
|---|---|---|
| Inventory / IPAM | 這台機器在哪、有哪些介面與 IP？ | NetBox |
| Provisioning | 怎麼將機器變成可使用的 compute？ | Ironic 等 provisioning 系統 |
| Configuration management | OS 上應有哪些設定與服務？ | Ansible、Puppet、Chef |
| Monitoring | 現在健康嗎？變更後是否退化？ | metrics、logs、health checks |

角色可以整合，但 inventory 顯示「已分配」不等於 OS 安裝成功，也不等於 application ready。

### 具體案例：重灌 API timeout

你送出操作 op-123，要把 host-7 安裝成 image v2；30 秒後 client timeout。可能是 request 沒送到、controller 正在工作、工作完成但 response 遺失，或 disk 已寫入一部分後失敗。

合理處理順序：

1. 以 host identity 和 operation id 查 controller 狀態，確認是否已有工作執行中。
2. 交叉檢查 host console、開機狀態、image identity 與安裝紀錄。不能只因為 SSH 不通就認定安裝失敗。
3. 若正在進行，繼續觀察並設 deadline；若已成功，驗證後完成工作；若部分失敗，走明確 recovery 流程。
4. 若需要 retry，重用支援的 idempotency token，或先判斷該狀態允許的轉移。避免同時有兩個 worker 重灌同一台主機。

「重複執行後結果一樣」仍不足以保證操作安全：重灌兩次最後都是 v2，卻可能把第一次安裝後新增的資料消掉。Idempotency 必須包含資源身分、操作意圖與允許的生命週期狀態。持久化 checkpoint 可以協助恢復，但 controller 仍需重新確認外部狀態；本地記錄和外部 API 通常不是同一個 transaction。

### 具體案例：1,000 台 firmware rollout

先挑少量、有代表性的硬體型號做 canary，涵蓋不同 NIC、disk 或 motherboard revision。觀察 boot success、硬體錯誤、network throughput 和 workload latency；不能只看 firmware 指令 exit code。

接著分批擴大，同時限制每個 rack／zone 被移除的容量。若同一服務的 quorum replicas 都在同一批，總體只動 1% 主機也可能造成 outage。Batch 邊界要考慮服務與故障域，而非只有數量。

事前定義停止條件，例如新版本出現可重現 boot failure，或健康指標超出事先約定範圍。失敗主機先 quarantine，保留 console、版本和錯誤證據；不要無限重試造成 reboot storm。Firmware 不一定支援 downgrade，所以 recovery 可能是替換硬體、重刷或人工處理，而不是保證一鍵 rollback。

### 排查時應收集的資訊

每台主機記錄 stable identity、hardware profile、目標及實際 image/config 版本、操作階段、最近進度時間與 retry 次數。觀察每階段成功率及耗時，能區分「所有主機下載 image 很慢」和「單一硬體型號 boot 失敗」。

在可以登入的 Linux 主機上，`journalctl -b` 看本次開機事件，`systemctl --failed` 看失敗 unit，`ip -br addr` 看介面與位址，`lsblk -f` 看 block device 與 filesystem。這些是佐證，沒有單一指令能宣告整個 provisioning workflow 成功。失聯主機則需要 controller 記錄、console 或可用的 out-of-band 管道。

### 自測

1. What should you do after an image-install command times out?
2. What is configuration drift?
3. How would you limit blast radius during a firmware rollout?

### 自測參考答案

1. Timeout 代表結果未確認。先用 operation id 和 host identity 查進度及 actual state，再決定等待、完成或 recovery；不可直接再送 destructive install。
2. Drift 是實際設定偏離宣告的期望狀態，例如 image 舊版或手動修改未納管。要偵測、確認原因並安全收斂，也要處理有時限的 incident exception。
3. 使用代表性 canary、分故障域的批次、容量與 quorum 檢查、明確停止條件及 quarantine。先確認 firmware 的可恢復方式，不假設 downgrade 永遠可行。

### 英文短答

> A timeout does not prove that the operation failed. I would inspect actual host state and controller status before retrying, especially for destructive operations. For a fleet rollout I would use canaries, small failure domains, explicit stop criteria, quarantine, and a recovery path.

### 延伸來源

- [OpenStack Ironic Bare Metal Service](https://docs.openstack.org/ironic/latest/user/)
- [NetBox documentation](https://docs.netbox.dev/)
- [Ironic：Provisioning states](https://docs.openstack.org/ironic/latest/user/states.html)

---

## 21 Kubernetes Controller、CRD 與 Operator

優先級：P1｜約 20 分鐘｜目標：理解 reconcile、重試與外部資源清理，能排查 controller 卡住的情境。

### 模式

CRD 擴充 Kubernetes API type；custom resource 是它的 instance；controller 觀察 desired state 與 actual state，反覆 reconcile；operator 是把 domain-specific 維運知識封裝在此模式裡。

例如 Machine 的 `spec.image=v2`，但 `status.currentImage=v1`。Controller 會執行 update、等待 rollout、驗證 health，並更新 status/conditions。Controller crash 不應破壞核心正確性：重啟後從 API 重新讀取狀態，繼續 reconcile。

### 必須有的性質

Reconcile 可能重複、順序不同或在外部 API timeout 後重試，所以操作要 idempotent。收到 timeout 不等於 external operation 沒成功，先 observe actual state。Finalizer 可以在 delete 前清理外部資源，但清理永遠失敗會讓資源卡 terminating。

Spec 應表達使用者意圖，status 應報告觀測結果與 conditions。Event 是 debugging 輔助，不應是唯一 source of truth。Readiness 決定是否接 traffic；liveness 決定是否需要 restart；startup probe 處理慢啟動，不能把短暫 downstream outage 都變成 restart loop。

### Controller 不是把每個 event 當成一次工作

Event 通常是在提醒 controller「某個資源可能需要重新檢查」。Controller 要讀取目前狀態，再決定下一步，而不是假設每個 event 都會完整、只送一次、依照業務順序抵達。這叫 level-based reconciliation：關心現在與目標差在哪裡。

例如使用者很快把 replicas 從 2 改成 3，再改成 5。Controller 可以直接朝目前的 5 收斂，不必一定先完成 3。若你需要每個業務操作都執行一次，應另外設計 durable operation record，不能把 watch event 當成可靠業務佇列。

CRD 本身只讓 API server 接受和保存新種類的資源，並不會自動建立 VM 或安裝 OS。必須有實作相應行為的 controller。

### Spec 與 status：怎麼避免誤讀 Ready

以下是自訂 API 的示意片段，並非 Kubernetes 內建 Machine schema：

```yaml
metadata:
  generation: 7
spec:
  image: v2
status:
  currentImage: v1
  conditions:
    - type: Ready
      status: "True"
      observedGeneration: 6
      reason: PreviousImageHealthy
```

這裡 Ready=True 描述的是舊版本觀察結果，不能宣告第 7 版需求已完成。採用此慣例的 controller 會在 condition 提供 observedGeneration，讓使用者判斷 status 是否已反映目前 spec。這需要 controller 正確實作，API server 不會替所有自訂資源自動保證語義。

有用的 status 還包括 external resource id、目前階段和可理解的 reason。避免只存「failed」而沒有原因，也不要把密碼或憑證寫入 status/events。

### 外部 API 成功，但 controller crash 了

假設 reconcile 呼叫 cloud API 建立一台 VM，VM 已建立，controller 卻在寫回 external id 前 crash。重啟後若只看到 status 沒有 id 就再 create，會建立重複 VM。

常見設計是使用穩定的 operation key／provider idempotency token，並以可靠的 ownership identity 查詢已建立資源。Kubernetes resource UID 比單靠名稱更適合區分「同名刪除重建」的不同物件。查詢 tag 可以協助尋找，但要考慮 provider 的一致性與唯一性，不能把一次查無結果當作絕對不存在。

Reconcile 的一次執行應有 timeout。暫時性錯誤用 bounded backoff，等待長操作則記錄狀態並 requeue，避免永遠佔住 worker。若權限或 spec 無效，condition 應說明原因；高頻 retry 無法修復錯誤設定。

### Finalizer 為什麼讓刪除卡住

需要先清理外部資源的 controller，可以使用 finalizer。收到 deletionTimestamp 後，controller 執行 cleanup，確認符合刪除策略，再移除自己的 finalizer。

例如自訂資源代表一台 VM：API 物件刪掉不代表 cloud VM 自動消失。反過來，VM 已刪但 response 遺失時，cleanup 也要能接受「已不存在」的結果。

卡住時檢查 controller 是否運作、RBAC／cloud permissions、external API 錯誤、資源依賴，以及 finalizer 對應的 controller。直接手動移除 finalizer 可能留下 VM、disk 或其他資源；需先確認實際清理狀態和後續接管方式。

### Probe 與排查案例

若 database 短暫變慢，所有 Pod 的 liveness 都依賴 database，可能一起被重啟，增加 reconnect 和 cache warm-up 壓力。Liveness 應辨識需要 restart 才能恢復的故障；readiness 表示目前能否承接流量；startup probe 則避免慢啟動過程被過早判死。

Readiness 失敗通常讓 Pod 不再作為一般 Service 的 ready backend，但 endpoint 更新與 proxy 傳播需要時間，也不會自動取消所有既有連線。它不是瞬間斷流開關。

```bash
kubectl get deployment app -o yaml
kubectl describe pod app-xxxxx
kubectl logs deployment/my-controller --since=10m
kubectl get events --sort-by=.metadata.creationTimestamp
```

名稱與 namespace 必須換成實際值。讀 status/conditions 看 controller 觀察到什麼，讀 logs 找同一 resource UID 的 reconcile 錯誤，events 輔助建立時間線。再對照外部資源狀態；events 有保留期限，也不是完整 audit log。

### 自測

1. How does a controller recover after crashing halfway through reconciliation?
2. Why must reconcile operations be idempotent?
3. What is the difference between readiness and liveness?

### 自測參考答案

1. 重啟後重新讀取 spec、status 及外部 actual state，從目前狀態繼續收斂。若先前 external create 結果不明，先用穩定 identity／idempotency token 找回結果，不能只依賴記憶體或缺少的 status。
2. Reconcile 會因重試、重啟與多次通知而再次執行。重複執行不可重複建立或破壞資源；對外部操作還需要 ownership、狀態確認與可恢復流程。
3. Readiness 控制是否適合接新流量，liveness 失敗達門檻會觸發 container restart；startup probe 保護啟動階段。短暫 downstream 故障通常不應使所有 Pod 進入 restart loop。

### 英文短答

> A controller should be safe to restart because it continuously compares desired and actual state. It should observe the current state after a timeout rather than blindly repeating a potentially destructive action. Reconciliation must be idempotent because events can be duplicated or reordered. Readiness controls traffic, while liveness controls restart decisions.

### 延伸來源

- [Kubernetes Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)
- [Kubernetes probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)
- [Kubernetes Finalizers](https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/)

---

## 22 SLI、SLO、SLA、Error Budget 與 Toil

優先級：P1｜約 20 分鐘｜目標：能定義有意義的指標、算 error budget，並解釋告警與自動化如何改善可靠度。

### 四個名詞

SLI 是衡量服務的指標，例如 valid requests 的成功率或 p99 latency；SLO 是目標，例如 99.9% success；SLA 是對外承諾，可能有合約後果；error budget 是在 SLO 下允許的不良事件空間。

100 萬 requests、99.9% success SLO 的 budget 是 1,000 次 bad requests。這不自動等於某個 downtime 分鐘數，除非 SLI 本身是 time availability。不同 endpoint、region、tenant 也可能要分開定義，避免健康大流量掩蓋關鍵小流量。

Burn rate 是消耗 budget 的速度相對於允許速度。允許 bad rate 0.1%，目前 1%，約是 10 倍 burn rate。告警要有 user impact、持續時間與可採取 action，單純 CPU 超過 80% 常不夠 paging。

四個 golden signals：latency、traffic、errors、saturation。平均 latency 正常不代表 tail 正常；健康 probe 正常不代表完整 user journey 成功。

Toil 是重複、手動、可自動化、隨規模增加的維運工作。改善 toil 不只是寫一個 script，還需 timeout、idempotency、audit、測試、failure handling 和可量化結果。

### 先定義使用者成功，再決定量哪個 metric

假設使用者要提交訂單。HTTP 200 但訂單沒有持久化，不一定符合業務成功；相反地，HTTP 202 可能只承諾「已接收工作」，是否在期限內完成需要另一個 SLI。應先釐清 API 的承諾。

常用的 request-based SLI 是 `good events / eligible events`。例如「過去 30 天，符合條件的結帳請求中，99.9% 正確完成」。必須寫清楚哪些請求符合條件、timeout 如何計算、重試是否計入、在哪裡測量。

若只在 application 計數，根本到不了 app 的 DNS、TLS 或 gateway failure 可能被漏掉。Gateway metrics、client telemetry 和 synthetic probes 各自有覆蓋範圍，應依 SLI 的承諾選擇測量點。不能把不同觀測點的 counters 直接相加而重複計數。

4xx 也不是一律排除。使用者輸入無效資料的 400，和服務容量不足造成的 429，對可用性的意義可能不同。先訂契約及分類，再計算，避免為了好看而排除真實失敗。

### Latency SLO 與 p99

「99% 的有效請求在 300 ms 內完成」可用 good/total 表達，bad event 就是超過門檻的請求；是否把失敗請求也算 bad，必須明確定義。另一個常見圖表是 p99 latency，但不可把每台 Pod 的 p99 平均，就當成全服務 p99。Quantile 不是可直接平均的量；通常需聚合兼容的 histogram buckets 或原始觀測再計算。

平均 latency 不變、p99 上升，可能代表少部分 request 的 queue wait、GC pause 或 downstream tail 變差。依 endpoint、region、版本分組，有助於找到受影響的群體；整體好看可能只是健康的大流量掩蓋低流量故障。

### Error budget 與 burn rate 算例

假設某個已完成統計期間有 1,000,000 次 eligible requests，目標 99.9% good：

- 允許 bad events：`1,000,000 × 0.001 = 1,000`。
- 實際 bad events 300 次：使用 30% budget，剩餘 700 次。
- 某個觀察窗口 bad rate 達 1%：`1% / 0.1% = 10` 倍 burn rate。

如果完整 budget 尚未使用、流量均勻，而且 10 倍 burn rate 持續不變，30 天 budget 約 3 天就會耗盡。這是幫助理解的估算；真實 request-based budget 受流量分布、已消耗比例及 rolling window 影響，不能在任何情境都說「必然三天」。

用較長窗口判斷持續消耗，搭配較短窗口確認問題仍在發生，可減少短暫噪音與已恢復問題造成的告警。實際窗口及門檻應依 on-call 可反應時間、流量與業務容忍度設定，不是所有服務套一組數字。

### CPU 95% 時，到底要不要 page

若 batch worker 刻意把 CPU 用滿，任務準時完成，95% 可能只是有效利用資源。若互動 API queue 已快速增加、latency SLO 正在惡化，同樣的 CPU 數字就是有用的診斷證據。

Page 應對應需要立即處理的使用者影響，或可靠預測即將發生、必須立即介入的故障；例如 disk 即將滿且會停止寫入。單一 CPU 門檻既可能誤報，也可能漏掉低 CPU 的 I/O stall。Capacity planning 和長期改善則可以用 ticket 或工作排程處理。

Error budget policy 是事先約定如何平衡變更和可靠度，例如 budget 快速消耗時暫停高風險功能 rollout、優先修復。它不代表每次 incident 都禁止所有部署；緊急修復本身可能需要部署。

### Toil 改善怎麼講得具體

假設每週人工處理 20 台主機，每台 15 分鐘，共 5 小時。自動化後每週仍有 2 台例外各需 15 分鐘，加上維護與結果檢查 30 分鐘，共 1 小時：淨減少約 4 小時／週。

還要比較失敗率、恢復時間、是否減少夜間打擾，以及自動化出錯的影響。若省下操作時間卻增加大量修復工作，不能只報「自動化覆蓋率 90%」。一次性建立能力的工程工作，和長期反覆手動操作也應分開。

面試可以用「原本成本 → 改善方式 → 保護措施 → 實測結果」回答。保護措施包括 scope 限制、dry-run、timeout、idempotency、audit 與 partial failure handling；不需要把每個小 script 都做成大型平台。

### 自測

1. Why is a CPU threshold alone often insufficient for paging?
2. What is the difference between an SLI and an SLO?
3. How would you show that an automation reduced toil?

### 自測參考答案

1. CPU 高未必影響使用者，而 CPU 低也可能正在卡 I/O 或 lock。應結合 SLO、queue、latency、errors 與可預測的迫近故障，確定告警需要立即行動。
2. SLI 是實際衡量方式與結果，SLO 是指定窗口中的目標。要定義 denominator、good event 和測量點；SLA 是對外承諾，未必與內部 SLO 完全相同。
3. 比較前後每週人工工時、頻率、失敗率和恢復時間，扣除 automation 維護及例外處理成本，也評估 blast radius 是否增加。用實測淨效益而非腳本數量證明。

### 英文短答

> An SLI is the measurement, while an SLO is the target derived from user expectations. I would page on a symptom that represents user impact, such as sustained error rate or latency burn, rather than CPU alone. For toil reduction, I would measure manual hours, frequency, failure rate, and the reliability of the automation.

### 延伸來源

- [Google SRE：Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)
- [Google SRE：Eliminating Toil](https://sre.google/sre-book/eliminating-toil/)
- [Google SRE Workbook：Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)

---

## 23 Cloud Compute、Block／Object Storage 與 CDN

優先級：R（JD 背景）｜約 20 分鐘｜目標：理解常見 cloud component 的邊界，以存取語義、故障域與 recovery 需求做選擇，不背 provider API。

VM compute（例如 EC2 類服務）通常包括 image、instance lifecycle、network identity、attached storage 和 failure domain。管理 instance 狀態不代表 application ready；image、userdata、security policy、route 和 health 應分開觀察。

Block storage 提供可定址讀寫的 blocks，常見用法是在上面建立 filesystem，也有應用直接使用 raw block device；object storage（例如 S3 類）以 object key/API 存取，常見於 backup、artifact、static data。Object store 的 update、rename、listing、consistency、versioning、retention 與普通 POSIX filesystem 不同。把 bucket mount 起來不會自動帶來同樣語義。

CDN（例如 CloudFront 類）在 edge cache response，依 cache key、TTL、headers、authorization、region 導向 origin。個人化或敏感 response 不能因為「cache 能加速」就全 cache；要確認 cache key 不會把一個使用者的資料送給另一個人。Cache miss、origin latency、invalidation 和 stale response 要分開監控。

Production automation 要有 bounded retries、timeouts、idempotency、audit、dry-run/canary 及清楚的 partial failure outcome。Cloud provider 的 managed service 隱藏部分硬體細節，但不會替你決定 data durability、access policy、SLO 或 recovery test。

### Compute running 不等於服務可用

VM 狀態 running 只說明 provider 的 instance lifecycle，不保證 guest OS boot 完成、disk mount 成功、服務已啟動或 load balancer health check 通過。

假設新 VM 無法提供 HTTP，分層檢查：

| 層次 | 核心問題 | 佐證 |
|---|---|---|
| Instance／OS | guest 是否開機，bootstrap 是否成功？ | console、boot logs、初始化紀錄 |
| Network | IP、route、firewall policy 是否正確？ | interface、route、流量紀錄、封包 |
| Storage | volume 是否 attached，filesystem 是否 mount？ | volume 狀態、`lsblk -f`、mount 資訊 |
| Identity | app 是否有讀取設定或 secret 的權限？ | role／policy、API 拒絕紀錄 |
| Application | 是否 listen，health 是否真實反映 readiness？ | `ss -lntp`、service logs、health request |

例如 app 因缺權限拿不到設定而啟動失敗，加大 VM 並不會改善。診斷先定位是哪一層的契約沒有成立。

### Block、file、object 的差異

| 類型 | 主要介面 | 常見用途 | 需要注意 |
|---|---|---|---|
| Block | block read/write | database volume、VM disk | filesystem、flush、attachment 與共享限制 |
| File | path、directory、file operations | shared files、既有檔案應用 | locking、cache、一致性及 server 故障域 |
| Object | key + API，讀寫物件 | artifacts、backup、靜態資源 | API 語義、權限、request 成本、版本與 retention |

不要把「遠端」當成 object storage 的定義，network block device 和 network filesystem 也都是遠端存取。選擇重點是應用需要哪些操作，而不是單純容量大小。

傳統應用可能依賴 append、advisory lock 或 atomic rename 來更新資料。Object API 或 mount adapter 不一定提供相同保證；某些特殊產品支援額外功能，也不能直接推廣到所有 bucket。

Amazon S3 對其文件列出的 PUT／DELETE 後讀取及 LIST 操作提供強一致性，因此不能用「object storage 一定 eventual consistency」回答面試。但單一物件操作的一致性，也不等於多個物件的 transaction 或完整 POSIX filesystem 語義。要看選用產品與功能的具體契約。

### Durability、availability 與 backup 分開看

資料耐久代表不容易遺失；可用性代表現在能否存取。資料仍在，卻因 network 或 access policy 故障讀不到，是 availability 問題。

Replication 也不是完整 backup：誤刪、錯誤寫入或憑證被濫用，可能影響所有 replicas。依需求設計 versioning、retention、權限隔離和獨立 recovery copy，並演練還原。

RPO 描述最多可接受遺失多久的資料，RTO 描述可接受多久恢復服務。例如每日 backup 不足以直接保證五分鐘 RPO；有 backup 但要兩天才能下載及重建，也無法滿足一小時 RTO。這些需求會影響備份頻率、容量、資料位置與還原流程。

### CDN：cache key 決定誰共享同一份內容

Cache key 是用來判斷兩個 request 能否共用 cached response 的識別方式，可包含 path，以及依 policy 納入的 query parameters、headers 或 cookies。實際 defaults 因 CDN 與設定而異。

例如 `/profile` 回傳登入者資料，但 cache key 只含 path，就可能將某位使用者的 response 分享給別人。常見策略是讓個人化 endpoint 不進共享 cache，或採用經過驗證的隔離與授權設計。只把 Authorization header 轉送 origin，不代表 cache key 已包含它，也不保證每次 cache hit 都重新驗證權限。

另一個例子：`/image?id=1` 和 `?id=2` 若忽略 query 卻回不同圖片，會 cache collision；若把每次不同的 tracking id 全放入 key，又可能讓 hit rate 極低。應根據真正改變內容的欄位設計，而不是欄位越多越好。

靜態資源常用帶內容版本的檔名，例如 `app.ab12.js`，讓新版本有新 URL；入口 HTML 另設適當 freshness。修改 origin 不會自動使每個 edge 的舊 cache 失效，需依 TTL／invalidation 設計更新流程。

若只有部分地區內容舊，對照同一 URL、cache key 相關 headers、edge 回應的 cache status／Age 與直接 origin 結果。`curl -I` 可看 headers，但 HEAD 可能與 GET 的處理不同；必要時用 `curl -sS -D - -o /dev/null URL` 檢查 GET response。Header 缺少也不代表一定未經 cache，需搭配 CDN logs。

### Cloud automation 的 partial failure

批次建立十台 instance，只成功八台時，整批重跑可能變成十八台。應保存每個目標的 operation identity 與結果，對結果不明的項目先 observe，再 retry；用 provider 支援的 idempotency token，並清楚標記資源 ownership。

刪除／rollback 也要避免誤刪其他操作建立的資源。暫時性錯誤用有上限的 backoff + jitter；權限不足或 invalid parameters 應回報並修正，不能無限 retry。Dry-run 能驗證部分意圖，但不能保證真正執行時仍有容量或不存在 race。

### 自測

1. Why can an object store not directly replace a POSIX filesystem?
2. What should you verify before caching an authenticated response at a CDN?
3. What makes a cloud automation safe to retry?

### 自測參考答案

1. Object storage 是以物件 API 為主要契約，不能假設有應用依賴的 lock、append、rename 或跨物件 transaction。強一致性也不等於完整 POSIX 語義；需逐項比對需求。
2. 先確認資料是否適合共享，再檢查 cache key、authorization 流程、cookie/header/query policy、TTL 和 invalidation。必須驗證不同使用者不會錯誤命中同一份敏感內容。
3. 對每個目標保存操作身分與結果，使用 idempotency、明確 ownership、timeout 和 bounded retries。結果不明先查 actual state，partial failure 只處理必要項目，rollback 不可誤傷其他資源。

### 英文短答

> I would choose storage based on access semantics rather than only capacity. Object storage uses an API and does not automatically provide POSIX locking, rename, or append behavior. For CDN caching I would verify the cache key, authorization and sensitivity of the response. Automation should have timeouts, bounded retries, idempotency, and observable partial-failure handling.

### 延伸來源

- [Amazon S3 overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Amazon CloudFront caching concepts](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- [CloudFront：Understand the cache key](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-the-cache-key.html)

---
