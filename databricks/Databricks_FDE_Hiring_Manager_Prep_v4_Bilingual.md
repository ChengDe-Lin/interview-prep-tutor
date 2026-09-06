# Databricks Forward Deployed Engineer — Hiring Manager Interview Prep v3

**候選人：** ChengDe Lin  
**職位：** Forward Deployed Engineer  
**面試：** 60 分鐘 Hiring Manager Interview — Ankur Khosla, Sr. Manager, FDE  
**文件原則：**
- **中文 = 給自己讀、理解、複習的部分**
- **英文 = 面試時可以直接說出口的部分**
- 技術名詞保留英文，不強制翻譯
- 這是一份 living document，後續每完成一張 story card 或 mock interview 就更新

---

# 1. 我的核心定位

Databricks 這輪不要把自己包裝成 Spark expert，也不要硬裝成純 Data Engineer。

我的最佳定位是：

> **Full-stack / platform engineer by depth, AI builder by recent focus, customer-facing problem solver by how I work.**

中文理解：

我最深的底子還是 full-stack / platform / backend / distributed systems。最近兩年把這套工程能力延伸到 production AI、agent orchestration、evaluation、workflow automation。

我真正適合 FDE 的原因，不是因為我每個 Databricks product 都已經會，而是因為我很習慣：

- 進入一個模糊、複雜的問題
- 理解 stakeholder 真正需要什麼
- 自己動手 build
- 找出 bottleneck
- 持續調整 architecture
- 最後把系統推到 production 並讓人採用

希望 Ankur 面試完記得的不是「這個人會很多 AI buzzword」，而是：

1. 我是 hands-on builder
2. 我知道怎麼讓 AI 在成熟 enterprise product 裡變得 controllable
3. 我能跟 engineer、designer、PM、senior leadership 溝通
4. 我不是只交付 prototype，而是追 adoption / outcome
5. 我會看 end-to-end workflow，而不是只優化局部

---

# 2. Interview Focus 對應故事

| Databricks Focus | 主故事 | 要證明什麼 |
|---|---|---|
| Builder Mindset | xCraft → xCraft for Design → xDesign | build → observe → bottleneck shift → redesign |
| Data & AI Industry Expertise | xCraft / xDesign / xSupport | production AI architecture、evaluation、RAG、agent workflow |
| Customer Advisor Skills | Designer workflow redesign / Add-on migration | 理解真正 user workflow、改 architecture、影響 stakeholder |
| Execution & Adoption | xCraft/xDesign / Add-on Framework | 真的有人用、推 rollout、處理 adoption cost |
| Bias for Action | Schema-Driven Development | 看到 recurring pain，主動做，不是等 assignment |
| Team Fit | 整體 profile | full-stack depth + AI + enterprise + executive communication |
| Failure / Learning | one-shot autonomy 不適合 designer | customer feedback 改變 product/architecture |
| Architecture Failure | UI / logic boundary 太晚建立 | explicit ownership、hard constraints、migration lesson |

---

# 3. About Me

## 我自己要記得的結構

不要照履歷從第一份工作念到現在。

三段就好：

1. **底子**：5 年 enterprise healthcare，backend / platform / production
2. **代表性 platform story**：Add-on Module Framework
3. **最近 focus**：xCraft / xDesign + executive communication

最後收回 Why FDE。

## 面試口說版

> Hi Ankur, I’m ChengDe. I’m currently a Senior Software Engineer at ASUS Intelligent Cloud Service, where I’ve spent the last five years building enterprise healthcare software across full-stack applications, backend and distributed systems, and more recently production AI systems.
>
> I would describe myself primarily as a builder who likes taking ambiguous problems all the way from understanding the workflow, to designing the architecture, writing the code, and eventually getting people to actually use what I build.
>
> Earlier in my career, I worked heavily on backend and platform engineering. I maintained around ten microservices and hundreds of APIs, rebuilt services around authentication, database access, Redis Cache, kubernetes deployments and solving production incidents.
>
> One project that shaped how I think about platforms was our add-on module framework. We transformed a tightly coupled healthcare application into a modular platform that now spans more than 300 independently deployable widgets and has been adopted across our engineering teams.
>
> More recently, my focus has shifted heavily toward AI-native engineering. I designed and built xCraft and xDesign, agentic systems that connect design, implementation and validation. Instead of treating LLMs simply as coding assistants, I built the orchestration and control layers around them so they can work reliably inside our production environment. These systems are now used in real workflows by our engineers and design team.
>
> I’ve also had an experience of leading more than ten GenAI seminars for hundreds of colleagues across our organization, and I regularly present the progress, milestones, and technical direction of our initiatives to senior leadership, including our General Manager and the company’s Vice Chairman. I’m often the person brought in when the discussion needs to go deeper into the technical details.
>
> Across these projects, I’ve often been the person who takes a problem from discovery and architecture all the way through hands-on implementation, adoption, and communicating the result to leadership. I learn quickly and I’m comfortable taking ownership of unfamiliar problems, which helped me move into a Senior role within two years and also earn our Code Champion Award.
>
> This combination is what attracted me to FDE. I want to stay deeply hands-on technically, but I also want to move closer to customers — to understand more real-world problems, build solutions with them, and bring what I build to a much broader set of users and organizations. That’s really what I’m looking for in my next role.

