# AI Seminar — Building an AI-First Culture from Scratch

## 適用 BQ 類型
- **Growth** — 從 IC 成長為 AI 知識推動者，帶領 120 人部門探索 AI 應用
- **Leadership (Influence)** — 不靠職權，靠關係和信任動員同事參與
- **Conflict** — 被 VP rehearsal 噴、VP 質疑 seminar 價值時直接 push back
- **Customer Focus** — 拉醫生分享臨床視角，確保技術方向貼近真實用戶需求

## Situation

In early 2023, when generative AI was just starting to take off, our group VP recognized that as the AI division of the entire ASUS group, we needed to be at the forefront of this wave. He believed AI would fundamentally change our industry and wanted people across the department to invest time exploring how AI could transform our workflows and products.

## Task

The VP selected two people to lead a bi-weekly seminar series for the department — an admin to handle logistics, and me as the engineering lead responsible for finding speakers, shaping content direction, and advising on topics. I was chosen because my manager told me the VP saw me as someone who was active among peers, had strong relationships across teams, and had relevant AI background from my master's program. At that point I was about 1.5 years in and already on the radar for strong performance.

## Action

The biggest challenge wasn't technical — it was motivation. Everyone was busy with their regular work, and AI capabilities at the time were still limited. Many teams were experimenting with similar things — generating fake data, writing unit tests — and people felt their use cases weren't impressive enough to present. They didn't want to get up in front of 100+ people to share something they considered basic.

I leaned on the relationships I'd built. Close colleagues who saw me putting in the effort volunteered to claim topics. For each session, we'd discuss the direction together, survey what the community was talking about, validate whether the ideas worked in our actual codebase, then prepare slides and a presentation. Every session went through a rehearsal with the VP before the actual seminar — which was attended by the entire department of about 120 people, plus invited executives including the group's vice chairman.

This process was not always smooth. More than once, a presenter and I would walk into the VP rehearsal thinking we were ready, only to get torn apart on the content, structure, or depth. Those moments were tough — especially because I was the one who'd recruited these colleagues to present. They didn't have to be there; they volunteered because I asked. So I had to manage my own frustration, then spend real effort encouraging them and rebuilding their confidence. There was no shortcut — it meant spending weekends researching deeper, reworking slides, and convincing the VP we'd be ready by next week.

The second challenge was sustaining momentum. AI capabilities in 2023 were still limited, and teams quickly converged on similar use cases — generating test data, writing unit tests. The VP started questioning whether the seminar was still worth the investment. I pushed back directly: the real value isn't the occasional breakthrough idea — those are serendipitous. What matters is shifting the entire department's mindset so that experimenting with AI becomes a natural part of how people work. That's how we stay ahead. The VP agreed with this framing, and that's why the program continued for six months rather than fizzling out after a few sessions.

One session that stood out: we had a doctor who was doing a gap-year internship with us in a consultant-like role. I worked with him to prepare a sharing on how hospitals were actually using GPT in clinical settings and what he, as a physician, hoped AI would bring to healthcare. That brought a completely different perspective to the room — grounding our engineering discussions in real clinical needs.

Over about 10+ sessions in six months, several ideas from the seminars actually made it into production. A DevOps team member proposed an internal Q&A system during one session — aggregating environment setup docs, DevOps configurations, and chat logs so AI could answer common questions instead of tying up specific people's time with repetitive requests. The VP liked the idea and allocated resources for their team to build it. That concept later extended to our customer-facing support system as well. We also discussed AI code review early on — which didn't get implemented immediately because we couldn't carve out time to formalize our review guidelines, but the concept is now standard practice.

## Result

- Ran **10+ sessions** over six months for a department of ~120 engineers, with senior executives up to the vice chairman regularly attending
- Seminar discussions **directly led to a production internal Q&A system** that eliminated repetitive DevOps support requests — the concept later expanded to the customer service product
- The company began **funding AI experimentation** — giving teams budget for API access, subscriptions, and tooling. This investment started because of the seminar's demonstrated impact, and **continued even after the formal program ended**. Leadership eventually rolled out AI subscriptions for the entire department
- The formal program paused after an org restructure and a leadership change — the original VP left — but the culture persisted. Teams continued sharing informally at a more sustainable pace
- When AI fully took off in 2025–2026 and we began our AI-native platform transformation, the groundwork was already there — **the seminar had built the mindset of embracing AI across the department**, which made the later transformation significantly smoother
- The influence has now extended beyond my department: **another division's designers heard about our AI-native platform at a cross-department meetup and invited me to present to their engineering team**

