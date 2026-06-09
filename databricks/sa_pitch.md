# Databricks SA Pitch

## 使用方式

這份文件只有英文段落需要拿來練口說。中文段落只是提醒你每段的目的。

3 分鐘版本的重點不是把所有成就塞滿，而是建立一個清楚定位：

> 你是能把複雜技術變成可採用平台的人，而且能把 AI / data architecture 跟 stakeholder outcome 連起來。

## 3-Minute About Me - 口說稿

> Hi Peter, I'm ChengDe. I'm currently a Senior Software Engineer working on a clinical platform used in hospitals. My strongest area is building platform systems in messy, high-risk environments, then helping teams adopt them in practice.
>
> The first major example is our micro-frontend transformation. Our clinical applications had become deeply coupled, and one dependency issue nearly caused a serious medication workflow problem. I took ownership of the architecture direction, evaluated multiple approaches, built the framework, and helped around 20 engineers migrate the platform into more than 220 independently deployable widgets. At the time of the migration, we measured a 46% improvement in feature delivery speed and a 58% reduction in defect age. But the bigger value came later: as more independent widgets were built, the benefit kept compounding, and this architecture became one of the key reasons we could scale the platform across multiple hospitals. What I learned from that project is that architecture is only valuable if people can actually adopt it, so I designed the framework so developers did not need to understand all the underlying complexity.
>
> The second area is AI adoption. In early 2023, I was selected to help lead a bi-weekly GenAI seminar series for around 120 people in our department. My role was to find speakers, shape content, and make sure the examples were grounded in real work, not just demos. I also brought in clinical perspectives, including a doctor sharing how hospitals were thinking about GPT. Some of the ideas from those seminars later became production systems, including an internal Q&A assistant for DevOps knowledge. More importantly, it helped the department build the habit of experimenting with AI before it became mainstream.
>
> More recently, I have been building an end-to-end agentic product development workflow. Instead of asking PMs and designers to create separate design artifacts and then wait for engineers to recreate them, we let them describe product intent directly to agents that generate multiple product-ready UI directions using our real component system. After a direction is selected, designers can keep refining the UI through vibe-coding, while the spec stays synchronized with every code change throughout the process. Once the UI is ready, an automated agent takes over to check backend API interfaces, fill in data logic, run visual validation and E2E testing, and move toward deployment. This removed a lot of handoff and stale-design problems, and cut UI iteration effort by around 75%.
>
> The reason I'm excited about the Solutions Architect role at Databricks is that it sits at the intersection I enjoy most: understanding real stakeholder problems, designing practical data and AI architectures, and driving adoption until there is measurable value. Databricks is especially interesting to me because the lakehouse brings data engineering, analytics, governance, and AI onto one platform. That is exactly the kind of platform-level simplification I have been working toward in my own career, just at a much larger customer and industry scale.

## 60-Second Version - 口說稿

> I'm ChengDe, a Senior Software Engineer focused on platform and AI systems in healthcare. My strongest pattern is taking complex, high-risk systems and turning them into platforms other teams can actually adopt.
>
> For example, I led our micro-frontend transformation from a tightly coupled clinical system into 220+ independently deployable widgets, improving delivery speed by 46% and reducing defect age by 58%. I also helped lead a 120-person GenAI seminar series that turned early AI experiments into production ideas and later company-wide tooling investment.
>
> Recently I've been building an end-to-end agentic product development workflow that lets PMs and designers move from product intent to product-ready UI code. The workflow uses agents for fast multi-direction exploration, designer-led vibe-coding refinement, spec-synchronized code changes, backend API/data-logic integration, visual validation, E2E testing, and deployment. It cut UI iteration effort by around 75%.
>
> For Databricks, what excites me is the chance to apply that same combination of architecture, stakeholder communication, and driving adoption to customer data and AI problems.

## Why Databricks - 口說稿

> There are three reasons.
>
> First, Databricks is solving a real architectural problem I care about: fragmentation. Many companies have separate systems for data engineering, BI, ML, governance, and now GenAI. The lakehouse approach is compelling because it gives teams a single governed foundation for analytics and AI instead of forcing them to stitch together many disconnected tools.
>
> Second, the timing is strong. Enterprises are moving from AI experimentation to production AI, and that requires reliable data, governance, lineage, monitoring, and cost control. Databricks is well positioned because it owns the data and AI platform layer, not just the model layer.
>
> Third, the Solutions Architect role matches how I like to work. I enjoy going deep technically, but I also enjoy translating complex systems for different audiences, aligning stakeholders, and driving adoption. My background in healthcare platforms, AI tooling, and cross-team transformation maps naturally to that.

## 面試時要強調

- 你不只是 builder，你也能推 adoption。
- 你能清楚講 architecture trade-off。
- 你能在沒有 formal authority 的情況下影響其他團隊。
- 你來自醫療這種 high-risk domain，所以 reliability / governance 對你不是口號。
- 你的 AI 經驗是 workflow-level，不只是 prompt-level。

## 風險提醒

- 不要聽起來像你只是想找 SWE role。
- 不要一開始講太多 micro-frontend 技術細節，除非 Peter 追問。
- `vibe-coding` 可以講，但要解釋成 agent-driven workflow，不要像玩具。
- 不要把 Databricks 講成單純 AI 公司，要錨定 data + AI + governance + adoption。