# 4. Why Databricks / Why FDE

## 我自己要記得的重點

不要回答：

- Databricks is a leader in AI
- Lakehouse is exciting
- I love innovation

太 generic。

我要講兩件事：

### A. 技術方向跟我現在的工作非常接近

我最近真正一直在處理的問題是：

AI model 本身不是 production system。

要真的進 enterprise workflow，需要：

- trusted data
- permissions / governance
- tools
- context
- evaluation
- operational workflow
- serving
- adoption

Databricks 對我有吸引力，是因為它不是只做單一 model layer，而是把 data + governance + AI + app 放在同一個 platform thinking 裡。

### B. FDE 很接近我最喜歡的工作模式

我喜歡 customer-facing，但不是想離開 coding。

我要的反而是：

> 能理解 user / customer，會讓我變成更好的 engineer。

## 面試口說版

> There are really two reasons why Databricks stands out to me.
>
> The first is the technical direction of the company. Over the last two years, a lot of my own work has moved from experimenting with individual LLM capabilities to asking a harder question: how do you make AI useful inside a real enterprise system, where the agent needs trusted data, permissions, tools, evaluation, operational workflows, and a path to production?
>
> What interests me about Databricks is that data engineering, governance, AI, and applications are increasingly being brought together instead of treated as isolated pieces. I think that becomes increasingly important as enterprises move from AI demos to systems that actually participate in business workflows.
>
> The second reason is specifically Forward Deployed Engineering.
>
> When I read about the role, it felt unusually close to the parts of my current job that I enjoy most. I like entering a problem that is not fully specified, understanding the user’s real constraints, building something hands-on, and then iterating until it works in production and people actually adopt it.
>
> My deepest experience is probably in full-stack and platform engineering, but recently I have built a lot of production AI and agent systems, and I also have experience with data pipelines and enterprise integration.
>
> I don’t want my next role to move me away from engineering. I want a role where being able to understand customers and communicate well actually makes me a better engineer. FDE seems designed around exactly that combination.

---

# 5. Flagship Impact Story — xCraft → xCraft for Design → xDesign

# 5.1 這個故事真正的主題

不要講成：

「我做了兩個 agent。」

真正故事是：

> **Build → observe → bottleneck moves → redefine the problem → build the next abstraction.**

三階段：

1. **xCraft**：讓 general-purpose coding agent 在 mature healthcare product 裡變得 controllable
2. **xCraft for Design**：把 designer → engineer 的 handoff / translation gap 大幅消掉
3. **xDesign**：把 designer 的 routine workflow 本身轉成 agentic workflow

最重要的 insight：

> xCraft 成功之後，engineering 不再是 bottleneck，bottleneck 左移到 design。

---

# 5.2 xCraft

## 我自己要理解的核心

xCraft 的核心不是「我們比 Claude Code 更會寫 code」。

恰恰相反，我們明確不想跟 Anthropic / OpenAI 重複造輪子。

我們做的是：

> **駕馭越來越強的 coding agent，讓它在我們 domain 裡可控。**

我們真正累積的是：

- domain knowledge
- context
- task decomposition
- sub-agent isolation
- reference retrieval
- execution state
- testing
- requirement coverage
- platform constraints

### controllability 是什麼？

不是「prompt 寫得很好」。

而是：

> **不要相信 model 自己會乖。可以變成 hard constraint / observable state / deterministic check 的，就不要只靠 prompt。**

例如：

- requirement traceability
- UI / logic file ownership
- scripted Playwright
- timeout / retry
- handoff loop guardrails

## 面試一句話

> **We didn’t try to build a better coding agent. We built the system that makes increasingly capable coding agents controllable inside our domain.**

---

# 5.3 Requirement Traceability

## 我自己要記得

Agent 面對長 spec / 複雜 business logic 時，會有一個很危險的 failure mode：

**silent omission**

它不是報錯，而是自己覺得某句可以跳過，最後少做一部分。

我的做法：

1. dedicated agent 把 spec 每一句拆成 requirement unit
2. 每個 unit 放 tag
3. xCraft implementation 時在對應 code / comment 引用 tag
4. 最後 deterministic script 掃 tag
5. 哪些 tag 完全沒出現，就知道可能漏做

最重要的 technical boundary：

> 這不能 prove correctness，只能 prove coverage。

## 面試口說版

> One failure mode I observed was that coding agents could silently omit parts of long requirements, especially when the business logic became complex.
>
> Instead of trying to solve that only through prompting, I designed a traceability mechanism.
>
> A dedicated agent decomposes the specification sentence by sentence and assigns traceable tags to each requirement unit. During implementation, xCraft references those tags in the relevant code or comments, and a deterministic script scans for any missing tags before completion.
>
> It doesn’t prove correctness, but it gives us a cheap deterministic coverage check on top of a probabilistic coding agent.

---

# 5.4 xCraft for Design

## 為什麼需要

xCraft 把 implementation 變快之後，design 變成 bottleneck。

現有 design AI 工具常常活在：

- Figma
- generic HTML/CSS
- generic component system

但 production code 是另一套。

