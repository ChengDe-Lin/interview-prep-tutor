# Builder Mindset

## HR 想確認什麼

你是不是會持續學習、主動試新的 data / AI tools、對 emerging technology 有好奇心，而且不是只看熱鬧，而是能把實驗變成實際 workflow 或產品能力。

## 主故事

Agentic Product Development Workflow

參考：

- `databricks/agentic_workflow_story.md`

## 備用故事

- AI Seminar Culture
- HAL to Add-on API

## SA 角度

這題不要只講「我學了很多 AI 工具」。要講：

- 你看見 PM / designer 的 workflow 問題。
- 你有研究現有 Figma-to-code / AI design workflow 的方向，但你不是要解 general use case。
- 你處理的是公司內部特定 product workflow，所以可以用更深的 codebase / component / spec context，換取更大的 impact。
- 你看到機會：不用只在現有 AI design workflow 上設限制，而是重新挑戰整個流程。
- 你重新設計從 product intent 到 product-ready code 的流程。
- 你把 AI agent、spec-driven development、testing、deployment 接起來。
- 你最後不只是 demo，而是讓團隊真的能用。
- 你也持續追社群和 vendor 的最佳實踐，例如 Anthropic / Claude Code seminar，並把學到的東西分享給團隊。

## Opening STAR 口說稿

> One example of my builder mindset is the agentic product development workflow I built recently.

> Just like what I mentioned in the self-introduction, but let me go through it with more details.

> The original workflow was very manual. PMs and designers created Figma mockups, handed them to engineers, waited for implementation, and then reviewed the result. A lot of time was lost in handoff, and the design could easily become out of date with the latest codebase.
>
> I also looked at existing solutions, like v0 from Vercel, Figma Make, and Claude Design. I don't see them as wrong solutions. They are solving a very general problem, so they need to work across many different products and design systems. But in that kind of workflow, the design language and the real product code can still drift apart. Even if the tool creates a good mockup, teams often still need to rewrite or adjust it with their own codebase and component library.
>
> My problem was different. I was working inside one company, with one real product architecture, very specific component system, and a clear internal workflow.
>
> That gave me a different opportunity. Instead of only putting guardrails around AI-generated results, I wanted to challenge the workflow itself. If we can give the agent enough product context, component context, and spec context, maybe the designer does not need to create a separate mockup first. They can build something with the agent that is already much closer to production.
>
> I wanted to explore how far AI agents could push this workflow forward. Instead of treating AI as a small helper after the design step, I redesigned the process so PMs and designers could describe product intent directly to agents. The agents generate product-ready code using our real component system.
>
> After a direction is selected, designers can still refine the UI through vibe-coding. One important lesson we learned is that the spec has to move together with the code, which is the spec-driven development concept. So whenever an agent changes code, the spec also needs to be updated or referenced. That makes the output more maintainable.
>
> Once the UI is ready, another automated agent takes over to check backend API interfaces, fill in data logic, run visual validation and E2E testing, and move toward deployment.
>
> As mentioned before, the result was around 75% reduction in UI iteration effort. It was highly recognized by our users, and more importantly, it changed how PMs, designers, and engineers think about product development. To me, builder mindset is not just trying a new tool. It is about testing a new possibility, finding the real workflow bottleneck, and turning the experiment into something people can actually adopt.
>
> Beyond this project, I also try to keep a continuous learning loop. For example, I joined Anthropic-hosted seminars to learn Claude Code and agent workflow best practices, then brought the useful parts back to my team as shared guidelines. I think that is also part of builder mindset: not only learning new tools personally, but turning new practices into something the team can use.

## Continuous Learning 補充

如果 Peter 特別問 continuous learning / curiosity，可以補這段，不一定放進主故事：

> I also try to stay close to the community and the tool builders. Since we use Claude heavily, I joined several Anthropic-hosted online seminars to understand how they think about agent workflows and Claude Code best practices.
>
> One useful example was around where to put different instructions: what should live in an agents folder, what should become a skill, and what should be visible to the main agent. Their framing was very helpful: the decision should depend on whether the main agent needs to see that context directly.
>
> Another thing they emphasized was that when we write guidelines or skills for agents, we should often let Claude Code help draft them through conversation, because Claude Code has a lot of helper context from the product team and often understands the best format better than we do.
>
> I brought those learnings back to my team and shared them with other engineers. So my learning loop is not only personal. I try to turn new practices into team knowledge.

> the first day OpenAI announanced they creaet a claude code plugin to let user call codex within claude code. I've found an issue of there authentication mechansim and posting that on the commuinty and get their fix.
## 追問準備

如果問「你用了哪些 AI tools / agent concepts」：

> The key ideas were agent workflow design, spec-driven development, code generation with real product context, visual validation, E2E testing, and feedback loops from designer usage.

如果問「你怎麼持續學習 AI / agent 的新東西」：

> I follow the community closely and join vendor-hosted sessions when possible, especially from Anthropic because we use Claude heavily. I try to learn not only the new features, but also the reasoning behind best practices. Then I bring the useful parts back to my team and turn them into shared guidelines or workflows.

如果問「你和 Figma Make / Claude-style design workflow 差在哪」：

> I would not position it as better or worse. They solve a more general problem. My case was more specific, so I could take a different angle. Since we control the product codebase, component system, and workflow, I could let the agent work directly with real product context. That allowed us to reduce the design-to-code handoff much more aggressively.
