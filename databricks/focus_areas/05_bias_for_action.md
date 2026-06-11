# Bias For Action

## HR 想確認什麼

你是不是會主動 ownership，能提前看到問題，而不是等別人指定任務。

## 主故事

Proactive AI Workflow Discovery

參考：

- `databricks/agentic_workflow_story.md`
- `databricks/focus_areas/04_execution_adoption_consumption.md`

## 備用故事

- HAL to Add-on API
- GraphQL to xDS
- Micro-Frontend Transformation

## SA 角度

這題重點是「主動」。不要講成接到任務後完成，而是：

- chatbot 一開始不是正式需求，是同事間抱怨客服電話和群組訊息回不完。
- 你主動想到 LLM 適合處理大量重複問答，只要把知識準備好。
- 你用休息時間先做小 demo，PM lead 一開始甚至不知道。
- 後來 PM 試用後，主管才意識到這是能 scale support workflow 的方向。
- agentic workflow 一開始任務只是做 agent 取代 RD 重寫 designer mockup。
- 你邊做邊質疑：為什麼要 rework？為什麼不能讓 designer 直接用 agent 產 UI？
- 你私下找 designer 試用，很長一段時間只有一個 early user。
- 成熟後 demo 震驚團隊，現在甚至往前推到 PM，變成整個團隊正在 adoption 的 workflow。
- 核心訊息：不是有人叫你做，而是你一直問「AI 能幫每個團隊的 workflow 做什麼」，從不同角度看見可能性，再把它變成真實 impact。
- 這個 pattern 也出現在很多日常小 automation，例如 PM 手寫 spec 後還要整理成結構化表格，你看到後直接判斷這很適合 agent 做，人只要 review。
- 非 AI 例子可以補 schema auto-gen：xDS data schema 原本 BE / FE 各自維護，常常不一致；你主動推 auto-generation pipeline，讓 BE Python schema 轉成 JSON Schema，再轉成 TypeScript interface，後來甚至把 data node implementation 也自動化，讓原本團隊 bottleneck 加速 10x 以上。

## Opening STAR 口說稿

> For bias for action, I think the best pattern in my work is that I often do not wait for a formal requirement. I keep asking myself: where can AI actually change a team's workflow?
>
> One example started almost as a joke between colleagues. Some teammates said customer support calls were endless, and they had to reply to many group chats again and again. I thought: this is exactly the kind of repetitive knowledge work that LLMs should be good at. If we can prepare the right knowledge, the model should be able to answer many repeated questions.
>
> At that time, this was not a formal project. The PM team lead was not even aware I was helping with it. I used my own spare time to build a small demo first. Then a few PMs started testing it, and gradually their lead realized this could be a real direction. It was not just a chatbot. It was a way to scale support workflow instead of relying on people to answer the same questions everywhere.
>
> Another example is the agentic product development workflow. My original task was more limited: build an agent that could replace part of the engineer's work, starting from reading a designer's mockup and recreating the UI in code.
>
> But while building it, I kept asking whether this workflow was actually right. Why should designers create a Figma mockup, then engineers rework it into real product code? If the agent can understand our product context and component system, maybe designers can use the agent directly to create UI directions.
>
> So before this became an official direction, I privately found a designer to test the idea with me. For quite a long time, we only had one early user. We kept iterating quietly. Later, when the workflow became more mature, the demo surprised the team, because it showed that AI could change not only how engineers implement UI, but how PMs, designers, and engineers collaborate.
>
> Now I am pushing the coverage even earlier, toward PM product intent, and the team is adopting this workflow more broadly.
>
> This pattern also shows up in smaller daily work. For example, when PMs wrote specs and then had to manually convert the content into structured tables for database definitions, I saw that it was very suitable for agents. The agent can do the repetitive transformation, and humans only need to review. These things may be too small to demo in a leadership meeting, but they create real daily efficiency.
>
> Outside AI, I had a similar experience with xDS schema development. Backend and frontend originally maintained related schemas separately, so misalignment happened and slowed the team down. I led an auto-generation mechanism: backend continued defining schemas in Python, then we converted them into JSON Schema and TypeScript interfaces. After the mechanism became mature, we pushed further and automated more of the data node implementation. A bottleneck that used to slow the team down became more than 10 times faster.
>
> The common thread is that no one directly told me to do these things in this way. I kept looking at different teams' workflows, asking what can be improved, testing the possibility with small demos or automation, and then turning useful experiments into real impact.

## 追問準備

如果問「這跟 SA 有什麼關係」：

> In customer-facing work, I think the same mindset matters. Customers may describe one requirement, but the real opportunity may be a workflow bottleneck behind it. A good SA should not only respond to the request, but also identify the bigger opportunity, test a practical path, and help stakeholders move toward adoption.

如果問「你怎麼避免只是做 side project，最後沒人用」：

> I try to find a real pain first, then build a small demo quickly and put it in front of early users. If nobody cares, I stop or adjust. If users keep coming back, then I invest more and turn it into a real workflow.

如果問「這是不是 scope creep」：

> It can become scope creep if the direction is disconnected from real pain. So I try to keep the loop short: observe pain, build a small demo, test with users, and only expand when the feedback shows it is worth it.

如果問「除了 AI workflow，還有其他 bias for action 的例子嗎」：

> One example is schema auto-generation for xDS. Backend and frontend were maintaining related schemas separately, and misalignment became painful. I led a pipeline where backend schemas defined in Python could be converted into JSON Schema and then TypeScript interfaces. Later we automated more of the data node implementation as well. It turned a recurring team bottleneck into something more than 10 times faster.
