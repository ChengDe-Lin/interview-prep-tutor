# Agentic Product Development Workflow

## 這個故事適合回答

- Builder Mindset
- Data & AI Industry Expertise
- Customer Advisor / Pre-Sales Skills
- Execution & Driving Adoption
- Bias for Action
- Team Fit

## 核心訊息

你不是只用了 AI coding tool。你是重新設計了 product development workflow，讓 PM / designer 可以從 product intent 直接走到 product-ready UI code，中間有 agents、spec、quality gates、backend integration、testing、deployment。

## 一句話定位

## 可直接說的英文

> I did not just use AI coding tools. I redesigned the product development workflow around agents, specs, quality gates, and deployment, so PMs and designers could move from intent to production-ready UI with much less engineering handoff.

## Situation

原本 PM / designer 的流程很傳統，也很浪費時間：

1. 在外部設計工具做 design artifact。
2. hand off 給 engineer。
3. engineer 重新用產品裡的 component library 實作。
4. PM / designer review。
5. 來回修改。

這造成幾個問題：

- design file 會跟實作脫節，慢慢 out of date。
- engineer 要手動把設計翻譯成真實 product code。
- PM / designer 要等 engineer 做完才看得到接近真實產品的結果。
- review 常常花在 UI mismatch，而不是 product logic。

市場上像 Vercel v0、Figma Make、Claude design workflow 這類工具可以產 UI，但通常還是會卡在兩件事：

- 還要維護一套外部 design system。
- 產出的 HTML/CSS 或 mockup 還要再交給 engineer / coding agent，重新翻譯到本地 component library 和 product architecture。

## Task

你的目標不是在舊流程後面加一個 AI helper，而是重新思考：

> 可不可以讓 agent 成為從 PM/designer intent 到 product-ready code 的主要流程？

這裡不要講成完全 human-out-of-loop。更成熟的說法是：

- 初期人仍然在 loop 裡，因為 PM / designer 需要看多個方向並選擇。
- 所以前段要優化速度和多樣性。
- 確認方向後，再逐步提高 quality assurance。

## Action

你做的是一套 E2E agent-driven workflow。

### 1. 快速探索階段

PM / designer 不需要先開外部設計工具。他們直接描述 product intent，agent 會根據真實 component system 和 codebase context 產生多個 product-ready UI directions。

這個設計解決的是「等待」問題：在還需要 human judgment 的階段，與其等一個完美答案，不如快速給幾個方向讓 user 選。

### 2. Designer vibe-coding refinement

方向確定後，designer 還可以繼續用 vibe-coding 的方式細調 UI。這還是 creative loop 的一部分。

重點是 spec-driven development 不是後面才補，而是整個流程都要成立：

- agent 因 prompt 改 code，要同步 spec。
- agent 因 designer refinement 改 code，要同步 spec。
- agent 因 structured spec input 改 code，也要同步 spec。

核心原則：code 要能 trace back 到 spec，spec 也要說得出為什麼 code 是這樣。

### 3. 自動化 agent 接手後段

當 PM / designer 確認 UI ready，下一個 automated agent 接手：

- 檢查 backend API interface。
- 補上 data binding。
- 補上 business / data logic。
- 跑 visual validation。
- 跑 E2E testing。
- 往 deployment 前進。

### 4. Memory management / feedback loop

隨著 designer 不斷使用這套流程，你們也做 memory management 和 feedback loop。

從 designer 的 feedback 和決策中萃取 reusable design principles。久了之後，在 UI 相對簡單的產品或 pattern 裡，agent 可以直接遵循這些原則實作，designer 不一定每個 iteration 都要留在 loop 裡。

這裡面試時要保守講：不是取代 designer，而是讓簡單 UI pattern 逐漸更 autonomous。

## Result

