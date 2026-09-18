# 常用指令與參數複習表

ChengDe 的 SRE 面試複習｜2026 年 9 月 17 日

以 Linux 常見工具為準；macOS 的 ps、top、網路工具與參數可能不同。記憶單位是「命令＋參數＋目的」，同一字母跨命令不保證同義。1234、myapp、my-pod 等皆是示例，使用時換成實際 PID／名稱。先背第 1 節，再按正在學習的章節擴充。

## 1 先記這十二組

| 我想知道 | 指令 | 參數怎麼拆 |
|---|---|---|
| 所有 processes 的狀態 | `ps -eo pid,ppid,stat,comm` | `-e` 全部 processes；`-o` 指定欄位 |
| 某 process 裡每條 thread | `ps -L -p 1234 -o pid,tid,stat,comm` | `-L` threads；`-p` 選 PID；`-o` 欄位 |
| 哪條 thread 正在吃 CPU | `top -H -p 1234` | `-H` threads；`-p` 選 PID |
| Service 現在什麼狀態 | `systemctl status myapp` | `status` 是子命令 |
| Service 最近的 logs | `journalctl -u myapp --since '-15 min'` | `-u` unit；`--since` 起始時間 |
| Kernel 本次開機訊息 | `journalctl -k -b` | `-k` kernel；`-b` 本次 boot |
| Memory 概況 | `free -h` | `-h` 易讀單位，留意 available |
| Disk 容量／inode | `df -h`／`df -i` | `-h` 易讀容量；`-i` inode |
| 刪了還占空間的開啟檔案 | `lsof +L1` | link count 小於 1 的 open files |
| 有誰在 listen TCP port | `ss -lntp` | `-l` listen；`-n` numeric；`-t` TCP；`-p` process |
| 某 process 卡在哪個 syscall | `strace -f -tt -T -p 1234` | 跟隨、時間戳、耗時、選 PID |
| 查看 HTTPS 連線過程 | `curl -v --connect-timeout 3 --max-time 10 https://example.com/` | `-v` 詳細訊息；連線階段／整體時間限制，秒 |

## 2 Process 與 Thread

| 指令 | 參數／欄位 | 讀法與提醒 |
|---|---|---|
| `ps -e` | `-e` | 選取全部 processes；不等於展開 threads |
| `ps -ef` | `-e`、`-f` full format | 全部 processes，以較完整預設格式顯示 |
| `ps -L -p 1234` | `-L`、`-p` | 展開此 process 的 threads |
| `ps -eo pid,stat,comm` | `-o` output format | 逗號分隔指定欄位 |
| `ps -eo pid,pcpu,comm --sort=-pcpu` | `--sort=-pcpu` | 依 CPU 百分比降序；ps 的 CPU 通常是 lifetime 比例，不是 top 即時值 |
| `pstree -p 1234` | `-p` | 在樹狀關係中顯示 PIDs |
| `pgrep -af myapp` | `-a` full command line；`-f` match full command line | 依完整命令列匹配並顯示；可能匹配不只一個 process |
| `top -H -p 1234` | `-H`、`-p` | 持續看 threads；按 `q` 離開，`P` CPU 排序、`M` memory 排序 |

| ps 欄位 | 意思 |
|---|---|
| `pid`／`ppid`／`tid` | process ID／parent process ID／thread ID |
| `stat` | task state 與修飾符；R 可執行、S 等待、D 不可中斷等待、T signal stop、t tracing stop、Z zombie |
| `pcpu`／`%cpu` | CPU 百分比的欄位名稱 |
| `pmem`／`%mem` | memory 百分比的欄位名稱 |
| `comm` | executable 名稱 |
| `args` | command line arguments，與 comm 不同 |
| `wchan:24` | 等待中的 kernel function／位置，欄寬 24；可能因權限等無法顯示 |

