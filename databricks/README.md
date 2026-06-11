# Databricks Hiring Manager 準備

用途：準備 Databricks Solutions Architect 的 60 分鐘 Hiring Manager discussion。面試官是 Peter，Manager of Field Engineering。

這個資料夾只放 Databricks 這次面試用的材料。目標不是整理所有經歷，而是把你原本偏 SWE 的故事，轉成 Solutions Architect 會需要的語言：

- 技術架構判斷
- stakeholder discovery
- customer / internal user pain point
- 影響決策
- 推動 adoption
- 可衡量的 business / platform outcome

## 文件格式規則

- 給你看的說明、提醒、分析：中文。
- 你可以直接對面試官說的話：英文。
- 英文稿不用逐字背，重點是練順邏輯和關鍵詞。

## 文件

- `sa_pitch.md`：3 分鐘自我介紹、60 秒版本、Why Databricks。
- `focus_area_mapping.md`：HR 六個 focus areas 對應到你的故事。
- `agentic_workflow_story.md`：AI agent / workflow 主故事。
- `credibility_notes.md`：快速升遷、Staff trajectory、副董事長報告等輔助 credibility。
- `two_day_plan.md`：兩天完成材料，後兩天練習。

## 現在優先順序

1. 先把 3-minute SA pitch 練順。
2. 把 Agentic Workflow 和 Micro-Frontend 兩個主故事練到 2.5 分鐘內。
3. 用 `focus_area_mapping.md` 確認每個 HR focus area 都有故事能答。
4. 做一次完整 60 分鐘 mock interview。

## 2026-06-11 接續狀態

使用者偏好的文件格式：

- 給使用者看的說明、提醒、分析用中文。
- 只有「可以直接對面試官說的話」用英文 block quote。
- 不要把英文稿寫得太像 native essay，要短句、口語、自然，但不要刻意保留明顯文法錯誤。

目前 pitch 定位：

- 不主打 `platform builder` 或 `high-risk environment`。
- 主打：能看見 workflow / architecture problem，使用 system design 和 AI 解決，並讓團隊真的 adopt。
- 自我介紹結尾定位為 `AI workflow transformation`：從 messy workflow 找 bottleneck，探索 AI 能把 workflow 推進到什麼程度。
- 不要主動說自己不是 data engineer，也不要 expose gap。

Why Databricks 目前主軸：

- 使用者享受理解真實 business scenario、找 bottleneck，透過 workflow change 或 AI 帶來 impact。
- 現職讓他在 healthcare domain 從 PM、designer、RD 多個角度練習這件事，但他想要更大的舞台。
- Databricks 吸引點不是單一產品功能，而是能接觸不同產業，用 data + AI 改變 workflow。
- 使用者做過 internal knowledge Q&A、product-facing customer support、RAG/chatbot 類系統；痛過 retrieval quality、freshness、permission、governance、reliability。
- 對 Databricks 的連結：Data Intelligence Platform + Mosaic AI，包含 governed data foundation、search/retrieval、model serving、evaluation、production workflow。
- 核心觀點：未來 general model capability 可能逐漸不是唯一瓶頸；企業會需要能理解自己 domain / workflow / private data 的 AI，可能透過 fine-tuning、RAG 或其他 model adaptation。根基仍是 data 如何 storage、govern、search、evaluate、connect to production AI workflow。

Focus area 準備策略：

- 每個 focus area 一個檔案，維持簡單結構，不拆成 short/long/deep dive 多層，避免分心。
- `Opening STAR 口說稿` 是開場答案，不限制 2.5 分鐘；目標是一次講到大部分重點，但不要爆太細。
- 細節放在 `追問準備`，等 Peter 追問再展開。
- 目前只安全調整了格式；其他 focus area 的內容還需要使用者 review 後補充細節。

Builder Mindset 目前決策：

- 主故事是 agentic product development workflow。
- 要提外部方案：v0 from Vercel、Figma Make、Claude Design。
- 但不要批評它們；framing 是它們處理 general design-to-code problem，而使用者處理 specific internal product workflow。
- 可提 general solution 的自然限制：design language 和 real product code 可能 drift；mockup 仍需用自家 codebase / component library rewrite 或 adjust。
- 使用者的切入點：因為掌握 one company、one real product architecture、specific component system、clear internal workflow，所以可以給 agent 更深的 product/component/spec context，挑戰整個 workflow，而不只是對 general AI design tool 加 guardrails。
- Continuous learning 補充：使用者參加 Anthropic-hosted seminars，學 Claude Code / agent workflow best practices，例如 agents folder vs skill 的 context visibility 判斷，以及讓 Claude Code 協助撰寫 guidelines/skills，因為 Claude Code 有 product team 的 helper context。這段放追問，不硬塞主故事。

下一步：

1. 使用者下次回來先 review `databricks/focus_areas/01_builder_mindset.md`。
2. 把 Builder Mindset 的 `Opening STAR 口說稿` 修成使用者自然會講的版本。
3. 再依序 review 其他 focus area，使用者補充細節後再改，不要自行大幅腦補。