- PM / designer 可以從 intent 走到 UI-ready product code，不用維護獨立 design artifact。
- 大幅減少 PM/designer 跟 engineer 的溝通和 handoff 成本。
- design artifact 不再容易 out of date，因為 deliverable 本身就更貼近 product code。
- engineer 不用再照著 Figma 重做 UI，review 重點可以放在 logic、data correctness、edge cases。
- UI iteration effort 約減少 75%。
- feedback loop 逐漸萃取 reusable design principles，讓簡單 UI generation 越來越 autonomous。
- 你把這個方向分享給其他部門，也代表團隊向副董事長報告並得到認可。

## 為什麼這對 Databricks 有用

這個故事很像 Solutions Architect 的工作模式：

- 先理解 user 真正的 workflow，不是只聽表面需求。
- 找出現有工具為什麼沒有完整解決 business problem。
- 設計一個在 exploration 和 governance / quality 之間取得平衡的架構。
- 降低 adoption friction，讓非工程使用者真的用起來。
- 能跟市場工具比較，說清楚自己的方案差異在哪。

連到 Databricks 時可以這樣想：

企業 AI adoption 不是「接一個 model」就結束。真正困難的是 governed workflow、trusted data、quality checks、ownership，以及從 prototype 到 production 的路徑。

## 2.5-Minute Spoken Version

這段是可以直接拿來練的英文稿。

> One AI project that best represents my builder mindset is the agentic product development workflow I built for our clinical platform.
>
> The original workflow was expensive. PMs and designers would create design artifacts in separate tools, hand them off to engineers, wait for implementation, review the result, and repeat. That created a lot of waste: design files became outdated, engineers had to manually translate design intent into our component library, and reviews spent too much time on UI mismatch instead of product logic.
>
> So I rethought the workflow from first principles. Instead of using AI after the design handoff, I asked whether agents could become the main workflow from product intent to production-ready code.
>
> The first stage is optimized for exploration. PMs and designers describe what they want directly to an agent, and the agent generates multiple UI directions using our real component system and codebase context. This matters because we are not fully human-out-of-the-loop at that stage. Users still need to inspect and choose a direction, so giving them several fast options is more valuable than making them wait for one perfect answer.
>
> Once they choose a direction, designers can still refine details through vibe-coding. But one principle I enforced is that spec-driven development must run through the entire process. Whenever an agent changes code, it must update or reference the spec. Whether the change comes from prompting, UI refinement, or structured spec input, the code has to be traceable back to product intent. That became one of our biggest lessons: agent-generated code is only maintainable if the spec and code evolve together.
>
> After the PM or designer confirms the UI is ready, the workflow hands off to another automated agent. That agent checks backend API interfaces and data logic, fills in the data binding and business behavior, then moves the output through visual validation, E2E testing, and deployment.
>
> We also built memory management and feedback loops around the workflow. As designers used it, we extracted reusable design principles from their feedback and decisions. For simpler UI patterns, that gradually allowed the agent to follow those principles directly, so designers did not always need to be in the loop for every iteration.
>
> The result is that we avoid a lot of communication and translation cost. We do not maintain a separate design artifact that goes stale, engineers do not need to recreate UI from Figma, and the final review focuses much more on logic and correctness. This reduced UI iteration effort by around 75%. I also shared this design with other departments and represented our team in a presentation to the vice chairman, where the direction received recognition.
>
> What I think is important is that this is different from tools like Vercel v0, Figma Make, or Claude design workflows. Those tools can generate UI, but they often still require a design-system handoff or a second translation step into the real local component library. My approach was to remove that translation step by making the agent work directly inside the real product architecture from the beginning.

## 記憶點

1. 舊流程：design tool -> handoff -> engineer rebuild -> review -> repeat。
2. 核心改變：agent workflow 從 product intent 直接到 product-ready code。
3. 第一階段：快速產生多個方向，因為人還需要選 direction。
4. 方向確定後：designer 可以繼續 vibe-coding 細調。
5. Spec 原則：spec 跟 code 全流程同步，不是最後補文件。
6. 自動化階段：UI ready -> backend API/data logic agent -> visual validation -> E2E -> deployment。
7. Feedback loop：memory management 萃取 design principles，簡單 UI 可以逐漸更 autonomous。
8. Result：75% less UI iteration effort、less handoff、no stale design artifact、副董事長認可。