來源：[ps](https://man7.org/linux/man-pages/man1/ps.1.html)。

## 3 Service 與 Logs

| 指令 | 參數／子命令 | 用途 |
|---|---|---|
| `systemctl status myapp` | `status` | lifecycle、PID、部分近期訊息 |
| `systemctl cat myapp` | `cat` | 查看 unit 檔與 overrides |
| `systemctl show myapp -p MainPID -p LimitNOFILE` | `show`；`-p` property | 查看特定生效屬性 |
| `systemctl --failed` | `--failed` | 列出失敗 units |
| `journalctl -u myapp` | `-u` unit | 該 service 的 journal |
| `journalctl -u myapp -f` | `-f` follow | 持續顯示新 log，Ctrl-C 停止 |
| `journalctl -u myapp -n 100 --no-pager` | `-n` 筆數；`--no-pager` | 最近 100 筆，直接輸出 |
| `journalctl -u myapp --since '-15 min'` | `--since` | 限定起始時間；也能配 `--until` |
| `journalctl -k -b` | `-k` kernel；`-b` boot | 本次開機 kernel 訊息 |
| `journalctl -b -1` | `-b -1` | 上一次 boot，須有保留歷史 |
| `dmesg -T` | `-T` | kernel ring buffer，以人類易讀時間顯示；不保證涵蓋歷史所有開機 |
| `tail -n 100 app.log` | `-n` lines | 檔案最後 100 行 |
| `tail -F app.log` | `-F` follow name 並 retry | 持續追蹤檔名，常用於可能 rotate 的 log |
| `rg -n -i -C 2 'error' app.log` | `-n` 行號；`-i` 忽略大小寫；`-C` 上下文行數 | 找訊息並保留附近內容 |

記住：查完整 service log 是 `journalctl -u myapp`。systemctl 的 `-p` 指 property；不是 ps 的 PID。

來源：[systemctl](https://man7.org/linux/man-pages/man1/systemctl.1.html)、[journalctl](https://man7.org/linux/man-pages/man1/journalctl.1.html)。

## 4 CPU Memory 與 Disk

| 指令 | 參數 | 看什麼 |
|---|---|---|
| `uptime` | 無需 flags | 1／5／15 分鐘 load average，不是 CPU 百分比 |
| `vmstat 1 5` | interval 1 秒；count 5 | r runnable、b blocked、si/so swap、us/sy/id/wa CPU；首筆通常是開機後平均 |
| `mpstat -P ALL 1 5` | `-P ALL` 全部 CPUs；每秒、5 次 | 每 core 使用狀況 |
| `pidstat -u -p 1234 1 5` | `-u` CPU；`-p` PID | 該 process CPU |
| `pidstat -w -p 1234 1 5` | `-w` context switches | voluntary／involuntary switches |
| `pidstat -d -p 1234 1 5` | `-d` I/O | 該 process I/O 統計 |
| `free -h` | `-h` human readable | available 與 cache；free 少不等於 OOM |
| `cat /proc/1234/status` | 路徑中的 PID | process memory／threads 等摘要 |
| `cat /proc/1234/smaps_rollup` | 無 flags | RSS／PSS 等 mapping memory 摘要 |
| `cat /proc/pressure/memory` | memory PSI 路徑 | memory stalls；另有 cpu、io |
| `df -h /var` | `-h` | /var 所在 filesystem 的容量 |
| `df -i /var` | `-i` | inode 使用狀況 |
| `du -xhd1 /var` | `-x` 不跨 filesystem；`-h` 易讀；`-d1` 深度 1 | 哪個目錄占空間；此語法以 GNU du 為準 |
| `iostat -xz 1 5` | `-x` extended；`-z` 隱藏無活動裝置 | await、queue、throughput；%util 不宜對所有 SSD 當絕對飽和門檻 |
| `lsblk -f` | `-f` filesystem info | block devices 與 filesystem 資訊 |
| `findmnt` | 無需 flags | mounts 與掛載關係 |

mpstat、pidstat、iostat 常需 sysstat 套件。`1 5` 是 interval/count 位置參數，不是旗標，也不是每個工具都接受此寫法。

來源：[iostat](https://man7.org/linux/man-pages/man1/iostat.1.html)、[Linux performance checklist](https://www.brendangregg.com/USEmethod/use-linux.html)。

## 5 File Descriptor 與 Syscalls

| 指令 | 參數 | 用途 |
|---|---|---|
| `lsof -p 1234` | `-p` PID | 該 process 開啟的 files／sockets 等 |
| `lsof +L1` | `+L1` link count < 1 | 已 unlink 但仍 open 的檔案 |
| `lsof -a -p 1234 +L1` | `-a` AND 各篩選條件 | 只找此 process 的 deleted-open files；lsof 部分選擇預設是 OR |
| `lsof -nP -iTCP:443` | `-n` 不解析 host；`-P` 不轉換 port names；`-iTCP:443` | TCP 443 相關 open sockets，不限定 LISTEN |
| `ls -l /proc/1234/fd` | `-l` long format | FD 指向哪些資源 |
| `cat /proc/1234/limits` | 無 flags | live process 的 limits |
| `ulimit -n` | `-n` | 目前 shell 的 open-file soft limit；不代表其他 service 的限制 |
| `strace -p 1234` | `-p` attach PID | 觀察 syscalls，可能需額外權限 |
| `strace -f -tt -T -p 1234` | `-f` 跟隨 children／相關 threads；`-tt` 精細時間戳；`-T` syscall 耗時 | 定位呼叫與等待 |
| `strace -f -c -p 1234` | `-c` summary | 彙總 syscall 次數、時間、錯誤；Ctrl-C 結束觀測 |

strace 有額外負擔，先針對短時段／單一 instance。它看 syscalls，純 userspace 計算需 CPU profiler。

來源：[lsof](https://man7.org/linux/man-pages/man8/lsof.8.html)、[strace](https://man7.org/linux/man-pages/man1/strace.1.html)。

## 6 Network 路徑與連線

| 指令 | 參數 | 用途 |
|---|---|---|
| `ip -br addr` | `-br` brief；`addr` addresses | interface 與 IP 摘要 |
| `ip route` | `route` 子命令 | routing table |
| `ip route get 192.0.2.10` | `get` lookup | 查 kernel 選的 route／source；不會測到對端是否健康 |
| `ip neigh` | `neigh` neighbors | IPv4 ARP／IPv6 鄰居資訊 |
| `ip -s link` | `-s` statistics；`link` | interface counters、drops／errors |
| `ss -lntp` | `-l` listen；`-n` numeric；`-t` TCP；`-p` process | TCP listeners |
| `ss -ntp` | 無 `-l` | 一般 TCP sockets；不限定 established，也不含預設省略的 listeners |
| `ss -ntp state established` | `state established` filter | 明確只看已建立 TCP connections |
| `ss -lunp` | `-u` UDP，其他同上 | UDP listening／bound sockets |
| `ss -tin` | `-t` TCP；`-i` internal info；`-n` numeric | TCP RTT、retransmission 等內部資訊 |
| `ss -s` | `-s` summary | socket 統計摘要 |
| `ping -c 4 192.0.2.10` | `-c` 次數 | 4 次 ICMP probes；不證明 HTTP 正常 |
| `traceroute -n 192.0.2.10` | `-n` numeric | 路徑 probes；中間星號不一定是 forwarding failure |
| `mtr -rw -c 10 192.0.2.10` | `-r` report；`-w` wide；`-c` cycles | 多次路徑觀測摘要 |

192.0.2.10 是文件示例地址，請換成自己的測試目的地。從故障 client 的 host／namespace 測試；其他地方成功不代表同一路徑成功。

來源：[ip route](https://man7.org/linux/man-pages/man8/ip-route.8.html)、[ss](https://man7.org/linux/man-pages/man8/ss.8.html)。

## 7 DNS HTTP TLS 與抓包

| 指令 | 參數 | 用途 |
|---|---|---|
| `dig example.com A` | `A` record type | IPv4；改 AAAA 查 IPv6 |
| `dig @1.1.1.1 example.com` | `@` resolver | 指定 DNS server；公共 resolver 不適合驗證 internal-only names |
| `dig +short example.com` | `+short` | 精簡答案；除錯時可能需要完整 status／TTL |
| `dig +tcp example.com` | `+tcp` | DNS over TCP |
| `dig +trace example.com` | `+trace` | 從 root delegation 追查，需環境允許 |
| `getent ahosts example.com` | `ahosts` database | 依系統 name-service 配置查詢 |
| `curl -v https://example.com/` | `-v` verbose | 連線／TLS／headers 等診斷 |
| `curl -I https://example.com/` | `-I` 大寫 i | 發 HEAD request；不是 GET 後只隱藏 body，server 行為可能不同 |
| `curl -i https://example.com/` | `-i` 小寫 i | 在輸出 body 時也包含 response headers |
| `curl -L https://example.com/` | `-L` | 跟隨 HTTP redirects |
| `curl -sS -o /dev/null -w '%{time_total}\n' https://example.com/` | `-s` silent；`-S` 保留 errors；`-o` output；`-w` write-out | 不顯示 body，印總時間 |
| `curl --connect-timeout 3 --max-time 10 https://example.com/` | 秒數 | 限連線建立階段與整體時間 |
| `curl --resolve example.com:443:192.0.2.10 https://example.com/` | `--resolve` host:port:IP | 指定 IP，同時保留 hostname／SNI；示例 IP 需替換 |
| `curl -4 https://example.com/`／`curl -6 https://example.com/` | `-4`／`-6` | 分開測 IPv4／IPv6 |
| `openssl s_client -connect example.com:443 -servername example.com -verify_hostname example.com -verify_return_error` | connect；SNI；hostname check；驗證錯誤中止 | TLS 診斷，還要讀 trust-chain 驗證結果；Ctrl-C 離開 |
| `sudo tcpdump -i any -nn -c 100 'tcp port 443'` | `-i` interface；`-nn` 不解析 host／port names；`-c` count | Linux 多 interfaces 抓 TCP 443；無匹配可一直等，Ctrl-C 停止 |
| `sudo tcpdump -i any -nn -c 100 'host 192.0.2.10 and tcp port 443'` | filter 使用 `and` | 同時指定 host 與 port |
| `sudo tcpdump -i any -nn -c 100 -w capture.pcap 'tcp port 443'` | `-w` write file | 保存封包 |
| `tcpdump -nn -r capture.pcap` | `-r` read file | 讀取已存封包 |

HTTPS 一般不會讓你直接看到 plaintext HTTP。`curl -k` 會略過憑證驗證，能輔助定位但不能當正式修復。

來源：[curl](https://curl.se/docs/manpage.html)、[tcpdump](https://man7.org/linux/man-pages/man8/tcpdump.8.html)。

## 8 Kubernetes 常用讀取與觀察

| 指令 | 參數／子命令 | 用途 |
|---|---|---|
| `kubectl get pods -n my-ns -o wide` | `-n` namespace；`-o wide` | 看 Pod IP／node 等擴充欄位 |
| `kubectl get pods -A` | `-A` all namespaces | 跨 namespaces |
| `kubectl get pods -l app=myapp` | `-l` label selector | 依 label 篩選 |
| `kubectl describe pod my-pod` | `describe` | 狀態、conditions、events 等 |
| `kubectl logs my-pod -c my-container --tail=100` | `-c` container；`--tail` lines | 指定 container 的近期 log |
| `kubectl logs my-pod -f` | `-f` follow | 持續追蹤 log |
| `kubectl logs my-pod --previous` | `--previous` | 前一個已終止 container instance 的 log，不是前一個任意 Pod |
| `kubectl get svc my-service -o yaml` | `-o yaml` | selector、ports 等設定 |
| `kubectl get endpointslices -l kubernetes.io/service-name=my-service` | `-l` | Service 對應的 endpoints |
| `kubectl rollout status deployment/myapp` | `rollout status` | 觀察 rollout，可能持續等待 |
| `kubectl rollout history deployment/myapp` | `rollout history` | 查看 revisions |

## 9 會改變狀態的操作

複習時先說明目的與影響，再執行；不要把這一節的命令當成純觀察。

| 指令 | 作用／重要區別 |
|---|---|
| `kill -TERM 1234` | 請求終止，可由程式處理以收尾 |
| `kill -KILL 1234` | 強制終止 signal；不能 catch，D state 仍可能暫時無法退出 |
| `kill -STOP 1234` | 強制暫停 |
| `kill -CONT 1234` | 恢復執行 |
| `fg`／`bg` | 把 shell stopped job 恢復到前景／背景 |
| `systemctl restart myapp` | 重啟服務 |
| `systemctl daemon-reload` | 重讀 unit definitions，不是重啟 application |
| `systemctl enable myapp` | 配置開機啟動，不等於現在 start |
| `kubectl cordon my-node` | 阻止一般新排程；不自動搬走既有 pods／停止流量 |
| `kubectl drain my-node --ignore-daemonsets` | 嘗試驅逐適用 pods；受 PDB 等限制，DaemonSet pods 不因此被刪 |
| `kubectl uncordon my-node` | 恢復 node 可排程 |
| `kubectl rollout pause deployment/myapp` | 暫停 Deployment rollout |
| `kubectl rollout resume deployment/myapp` | 恢復 rollout；paused Deployment 要先 resume 才可 rollback |
| `kubectl rollout undo deployment/myapp --to-revision=3` | 回到仍保留的指定 revision；不恢復外部 DB 資料 |

來源：[Kubernetes Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)、[Node drain](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/)。

## 10 同一字母 不同命令

| 容易混淆 | 請成組記憶 |
|---|---|
| `-e` vs `-L` | `ps -e` 全部 processes；`ps -L` threads |
| `-L` vs `+L1` | `ps -L` threads；`lsof +L1` deleted-open files；`curl -L` redirects |
| `-p` | `ps/strace -p` PID；`ss -p` process info；`systemctl -p` property |
| `-o` | `ps -o` 欄位；`curl -o` output file；`kubectl -o` output format |
| `-f` | `ps -f` full format；`journalctl -f` follow；`strace -f` 跟隨 children |
| `-i` | `df -i` inodes；`tcpdump -i` interface；`ss -i` TCP info；`curl -i` headers |
| `-n` | `ss -n` numeric；`journalctl -n` 筆數；`kubectl -n` namespace |
| `-c` | `tcpdump -c` packet count；`strace -c` summary；`kubectl logs -c` container |

查參數：`man ps`、`man strace`、`curl --help all`、`kubectl logs --help`。`man 2 open` 的 2 是 syscall 手冊章節；`man 7 signal` 的 7 是概念／介面說明。

## 11 三分鐘自測

遮住答案，說出命令與每個參數，不需要背完整長欄位串。

| 問題 | 答案 |
|---|---|
| 全部 processes，顯示 PID 與 state | `ps -eo pid,stat` |
| 展開 PID 1234 的 threads | `ps -L -p 1234` |
| PID 1234 哪條 thread CPU 高 | `top -H -p 1234` |
| Service 最近十五分鐘 log | `journalctl -u myapp --since '-15 min'` |
| Disk 空間 vs inode | `df -h` vs `df -i` |
| 被刪但仍 open | `lsof +L1` |
| TCP listeners 與 owner | `ss -lntp` |
| 精細時間戳與 syscall 耗時 | `strace -tt -T -p 1234` |
| 抓 TCP 443 不解析名稱 | `tcpdump -i any -nn 'tcp port 443'` |
| Pod 重啟前的 container logs | `kubectl logs my-pod --previous` |

忘了參數時先回想「我要哪個觀察」，再選工具。要能解釋輸出與下一步，才算把指令用在除錯上。