這會產生 translation：

design artifact  
→ engineer / coding agent rebuild  
→ production output

問題：

- Figma component 跟 real component drift
- designer 看到的跟 production 不一樣
- engineer visual translation 會有偏差
- designer 還是要到 stage 再 review

所以我們沒有只是「讓 handoff 變快」，而是想辦法把 handoff 本身消掉。

## 面試一句話

> **Instead of making the design-to-engineering handoff faster, we tried to remove as much of the handoff as possible.**

## 我們做的調整

xCraft 原本是 one-shot、production-oriented：

- full QA
- 長時間 autonomous execution

但 designer workflow 不一樣。

Designer 要的是：

- high iteration rate
- quick rough output
- compare alternatives
- fast refinement

所以做了 lightweight xCraft for Design：

- focus UI
- fast response
- predefined design skills/actions
- direct access to real codebase
- skip expensive production QA during exploration
- reference registry / indexing 找 existing patterns

## 最重要的 Customer Advisor lesson

> **The best automation wasn’t maximum autonomy. It was the interaction model that matched how the user actually makes decisions.**

---

# 5.5 xDesign

## 我自己要記得的核心

xCraft for Design 解掉 handoff，但 designer 仍然在 critical path。

所以新問題變成：

> 能不能把 designer 的 routine workflow 本身拆解、固化、agent 化？

不要說「排除 designer」。

面試要說：

> **Move humans away from routine execution and keep them focused on judgment, ambiguity, and exceptions.**

---

# 5.6 Designer Workflow → Skills

## 我自己要記得

不是做一個 giant prompt：

「你現在是一個 designer。」

而是跟 designer 合作，把 daily workflow 拆成 stages：

1. user / scenario research
2. requirement / reference document understanding
3. external guideline search
4. task decomposition
5. experience / historical design search
6. internal design guideline retrieval
7. multiple directions
8. lightweight POC
9. compare
10. select direction
11. refine
12. final UI code
13. business logic phase

skill 不是單純 prompt。

conceptually 可以包含：

- objective
- context
- tools
- knowledge source
- expected output
- validation criteria
- transition condition

## 面試一句話

> **A skill represents one repeatable unit of professional reasoning; the orchestrator manages how those skills form an end-to-end workflow.**

## 面試口說版

> At a high level, we don’t try to encode “how to be a designer” into one giant prompt.
>
> We decompose the designer’s actual workflow into stages and turn each stage into a reusable skill with a clear purpose, context, tools, and expected output.
>
> The workflow starts with understanding the user scenario and requirements, then searches historical designs and internal guidelines, decomposes the work into smaller design problems, explores several possible directions, asks xCraft to build lightweight prototypes, compares the rendered results, selects a direction, and then iterates through refinement.
>
> The final output is not just a mock-up. It is UI source code grounded in the real production component system.

---

# 5.7 Visual Judge

## 我自己要記得

xDesign 不只是文字 reasoning。

它有 dedicated visual-judge sub-agent，判斷 criteria 來自 designer 原本真的會看的東西：

- 完成操作需要多少 clicks / interactions
- information density / crowdedness
- button / control 是否 intuitive
- visual comfort
- consistency

Designer 給我們的重要 insight：

很多 design 不是真的能靠腦內想像比較。

要畫出來、放在一起才知道：

- 哪個太擠
- 哪個 hierarchy 比較舒服
- 哪個組合搭起來比較好

所以 xDesign 也照這個 process：

multiple directions  
→ xCraft build lightweight POC  
→ screenshot  
→ visual judge  
→ compare / refine

## 面試一句話

> **For visual tasks, we prefer evaluating observable outputs rather than trusting the agent’s own reasoning about quality.**

---

# 5.8 xFabric / Cross-Agent Handoff

## 我自己要理解

xDesign 跟 xCraft 不一定在同一台 machine，也不一定有一樣的 environment。

xCraft 有真正的 dev/runtime environment。

xDesign 不需要自己再把整套服務跑起來。

所以透過 xFabric：

xDesign  
→ handoff scoped task  
→ xFabric route  
→ xCraft build / run / screenshot  
→ artifact 放指定位置  
→ handoff 回 xDesign  
→ visual judge

Architecture principle：

> **Environment ownership is explicit.**

xCraft owns:
- build
- runtime
- screenshot
- coding environment

xDesign owns:
- design reasoning
- evaluation
- refinement decision

## 面試口說版

> The collaboration is mediated by another platform I built called xFabric.
>
> The agents can run on different machines and environments, so I didn’t want them to depend on shared runtime state.
>
> xDesign hands a scoped task to xFabric, xCraft receives it, performs the implementation inside the development environment it already owns, renders the result, and writes the requested screenshots into agreed locations.
>
> xDesign then evaluates those artifacts without needing to recreate the full development environment itself.

---

# 5.9 Loop Control / Human Escalation

## 我自己要記得

xDesign 有 stop authority。

如果 visual score / criteria 足夠高：

→ pass

如果還不夠：

→ 再給 xCraft scoped refinement task

如果：

- iteration 太多
- 沒辦法 converge
- xDesign / xCraft ping-pong
- low confidence

→ human review

xFabric 也有 anti-loop guardrail。

