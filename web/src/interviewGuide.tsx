import type { ReactNode } from 'react'

export type GuideSection = 'opening' | 'flagship' | 'backup' | 'close'

export interface TalkingPoint {
  cue: string
  text: ReactNode
  note?: string
}

export interface GuidePage {
  id: string
  section: GuideSection
  nav: string
  step: string
  title: string
  duration: string
  purpose: string
  focus: string[]
  points: TalkingPoint[]
  reminders?: string[]
}

export const sectionLabels: Record<GuideSection, string> = {
  opening: 'Opening',
  flagship: 'Two flagship stories',
  backup: 'Backup story bank',
  close: 'Coverage & close',
}

export const guidePages: GuidePage[] = [
  {
    id: 'about-me', section: 'opening', nav: 'About Me', step: '01', title: 'Tell me about yourself', duration: '3 min',
    purpose: '用完整 3 分鐘建立職涯主線：快速成長 → platform depth → measurable impact → production AI → customer-facing FDE。',
    focus: ['Team Fit', 'Technical depth'],
    points: [
      { cue: '現在是誰', text: <>Hi Ankur, I’m ChengDe. I’m currently a Senior Software Engineer at ASUS Intelligent Cloud Service, where I’ve spent the last <mark className="metric">five years building enterprise healthcare software</mark> across full-stack applications, backend and distributed systems, platform engineering, and more recently production AI systems.</> },
      { cue: '我的工作方式', text: <>I would describe myself primarily as a <mark className="concept">hands-on builder</mark>. I enjoy taking ambiguous problems all the way from understanding the real workflow, to designing the architecture, writing the code, and eventually <mark className="outcome">getting people to adopt what I build</mark>.</> },
      { cue: '成長與 credibility', text: <>I earned my <mark className="concept">master’s degree in AI from National Taiwan University</mark>, graduating <mark className="metric">first in my class</mark>. I then moved into software engineering and was promoted to Senior Engineer in about two years—roughly half the typical timeline in my department. I later received our Code Champion Award and <mark className="outcome">Peer Feedback Award</mark>, a peer-voted recognition for cross-team collaboration.</> },
      { cue: 'Backend 基礎', text: <>Earlier in my career, I worked heavily on backend and platform engineering. I maintained <mark className="metric">around ten microservices and hundreds of APIs</mark>, rebuilt services around authentication, database access, and Redis, and handled Kubernetes deployments and production incidents.</> },
      { cue: 'Platform 代表作', text: <>One project that shaped how I think about platforms was our add-on module framework. I helped transform a tightly coupled healthcare application into an <mark className="concept">extensible platform</mark> where internal teams, hospital-specific developers, and now AI agents can contribute more independently.</> },
      { cue: 'Migration 當下結果', text: <>At the time of the migration—while engineers were still learning the new framework—we measured a <mark className="metric">46% improvement in feature delivery speed</mark> and a <mark className="metric">58% reduction in defect age</mark>.</> },
      { cue: '持續成長與外部認可', text: <>The platform now spans <mark className="metric">300+ independently deployable widgets across about 20 engineers</mark>. As the product and the number of independent widgets continue to grow, <mark className="outcome">the impact continues to compound</mark>. This platform architecture also led to <mark className="outcome">two patents granted by the Taiwan Intellectual Property Office</mark>.</> },
      { cue: '最近的 AI 主軸', text: <>More recently, my focus shifted toward AI-native engineering. I <mark className="action">designed and built xCraft and xDesign</mark>, agentic systems that connect design, implementation, and validation. Rather than building another coding model, I built the orchestration and control layers that make general-purpose agents reliable inside our production environment.</> },
      { cue: 'AI 實際成果', text: <>xCraft has automatically delivered <mark className="metric">close to a hundred real features</mark>. At the moment, xDesign has completed <mark className="metric">around 15 to 20 validated design tasks</mark>, and within that scope, our designers estimate <mark className="metric">roughly 90% less manual effort</mark>.</> },
      { cue: '跨團隊與高層溝通', text: <>I’ve also led <mark className="metric">more than ten GenAI seminars for hundreds of colleagues</mark>, helping our organization build an early habit of experimenting with AI. I regularly present technical direction, trade-offs, milestones, and risks to senior leadership, including our General Manager and the company’s Vice Chairman.</> },
      { cue: '總結並收回 FDE', text: <>Across these projects, I’m often the person connecting discovery, architecture, hands-on implementation, adoption, and leadership communication. That combination is what attracted me to FDE. I want to <mark className="concept">stay deeply technical while moving closer to customers</mark>, solve a broader range of real-world problems with them, and bring what I build to more users and organizations.</> },
    ],
    reminders: ['正常語速約 3 分鐘；如果對方想加速，可略過 Backend 基礎或 Platform 結果其中一格。', 'Platform 與 AI 各交代 problem、ownership、result，但 deep dive 留給後續主故事。', '90% 僅限 15–20 個 validated tasks，不能泛化到所有 design work。', '最後一定收回 Why FDE。'],
  },
  {
    id: 'why-fde', section: 'opening', nav: 'Why FDE', step: '02', title: 'Why Forward Deployed Engineering?', duration: '完整版本',
    purpose: 'FDE 把你最在意的兩件事放在同一個角色：深入 build，以及和人一起找出真正值得解的問題。',
    focus: ['Customer Advisor', 'Team Fit'],
    points: [
      { cue: '先講核心原因', text: <>What attracts me to FDE is that it brings together the <mark className="concept">two parts of my work I care about most</mark>: building technically strong systems, and working with people to make sure we are solving the right problem.</> },
      { cue: 'Engineer first', text: <>I’ve always seen myself as an <mark className="concept">engineer first</mark>. I enjoy going deep technically, and I still want to be the person who can get close to the system and actually build the solution.</> },
      { cue: '我擅長什麼', text: <>I also know that <mark className="concept">communication and planning ahead</mark> are two of my strengths. I’m good at getting engineers, PMs, and designers on the same page, turning unclear requirements into a concrete plan, and spotting what the architecture or workflow will need next.</> },
      { cue: '把問題說清楚', text: <>A lot of that communication skill came from presenting architecture proposals and project updates. I learned that good communication is not just explaining the technology. It is <mark className="concept">making the problem clear</mark>: what is happening, why it matters, what trade-offs we have, and what decision we need to make. That helps people with very different backgrounds move in the same direction.</> },
      { cue: '用經歷證明', text: <>That is also why I’ve been trusted to lead several cross-team architecture initiatives, align engineers, PMs, and designers, and <mark className="outcome">represent my team in technical discussions with senior executives</mark>, including our General Manager and the company’s Vice Chairman.</> },
      { cue: '所以 FDE 很自然', text: <>So when I learned more about FDE, it felt like a very natural next step. I can stay hands-on, but start closer to the customer: understand what is actually blocking them, build something with them, and keep iterating until they can really use it. It is also a chance for me to <mark className="outcome">keep developing the communication and strategic skills</mark> that have already become an important part of my work.</> },
      { cue: '我對 engineer 未來的判斷', text: <>I believe the role of an engineer is changing. As AI gets better at writing code, <mark className="concept">differences in pure coding speed</mark>—and even some advantages that come from having implemented the same pattern before—will matter less. The bigger difference will be whether an engineer can identify a problem worth solving, make the right technical and product trade-offs, and turn the solution into a real outcome.</> },
      { cue: 'FDE 就是這個未來', text: <>To me, FDE is built around exactly that. You work with the user to <mark className="action">find the real problem and build the solution</mark>, show why it solves their problem, and get it adopted. AI can <mark className="outcome">accelerate that entire loop</mark>, but the engineer still owns the problem and the outcome. Those are the skills I want to keep developing, and that is why FDE feels like the right direction for me.</> },
    ],
    reminders: ['Communication 不只是 presentation delivery；核心是把 problem、importance、trade-off 與 decision 說清楚。', '不要說其他 engineers 不如你；說 communication 與 future planning 是你的 additional leverage。', '限定為 pure coding speed 與重複 implementation pattern 的差距縮小，不是否定所有 engineering experience。', '「說服」用 show why it solves their problem + get it adopted，保留原意但不會像硬賣。', '明確說你仍想 deeply hands-on。'],
  },
  {
    id: 'why-databricks', section: 'opening', nav: 'Why Databricks', step: '03', title: 'Why Databricks?', duration: '完整版本',
    purpose: '你親眼看見 model 已經非常強；下一個 AI 主戰場是企業自己的 data 與 domain knowledge，而 Databricks 正站在這個核心位置。',
    focus: ['Data & AI Expertise', 'Motivation'],
    points: [
      { cue: '我想要更大的舞台', text: <>My current role has given me a great opportunity to create real impact in healthcare. I’ve worked with PMs, designers, and engineers to change how we build products, and I’m grateful for that. At this point, I want to take that same way of working to <mark className="outcome">a broader range of problems and industries</mark>.</> },
      { cue: 'Model 讓我驚訝', text: <>Over the last two years, what surprised me most was <mark className="concept">how capable general-purpose models had already become</mark>. When we gave them a clear goal and enough domain knowledge, they could do much more than I expected—even deliver real production features. That changed how I think about where the next bottleneck is.</> },
      { cue: '真正的限制', text: <>The main limitation is increasingly not whether the model is smart enough. It is whether the model can use <mark className="concept">the company’s own data and domain knowledge</mark>. A general model does not automatically know our architecture, business rules, customers, or the decisions the company has made over many years.</> },
      { cue: 'AI 的下一個主戰場', text: <>That is why I believe the next major battleground in AI will be company-specific data and knowledge. Powerful models will become available to everyone. The lasting advantage will come from who can turn their own data into better decisions, better products, and better ways of working. Put simply, <mark className="outcome">the companies that make the best use of their data will have the advantage in AI</mark>.</> },
      { cue: '所以是 Databricks', text: <>That is what makes Databricks different to me. Databricks already sits at the center of where enterprise data is brought together, processed, understood, and governed. The Data Intelligence Platform is not just adding AI on top of a product. It is helping companies turn <mark className="outcome">their own data into intelligence that AI can actually use</mark>.</> },
      { cue: 'Databricks × FDE', text: <>Databricks gives me both the platform and the customer environment to work on that problem at a much larger scale. As an FDE, I could work directly with customers across industries, understand where data and AI can change a real workflow, build the solution with them, and stay responsible for adoption and measurable outcomes.</> },
      { cue: '最後的個人連結', text: <>I also like the engineering culture at Databricks. A lot of my own work has been about turning difficult technical problems into platforms that other people can build on. Databricks has done that at a much larger scale. So for me, <mark className="outcome">Databricks is a place where I can use my experience and continue to grow</mark>.</> },
    ],
    reminders: ['主線：model 已經很強 → 瓶頸轉到 company data / domain knowledge → 這是下一個主戰場 → Databricks 正站在這個位置。', '不要把 context engineering、evaluation 或 permissions 說成 Databricks 專屬差異；它們只能當 supporting details。', '「誰掌握 data 誰有未來」用 make the best use of their data 來說，比單純 data ownership 更準確。', '若時間有限，先略過 engineering culture；Model 驚訝、真正限制、下一個主戰場、所以是 Databricks 四格不能少。'],
  },
  {
    id: 'xcraft-xdesign', section: 'flagship', nav: 'Story 1 · xCraft → xDesign', step: '04', title: 'Impact Story: Follow the bottleneck', duration: '3 min primary',
    purpose: '主 Impact Story。證明 Builder Mindset、production AI architecture、customer discovery 與 measurable outcome。',
    focus: ['Builder Mindset', 'Data & AI', 'Customer Advisor'],
    points: [
      { cue: '一句話開場', text: <>One project I’m particularly proud of is an <mark className="concept">AI-native product development system</mark> I designed and built called xCraft and xDesign.</> },
      { cue: '起點', text: <>We already had an add-on module framework for our healthcare platform. That is another project I’m very proud of, and I can talk more about it later. More recently, we took it one step further. We wanted to see whether AI agents could build real frontend features <mark className="concept">directly on top of that framework</mark>.</> },
      { cue: 'Production level', text: <>The first challenge was production quality. The agent could not just generate code that worked by itself. It had to <mark className="concept">follow our existing architecture and design system</mark>, stay consistent with the rest of the product, and produce code that engineers could maintain. So consistency and stability were already important.</> },
      { cue: 'Healthcare level', text: <>Healthcare added another level of difficulty. A feature cannot just look right or mostly work. <mark className="concept">All required logic must be implemented correctly</mark>, because missing even one important rule can put patient safety at risk. For us, a <mark className="concept">stable and controllable tool</mark> was more important than maximum speed or creativity.</> },
      { cue: 'xCraft 架構', text: <>I built xCraft as an orchestration layer on top of coding agents rather than trying to replace them. It manages task decomposition, context, specialized sub-agents, knowledge retrieval, execution state, testing, and requirement-to-code consistency.</> },
      { cue: 'Requirement Atomizer', text: <>One simple technique I can share is a component I built called the <mark className="concept">Requirement Atomizer</mark>. It breaks a long requirement into small, testable items and gives each item a unique tag. Then we connect those tags to the relevant code, so the system can <mark className="outcome">automatically detect if the agent has skipped anything</mark>.</> },
      { cue: 'xCraft 結果', text: <>xCraft has now automatically delivered <mark className="metric">close to a hundred real features</mark>. But that success exposed a new problem: we had accelerated engineering so much that the bottleneck moved upstream to design.</> },
      { cue: '我一開始的想法', text: <>My first idea was simple: designers could send tasks directly to xCraft, just like engineers did. But xCraft was designed to work for hours and return a nearly finished feature.</> },
      { cue: 'Designer 真正需要的', text: <>After working with our designers, I realized that was not what they needed. They needed <mark className="concept">a much lighter and faster tool</mark> that could create rough options, let them compare different directions, and make changes quickly.</> },
      { cue: '先看成熟方案', text: <>When we started thinking about using AI to support the design process, we first looked at <mark className="concept">mature tools already available from well-known companies</mark>. We compared v0, Figma Make, and Claude Design. When we tested them for our use case, v0 worked well for an independent website in its own sandbox, but it was hard to give it all the rules of our product. Figma Make could use a component library and keep the style consistent, but in our setup engineers still had to turn the design into product code.</> },
      { cue: '多一層轉換的風險', text: <>Claude Design could pass its design to Claude Code, but in our test that still added another step to translate the output back into our local component library. <mark className="concept">Every extra translation step added more risk</mark>.</> },
      { cue: '我的做法', text: <>My approach was different. I built a lightweight version of xCraft directly on top of our real framework and component library. Designers could <mark className="concept">vibe code on the real product</mark>, compare the rendered versions, and keep fine-tuning the one they selected. Because the result was already product code, <mark className="outcome">an engineer did not need to rebuild the same design again</mark>.</> },
      { cue: '從架構拆開職責', text: <>This gave us a clear separation of responsibilities. I redesigned the architecture so the design workflow and the main xCraft workflow could access <mark className="concept">different sets of files</mark>. The design side owned the UI files, while xCraft focused on the business-logic files. Each side was <mark className="outcome">technically unable to change the area owned by the other</mark>.</> },
      { cue: '新的瓶頸', text: <>That solved the handoff between design and engineering, but it did not solve the designer capacity problem. Designers still had to use lightweight xCraft and drive every UI iteration themselves. That became our next bottleneck, so <mark className="concept">I built a new agent called xDesign</mark> to take over the repetitive design work while designers kept the important decisions.</> },
      { cue: '只抓最重要的 workflow', text: <>To build xDesign, I worked closely with our designers to understand the key steps in their workflow: <mark className="concept">understand the user need, review related designs, create different versions, and refine the selected one</mark>.</> },
      { cue: 'xDesign + xFabric', text: <>xDesign manages that workflow and connects to xCraft through another platform I built, xFabric. It asks xCraft to create <mark className="concept">several real versions of the feature</mark>. Designers can compare the rendered results and choose based on their own judgment. xDesign then uses a visual-judge agent to inspect the selected result and send xCraft a focused refinement task.</> },
      { cue: 'Loop guardrail', text: <>The agents continue that loop until the design passes the acceptance criteria. If they fail to converge or exceed an iteration limit, the system <mark className="action">escalates to a human instead of looping indefinitely</mark>.</> },
      { cue: 'xDesign 實際成果', text: <>At the moment, xDesign has completed <mark className="metric">around 15 to 20 design tasks that our designers reviewed and approved</mark>. We started with common design patterns that our team already knew well. For those tasks, our designers estimate <mark className="metric">roughly 90% less manual work</mark>.</>, note: '90% 只限目前 15–20 個已 review 的 common design tasks。' },
      { cue: '收尾', text: <>The biggest lesson for me is that <mark className="outcome">when you solve one bottleneck, you need to look for the next one</mark>. xCraft made engineering faster, but then design became the bottleneck, so I built xDesign. My goal is to <mark className="outcome">automate the normal path from design to implementation</mark>. People only step in at clear boundaries—to choose the direction, approve the result, or handle a case the system cannot solve safely.</> },
    ],
    reminders: ['主題是 bottleneck migration，不是「我做了兩個 agent」。', '比較 v0 / Figma Make / Claude Design 時一定說 when we tested them for our use case，不要宣稱它們現在完全做不到 codebase 或 design-system integration。', '被追問 reliability：requirement traceability、visual judge、loop guardrail。', '被追問 failure：原本以為 designer 直接發 task 給完整 xCraft 就好，後來才發現他們要 rough、fast、iterative。'],
  },
  {
    id: 'xcraft-xdesign-qa', section: 'flagship', nav: 'Story 1 Q&A · xCraft', step: '04Q', title: 'xCraft / xDesign: difficulties and follow-up answers', duration: '追問用',
    purpose: 'Story 1 講完後的追問題庫。被問 failure、AI reliability、trade-off 或競品比較時，只挑對應的一題回答。',
    focus: ['Failure / Learning', 'AI reliability', 'Trade-offs'],
    points: [
      { cue: '最初哪裡想錯？', text: <>My first idea was to let designers send tasks to the normal xCraft workflow, just like engineers. That was wrong. Designers did not want to wait hours for one nearly finished result. They needed <mark className="concept">rough options they could compare and change quickly</mark>. I changed the workflow instead of asking the users to change how they worked.</> },
      { cue: '最危險的 failure？', text: <>One dangerous failure was that the agent could silently skip part of a long requirement. It did not report an error; it simply left one part undone. I built a system that gives every requirement a tag, connects those tags to the code, and checks whether any tag is missing. <mark className="concept">It checks coverage, but it does not prove correctness</mark>, so testing and human review are still necessary.</> },
      { cue: '哪個 boundary 做太晚？', text: <>At first, xCraft could change both the UI and the logic. Once designers started using lightweight xCraft for the UI, the main xCraft workflow sometimes changed the UI again while adding logic. The final result no longer matched the design we had reviewed. I realized that instructions alone were not enough. I rewrote the architecture so the design and logic workflows had access to <mark className="concept">different sets of files</mark>. Each side could edit only the files it owned, so it was technically impossible to change the other side’s work. I made this architecture change too late, so <mark className="outcome">we had to update dozens of existing widgets</mark>.</> },
      { cue: 'Agent 跟 human scale 有何不同？', text: <>We first treated an agent like a faster human user. But a human might send one screenshot and ask for one change, while xDesign could request more than ten screenshots and many small changes in one workflow. The context became too large. I added a planner, broke the work into smaller tasks, and made sure each sub-agent saw <mark className="concept">only the images needed for its task</mark>.</> },
      { cue: '還沒完全解掉什麼？', text: <>One challenge we are still improving is the cost of visual review. A human can look at a large screen and notice several problems at once. An AI reviewer often needs smaller screenshots to stay focused, which means more images, more review steps, and more cost. Splitting the review across focused sub-agents brought the cost closer to human review, but <mark className="outcome">it is not fully solved yet</mark>.</> },
      { cue: '何時交回 human？', text: <>We automate the repeatable path, but we define clear stop conditions. If the design meets the acceptance criteria, it passes. If the agents cannot agree, go over the iteration limit, or have low confidence, the system sends the work to a human. <mark className="concept">Human review is part of the design</mark>, not an exception added after failure.</> },
      { cue: '為何不用現成 design tool？', text: <>I did compare our approach with v0, Figma Make, and Claude Design. They were useful for fast prototypes, but when we tested them for our use case, there was still a gap between the design or sandbox output and our real product code. Our workflow starts with the real framework and component library, so <mark className="outcome">the selected version is already product code</mark> instead of something an engineer must rebuild.</> },
    ],
    reminders: ['不要一次講完整頁；聽到問題後只選對應的一格。', 'Failure 回答順序：wrong assumption → evidence → change → lesson。', 'Visual-review cost 要誠實說 still improving；這比假裝所有問題都解完更可信。', '競品比較一定限定 when we tested them for our use case。'],
  },
  {
    id: 'addon-platform', section: 'flagship', nav: 'Story 2 · Add-on Platform', step: '05', title: 'Platform Story: Lower the cost of contribution', duration: '3 min primary',
    purpose: '證明 enterprise platform depth、migration leadership、adoption 與跨團隊結果。',
    focus: ['Execution & Adoption', 'Technical depth', 'Team Fit'],
    points: [
      { cue: '開場與角色', text: <>When I moved from backend engineering into our platform architecture team, one of the biggest problems we were facing was <mark className="concept">how to scale our healthcare product</mark>.</> },
      { cue: '產品已到極限', text: <>Our outpatient product had grown into a very large frontend covering many medical specialties and workflows. As more features accumulated in the same application, local changes increasingly caused regressions in unrelated areas, build and deployment time kept growing, and onboarding new engineers became harder.</> },
      { cue: '真正的 platform 問題', text: <>More importantly, this was not sustainable if we wanted the product to become a platform. If every internal team, hospital-specific developer, or future third-party contributor had to understand and modify one huge application just to add a feature, <mark className="concept">the ecosystem could never scale</mark>.</> },
      { cue: '兩種 coupling', text: <>There were two forms of coupling we had to address: shared data coupling, and code and deployment coupling. Solving only one would not give contributors real independence.</> },
      { cue: '先建立 xDS', text: <>Historically, features fetched and managed their own data and used point-to-point watchers to stay synchronized. In healthcare, that is risky because every operation and every displayed piece of information must correspond to the correct patient. So we first built <mark className="concept">xDS as a consistent shared-data and patient-context layer</mark>.</> },
      { cue: 'Incremental migration', text: <>For code and deployment coupling, I helped drive an incremental move toward add-on modules. We validated completely new features first, including independent off-page execution. Then we moved the main application toward a shell model, validated in-page composition using Module Federation, and selected existing features with clean boundaries as the first migration candidates.</> },
      { cue: '平台吸收複雜度', text: <>The goal was to make contribution simple. A module developer should focus on what the feature does; the platform should absorb how it is composed, discovered, loaded, versioned, and deployed.</> },
      { cue: '處理醫院差異', text: <>As the platform grew, the abstraction expanded beyond UI widgets. Different hospitals could need different implementations of the same business capability, so we introduced stable Action contracts. The common product depends on a capability interface, while deployment configuration selects the hospital-specific implementation <mark className="outcome">without adding customer-specific branches to the product core</mark>.</> },
      { cue: '補回 integration visibility', text: <>Independent development then created another problem: developers lost visibility into how their changes affected other modules. We built xEmulator as a simulated shell where a widget could be tested with realistic shared data and cross-widget behavior, without every developer cloning and modifying the entire host application.</> },
      { cue: '最難是 adoption', text: <>The hardest part was not the architecture; it was organizational adoption. The migration required engineering teams and PMs to temporarily slow feature delivery and invest in work whose value would appear over time.</> },
      { cue: '先證明再爭取', text: <>I first built pilots to reduce the technical uncertainty. I then used that evidence to make the case to senior leadership and the engineering and PM managers, and secured the capacity needed for migration.</> },
      { cue: 'Ownership 分散出去', text: <>Once the direction was approved, each feature owner proposed how their own domain should be decomposed, and I reviewed those plans to keep the platform boundaries consistent. This let domain experts own the migration <mark className="action">without turning the platform team into the bottleneck</mark>.</> },
      { cue: 'Migration 當下結果', text: <>At the time of the migration—even while engineers were still learning the new framework—we measured a <mark className="metric">46% improvement in feature delivery speed</mark> and a <mark className="metric">58% reduction in defect age</mark>.</> },
      { cue: '現在的 scale', text: <>The platform has now grown to <mark className="metric">300+ independently deployable widgets across about 20 engineers</mark>. The impact continues to increase as the product grows because teams can develop, deploy, and maintain their features more independently.</> },
      { cue: 'AI 延伸', text: <>An interesting evolution is that the same explicit boundaries we originally created for human and third-party contributors now make AI coding agents much easier to control. The platform keeps creating new value beyond the original migration.</> },
      { cue: '政府認可', text: <>This design also led to <mark className="outcome">two patents granted by the Taiwan Intellectual Property Office</mark>, which gave us external recognition that the architecture was genuinely innovative.</> },
      { cue: '收尾', text: <>My biggest lesson is that a platform is not just modular architecture. It succeeds when you <mark className="outcome">keep lowering the cost for the next contributor</mark> while keeping shared contracts, safety, and lifecycle management under control.</> },
    ],
    reminders: ['技術選型不是主角；platform contribution model 才是。', '最難的部分一定講 organizational alignment。', '數字以最新的 300+ / 46% / 58% 為準。'],
  },
  {
    id: 'addon-platform-qa', section: 'flagship', nav: 'Story 2 Q&A · Platform', step: '05Q', title: 'Add-on Platform: difficulties and follow-up answers', duration: '追問用',
    purpose: 'Story 2 講完後的追問題庫。被問 adoption、migration、architecture choice 或 trade-off 時，只挑對應的一題回答。',
    focus: ['Adoption', 'Architecture choices', 'Trade-offs'],
    points: [
      { cue: '最難的是什麼？', text: <>The hardest part was not Module Federation. It was asking engineering teams and PMs to slow down roadmap work for a migration whose value would come later. I did not ask them to trust a slide deck. I built small pilots first, so the discussion changed from “can this work?” to <mark className="concept">“is the migration worth the cost?”</mark></> },
      { cue: '如何避免 big bang？', text: <>We moved in steps. We tested new features first, then tested both independent pages and features inside the main product. After that, we migrated a few existing features with clear boundaries. Once those pilots were stable, each domain owner proposed a migration plan and I reviewed the boundaries. This let us scale without making <mark className="outcome">the platform team the migration bottleneck</mark>.</> },
      { cue: '為何先做 xDS？', text: <>Splitting the UI first would not create real independence if every module still depended on messy shared state. It would only move the coupling somewhere else. We needed <mark className="concept">one safe patient and clinical-data context</mark> before independent modules could change safely.</> },
      { cue: '為何選 Module Federation？', text: <>We needed features that different teams could build and release independently, but those features still had to appear inside the same product shell. Module Federation matched that need because it allowed us to <mark className="concept">combine independently built features at runtime</mark> instead of putting everything back into one build.</> },
      { cue: '為何不用 iframe？', text: <>We did consider iframes. They provide strong isolation, but many of our screens are closely connected. We also needed a shared user experience, shared patient state, and a simple development workflow. We did not want <mark className="concept">every feature to become a separate island</mark>.</> },
      { cue: 'Action 是什麼？', text: <>An Action is a stable contract for a business capability. The caller only needs to know what the capability does. Each hospital can choose the implementation that fits its own system when the product is deployed. This lets hospital-specific behavior change <mark className="outcome">without adding hospital-specific branches to the common product</mark>.</> },
    ],
    reminders: ['不要一次講完整頁；聽到問題後只選對應的一格。', '這個故事最重要的難點是 organizational adoption，不是背技術功能。', '架構選型回答順序：need → choice → trade-off。'],
  },
  {
    id: 'seminar', section: 'backup', nav: 'GenAI Seminars', step: '06A', title: 'Influence without authority', duration: '2 min backup',
    purpose: '最適合回答 Customer Advisor、executive communication、influence 或 conflict。',
    focus: ['Customer Advisor', 'Team Fit'],
    points: [
      { cue: '自然開場', text: <>A story that comes to mind is a GenAI seminar I led in early 2023. It is a good example of how I <mark className="concept">influenced people even though I was not their manager</mark>. At that time, our VP believed GenAI would change our industry, but most people on the team were still unsure what it could really do. He wanted our AI division to start exploring it early.</> },
      { cue: '我的責任', text: <>Our VP selected me as the engineering lead for a seminar held every two weeks. I was responsible for finding speakers, choosing useful topics, helping people prepare, and reviewing each session with the VP before it was presented to about 120 people.</> },
      { cue: '第一個困難', text: <>The biggest problem was motivation. Engineers were busy, and many felt their experiments were too simple to share. I used the trust I had built across teams to find volunteers, then worked with each speaker to turn a small experiment into a story that could help the audience.</> },
      { cue: '扛住 review 壓力', text: <>Some VP reviews were difficult and the feedback was very direct. Because I had asked these colleagues to volunteer, I felt responsible for supporting them. I helped rebuild their confidence, researched the topic with them, and rewrote the presentation until it was ready.</> },
      { cue: '向 VP 說明價值', text: <>Later, when the VP questioned whether the seminar should continue, I explained that the goal was not to produce a big new idea every two weeks. The real value was <mark className="concept">making AI experimentation a normal team habit</mark>. He agreed, and the program continued for six months.</> },
      { cue: '實際結果', text: <>We ran <mark className="metric">10+ sessions for about 120 people over six months</mark>. One idea became a production Q&A system for internal development and DevOps knowledge, and leadership also started funding AI tools and subscriptions for the department.</> },
      { cue: '長期影響', text: <>The formal program later ended after a company reorganization, but the habit stayed. Teams kept sharing and experimenting, which made our later AI transformation easier. Other departments also began inviting me to share our AI work.</> },
      { cue: 'FDE bridge', text: <>What I learned was how to understand why people hesitate, explain the value in a way that fits the audience, and <mark className="outcome">move people from interest to action</mark>. I believe that is directly useful in customer-facing FDE work.</> },
    ],
  },
  {
    id: 'graphql-xds', section: 'backup', nav: 'GraphQL → xDS', step: '06B', title: 'Failure: Know when to cut your losses', duration: '2 min backup',
    purpose: '最適合回答 failure、trade-off、data architecture 與 learning。',
    focus: ['Data & AI', 'Failure / Learning'],
    points: [
      { cue: '自然開場', text: <>One failure that <mark className="concept">taught me a lot</mark> came from our decision to use GraphQL. At the time, our frontend had to call many backend services, and the frontend and backend did not always agree on the data format. GraphQL looked like a good solution because it could reduce the number of API calls and give both sides a clear schema.</> },
      { cue: '我的失誤', text: <>I did not question the choice at the beginning because the reasoning sounded good. I joined the work without first testing whether the design would still work with the large amount of data in a clinical system.</> },
      { cue: 'Scale 後出問題', text: <>GraphQL worked with small examples. But with large patient histories, medication records, and lab results, the time spent reading and checking the data became greater than the time we saved by reducing API calls.</> },
      { cue: '我們試著救它', text: <>We tried several fixes. We improved JSON parsing, cached data that did not change often, and finally allowed some large requests to return raw JSON without schema checks. Each fix helped a little, but none solved the main problem.</> },
      { cue: 'Turning point', text: <>Raw JSON was the turning point. Once we removed the schema check, we also removed the main reason we had chosen GraphQL. We were back to untyped data, but now we had <mark className="concept">two different systems to maintain</mark>.</> },
      { cue: '改成 xDS', text: <>We decided to remove GraphQL and build xDS instead. xDS keeps shared clinical data in memory, organizes it into clear data areas, and gives every feature <mark className="concept">one consistent patient context</mark>.</> },
      { cue: 'Result', text: <>xDS became the main data layer for our platform and later supported every independently deployed widget. Its multi-version data design and patient-consistency model also received <mark className="outcome">a patent from the Taiwan Intellectual Property Office</mark>.</> },
      { cue: 'Lesson', text: <>I learned to test important technology choices with real production scale much earlier. I also learned that <mark className="outcome">removing a design that is not working can be more valuable than continuing to fix it</mark>.</> },
    ],
  },
  {
    id: 'schema-automation', section: 'backup', nav: 'Schema Automation', step: '06C', title: 'Bias for Action: Remove a recurring bottleneck', duration: '75 sec backup',
    purpose: '最適合回答 initiative、ownership 與 proactive improvement。',
    focus: ['Bias for Action', 'Execution'],
    points: [
      { cue: '自然開場', text: <>A smaller project I’m proud of started with <mark className="concept">a problem I kept seeing between our backend and frontend teams</mark>. They stored related data schemas in different places, so the schemas often went out of sync. Every change created another round of checking, discussion, and manual updates.</> },
      { cue: '我主動開始', text: <>This was not a project assigned to me. I saw the same delay happen again and again, so I proposed making the backend schema the starting point and generating the frontend types automatically.</> },
      { cue: '第一步', text: <>I built a simple pipeline: the backend team continued defining schemas in Python, we converted them into JSON Schema, and then generated the TypeScript interfaces used by the frontend.</> },
      { cue: '繼續擴大', text: <>After that worked well, we automated more of the data-node code too. Once the process was stable, we documented it and handed it to the teams that used it, so it did not depend on me.</> },
      { cue: 'Result', text: <>Schema updates went from <mark className="metric">two to three days to under ten minutes</mark>. The work also received the highest performance rating in my review.</> },
      { cue: 'Lesson', text: <>My lesson was simple: when the same manual problem keeps slowing down several teams, I do not wait for someone to create a project. I <mark className="action">prove a small solution first, then make it easy for everyone to use</mark>.</> },
    ],
  },
  {
    id: 'hal-addon-api', section: 'backup', nav: 'HAL → Add-on API', step: '06D', title: 'Growth: Redesign your own architecture', duration: '90 sec backup',
    purpose: '最適合回答 growth、self-critique、platform thinking 與 API integration。',
    focus: ['Growth', 'Trade-offs'],
    points: [
      { cue: '自然開場', text: <>One project that shows <mark className="concept">how my thinking changed as I gained experience</mark> is HAL, an integration layer I designed for hospital systems. Our product had to connect with those systems, but every hospital used different APIs, data formats, and login methods.</> },
      { cue: '我設計的 V1', text: <>For our first hospital, I designed HAL, a frontend package that converted those different APIs into one common interface. It solved the immediate problem and worked well for that first hospital.</> },
      { cue: '第二間醫院暴露問題', text: <>When we added a second hospital, the weakness became clear. Each hospital had its own copy of the package. If an API vendor changed something, we had to update every hospital copy separately, even when several hospitals used the same vendor.</> },
      { cue: '回頭檢查自己的設計', text: <>Later, after I built our add-on platform, I looked back at HAL and realized I had designed for one hospital, not for a growing platform. No one asked me to replace it; <mark className="action">I proposed changing my own earlier design</mark>.</> },
      { cue: 'Add-on API', text: <>We separated each vendor integration into its own module. Every product team still used the same API contract, but each hospital could choose the module that matched its vendor when the system started.</> },
      { cue: 'Result', text: <>Now, when a vendor changes its API, we <mark className="metric">update one module instead of one copy for every hospital</mark>. New hospitals can also reuse modules we already have instead of building every integration again.</> },
      { cue: 'Lesson', text: <>HAL was a reasonable solution for the first problem I saw. But as my platform experience grew, I could see a better design. I learned that growth also means being willing to <mark className="outcome">question and replace something I designed myself</mark>.</> },
    ],
  },
  {
    id: 'xsupport', section: 'backup', nav: 'Knowledge Assistant', step: '06E', title: 'Reframe the adoption blocker', duration: '90 sec backup',
    purpose: '最適合回答 customer discovery、workflow reframing、RAG 或 adoption。',
    focus: ['Customer Advisor', 'Bias for Action'],
    points: [
      { cue: '自然開場', text: <>One experience that <mark className="concept">taught me a lot about adoption</mark> came from a knowledge assistant we were building for customer support. The tool looked promising, but the project was blocked because the PM team believed it was not ready to go live.</> },
      { cue: '原本的 blocker', text: <>They wanted the assistant to read many chat groups, find messages about known issues, group those messages together, and create solutions before we could launch it.</> },
      { cue: '我看到的問題', text: <>I thought we were making the old workflow permanent. Chat groups were useful for urgent communication, but they were messy and were not designed to be a long-term knowledge base. Making AI understand every old message perfectly was <mark className="concept">the wrong go-live requirement</mark>.</> },
      { cue: '重新定義 workflow', text: <>I proposed a different end state. Issues should automatically become tickets, and the ticket system should be the one reliable place for issue knowledge. The AI could then learn from cleaner, organized information.</> },
      { cue: '說服團隊', text: <>I explained this to the PM lead, engineering lead, and the leadership group. We agreed to stop treating messy chat history as a blocker and instead improve how knowledge was created and maintained. That decision allowed the project to move forward.</> },
      { cue: '建立 feedback loop', text: <>We also let the agent add comments to the tickets about what it had learned. PMs could see and correct that knowledge, and they had a clear place to update the assistant’s guidelines.</> },
      { cue: 'Lesson', text: <>I learned that execution is not always about building the requested feature. Sometimes the most useful action is to <mark className="outcome">remove a false blocker and design a workflow that can grow</mark>.</> },
    ],
  },
  {
    id: 'focus-coverage', section: 'close', nav: '6 Focus Areas', step: '07', title: 'Official focus-area coverage', duration: '30 sec scan',
    purpose: '面試前快速確認六個官方評估面向都有對應證據，不需要另外背六套故事。',
    focus: ['Coverage check'],
    points: [
      { cue: 'Builder Mindset', text: <><mark className="concept">xCraft → xDesign</mark>: experiment with new AI tools, follow the bottleneck, and turn exploration into an adopted workflow.</> },
      { cue: 'Data & AI Expertise', text: <><mark className="concept">xDS + agent architecture</mark>: explain ownership, context, versioning, evaluation, deterministic controls, and trade-offs.</> },
      { cue: 'Customer Advisor', text: <><mark className="concept">Designer interaction-model failure + GenAI seminars</mark>: understand what users actually need and tailor communication to engineers or executives.</> },
      { cue: 'Execution & Adoption', text: <><mark className="concept">Add-on migration</mark>: remove blockers, secure capacity, migrate about 20 engineers, measure 46% / 58% during migration, and show how the impact continued compounding as the product grew.</> },
      { cue: 'Bias for Action', text: <><mark className="concept">Schema automation or knowledge assistant</mark>: spot recurring friction before a formal assignment and prove a better workflow.</> },
      { cue: 'Team Fit', text: <><mark className="concept">Your overall profile</mark>: full-stack depth, production AI, enterprise constraints, cross-team trust, and executive communication.</> },
    ],
    reminders: ['同一故事可以證明多個面向，但每次回答只選一個 angle。', '避免重講內容：先說「I touched on the architecture earlier, so I’ll focus on adoption here.」'],
  },
  {
    id: 'questions', section: 'close', nav: 'Questions for Ankur', step: '08', title: 'Questions to ask the Hiring Manager', duration: 'Choose 2–3',
    purpose: '用問題展現你關心 FDE 的工作方式、customer outcome、產品回饋與成長，而不是只問流程。',
    focus: ['Close strong'],
    points: [
      { cue: '成功樣貌', text: <>When you think about the strongest FDEs on your team, what do they do differently—especially in their first six months?</> },
      { cue: 'Build vs reuse', text: <>How does the team balance solving one customer’s immediate problem with turning the solution into something reusable for other customers or the Databricks product?</> },
      { cue: 'Customer outcome', text: <>How do you measure success for an FDE engagement beyond delivering the initial solution—adoption, consumption, business outcome, or something else?</> },
      { cue: 'Field → product', text: <>When FDEs discover repeated product gaps in the field, how does that feedback influence the core engineering and product roadmap?</> },
      { cue: 'Current challenge', text: <>What is the most important technical or customer problem you want this hire to help the team solve?</> },
    ],
    reminders: ['依對話挑 2–3 題，不要全部問。', '如果面試中已談過某題，就換下一題。', '最後可問：「Is there anything in my background you’d like me to clarify before we close?」'],
  },
]

export const pageById = new Map(guidePages.map((page) => [page.id, page]))
