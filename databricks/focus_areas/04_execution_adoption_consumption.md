# Execution & Driving Adoption / Consumption

## HR 想確認什麼

你是不是能推動 adoption、移除 blocker、交付 measurable outcome。對 Databricks 來說，這也會連到 customer consumption / usage growth。

## 主故事

Micro-Frontend Transformation

參考：

- `stories/micro-frontend-transformation.md`
- `databricks/sa_pitch.md`

## 備用故事

- Agentic Product Development Workflow
- Chatbot Knowledge Workflow Reframing

## SA 角度

這題不要只講 architecture。要講 migration / adoption：

- 如果前面已經講過 micro-frontend，就不要重講技術設計。開頭先說「I touched on the architecture earlier, so here I will focus on adoption and measurable outcome.」
- 20 engineers。
- over 200 widgets。
- 46% delivery speed improvement。
- 58% defect age reduction。
- 長期支撐多院部署。
- 你移除 developer adoption 的 blocker。
- 你處理的是 consumption problem：新平台不是建好就有人用，要讓團隊有 migration path、PM 願意給時間、management 願意支持、工程師覺得值得。

## Opening STAR 口說稿

> I have two examples of execution and adoption. The first one is our micro-frontend transformation, and the second one is a chatbot knowledge workflow where I helped remove a false adoption blocker.
>
> Let me start with micro-frontend. I touched on the architecture earlier, so for this example I will focus less on the technical design and more on how I drove adoption.
>
> As I mentioned before, our clinical applications had become highly coupled. Many pieces of logic were mixed together, debugging became very hard, and adding a new feature could easily break old behavior. This also made it almost impossible to turn the system into a real platform, because we could not safely involve third-party developers or independent teams.
>
> I took ownership of the architecture direction, built the framework, and helped around 20 engineers migrate the system into over 200 independently deployable widgets.
>
> The hard part was that everyone knew we needed to split the system, but the migration itself was painful. Many features were deeply bound together. Sometimes two workflows looked very far apart from a product perspective, but they still had some data binding or interaction requirements. Before PMs could fully redesign the spec, some coupling had to remain.
>
> So I treated this as an adoption problem, not only an architecture problem. The highest principle of micro-frontend, of course, is independence, but if we were too strict from day one, the migration would not move. So I introduced a strictly managed widget-to-widget communication mechanism. Any communication had to be reviewed and registered first. This allowed us to accept a small amount of controlled coupling, while still keeping the architecture direction clean enough to continue the refactor.
>
> Another blocker was E2E validation. In the old monolith application, every team could see all the code and run the whole system, even if they did not fully understand other teams' logic. After the split, teams needed a way to validate their widgets without depending on the full source code of every other module. So we built a simulator to help teams test and verify their widgets in isolation.
>
> The whole migration was a process of hitting blockers, designing practical solutions, and continuing the refactor. I worked with teams one by one to find incremental migration paths, and we also worked with management and PMs to secure migration capacity, because adoption cannot happen if teams never get time to do the work.
>
> At the time of the migration, we measured a 46% improvement in feature delivery speed and a 58% reduction in defect age. But the bigger value came later. As more independent widgets were built, the benefit kept increasing, and the architecture became one of the key reasons we could scale the platform across multiple hospitals.
>
> And, my second example is from a chatbot / knowledge assistant project. At first, PM team wanted the chatbot to automatically read chat group messages from whatsapp, identify which messages were related to known issues, group them together, and generate solutions. They treated this as a basic requirement before the chatbot could go live.
>
> I thought about it carefully and pushed back. My point was that we should not take an emergency communication pattern from the past and turn it into a blocker for a new AI solution. Chat groups are messy by nature. And we would definitely wanna maintian thousands of chat group as we growed. If we spend too much effort trying to make the AI understand every scattered message perfectly, we may be optimizing the wrong workflow.
>
> Instead, I suggested that we look at the end state first. If we want a reliable knowledge system, issues should be managed through a more structured workflow, such as automatically creating tickets and using the ticket system as the source of truth. Then the AI can consume ticket information, handle known issues, and give feedback in a much more reliable way.
>
> I explained this to the PM lead, engineering lead, in the leadership meeting. Eventually everyone aligned that the original blocker criteria was not the right one. We changed the strategy from "make AI understand messy chat history" to "improve the workflow so knowledge is created in the right place. and could be easily to consume and maintained" Removing that blocker made the project move much more smoothly.
>
> After that, we also moved quickly on adoption needs. When PMs asked for a more intuitive way to manage what the chatbot had learned, we built a simple feedback loop: the agent consumes ticket information and leaves comments about what it learned, so humans can inspect what is entering the knowledge base. When PMs wanted to adjust workflow prompts or guidelines, we gave them specific tickets where they could update the guideline directly. Each new blocker became something we could solve quickly.
>
> So my lesson from both examples is that execution is not just shipping the design or the feature. It is removing the blockers that stop people from using it. Sometimes that means making the platform easier to adopt. Sometimes it means challenging the success criteria and guiding the team toward a workflow that can actually scale.

## 追問準備

如果問「你怎麼處理 resistance」：

> I worked with teams one by one to find incremental migration paths. I also tried to make the new framework feel close to normal feature development, so teams did not need to understand all the internal complexity before they could start.

如果問「如果前面已經講過 micro-frontend，這題怎麼避免重複」：

> I would say: I mentioned the architecture earlier, so let me focus on the adoption side. The main challenge was not choosing module federation. It was getting 20 engineers and multiple product teams to actually migrate, while still delivering product work.

如果問「這跟 Databricks consumption 有什麼關係」：

> To me, consumption is not just whether a platform exists. It is whether users keep using it and expanding usage. In my case, I had to remove adoption blockers, make the developer experience simple, secure migration time, and measure whether the platform actually improved delivery. That maps closely to helping customers move from purchase or POC to real production usage.

如果問「chatbot 這個故事跟 consumption/adoption 有什麼關係」：

> The key was removing a false blocker. The team thought go-live depended on whether AI could perfectly understand messy chat messages. I reframed the problem: if we want reliable knowledge, we should create a better workflow and use tickets as the source of truth. That changed the adoption path and made the project easier to move forward.