## 面試一句話

> **We automate the repeatable path and explicitly design escalation for cases where autonomous convergence fails.**

---

# 5.10 xDesign Result

目前：

- 15–20 個 real new design tasks
- 只選 known / relatively simple interaction patterns
- 可以平行跑大量 task，彼此不干擾
- within validated scope，design capacity 已經不再是 limiting factor
- designer 自己估計約省 90% manual effort
- 人現在主要做 final review / exception

要誠實說：

> 90% 是 designer 對這 15–20 個 validated tasks 的估計，不代表所有 design work。

## 面試口說版

> At the moment, xDesign has completed around 15 to 20 real design tasks.
>
> We deliberately started with relatively well-understood interaction patterns because we don’t think the knowledge base is mature enough yet for highly novel or complex UX problems.
>
> Within that validated scope, our designers estimate that roughly 90% of their manual effort is removed. Their role shifts mainly toward final review and handling ambiguous cases.

---

# 5.11 Knowledge Flywheel

## 我自己要理解

我們的 long-term moat 不是 model 本身。

Model 會變強。

我們自己的 domain knowledge 也要 compound。

三層：

### Layer 1 — Execution Log
append-only raw history

### Layer 2 — Memory
定期 review execution log，抽 reusable knowledge

### Layer 3 — Skill
把穩定、高價值 knowledge distill 成 agent runtime 真正讀的 skill

核心 trade-off：

**continuous learning vs context efficiency**

不希望 agent 每次都把所有過去 execution history 背進 context。

## 面試一句話

> **Models will improve, but our domain knowledge should compound as well.**

## 面試口說版

> One thing I became very deliberate about is separating execution from learning.
>
> Every run produces an append-only execution history. A separate process periodically reviews those histories and extracts reusable memories, and the most stable patterns are eventually distilled into the skills the execution agents consume.
>
> That lets us continuously accumulate domain knowledge without making every agent carry an ever-growing context window.

---

# 5.12 xCraft / xDesign 最重要的 Failure Stories

## Failure A — Designer 不需要 one-shot autonomy

這張最適合 Databricks Customer Advisor。

原本 assumption：

好的 agent = 一次拿 requirement，跑幾小時，full QA，接近 production-ready。

真的跟 designer 合作後發現錯了。

Designer 要的是：

- 快
- rough
- compare
- iterate

所以 architecture 改成 lightweight mode。

## 面試口說版

> One assumption we got wrong was what “good automation” meant for designers.
>
> xCraft was originally optimized for engineers. We wanted it to take a requirement, work autonomously for a few hours, perform extensive quality checks, and return something close to production-ready.
>
> When we started working directly with designers, we realized that was the wrong interaction model.
>
> Designers didn’t want to wait hours for a highly polished result. Their workflow was inherently iterative — they wanted to see a rough direction quickly, react to it, compare alternatives, and refine it.
>
> So I changed the architecture. I built a lighter xCraft workflow specifically for design, removed expensive validation that wasn’t useful during exploration, and invested in fast reference retrieval.
>
> The lesson for me was that maximum agent autonomy isn’t always the right product goal. You have to optimize the AI system around the way the user actually makes decisions.

---

## Failure B — UI / Logic Ownership Boundary 太晚做

這張比較適合 technical failure / Apple，也可以 Databricks drill-down。

原本 xCraft end-to-end 所以可以改所有 code。

xDesign 出現之後，xDesign 已經是 visual authority。

如果 xCraft 在 logic phase 又偷偷動 UI，review 的畫面跟 final output 就可能不一樣。

所以後來加 hard restriction：

- UI phase 不能碰 logic
- logic phase 不能碰 UI

問題是導入得太晚，導致數十個 widget architecture rewrite / migrate。

## 面試一句話

> **Multi-agent systems need explicit ownership boundaries, not just good prompts.**

---

## Failure C — Human request scale ≠ Agent request scale

原本 human：

- 一張 screenshot
- 一個 adjustment

xDesign：

- 一次 10+ screenshots
- 一堆 refinement
- context 爆炸

所以後來增加：

- context/planner
- finer task decomposition
- sub-agents
- image context isolation

## 面試一句話

> **We initially assumed an agent would behave like a faster human user. That was wrong. Agent-to-agent workflows operate at a different scale and granularity.**

---

## Failure D — Visual Judge Cost 比人高

這是很好的 AI economics story。

Human 一眼可以看整個大畫面。

Multimodal agent 大圖容易失焦，所以我們會 crop / 限制 screenshot 範圍。

結果：

- image 數量多
- context cost 高
- refinement round 多

改善：

- 拆 visual judge sub-agents
- 每個只看跟自己 task 有關的 screenshot
- 不帶 unrelated image context

現在 cost 有 closer to human，但還不是完全 solved。

## 面試口說版

> One challenge we’re still actively working on is the economics of visual evaluation.
>
> A human designer can inspect a large screen almost instantly and notice several issues at once. Multimodal agents are less reliable when the visual field becomes too large, so we often have to give them tightly scoped screenshots.
>
> That improves focus, but it also means the workflow may inspect many images and carry much more visual context, which increases cost.
>
> One optimization I introduced was to split the visual review across specialized sub-agents so each agent only receives the screenshots relevant to its decision.
>
> That brought the cost closer to human review, but knowledge coverage and repeated refinement are still active optimization areas.

