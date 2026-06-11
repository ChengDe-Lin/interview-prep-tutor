# Data & AI Industry Expertise

## HR 想確認什麼

你能不能講清楚真實世界的 architecture、design decision、trade-off，而且有技術深度，不只是說自己對 AI 有興趣。

## 主故事

Two-part answer:

1. xDS clinical data architecture
2. RAG / Chatbot / Knowledge Assistant + Databricks 連結

參考：

- `stories/graphql-to-xds.md`
- `databricks/sa_pitch.md`
- `databricks/product_anchors.md`

## 備用故事

- GraphQL to xDS
- Micro-Frontend Transformation

## SA 角度

這題可以分兩段講。

第一段用 xDS 證明你真的做過 data architecture trade-off：

- healthcare 裡 data 和 clinical context / current patient 高度耦合。
- 不能讓不同 feature 在同一時間操作不同病人的資料，否則可能看錯資料或寫錯資料。
- 你從 backend senior 轉進 frontend architecture team，是因為前端大量 suffer from data consistency，也對後端造成過量 request。
- xDS 不是傳統 Databricks backend data platform，但它很像 clinical context 的 governed shared data layer。
- 核心是 centralized data store、clinical-semantic tree structure、single source of truth、multi-version schema tolerance、permission、lifecycle、hooks、lazy loading / GC。
- 你要講清楚每個設計都有 trade-off，例如用額外 memory 換一致性、多版本兼容和 adoption simplicity。

第二段用 agentic workflow 證明你真的做過 production AI workflow design，再用 RAG / chatbot side projects 連到 Databricks 產品方向：

- agentic workflow 不是只接 model API，而是 workflow、context、tooling、checkpoint、feedback loop 的系統設計。
- dynamic context engineering：不同階段要給 agent 不同 context，避免 context 太少做錯、太多失焦。
- MCP / skill / sub-agent control：把能力拆成可控的 tool、skill、specialized agent，而不是讓一個 agent 什麼都做。
- checkpoint / time-machine mechanism：讓 agent workflow 可以回到先前狀態，避免錯誤一路累積。
- auto feedback loop：把過去犯過的錯、review feedback、validation result 變成可重用記憶。
- RAG / chatbot 是 side projects，但痛點很真實：資料散在 ticket、LINE group、PRD、圖片；需要 retrieval、metadata、permission、freshness、feedback loop。
- 這自然連到 Unity Catalog / governed data / AI Search / Mosaic AI / production workflow。

## Opening STAR 口說稿

先講 data architecture，再接 AI architecture。