## Key Talking Points
- **Influence without authority**: 不是主管，靠的是關係和信任來動員 120 人部門
- **VP's trust**: 被集團副總選中，1.5 年就被管理層注意到
- **Motivation challenge**: 大家覺得自己的使用不夠厲害不想講 → 靠關係讓人自告奮勇
- **Rehearsal pressure**: 被 VP 噴完要安撫同事、重建信心、週末加班改 slides — 展現 ownership
- **Pushed back on VP**: VP 質疑 seminar 是否值得繼續，你直接 argue mindset change > occasional breakthrough
- **Doctor's perspective**: 拉醫生來分享臨床視角，不只是工程師自己講
- **Ideas → Production**: 不是空談，Q&A 系統真的落地了，code review 概念也驗證了
- **Culture outlasted the program**: 官方活動停了但文化留下來，現在其他部門主動來邀請

## Deep Dive Topics（面試官追問用）
- **怎麼動員不想分享的人？** — 不是 push，是靠關係讓人自願。close colleagues 先帶頭
- **Q&A 系統的細節** — DevOps 成員提出，老闆分配資源，後來延伸到客服系統
- **為什麼 program 停了？** — 組織改組 + 重心轉移，但文化自然延續
- **跨部門分享是什麼？** — 其他部門 designer 在聚會上聽到 AI-native platform，邀請你去分享

## 記憶提示（5 個節點，用手指數）

```
1. 🌊 背景：2023 早期，VP 有遠見要搶 AI 浪尖
   → 選了我（關係好 + performance + AI 碩士）來推 bi-weekly seminar

2. 😰 挑戰一：大家太忙 + 覺得不夠厲害不想講
   → 靠關係動員 + rehearsal 被噴要安撫同事、週末加班改 slides

3. 💪 挑戰二：VP 質疑 seminar 還有沒有必要
   → 我 push back：重點不是偶爾的好點子，是改變 mindset
   → VP 認同，繼續了半年

3.5 🏥 亮點：醫生來分享臨床 AI 使用
   → 把工程討論 grounding 在真實醫療需求上

4. 🚀 落地成果：
   → DevOps Q&A 系統落地 → 延伸到客服
   → 公司開始撥 budget 給 AI 實驗（API、subscription）
   → 後來全部門都拿到 AI subscription，投資沒因活動停而停

5. 🌱 長期影響：
   → 副總離開、活動停了，但 mindset 留下來了
   → 2025-26 AI 全面爆發時，轉型特別順因為基礎已經打好
   → 其他部門主動來邀請分享 AI-native platform
```

## 面試時的節奏建議

- **Situation（15 秒）**：2023 早期，VP 認為 AI 部門要帶頭，選我推 seminar
- **Task（10 秒）**：engineering lead，負責找人、定方向、確保品質
- **Action（1.5 分鐘）**：動員挑戰 → 靠關係解決 → 醫生分享亮點 → ideas 落地
- **Result（30 秒）**：10+ sessions、100-150 人、Q&A 系統落地、文化延續、跨部門邀約

總長 ~2.5 分鐘。

## 版本紀錄

| 日期 | 修改內容 |
|------|---------|
| 2026-04-03 | v1: 完整 STAR 初版，含 VP 選人背景、動員挑戰、醫生分享、Q&A 系統落地、文化延續 |
| 2026-04-03 | v1.1: 補充 Result — 公司撥 budget 做 AI 實驗、全部門 AI subscription、2025-26 轉型的 mindset 基礎 |
| 2026-04-03 | v1.2: 補充 Action — VP rehearsal 被噴的壓力、VP 質疑 seminar 價值時 push back 的 conflict |