---

# 5.13 90 秒 Impact Story

> One project I’m particularly proud of is an AI-native product development workflow I designed and built called xCraft and xDesign.
>
> xCraft started with a simple goal: let coding agents build real frontend features inside our healthcare platform. The hard part wasn’t code generation — it was controllability. I built an orchestration layer around Claude Code and Codex that manages context, task decomposition, domain knowledge, testing and deterministic checks so the agents follow our existing architecture instead of inventing their own.
>
> It has now automatically delivered close to a hundred real features.
>
> Interestingly, once implementation became much faster, the bottleneck moved upstream to design.
>
> I first built a lightweight version of xCraft for designers so they could work directly against the production codebase. Then I worked with our design team to decompose their real workflow — research, reference search, exploration, prototyping, selection and refinement — into reusable skills and built xDesign to orchestrate them.
>
> xDesign and xCraft collaborate through xFabric. xDesign can ask xCraft to produce several lightweight implementations, evaluate the actual rendered results, and iterate autonomously until the design passes our criteria or needs human escalation.
>
> So far it has completed around 15 to 20 real design tasks, and within the scope we’ve validated, designers estimate roughly a 90% reduction in their manual effort.
>
> What I’m most proud of is that the architecture evolved from a coding tool into an end-to-end workflow by continuously following where the bottleneck moved.

---

# 5.14 3 分鐘 Impact Story

> One project I’m particularly proud of is an AI-native product development system I designed and built called xCraft and xDesign.
>
> It started with a fairly focused problem. We have an add-on framework for our healthcare platform, and we wanted AI agents to develop frontend features directly inside that production environment.
>
> The challenge was not simply whether Claude or Codex could write frontend code. In a mature healthcare product, consistency and predictability are often more important than creativity. So my main question was: how do I make a general-purpose coding agent controllable enough to contribute safely to an existing product?
>
> I built xCraft as an orchestration layer on top of coding agents rather than trying to replace them. It manages task decomposition, context, specialized sub-agents, knowledge retrieval, execution state, testing, and requirement-to-code consistency.
>
> Wherever possible, I also convert probabilistic agent behavior into deterministic controls. For example, I built a requirement-traceability mechanism that tags individual requirements and programmatically detects anything the agent may have silently skipped.
>
> xCraft has now automatically delivered close to a hundred real features. But its success exposed a new problem: we had accelerated engineering so much that the bottleneck simply moved upstream to design.
>
> Initially, I built a lightweight version of xCraft for designers so they could iterate directly against the real codebase instead of designing in Figma or generic HTML and then asking engineers to translate that design again.
>
> So I worked closely with our design team to break down their actual daily workflow into reusable skills: researching the user scenario, finding relevant historical designs and guidelines, decomposing the requirement, exploring several possible directions, creating lightweight prototypes, selecting a direction, and refining it.
>
> I then built xDesign to orchestrate those skills and connected it to xCraft through another platform I built, xFabric. xDesign can ask xCraft to implement lightweight alternatives, inspect the rendered screenshots through a visual-judge agent, and issue another scoped refinement task when necessary.
>
> The agents continue that loop until the design passes the acceptance criteria. If they fail to converge or exceed an iteration limit, the system escalates to a human instead of looping indefinitely.
>
> At the moment, xDesign has completed around 15 to 20 real design tasks. We deliberately started with relatively well-understood interaction patterns, and within that validated scope, our designers estimate that it removes roughly 90% of their manual effort.
>
> The biggest lesson for me was that the goal shouldn’t be to build the most autonomous agent possible. You have to understand where the real bottleneck is, preserve the right human judgment, and turn the repeatable parts of the workflow into explicit, observable, and controllable systems.

---

# 6. Story Card — Add-on Module Framework + xDS + xEmulator

# 6.1 這個故事真正的主題

不要講成：

「我做了 micro-frontend framework。」

真正故事是：

> **把一個高度耦合的 healthcare application 轉成 extension platform，讓不同 team、hospital-specific implementation、third-party developer，甚至現在的 AI agent，都能更安全、獨立地 contribution。**

整個 architecture 的演進可以記成：

1. shared-state coupling → xDS
2. giant frontend / release coupling → Add-on Modules
3. different runtime needs → in-page / off-page / Add-on API
4. hospital-specific logic → Action contract
5. independent ownership loses integration visibility → xEmulator
6. explicit platform boundaries → human + AI contributors

最核心的 platform question：

> **What is still preventing teams from contributing independently and safely, and can that responsibility be moved into the platform?**

---

# 6.2 Stage 1 — xDS

## 我自己要記得

最早每個 feature 自己抓資料、自己管理 state。

feature A 跟 feature B 需要同步時，就自己做 watcher / point-to-point communication。

時間一久：

- frontend state 很亂
- feature 彼此耦合
- 很難知道資料更新會影響誰

醫療場景又特別敏感：

> 每一個操作都必須是正確病人的資料。

所以在拆 UI 以前，先要把 state model 整理好。

## 面試一句話