> I would split this into two parts. One is data architecture in a clinical product, and the other is AI architecture around agentic workflows and RAG-style systems. Let me start with the data side, because that is where I built some of my deepest system design experience.
>
> At that time, I had just been promoted to Senior Engineer in the backend team. And our frontend teams were suffering from data consistency problems, and the backend was also receiving too many duplicated requests from different features. So the company wanted me to bring my backend experience into the frontend architecture team and help solve this problem. That was also the point where I started moving from backend into full-stack architecture.
>
> The core problem was that, in a healthcare system, data is highly coupled with the current clinical context and the current patient. We absolutely do not want different features on the same screen to operate on different patient or different encounter data at the same time. If that happens, one feature may read the wrong patient, another feature may write to the wrong encounter, and the impact can become a real clinical safety issue.
>
> The traditional pattern was that every feature talked to backend APIs independently. That sounds simple, but in our case it created duplicated requests, inconsistent assumptions, and too many places where patient context could drift. So we designed xDS, which stands for xHIS Data Store. It later became a government-recognized patent.
>
> The main idea of xDS is to create a centralized data store for clinical context. Instead of each feature fetching and owning its own data independently, xDS organizes patient-related data into a semantic tree structure. The path of each node makes it clear which clinical scenario the data belongs to and what characteristics the data has. This made the data model much easier to read, reason about, and maintain across different features and systems developed by different teams. Data reads and writes go through this shared layer, so they are always aligned with the same current patient and clinical context.
>
> Building this centralized store created many design challenges. We had to provide a clear data schema for frontend users, support compatibility across multiple backend versions, handle breaking changes, enforce permission control, manage data lifecycle, and even provide hooks so different features could attach special handlers when needed.
>
> The whole design was not just "put data in one store." For example, a key design was multi-version tolerance, which came from platform thinking. As a medical platform, we had to assume that different submodules could be built by different teams, and each team may depend on a different version of the data interface. We cannot force every team to migrate every time one data contract changes.
>
> There were different ways to solve this. One intuitive option was to implement conversion or transformation logic between versions on the frontend, similar to how a backend may support multiple API versions on top of the same database. But that would add a lot of complexity to the frontend data layer, especially when we also needed to preserve a single source of truth. We also did not want the same transformation logic to be implemented separately in both frontend and backend.
>
> After evaluating the actual clinical workflow, we found that the amount of data shown for one patient and one screen is usually bounded. Modern client hardware could afford the extra memory. So for versioned data nodes, we chose to maintain multiple versions when needed and let consistency be resolved through the database and duplicated backend API calls, instead of implementing complex conversion logic in the frontend. In other words, we traded extra memory and API calls for a simpler and more maintainable architecture.
>
> We also needed a strong lifecycle strategy. When users switch patients, we quickly clean up stale data. Even for a long-stay patient, the data shown in one screen is still within a manageable range. With lazy loading and a reasonable garbage collection strategy, we could keep the memory usage under control while preserving the platform benefits.
>
> So even though xDS is not the same as a traditional backend data platform, I see it as a governed shared data layer for clinical context. The lesson I took from it is very relevant to data and AI systems: the hard part is not only moving data around. It is defining ownership, context, versioning, permissions, lifecycle, and safe access patterns so that different consumers can use the same data reliably.

## AI Architecture 接續稿

這段是 data part 後面的 AI part。主軸放 agentic workflow，RAG / chatbot 只當 side project 和 Databricks 連結。

> On the AI side, I have worked on RAG and chatbot-style systems, but the area where I spent the most effort was agentic workflow design: how to make agents work reliably inside a real product development workflow.
>
> The first thing I learned is that agentic workflow is mostly a context engineering problem. If we give the agent too little context, it makes wrong assumptions. If we give it too much context, it loses focus or follows the wrong instruction. So we had to think carefully about dynamic context: what context should be visible to each agent at each moment, what should be moved into a skill, what should be handled by a sub-agent, and what should be exposed through MCP tools.
>
> For example, product requirements, component rules, API contracts, design guidelines, previous decisions, and validation results should not all be dumped into one prompt. Different stages need different context. A UI generation agent needs product and component context. A validation agent needs screenshots, expected behavior, and test criteria. A backend integration agent needs API contracts and data logic. Separating those responsibilities made the workflow much more controllable.
>
> Another important part was the control mechanism. We used MCP tools, skills, and sub-agents to separate responsibilities. Skills carry long-term knowledge that the main agent should understand, like our business context and coding conventions. MCP tools are for capabilities we can execute more deterministically, or memories we want to manage centrally and publish as a package so everyone can receive updates. Sub-agents are for tasks that need deeper investigation with their own isolated context. The goal was not to make one giant agent, but to design a workflow where each part sees only the information it needs.
>
> We also designed checkpoint and time-machine mechanisms, especially around visual judgment and E2E validation. We know agents may not get everything right in one shot, and each fix can accidentally break something else. So we record the result of each round, and if the output gets worse, we can roll back to the best previous version and continue from there. In practice, we used commits as the checkpoint mechanism. We also connected notifications so a human can step in when needed, instead of letting the AI fail silently.
>
> Finally, we worked on feedback loops. When the workflow hits an error, the agent is guided to update a mistake handbook. After a research agent finishes, it evaluates whether the research result is valuable enough to write back into memory. After the whole workflow completes, an async process reviews logs, extracts lessons learned in a structured way, and stores them back into memory. Over time, the workflow can avoid mistakes it has already made before.
>
> And, yeah, let's talk about some RAG and chatbot-style side projects when I saw colleagues suffering from scattered knowledge. The data was spread across tickets, communication apps, PRDs, screenshots, and documents. That exposed many practical problems: how to manage retrieval, what metadata to store, how to keep context fresh, how to handle permissions, and how to build a feedback loop so the system can accumulate knowledge.
>
> That is why Databricks became more interesting to me. After seeing the product direction, I realized that some problems we solved manually may have simpler platform approaches. For enterprise AI, the hard part is not only calling a model. It is governed data, retrieval, permission, model and workflow management, evaluation, and production feedback loops. Those are problems I have actually touched, even if my implementation was in a different product context.

