# Databricks SA Pitch

## 使用方式

這份文件只有英文段落需要拿來練口說。中文段落只是提醒你每段的目的。

3 分鐘版本的重點不是把所有成就塞滿，而是建立一個清楚定位：

> 你是能看見 workflow 問題、引入 AI 解法、並且讓團隊真的 adopt 的人。

## 3-Minute About Me - 口說稿

> Hi Peter, I'm ChengDe. I'm currently a Senior Software Engineer working on a clinical software product used in hospitals. I earned my master's degree in AI from National Taiwan University, graduating first in my class. I then started as a software engineer and was promoted to Senior Engineer in about two years, which is less than half of the usual timeline in my organization.
>
> Along the way, I received our department's Code Champion Award for technical quality, and a Peer Feedback Award for collaboration and cross-team impact. So I would describe my strength as a combination of technical depth, communication, and identifying workflow or architecture problems, then using system design and AI to solve them in a way teams can actually adopt.
>
> The first example is our micro-frontend transformation. Along the development, our clinical applications had become deeply coupled, and one dependency issue nearly caused a serious medication problem. I took ownership of the architecture refinement, built the framework, and helped around 20 engineers migrate the platform into over 300 independently deployable widgets. At the time of the migration, we measured a 46% improvement in feature delivery speed and a 58% reduction in defect age. But the bigger value came later: as more independent widgets were built, the benefit kept increasing, and this architecture became one of the key reasons we could scale the platform across multiple hospitals. This platform work also contributed to two patents granted by the Taiwan Intellectual Property Office. My biggest takeaway was that architecture only matters if teams can actually adopt and maintain it. So I focused heavily on developer experience: giving different kinds of widgets the same development model, providing a simulator for testing, and hiding the module loading complexity behind the framework.
>
> The second area is AI adoption. In early 2023, I was selected to host a bi-weekly GenAI seminar series for over 100 people in our department. My role was to find speakers, shape content, explore the boundaries of what AI could do at that time, and go through reviews with our VP and other senior reviewers. Many ideas from the seminars later became real workflows we used in development or directly in the product, such as different kinds of AI chatbot. More importantly, it helped the department build the habit and mindset of experimenting with AI in the early stage.
>
> More recently, I have been building an end-to-end agentic product development workflow. The basic idea is simple. Instead of asking PMs and designers to create Figma mockups and then wait for engineers to recreate them in code, we let PM describe the product intent directly to agents. The agents generate product-ready code using our real component system.
>
> After a direction is selected, designers can still refine the UI through vibe-coding. 
(One important lesson we learned is that the spec has to move together with the code. So whenever the agent changes code, the spec also needs to be updated or referenced the change.)
>
> Once the UI is ready, another automated agent takes over to check backend API interfaces, fill in data logic, run visual validation and E2E testing, and move toward deployment. This removed a lot of handoff and stale-design problems, and cut UI iteration effort by around 75%.
>
> So overall, my strength is AI workflow transformation. I like starting from how people actually work, finding the real bottleneck, and exploring how far AI can push the workflow forward. That is the kind of strength I hope to bring into Databricks.


## Micro-Frontend 追問備用回答

如果 Peter 繼續追問你 hidden complexity 的例子，再講這段：

> One example was remote module discovery. Normally with module federation, the host needs to know the remote modules ahead of time. But we wanted widgets to be added dynamically through our marketplace. I went into the vite-plugin-federation runtime and found a variable we could overwrite, so the shell could dynamically update the remote module list at runtime. That made the framework much easier for teams to use, because they did not need to manually list every widget into the host application.

## Why Databricks - 口說稿

> For me, the main reason is that I really enjoy the process of understanding a real business scenario, finding the bottleneck, and then creating impact through workflow changes or the power of AI. My current position has given me a great opportunity to practice this in the healthcare domain. I have been able to help product managers, designers, and other engineers from different angles. I am very grateful for that, but I also feel I am ready for a bigger stage.
>
> Databricks is exciting to me because it would give me the chance to work on very different problems across different industries. The business scenarios can be completely different, but the core challenge is similar: how do we use data and AI to change the way people work and create real impact?
>
> In my own work, I have also built RAG and chatbot-style systems, from internal knowledge Q&A to product-facing customer support. What I learned is that a good chatbot is not just about generating fluent answers. The hard and complex part is searching the right context, keeping that context fresh, respecting permissions, and making the system reliable enough for real users.
>
> Governance became a very real problem for us. For example, when our PMs search product knowledge, we may want them to see more internal context, including past incidents or known issues, because that helps them understand the real situation better. But for customers, we should not expose the same information, because it could create unnecessary concern or reveal internal problems. So the same knowledge base needs different access and context rules for different users.
>
> I also believe this is much bigger than customer service chatbots. Every company has internal knowledge problems. Every employee has things they do not know, documents they cannot find, or experts they need to ask. If a company can build a secure AI knowledge assistant or internal search engine on top of its own governed data, that can create real impact for almost every team.
>
> And this is where Databricks started to make more sense to me. It is not just a lakehouse, and it is not just an AI model platform. The real strength is the combination of the Data Intelligence Platform: a governed data foundation, plus end-to-end AI tools for search, retrieval, model serving, evaluation, and production workflows.
>
> I also started to agree more with Databricks' view on data and LLMs. In the future, general model capability may become less of a bottleneck. More companies will want models that understand their own domain, their own workflows, and their own private data. That could be through fine-tuning, RAG, or other ways of adapting models to the company context. To do that well, the foundation is still data: how it is stored, governed, searched, evaluated, and connected to production AI workflows. That feels very aligned with what Databricks has been preparing for.
>
> That is why Databricks is exciting to me. It gives me a chance to bring AI impact to many industries, not just one healthcare product. And I can do that while staying close to architecture, the latest AI techniques, and drive real adoptions.

## 面試時要強調

- 你不只是 builder，你也能推 adoption。
- 你能清楚講 architecture trade-off。
- 你能在沒有 formal authority 的情況下影響其他團隊。
- 你來自醫療產品，所以你自然重視 reliability / governance / correctness。
- 你的 AI 經驗是 workflow-level，不只是 prompt-level。