> **We couldn’t safely decouple the UI before we decoupled the state model.**

## 面試口說版

> Before the broader modularization effort, one of our biggest problems was shared-state coupling.
>
> Individual frontend features fetched and managed their own data, and when two features needed to stay synchronized they often created their own watchers or point-to-point communication.
>
> Over time, that became very difficult to reason about. In healthcare, it was also more than a maintainability issue because every operation and displayed state had to correspond to the correct patient.
>
> So xDS became the shared data and patient-context foundation before we started aggressively separating the UI.

---

# 6.3 Stage 2 — Application Scale Ceiling

## 我自己要記得

我剛從 backend 轉到 platform architecture team 時：

- outpatient app 已經塞很多 specialty / workflow
- 一個 repo 越來越大
- 改 local feature 容易踩別人
- frontend bug 多
- build / deployment time 增長
- onboarding / training 越來越慢

真正重要的 insight：

這不是單純 productivity 問題。

如果要變 platform：

third-party / internal team 每做一個小 feature 都要理解 giant app，

那 ecosystem 一定 scale 不起來。

## 面試一句話

> **For a product to become a platform, the cost of contribution has to go down as the ecosystem grows, not up.**

---

# 6.4 Stage 3 — Add-on Modules

## 我自己要記得

核心就是把 feature 拆小。

早期要解的問題：

即使 feature 獨立，有時還是要同時出現在同一畫面。

有 evaluate iframe 等方案，最後選 Module Federation 做 in-page composition。

但面試不要把 story 講成「我們用了 Module Federation」。

真正 architecture：

- ordinary Vue feature 能被 framework consume
- host 變 shell
- independent build / deploy
- in-page / off-page developer experience 盡量兼容
- developer 不需要知道最終 host 怎麼呈現

## 面試一句話

> **The module developer should focus on what the feature does; the platform absorbs how it is composed, loaded, versioned, and deployed.**

---

# 6.5 Stage 4 — Beyond UI

## 我自己要記得

後來發現 extensibility 不能只停在 visual widget。

有些是：

- non-UI logic
- callable logic
- background behavior

所以 Add-on Framework 逐漸變 broader extension platform：

- in-page
- off-page
- Add-on API
- common packaging
- common deployment
- common version management
- lifecycle

這個可以 drill-down，不一定主故事全講。

---

# 6.6 Stage 5 — Action Contract

## 我自己要記得

未來 vision：

- internal teams
- 3rd party
- hospital-specific teams

都可以獨立 contribution。

不同醫院有：

- workflow 差異
- vendor 差異
- business rule 細節差異

不能一直在 host 寫：

if hospital A...
if hospital B...

所以引入 Action：

host 只依賴 stable capability contract。

deployment 決定真正 implementation。

## 面試一句話

> **The core product owns the contract; the edge owns the customization.**

## 面試口說版

> Different hospitals can have slightly different workflows, vendors, or business rules.
>
> We didn’t want those customer-specific differences to keep growing inside the common host application.
>
> So we introduced Actions as stable capability contracts. The core product depends on the semantic interface, while deployment configuration decides which implementation provides that capability for a specific hospital.
>
> That lets customer-specific implementations evolve independently without contaminating the common product core.

---

# 6.7 Stage 6 — xEmulator

## 我自己要記得

拆 module 有一個新問題：

以前 developer 在 giant application 裡，自然看得到：

- shell
- shared data
- 其他 widget
- cross-widget behavior

拆開後 developer 只維護自己的 module。

但他還是想知道：

「我這個 widget 放回 HIS 之後會怎樣？」

錯的解法：

每個 developer 都把 shell / unrelated project clone 下來自己 patch。

這會把 complexity 又搬回來。

所以做 xEmulator：

- 有 UI 的 simulated shell
- 放自己的 module
- 產生 test data
- shared state
- 觀察其他 widget reaction
- 不用改真正 shell

有 agent 可以依 natural-language scenario 生測試資料。

fake backend / local persistence 的 implementation credit 主要在 backend team，不要亂 claim。

## 面試一句話

> **We wanted modules to be independently owned without forcing every module developer to independently recreate the platform.**

---

# 6.8 Stage 7 — AI 變成 Contributor

## 我自己要記得

最早 platform vision 的 business case 很依賴：

未來會有更多 3rd party contributors。

但現在 coding agent 越來越強，這個 dependence 變小。

即使 third-party ecosystem 沒有原本想像那麼大：

明確的 module boundary / contract / deployment pattern 一樣超有價值，

因為 AI agent 也可以進同一個 contribution model。

而且 xCraft 已經實際證明可以。

## 面試一句話

> **The same architecture now benefits both human and AI contributors.**

更完整：

> **I first spent years making the product easier and safer for humans to extend. More recently, I’ve been using those same platform boundaries to make it possible for AI agents to contribute reliably as well.**

---

# 6.9 Migration Strategy

## 我自己要記得

不是 big bang。

流程：

### Step 1
全新 feature 先做 pilot

驗證：

- independent development
- off-page execution

### Step 2
把 main application 慢慢變成 shell

驗證：

- Module Federation
- new routes / in-page composition

### Step 3
挑 boundary 特別乾淨的 existing feature 當 early adopter