## 追問準備

如果問「這聽起來比較像 frontend state management，為什麼算 data expertise」：

> I agree it is not a warehouse or lakehouse problem. But it is still a real data architecture problem. We had to define data ownership, clinical context, schema/version compatibility, permission, lifecycle, and consistency guarantees across many consumers. The domain was frontend clinical workflow, but the architectural questions were very similar to shared data platform design.

如果問「為什麼不用每個 feature 自己 call API 就好」：

> In a normal product, that may be acceptable. In a clinical workflow, the current patient and clinical context must be consistent across the screen. If each feature owns its own API calls and local state, they can drift. That creates duplicated requests, inconsistent assumptions, and in the worst case wrong-patient read or write risk.

如果問「centralized store 會不會變成 bottleneck」：

> That was one of the main trade-offs. We avoided making it a single huge object. The store was structured as clinical-semantic data nodes, each with ownership boundaries, lifecycle rules, and APIs. The goal was centralized consistency, but modular ownership.

如果問「你怎麼處理 backend breaking changes」：

> We designed xDS with multi-version tolerance. Different widgets or features could depend on different versions of a data node, so a backend change did not force every consumer to migrate at the same time. That cost extra memory and compatibility logic, but it reduced migration risk and helped adoption.

如果問「memory cost 怎麼評估」：

> We looked at the clinical workflow. The store is scoped around the current patient and current screen. When switching patients, residual data is cleaned quickly. Even for long-stay patients, the amount of data shown in one screen is bounded, and we use lazy loading and garbage collection strategy. So the memory cost was acceptable compared with the safety and consistency benefits.

如果問「你怎麼設計 RAG architecture」：

> I would start from the knowledge sources, freshness requirement, permission model, retrieval strategy, evaluation set, and user workflow. The model is only one layer. The harder part is usually context quality and governance.

如果問「dynamic context engineering 是什麼」：

> It means deciding what context each agent should see at each stage. The hard part is balance. Too little context creates wrong assumptions, but too much context creates noise and conflicting instructions. So I separate context into main-agent instructions, skills, sub-agent-specific context, MCP tools, and retrieved knowledge.

如果問「MCP、skill、sub-agent 差在哪」：

> I manage context very strictly. Skills are for long-term knowledge the main agent should see, like business context and product rules. MCP tools are for deterministic capabilities, system integrations, and centrally managed memories that we can publish as a package, so when we update the remote package, everyone receives the latest information. Sub-agents are used when a simple action or tool is not enough. For example, a deep research sub-agent can inspect dependency source code, investigate or debug in detail, and then return only the conclusion to the main agent. The principle is that each agent should only see the context it needs.

如果問「checkpoint / time-machine 解決什麼問題」：

> We mainly use it around visual judgment and E2E validation. Agents do not always fix things monotonically. One change may improve one part but break another part. So we record the result of each round and use commits as checkpoints. If the result becomes worse, we restore the best previous version and continue from there. We also send notifications when the workflow needs human involvement, so the AI does not fail silently.

如果問「feedback loop 怎麼做」：

> There are several layers. First, when errors happen during the workflow, the agent is prompted to update a mistake handbook. Second, after a research agent is used, it judges whether the research result is valuable enough to write back into memory. Third, after the workflow completes, an async process scans logs, summarizes lessons learned, and stores them into memory in a structured format. The goal is that the system should not make the same mistake every time from scratch.
