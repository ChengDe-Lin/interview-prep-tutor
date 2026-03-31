# Micro-Frontend Platform Transformation

## 適用 BQ 類型
- **Leadership** — 主動 own 20 人參與的架構轉型
- **Impact** — 46% delivery speed↑, 58% defect age↓, 220+ widgets
- **Trade-offs** — 技術選型 + in-page/off-page 雙軌設計
- **Ambiguity** — 從模糊的「我們需要拆」到完整平台架構

## Situation

Our clinical platform xHIS had three major applications — inpatient, outpatient, and emergency — each in its own repository, but internally each one was heavily coupled. Every CI/CD cycle took over an hour, which made even small bug fixes painfully slow. But the deeper problem was the dependency structure. In one critical incident, an engineer changed a "ditto" behavior — a feature that copies a patient's previous prescriptions — to skip waiting for data in their specific workflow. That non-waiting behavior silently propagated through the dependency tree into other workflows. A doctor ended up pulling the *previous patient's* medication into the current patient's prescription. It nearly caused a serious medical accident. The engineer who made the change had no realistic way to trace every dependency path — the coupling was just too deep.

Around the same time, our team was tasked with building a platform to enable community and third-party contributions. But the codebase was too messy — too many legacy bugs, too many hidden dependencies — to safely onboard external contributors.

## Task

I had just joined the platform team, and this became the first problem I owned. After a team discussion about the need to decouple, I took the initiative to survey solutions and drive the entire transformation — from architecture selection through framework implementation to guiding 20 engineers through the migration.

## Action

**Architecture Selection**

I evaluated single-spa, iframe-based isolation, custom widget frameworks, and module federation. I chose module federation with Vite — our existing build tool — to minimize migration risk and effort. After the team and management aligned on this direction, I built a proof of concept to validate the approach.

**Framework & Pipeline**

Once the POC confirmed feasibility, I built the framework. The core design principle was: **developers should not need to know they're working in a micro-frontend system.**

The architecture had two layers. For features that belong in the main application flow, I introduced **in-page widgets** using module federation. On the shell side, I encapsulated everything so that rendering a remote widget is as simple as dropping in a Vue component with an ID — the shell dynamically resolves and loads the corresponding remote module. This required digging into the vite-plugin-federation source code, where I found a runtime variable that could be overwritten to dynamically discover all available remote components at runtime, eliminating the usual requirement to statically declare remotes in the host configuration.

For features that can be fully separated from the main flow, I built **off-page widgets** using our own widget framework. This runs a local Electron server that listens for events and pulls the corresponding widget build on demand when a user opens that widget — essentially a pop-up window running independently. This gave us even stronger isolation for things like secondary workflows.

The tricky part was the data layer. Our application has a shared clinical data store that lives in the shell process — think of it as a centralized state that holds the current patient's medical context. In-page widgets can access it directly through props, but off-page widgets run in a separate process and need to communicate over sockets. I introduced an **xdsClient** abstraction that auto-detects which mode the widget is running in and handles the data exchange transparently — URL params for off-page initial data, property passthrough for in-page. Developers just call the same API regardless of mode.

**Driving Adoption**

The hardest part wasn't technical — it was the migration itself. Teams pushed back, saying the coupling was too deep and they didn't have bandwidth to extract their code. Since I had strong relationships across the engineering team, I worked with them one-on-one to identify what could be extracted incrementally. Engineers voluntarily put in extra hours because they understood it would reduce their future pain. Meanwhile, our management advocated up to the chairman for dedicated migration time, and we negotiated sprint capacity from the PM side. For several months we operated in a superposition of both architectures, which created pressure whenever a migration-related bug appeared — but we pushed through.

## Result

- Decoupled the monolith into **220+ independently deployable widgets** across 20 engineers
- **46% improvement in feature delivery speed** and **58% reduction in defect age**, measured via Jira quarterly reviews comparing pre- and post-migration periods — and this was measured right after migration, when engineers were still learning the new framework but already very familiar with the old structure. For new engineers onboarding fresh, the improvement would be significantly larger
- The architecture directly enabled **xEmulator** — a cloud-native simulation environment (now a patent) that lets teams and future third-party developers build and test widgets in isolation, without needing the full application source code
- The entire effort — from initial research to migration-ready framework — took about **4-5 months**
- Two patents emerged from this platform work: xDS (the clinical data store) and xEmulator

## Key Talking Points
- **Patient safety angle**: The ditto incident is a powerful hook — it shows why decoupling wasn't just a tech debt exercise, it was a safety issue
- **"Developer doesn't need to know" philosophy**: Emphasize the encapsulation — same component works as in-page or off-page, same xdsClient API regardless of runtime mode
- **Source code detective work**: Finding the runtime overwrite in vite-plugin-federation source shows depth and resourcefulness
- **People leadership, not just tech**: Navigating team resistance through relationships, not authority
- **Scale**: 220+ widgets, 20 engineers, 3 applications — this is enterprise-scale transformation

## Deep Dive Topics（面試官追問用）
- **vite-plugin-federation runtime overwrite 細節**: 怎麼發現的、怎麼用的、有什麼 trade-off
- **xdsClient 的設計**: socket vs props 的抽象層、auto-detection 機制
- **in-page vs off-page 的決策**: 什麼場景用哪種、為什麼需要兩種
- **xEmulator**: 怎麼模擬其他團隊的 widget、怎麼處理資料
- **Migration 的具體困難**: 哪些 coupling 最難拆、怎麼 incremental 處理

## 記憶提示（5 個節點，用手指數）

```
1. 🔥 Hook：Ditto 事件，差點開錯藥害死人
   → 因為 dependency 太深，改一個地方壞別的地方，沒人查得完

2. 👤 我的角色：剛加入 platform team，第一個 own 的問題
   → survey 方案 → 選 Vite module federation → 做 POC

3. 🔧 技術兩層：
   → in-page：module federation，挖 source code 找到 runtime overwrite 做動態發現
   → off-page：自建 widget framework + Electron，on-demand pull

4. 🤝 最難的是人不是技術：
   → 團隊說拆不出來沒時間 → 靠關係一個一個推 + 主管往上爭取資源
   → 好幾個月兩套架構並存，壓力很大但撐過來了

5. 📊 結果：220+ widgets, 46% faster, 58% defect age↓
   → 而且這是大家還在學新框架時量的，新人來會更明顯
   → 衍生出 xEmulator 專利
```

## 面試時的節奏建議

- **Situation（30 秒）**：ditto 事件 + 平台需求，點到為止
- **Task（10 秒）**：我 own 的，一句話帶過
- **Action（1.5 分鐘）**：講大方向 — 選型、兩層架構、推動採用。技術細節等追問
- **Result（20 秒）**：三個數字 + 專利，收尾

總長 ~2.5 分鐘。技術 deep dive 留給面試官問。

## 版本紀錄

| 日期 | 修改內容 |
|------|---------|
| 2026-03-29 | v1: 完整 STAR 初版，含 situation (ditto incident), 技術細節 (runtime overwrite, dual-mode, xdsClient), people leadership |
| 2026-04-01 | v2: 修正三獨立 repo、entangled→messy、重寫 framework 段落（in-page/off-page 雙層）、xDS 一句話帶過、Result 加「還在學新框架時量的」、加記憶提示 |