### Step 4
pilot stable 後才大規模 migration

然後：

- 每個 feature owner 自己盤點
- 自己提出 decomposition / migration plan
- 我 review architecture boundary

重要 leadership point：

我沒有自己幫所有 team 拆。

不然 platform team 自己會變 bottleneck。

## 面試一句話

> **I didn’t want the platform team to become the migration bottleneck. Domain owners proposed the decomposition; I provided the platform principles and reviewed the boundaries.**

---

# 6.10 最難的部分 — Organizational Alignment

## 我自己要記得

真正最難的不是 Module Federation。

是你要叫大家：

「先少做一些 roadmap feature，拿時間做 migration。」

我要說服：

- senior leadership
- feature team EM
- PM manager

這其實是典型 adoption problem。

我的做法不是只做 PPT 說 architecture 很漂亮。

先 pilot：

- prove independent development
- prove off-page
- prove in-page composition

把 technical uncertainty 降低。

然後 discussion 從：

「這東西能不能 work？」

變成：

「migration cost 值不值得付？」

## 面試一句話

> **Sometimes the technically correct solution still fails unless you can make the organization willing to pay the transition cost.**

## 面試口說版

> The hardest part of the project was actually not the technology. It was organizational alignment.
>
> The migration meant intentionally slowing down roadmap delivery in the short term, so I had to convince senior leadership, engineering managers, and PM leadership that the investment was necessary.
>
> I didn’t ask them to approve a large migration based only on an architecture argument.
>
> I first built small pilots to reduce the technical uncertainty. Once we had demonstrated independent development, off-page execution, and in-page composition, the conversation changed from “will this architecture work?” to “is the migration cost worth paying?”
>
> That evidence made it much easier to secure organizational commitment.

---

# 6.11 90 秒 Add-on Story

> One platform project I’m particularly proud of was transforming our healthcare frontend from a tightly coupled application into an extensible add-on platform.
>
> When I moved into our platform architecture team, the outpatient system had accumulated a huge number of features across different medical specialties. Local changes increasingly caused regressions elsewhere, build and deployment time kept growing, and onboarding new engineers was getting harder.
>
> More importantly, we realized this architecture could never support our longer-term goal of becoming a platform. If every internal team or third-party developer had to understand and modify one giant application just to contribute one feature, the ecosystem could not scale.
>
> We first addressed shared-state coupling through xDS, because independent modules still needed a safe and consistent patient context.
>
> Then I helped drive an incremental migration toward independently developed add-on modules. We validated new features first, converted the application toward a shell architecture, tested both in-page and off-page execution, and only then started migrating existing features.
>
> As the platform matured, we also introduced stable Action contracts so hospital-specific implementations could vary without putting customer-specific branching into the common product.
>
> Independent modules created another developer-experience problem, so we built xEmulator to let developers test their modules inside a realistic shared-data environment without cloning and modifying the full shell.
>
> The hardest part was adoption. I had to convince engineering and PM leadership to temporarily slow roadmap work and pay the migration cost. I used pilots to reduce technical uncertainty first, then asked domain owners to propose their own migration plans while I reviewed the architectural boundaries.
>
> What I learned is that a platform is not just an architecture. It succeeds when you continuously reduce the cost for the next contributor without losing control of the common product.

---

# 6.12 3 分鐘 Add-on Story

> When I moved from backend engineering into our platform architecture team, one of the biggest problems we were facing was scale.
>
> Our outpatient product had grown into a very large frontend covering many medical specialties and workflows. As more features accumulated in the same application, seemingly local changes increasingly caused regressions in unrelated areas, build and deployment time kept growing, and onboarding new engineers became progressively harder.
>
> But the more important realization was that this was not sustainable if we wanted the product to become a platform. If every new internal team, hospital-specific developer, or future third-party contributor had to understand and modify this huge application just to add one feature, our ecosystem could never scale.
>
> There were really two forms of coupling we had to address.
>
> The first was data coupling. Historically, features fetched and managed their own data and often created point-to-point watchers to keep each other synchronized. In healthcare, shared state is particularly sensitive because every operation and every displayed piece of information has to correspond to the correct patient. So xDS became an important foundation: a consistent shared-data and patient-context layer that independent modules could use without directly coupling themselves to each other.
>
> The second problem was code and deployment coupling. I helped drive an incremental move toward an add-on module architecture. We first validated completely new features, including independent off-page execution. Then we converted the main application toward a shell model and validated in-page composition using Module Federation. Once both paths worked, we selected existing features with relatively clean boundaries as early migration candidates before scaling the migration more broadly.
>
> As the platform grew, the abstraction also expanded beyond simple UI widgets. Different hospitals might need different implementations of the same business capability, so we introduced stable Action contracts: the common product depends on a capability interface, while deployment configuration determines which hospital-specific implementation provides it.
>
> Another issue appeared because independent development reduced integration visibility. A widget developer might need to see how shared-data changes affect several other screens, but we did not want every developer cloning and modifying the entire host application just to test that. So we built xEmulator, a simulated shell environment where modules could be tested with realistic shared data and cross-widget behavior.
>
> The hardest part of the project was organizational adoption.
>
> The migration required engineering teams and PMs to temporarily slow feature delivery and invest in architectural work. I first built pilots to demonstrate that the model actually worked, then used that evidence to make the case to senior leadership and the engineering and PM managers.
>
> After the approach was approved, each feature owner proposed how their own domain should be decomposed, and I reviewed those migration plans to maintain consistent platform boundaries.
>
> The platform has now grown to more than 300 independently deployable widgets, and an interesting evolution is that the same explicit boundaries we originally created for human and third-party contributors are now also what make AI coding agents much easier to control.
>
> The biggest lesson for me is that a platform is not just about modular architecture. It is about continuously reducing the cost of contribution while keeping shared contracts, safety, and lifecycle management under control.

---

# 7. Add-on Story 常見追問

## Why xDS before micro-frontends?

中文理解：

如果 UI 拆了，但 state 還是亂的，module 只是在表面上獨立，實際還是透過 shared state 耦合，而且病人 context 風險更高。

英文可以說：

> Splitting the UI without solving shared-state coupling would only move the dependency somewhere else. We needed a consistent patient and clinical-data context before independent modules could safely evolve.

---

## Why Module Federation?

中文理解：

不要背 library feature。

要講 requirement：

- independently built feature
- still appear in same shell
- runtime composition
- independent delivery

英文：

> We needed independently built features that could still be composed inside the same product shell. Module Federation was a good fit for that runtime composition model without forcing every feature back into one build artifact.

---

## Why not iframe everything?

中文理解：

如果真的被問，講：

- isolation 強
- 但 shared UX / state / composition / developer experience 會有 trade-off

不要假裝記得當時每一個 benchmark。

英文：

> We did evaluate iframe-based approaches. They give strong isolation, but for tightly integrated product surfaces we also cared about shared UX, state integration, and developer experience, so we did not want every in-page feature to become a fully isolated island.

---

## What is an Action?

英文：

> An Action is a stable capability contract. The caller depends on the semantic interface, while deployment selects the actual implementation.

---

## How did you drive adoption?

英文：

> I reduced uncertainty before asking for organizational commitment. We validated the architecture with new features first, then migrated a small number of existing features with clean boundaries. Only after those pilots were stable did we scale the migration across teams.

---

# 8. 接下來還要做的 Story Cards

## 8.1 GenAI Seminars + Vice Chairman / GM Presentation

目的：

- Customer Advisor
- executive communication
- influence
- technical storytelling
- adoption

接下來要補：

- 一場最代表性的 seminar
- 一次跟 Vice Chairman / GM 的 presentation
- audience 原本不懂 / 不信什麼
- 你怎麼改 framing
- 最後促成什麼 decision / adoption

---

## 8.2 Schema-Driven Development

目的：

- Bias for Action

已知：

- 你主動提出
- DB schema → TypeScript interface → centralized data-access layer
- synchronization 2–3 days → <10 minutes
- productionized 後 handoff

還要補：

- 什麼事件讓你受不了決定要做
- 為什麼不是 assigned work
- 怎麼推 adoption

---

## 8.3 xSupport

目的：

- Data & AI Industry Expertise
- RAG
- production AI

還要補：

- ingestion
- chunking
- metadata filtering
- retrieval / reranking
- evaluation
- hallucination handling
- 真正 user workflow

---

# 9. Databricks Technical Prep — 後續

這一輪先不急著背 API。

要先建立 Databricks architecture mental model：

Source systems  
→ ingestion  
→ Delta / Lakehouse  
→ transformation  
→ Unity Catalog / governance  
→ ML / AI  
→ serving / application  
→ evaluation / monitoring

後續要熟：

- Delta Lake
- Spark
- Photon
- Unity Catalog
- Lakeflow
- MLflow
- Mosaic AI / Agent tooling
- Vector Search
- Model Serving
- Databricks Apps

目標不是 product trivia。

目標是：

> 如果 Ankur 丟一個 customer problem，我能把自己的 system thinking 映射到 Databricks platform。

---

# 10. 最後要做的 Mock

完整 HM mock 預計：

- About Me
- Why Databricks / Why FDE
- Impact Story
- technical drill-down
- customer / stakeholder scenario
- failure / learning
- team fit
- questions for interviewer

Mock 時會刻意追：

> Why?

> How do you know?

> Why build instead of buy?

> What did you personally own?

> What is still broken?

> What happens when the agent fails?

> 90% compared to what?

> Would you make the same decision today?

---

# 11. 面試前最值得背熟的幾句話

> **We didn’t try to build a better coding agent. We built the system that makes increasingly capable coding agents controllable inside our domain.**

> **Every time we removed one bottleneck, we looked at the end-to-end workflow again and asked what had become the new limiting factor.**

> **The best automation wasn’t maximum autonomy. It was the interaction model that matched how the user actually makes decisions.**

> **We convert as much agent reliability as possible from probabilistic behavior into explicit constraints and deterministic checks.**

> **Models will improve, but our domain knowledge should compound as well.**

> **For a product to become a platform, the cost of contribution has to go down as the ecosystem grows, not up.**

> **The core product owns the contract; the edge owns the customization.**

> **Sometimes the technically correct solution still fails unless you can make the organization willing to pay the transition cost.**
