import type { ReactNode } from 'react'

export type AppleGuideSection = 'recruiter' | 'stories' | 'sre' | 'close'

export interface AppleTalkingPoint {
  cue: string
  text: ReactNode
  note?: string
}

export interface AppleGuidePage {
  id: string
  section: AppleGuideSection
  nav: string
  step: string
  title: string
  duration: string
  purpose: string
  focus: string[]
  points: AppleTalkingPoint[]
  reminders?: string[]
}

export const appleSectionLabels: Record<AppleGuideSection, string> = {
  recruiter: 'Tomorrow · Recruiter screen',
  stories: 'Reusable story bank',
  sre: 'SRE technical preparation',
  close: 'Final review',
}

export const appleGuidePages: AppleGuidePage[] = [
  {
    id: 'about-me', section: 'recruiter', nav: 'About Me', step: '01', title: 'Tell me about yourself', duration: '3 min · choose the cards you need',
    purpose: 'Final modular version。每張卡都能多講一點；依現場時間選六到八張，不必全部念完。',
    focus: ['Final', 'Positioning'],
    points: [
      { cue: '現在是誰', text: <>Hi, I’m ChengDe, a Senior Software Engineer at ASUS Intelligent Cloud Service. For the past <mark className="metric">five years</mark>, I’ve built backend systems and healthcare platforms used across multiple hospitals. My role has grown from backend development into platform architecture, production reliability, and AI-assisted development.</> },
      { cue: 'Backend foundation', text: <>Early in my career, I maintained around ten backend services and hundreds of APIs using Kubernetes, Redis, RabbitMQ, and databases. That gave me hands-on experience with <mark className="concept">how distributed systems behave and fail in production</mark>.</> },
      { cue: 'Formal on-call + healthcare', text: <>I was also part of a <mark className="concept">formal production on-call duty</mark>, handling SLA failures, service crashes, and P0 clinical-data issues. Because doctors and nurses depended on these systems, reliability was directly connected to clinical work and patient safety.</> },
      { cue: '快速成長與認可', text: <>I was promoted to Senior Engineer in about <mark className="metric">two years</mark>, roughly half the usual timeline in my department. I also received both our <mark className="outcome">Code Champion Award and Peer Feedback Award</mark>, which recognized my technical contributions and cross-team collaboration.</> },
      { cue: '為何走向 platform', text: <>Later, I moved into platform architecture because our large, tightly connected product was creating production risk. A local change could break an unrelated workflow, and releases were becoming slower and harder to control.</> },
      { cue: 'Add-on Framework 設計', text: <>I led the design and migration of our Add-on Module Framework to create clear boundaries between features. Teams could build and deploy widgets independently, which <mark className="concept">reduced the impact of each change</mark> and made ownership clearer.</> },
      { cue: 'Add-on 實際結果', text: <>The platform now supports <mark className="metric">more than 300 independently deployable widgets and contributions from over fifteen engineers</mark>. During the migration quarter, delivery speed improved by 46%. More importantly for reliability, <mark className="outcome">defect age decreased by 58%</mark>, meaning known problems were fixed much faster. Those improvements have continued as the platform has grown.</> },
      { cue: 'xDS：patient consistency', text: <>That was not the only way I improved reliability. <mark className="concept">In healthcare, data consistency is critical</mark> because every feature must use the correct patient’s data. I helped design xDS as a shared patient-context and clinical-data layer, giving every feature one consistent data source. This improved safety and reliability, and <mark className="outcome">the design was granted a patent by the Taiwan Intellectual Property Office</mark>.</> },
      { cue: '最近的 AI 工作', text: <>More recently, I built a self-hosted AI workflow that connects design and coding agents directly to our product framework. It helps designers and PMs turn ideas into working widgets with fewer handoffs.</> },
      { cue: 'AI 的 quality assurance', text: <>In healthcare, AI is useful only if the result is safe and complete. I use controlled execution, requirement tracking, tests, metrics, and validation to keep the output <mark className="concept">stable, complete, and observable</mark>.</> },
      { cue: '結尾：我帶來什麼', text: <>Across all these projects, my goal has been the same: turn production problems into systems that are safer, easier to operate, and less likely to fail again. Although my formal title has been Software Engineer, <mark className="concept">reliability has shaped how I design, build, and operate systems</mark>. That is the experience and mindset <mark className="outcome">I would bring to an SRE role</mark>.</> },
    ],
    reminders: ['這是 modular 三分鐘素材；全部講會超時，現場選六到八張。', '核心必講：現在是誰、formal on-call、Add-on、xDS、AI quality、共同主線。', 'Add-on 數字可依 recruiter 反應選講。'],
  },
  {
    id: 'why-role', section: 'recruiter', nav: 'Why This Role / SRE', step: '02', title: 'Why this role, and why SRE?', duration: '75–90 sec',
    purpose: 'Final。主軸：reliability 經驗與 mindset → ownership → Apple 的使用者信任 → 想成為支撐可靠性的人。',
    focus: ['Final', 'Reliability + ownership'],
    points: [
      { cue: '一直在做 reliability', text: <>Across my past work, I have spent a lot of time protecting <mark className="concept">quality and reliability</mark>—from production on-call and incident response to platform design and quality controls for AI-generated features.</> },
      { cue: '我的 engineering mindset', text: <>More importantly, that experience has shaped how I think as an engineer. <mark className="concept">I care a lot about owning the outcome of my work.</mark> I don’t want to stop when the code is finished. I want to know that the system is safe, stable, and something users can trust.</> },
      { cue: '為什麼連到 Apple', text: <>That is also what attracts me to this role at Apple. I have always admired the confidence people have when they use Apple products. They expect the experience to be consistent and reliable, even though there is a huge amount of complexity behind it.</> },
      { cue: '我想成為其中一員', text: <><mark className="outcome">I want to be one of the engineers who makes that reliability possible.</mark> For me, SRE is a role where I can use the mindset and experience I already have to create impact at a much larger scale.</> },
    ],
    reminders: ['回答順序：reliability 經驗 → ownership → 使用者信任 → 想成為支撐可靠性的人。', 'About Me 已有具體 on-call 細節，這題不需要再重複完整事件。', '不要在這題主動提 physical-server gap。'],
  },
  {
    id: 'why-apple', section: 'recruiter', nav: 'Why Apple', step: '03', title: 'Why Apple?', duration: '75–90 sec',
    purpose: '把 Apple 獨特的跨層系統、自己的 platform 經驗與 global impact 接起來。',
    focus: ['Final', 'Apple motivation'],
    points: [
      { cue: '兩個主要原因', text: <>Apple stands out to me for <mark className="concept">two reasons</mark>.</> },
      { cue: 'Apple 的跨層系統', text: <>First, very few companies build across so many layers—from silicon and hardware to operating systems, cloud services, applications, and now AI. <mark className="concept">All of those layers have to work together as one experience.</mark></> },
      { cue: '和我的經驗連結', text: <>Much of my own work has been about creating clear boundaries and reliable connections between systems, so the depth and complexity of Apple’s environment are very attractive to me.</> },
      { cue: '第二個原因：impact', text: <>Second, Apple’s infrastructure supports products and services used by people around the world. A reliability improvement may happen deep inside the platform, but <mark className="outcome">its effect can reach a very large number of users</mark>.</> },
      { cue: '個人收尾', text: <>That combination—deep systems work and direct real-world impact—is what makes Apple different for me. I want to bring the production and platform experience I already have and help build <mark className="outcome">infrastructure that people can depend on every day</mark>.</> },
    ],
    reminders: ['不要說成只是想進 Apple 看看或學習；重點是能帶來什麼。', '關鍵連結：跨層系統 → 個人 platform 經驗 → infrastructure reliability → global impact。'],
  },
  {
    id: 'why-change', section: 'recruiter', nav: 'Why Change / What Next', step: '04', title: 'Why are you considering a change?', duration: '45–60 sec + follow-up',
    purpose: '肯定現職成果，再說你準備承擔更大的 scale、systems depth 與 production ownership。',
    focus: ['Career direction', 'Positive framing'],
    points: [
      { cue: '先肯定現在', text: <>I’m proud of what I have achieved in my current company. I grew from backend engineering into platform architecture and AI automation, and I have had the chance to lead systems that are now used across our product.</> },
      { cue: '完成重要 milestone', text: <>Our add-on platform has reached an important milestone with more than 300 widgets. I feel this is the right time to apply that experience to a larger operational environment and a deeper infrastructure problem space.</> },
      { cue: '下一步要什麼', text: <>In my next role, I’m looking for <mark className="concept">deep systems work, end-to-end ownership, production responsibility, and larger operational scale</mark>. This Apple SRE role gives me that combination while still letting me stay hands-on and build automation.</> },
      { cue: 'Optional · Why not stay in AI?', text: <>My recent AI work is also platform and reliability work. The difficult part is not calling a model. It is controlling execution, validating outputs, making state visible, and designing safe handoffs. The technology changed, but the engineering pattern stayed the same: <mark className="outcome">build reliable automation around an uncertain system</mark>.</>, note: '只有被追問 Why SRE instead of AI/platform engineering 時才講。' },
    ],
    reminders: ['不要抱怨公司 roadmap 或醫院 migration 速度。', 'AI/global impact 可以提，但不要取代具體的職涯需求。'],
  },
  {
    id: 'production-oncall', section: 'recruiter', nav: 'Production & On-call', step: '05', title: 'Production and reliability experience', duration: '60 sec + follow-up',
    purpose: '第一層只證明你真的處理過 production；Electron 案例留給追問。',
    focus: ['Verified', 'Incident response'],
    points: [
      { cue: '正式 production on-call', text: <>During my first two years, I was part of a <mark className="concept">formal production on-call duty</mark> for around ten backend services. I was contacted for SLA failures, service crashes, and P0 issues where clinical data was missing or not updated correctly.</> },
      { cue: '診斷方式', text: <>We kept only the most critical logs in Azure Application Insights because of cost. I would start there, find the correlation ID, retrieve the detailed logs from disk storage, and reconstruct the request flow to identify the root cause.</> },
      { cue: '主回答停在這裡', text: <>I supported several new hospital deployments and handled urgent issues under time pressure. <mark className="outcome">That work contributed to my accelerated promotion to Senior Engineer, and I also received a Code Champion award.</mark></> },
      { cue: 'Follow-up · 現在的責任', text: <>I now work more on shared platform infrastructure. I see fewer feature-level incidents, but a defect in the shared layer has a much wider blast radius, so staging validation, regression coverage, and safe rollout remain part of my daily work.</> },
      { cue: 'Follow-up · On-call 回答', text: <>Yes, I’m comfortable joining an on-call rotation. I would also like to understand the frequency, recent paging volume, and how escalation support is structured within the team.</> },
      { cue: '追問才講 Electron', text: <>One mitigation example was an intermittent Chromium cache issue in our Electron container. A restarted local service could occasionally receive a stale response from the previous service. Cache clearing was not reliable, so I introduced a reserved rotating-port pool to create a new origin and reduce user impact while we continued investigating.</>, note: '這是 immediate mitigation，不要說已找到或修正 Chromium 的根因。' },
    ],
  },
  {
    id: 'technical-gaps', section: 'recruiter', nav: 'Technical Gaps', step: '06', title: 'What would you need to learn?', duration: '60–75 sec',
    purpose: 'Only answer this when asked. Do not volunteer the full gap list during Why SRE。',
    focus: ['Use only when asked', 'Self-awareness'],
    points: [
      { cue: '先說 strongest match', text: <>My strongest match is in <mark className="concept">backend systems, Kubernetes deployments, platform automation, production debugging, and safe rollout</mark>. I have owned production services and built shared systems used across multiple hospitals.</> },
      { cue: 'Specific domain gap', text: <>The area where I would need the most learning is physical-server provisioning and hardware bootstrap, including PXE, BIOS, TPM, and secure boot. I also have not built Kubernetes operators or controllers in production.</> },
      { cue: '正確定位', text: <>This is <mark className="outcome">a domain-specific gap, not an absence of production or reliability experience</mark>. The reliability mindset, debugging process, automation, and production ownership are already central parts of my work.</> },
      { cue: '用證據證明能學', text: <>I have taken ownership of unfamiliar infrastructure before. When the owner of our Electron container left, I had about three weeks to take over the base platform used by applications in five hospitals. I learned it, maintained it in production, and continued developing it.</> },
      { cue: '可信的收尾', text: <>So I would be clear about what is new to me, while bringing proven production experience and using the real system and its failure cases to close that specific gap.</> },
    ],
    reminders: ['只有被問才回答。', '順序：strongest match → specific gap → domain distinction → learning evidence。', '不要主動念完整 gap list，也不要說「I can learn anything」。'],
  },
  {
    id: 'admin', section: 'recruiter', nav: 'Recruiter Logistics', step: '07', title: 'Administrative questions', duration: 'Short answers',
    purpose: '這些題目只需要清楚、短、不要多送不必要資訊。',
    focus: ['Verified', 'Logistics'],
    points: [
      { cue: 'Singapore', text: <>I’m a Singapore Permanent Resident, and I do not require employment sponsorship.</> },
      { cue: 'Notice period', text: <>My notice period is one month, so I would be available after completing that notice period.</> },
      { cue: 'Compensation', text: <>I’m still learning more about the role and level, so I’m flexible at this stage. Could you share the budgeted compensation range for this position?</> },
      { cue: '若 recruiter 不提供 range', text: <>I’m looking for a package that is competitive for the level and scope of the role, and I would prefer to evaluate the overall package across base salary, bonus, and equity.</> },
      { cue: 'Other interviews', text: <>I’m speaking with a few companies, but I’m still early in the process. Apple is a role I’m taking very seriously because the combination of platform engineering, infrastructure, and scale is particularly relevant to what I want next.</> },
      { cue: 'On-call', text: <>Yes, I’m comfortable with on-call. I would like to learn more about the rotation, escalation model, and the kinds of incidents the team typically handles.</> },
    ],
  },
  {
    id: 'questions', section: 'recruiter', nav: 'Questions to Ask', step: '08', title: 'Questions for the recruiter', duration: 'Ask 2–3',
    purpose: '只問 recruiter 真正掌握的資訊：hiring team 的 interest、面試流程、時程與行政條件。',
    focus: ['Recruiter context', 'Interview process'],
    points: [
      { cue: '1 · Hiring team 看中什麼', text: <>Since the hiring team has already reviewed my background, was there anything in my experience that particularly caught their attention or that they would like to explore further?</> },
      { cue: '2 · Loop 與準備方向', text: <>Could you walk me through the interview process, what each stage is intended to evaluate, and which areas you would recommend I prepare for?</> },
      { cue: '如果只說 technical interview', text: <>Would the technical rounds focus more on coding, Linux troubleshooting, system design, or discussion of my past experience?</>, note: '只有前一題得到的答案太籠統時才追問。' },
      { cue: '3 · 下一步與時程', text: <>What would the next steps and expected timeline look like after this conversation?</>, note: '如果 recruiter 已主動說明，就不必再問。' },
      { cue: '4 · Level 與 compensation', text: <>Could you share the expected level and the budgeted compensation range for this position in Singapore?</>, note: '適合在 recruiter 談到 level 或 compensation 時接著問，不必為了湊問題硬問。' },
    ],
    reminders: ['時間只夠兩題就問第 1 和第 2 題。', 'Timeline 或 compensation 如果前面已經回答，不要重問。', 'Team problems、工作比例、成功背景、on-call 細節與 architecture 留給 hiring manager。'],
  },
  {
    id: 'rapid-followups', section: 'recruiter', nav: 'Rapid Follow-ups', step: '09', title: 'Recruiter rapid follow-ups', duration: '30–45 sec each',
    purpose: '每題只給一個清楚結論和一到兩個證據；不要展開成 technical deep dive。',
    focus: ['Short answers', 'Recruiter level'],
    points: [
      { cue: '現在在做什麼？', text: <>Currently, I’m building AI-assisted product-development workflows. I connect design and coding agents to our add-on framework, then add controlled execution, validation, and clear handoffs so designers and PMs can turn ideas into working widgets more efficiently.</>, note: 'Draft：xCraft / xDesign 數字和 technical details 尚未逐項確認。' },
      { cue: '最自豪的成就？', text: <>I’m most proud of our Add-on Module Framework. I helped turn a tightly connected healthcare product into more than <mark className="metric">300 independently deployable widgets</mark>. It reduced hidden dependencies, gave teams clearer ownership, and created a safer way to support differences between hospitals.</> },
      { cue: '為何 SRE，不繼續 AI？', text: <>My recent AI work is also platform and reliability work. The hard part is not calling a model. It is controlling execution, validating outputs, making state visible, and designing safe handoffs. The technology changed, but the pattern stayed the same: <mark className="concept">build reliable automation around an uncertain system</mark>.</> },
      { cue: '什麼讓你是 senior-level？', text: <>For me, senior-level work means owning more than the code. I define architecture, make production trade-offs, align engineers and PMs, help other teams migrate, and stay responsible for whether the system is actually adopted and safe to operate.</> },
      { cue: '簡述 patents', text: <>The patents are part of one platform plan. xDS keeps patient context consistent across independent features, and xEmulator makes integration testing repeatable; both received granted Taiwan patents. The Add-on Module Framework connects those ideas into independently deployable features, and that patent application is still pending.</> },
      { cue: '最強 technical match？', text: <>My strongest match is building and operating backend and platform systems: Kubernetes deployments, production debugging, automation, safe rollout, and reducing hidden dependencies so failures are easier to isolate.</> },
      { cue: '最需要學什麼？', text: <>The largest learning area is physical-server provisioning and hardware bootstrap at fleet scale. That includes PXE, BIOS, TPM, secure boot, and production controller development. It is a specific infrastructure domain gap, while my production and reliability foundation is already strong.</> },
    ],
    reminders: ['About Me、Why This Role、Why Apple：Final。', 'Production/On-call、Logistics：Verified。', 'xCraft/xDesign 數字與 technical details：Draft until explicitly confirmed。', 'Technical Gaps：Use only when asked。'],
  },
  {
    id: 'recruiter-mock', section: 'recruiter', nav: '25-min Mock', step: '10', title: '25-minute recruiter mock sequence', duration: '20–30 min',
    purpose: '按照 recruiter 最可能的順序練習；follow-up 只停留在動機、範圍和可信度，不進 technical deep dive。',
    focus: ['Mock flow', 'Tomorrow'],
    points: [
      { cue: '1 · Tell me about yourself', text: <>Use the modular About Me cards for around three minutes. Possible follow-ups: “Which project best represents your work?” and “How large is the platform today?”</> },
      { cue: '2 · Why this role?', text: <>Lead with direct SRE evidence. Possible follow-ups: “Why move now?” and “Which parts of your current work overlap most with SRE?”</> },
      { cue: '3 · Why Apple?', text: <>Use the integrated-ecosystem and global-impact answer. Possible follow-ups: “Why Apple instead of another large company?” and “What interests you about this team?”</> },
      { cue: '4 · Why are you changing?', text: <>Stay positive and explain the next scope you want. Possible follow-ups: “Why leave after reaching this milestone?” and “Why SRE instead of continuing in AI?”</> },
      { cue: '5 · Production and on-call', text: <>Stop after the diagnosis path, hospital deployments, promotion, and award unless asked for more. Possible follow-ups: “Are you comfortable with on-call?” and “Can you give one incident example?”</> },
      { cue: '6 · One résumé follow-up', text: <>Be ready for the Add-on Platform, current AI work, patents, senior-level scope, or your strongest technical match. Keep the first answer under 45 seconds.</> },
      { cue: '7 · Logistics', text: <>Answer Singapore PR, one-month notice, compensation, and other interviews briefly. Possible follow-ups: “Do you need sponsorship?” and “What range are you targeting?”</> },
      { cue: '8 · Your questions', text: <>Ask what caught the hiring team’s attention and how each interview stage will be evaluated. Ask about timeline or compensation only if the recruiter has not already covered it.</> },
    ],
  },
  {
    id: 'story-addon', section: 'stories', nav: 'Add-on Platform', step: 'S1', title: 'Flagship: Add-on platform transformation', duration: '90 sec',
    purpose: '證明 platform architecture、safe change、migration leadership 與長期 scale。',
    focus: ['Platform', 'Reliability', 'Leadership'],
    points: [
      { cue: 'Situation', text: <>Our clinical applications were separated into repositories but still tightly coupled internally. Releases took more than an hour, and hidden dependencies created real patient-safety risk. In one near miss, a change in a prescription-copying workflow nearly reused medication from the previous patient.</> },
      { cue: 'Ownership', text: <>I evaluated the options, selected Vite Module Federation, built the proof of concept and framework, and drove the migration. I designed both embedded and independently running modules plus one shared data-access abstraction.</> },
      { cue: '真正難點', text: <>The hardest part was adoption. Teams had to pause roadmap work before seeing the full value. I first built working examples, used them to gain leadership support, then let each domain owner plan their migration while I reviewed the boundaries.</> },
      { cue: 'Reliability design', text: <>The platform controlled shared contracts and patient context while allowing teams to deploy features independently. That reduced the blast radius of changes and made ownership clearer.</> },
      { cue: 'Result', text: <>The platform now supports more than <mark className="metric">300 independently deployable widgets and modules</mark>. In our initial review, delivery improved by 46% and defect age decreased by 58%.</> },
      { cue: 'SRE bridge', text: <>What I would bring to SRE is the same mindset: define safe boundaries, reduce hidden dependencies, make failure easier to isolate, and build a platform that lets other engineers move faster without giving up control.</> },
    ],
    reminders: ['Ditto 是 near miss，不能說真的傷害病患。', '46% / 58% 是 initial post-migration Jira review。', '技術選型不是主角；safe ownership model 才是。'],
  },
  {
    id: 'story-electron', section: 'stories', nav: 'Electron Incident', step: 'S2', title: 'Reliability: mitigate first, investigate safely', duration: '90 sec',
    purpose: '目前最直接的 production debugging 案例；重點是區分 mitigation 與 root-cause fix。',
    focus: ['Incident response', 'Judgment'],
    points: [
      { cue: 'Context', text: <>I owned the Electron container that hosted our web applications on hospital computers. It was shared infrastructure, so one defect could affect several clinical applications.</> },
      { cue: 'Symptom', text: <>We had an intermittent issue that appeared only inside the Electron Chromium window. After one local service stopped and another started, the browser could sometimes reuse a stale API response and show data from the previous service.</> },
      { cue: 'Investigation', text: <>We compared the behavior with normal Chrome, traced the service lifecycle, and tried explicitly clearing the cache. The command reduced some cases but did not behave reliably enough.</> },
      { cue: 'Immediate mitigation', text: <>Because the user impact mattered, I introduced a rotating pool of reserved ports. A newly started service received a different port, creating a new origin and avoiding the stale cached response in practice.</> },
      { cue: 'Honest boundary', text: <>I treated this as mitigation, not proof that we had fixed the underlying Chromium behavior. That distinction mattered because it prevented us from closing the investigation with more confidence than the evidence supported.</> },
      { cue: 'Lesson', text: <>The lesson was to separate immediate risk reduction from root-cause correction, document the remaining uncertainty, and make the next investigation safe for users.</> },
    ],
  },
  {
    id: 'story-graphql', section: 'stories', nav: 'GraphQL → xDS', step: 'S3', title: 'Failure: know when to remove a design', duration: '90 sec',
    purpose: '回答 failure、trade-off、performance debugging 與 sunk-cost judgment。',
    focus: ['Failure', 'Trade-offs'],
    points: [
      { cue: 'Original decision', text: <>We adopted GraphQL to reduce frontend API calls and create a shared data contract. The reasoning sounded good, and my mistake was that I did not challenge the scaling assumptions with realistic clinical datasets early enough.</> },
      { cue: 'Failure at scale', text: <>With large patient histories and medication data, processing and validation costs grew significantly. We optimized parsing and cached stable data, but dynamic patient data remained expensive.</> },
      { cue: 'Turning point', text: <>For some large queries, we eventually returned raw JSON and bypassed schema checks. Once we removed validation, GraphQL no longer gave us enough value over simpler REST APIs.</> },
      { cue: 'Decision', text: <>We removed GraphQL rather than adding another workaround. The backend returned smaller, focused REST responses, while xDS organized and shared the clinical context in memory on the frontend.</> },
      { cue: 'Result', text: <>xDS became the shared data layer for our independently deployed widgets and helped keep patient and encounter context consistent. The design also became part of a granted Taiwan patent.</> },
      { cue: 'Lesson', text: <>I now test the assumptions most likely to fail at production scale, and I treat removal as a valid outcome when the workarounds have already undermined the original value.</> },
    ],
  },
  {
    id: 'story-seminar', section: 'stories', nav: 'GenAI Seminars', step: 'S4', title: 'Leadership: influence without authority', duration: '75–90 sec',
    purpose: '回答 leadership、conflict、resilience 與跨團隊影響力。',
    focus: ['Influence', 'Communication'],
    points: [
      { cue: 'Task', text: <>Our VP selected me to lead the technical content for a bi-weekly GenAI seminar across a department of around 120 people. I had to find speakers, shape topics, and help volunteers prepare.</> },
      { cue: 'Challenge', text: <>People were busy and felt their experiments were too basic to present. I had no management authority, so I relied on trust, tested ideas with them, and helped turn small experiments into useful lessons.</> },
      { cue: 'Conflict', text: <>When the VP questioned whether similar topics justified continuing, I offered a different framing: the goal was not a breakthrough every two weeks, but making AI experimentation a normal engineering habit.</> },
      { cue: 'Result', text: <>He agreed, and we ran more than ten sessions over six months. One idea led to an internal DevOps Q&A system, and leadership began funding more AI tools and experimentation.</> },
      { cue: 'Lesson', text: <>I learned that influence starts with understanding why people hesitate, taking responsibility for the people who trust you, and explaining value in terms that fit the audience.</> },
    ],
  },
  {
    id: 'story-xcraft', section: 'stories', nav: 'xCraft / xDesign', step: 'S5', title: 'Automation: move the bottleneck', duration: '90 sec backup',
    purpose: '被問 automation、AI、ambiguity 或 recent innovation 時使用；不是 Apple SRE 第一主故事。',
    focus: ['Automation', 'Innovation'],
    points: [
      { cue: 'Problem', text: <>We wanted coding agents to build real healthcare features, but production quality required our architecture, component rules, tests, and every clinical requirement to be followed consistently.</> },
      { cue: 'xCraft', text: <>I built xCraft as an orchestration layer around coding agents. It manages task decomposition, specialized skills, context, execution state, testing, and requirement-to-code consistency.</> },
      { cue: 'Guardrail', text: <>One component breaks a long requirement into tagged, testable items and connects those tags to code, allowing the workflow to detect when an item may have been skipped.</> },
      { cue: 'New bottleneck', text: <>After xCraft delivered close to one hundred real features, engineering became faster and design became the bottleneck. Existing design tools still required translation back into our product framework.</> },
      { cue: 'Special workflow', text: <>I extracted reusable skills from xCraft, added design-specific skills, and recomposed them into a lighter workflow for rapid iteration. I then built xDesign to automate repetitive option generation and refinement while designers kept the decisions.</> },
      { cue: 'Reliability bridge', text: <>The relevant SRE lesson is that automation is not only about speed. It needs constrained permissions, explicit validation, observable state, and a safe handoff when human judgment is required.</> },
    ],
  },
  {
    id: 'deep-addon', section: 'stories', nav: 'Deep · Add-on Platform', step: 'D1', title: 'Deep dive: Add-on platform transformation', duration: 'Technical / behavioral follow-up',
    purpose: '短版講完後被追問 architecture choice、migration、data access 或 adoption 時使用。',
    focus: ['Deep dive', 'Platform', 'Leadership'],
    points: [
      { cue: '完整背景', text: <>We had three clinical applications in separate repositories, but each application was still tightly connected inside. Releases took more than an hour, and engineers could not trace every hidden dependency. A prescription-copying change once nearly reused medication from the previous patient, so this was <mark className="concept">a patient-safety problem</mark>, not only technical debt.</> },
      { cue: '我的 ownership', text: <>This was the first large problem I owned after joining the platform team. I reviewed possible approaches, chose the direction, built the first working version and the framework, and then helped drive the migration across teams.</> },
      { cue: '為何選 Module Federation', text: <>I compared single-spa, iframes, a custom widget framework, and Module Federation. Module Federation fit our existing Vite setup and let separately built features appear inside the same product. I also found a runtime hook so the shell could discover modules without listing every remote at build time.</> },
      { cue: 'In-page 與 off-page', text: <>We supported two paths. Features that belonged inside the main workflow could load into the product shell. More isolated secondary workflows could run as separate Electron-hosted widgets and be downloaded only when needed.</> },
      { cue: '統一 data access', text: <>I added one developer-facing xDS client. It hid whether patient data came from component props, URL setup, or socket communication, so a feature could use <mark className="concept">the same data interface in either environment</mark>.</> },
      { cue: '最難是 adoption', text: <>The hardest part was getting people to adopt it. Old and new designs had to work side by side for several months. I built working examples, gained support from management and PMs, and worked with engineers one by one so teams could migrate without stopping product delivery.</> },
      { cue: '把 ownership 分出去', text: <>Each feature owner planned how to separate their own area, while I reviewed the boundaries and helped with difficult cases. This allowed the people who knew each workflow best to lead the migration without making the platform team the bottleneck.</> },
      { cue: '結果與口徑', text: <>The first milestone reached more than 220 widgets, and the platform has now grown beyond <mark className="metric">300 widgets</mark>. Our early Jira review showed 46% faster delivery and 58% lower defect age. Those numbers describe the initial migration period, not a long-term experiment.</> },
      { cue: 'SRE lesson', text: <>The SRE lesson is that reliability improves when ownership and failure boundaries are clear. A strong platform lets teams move independently while keeping shared data, contracts, testing, and rollout under control.</> },
    ],
    reminders: ['Ditto 是 near miss，不能說真的造成病患傷害。', 'Add-on patent still pending；xDS 與 xEmulator 才是 granted patents。'],
  },
  {
    id: 'deep-production', section: 'stories', nav: 'Deep · Production', step: 'D2', title: 'Deep dive: Production operations and reliability', duration: 'About 2 min',
    purpose: '需要完整證明 production、formal duty、debugging 與 mitigation judgment 時使用。',
    focus: ['Deep dive', 'Incident response', 'Production'],
    points: [
      { cue: '早期 production duty', text: <>In the first two years of my career, I was mainly responsible for our backend systems. My phone would ring for SLA problems, service crashes, or P0 cases where clinical data was missing or not updated correctly.</> },
      { cue: '兩層 logging', text: <>We used Azure Application Insights, but cost meant that we kept only the most important logs there. I would find a correlation ID, retrieve the detailed logs from disk storage, and put the whole request flow together to find the cause.</> },
      { cue: '醫院部署壓力', text: <>I handled many urgent issues during new hospital deployments. That work made me known for understanding our framework and system behavior, and it contributed to my early promotion to Senior Software Engineer and my Code Champion award.</> },
      { cue: '接手 Electron', text: <>Later, I took ownership of our Electron container when the previous owner left. It was the base platform that wrapped our web applications as desktop applications on hospital computers.</> },
      { cue: 'Cache 問題', text: <>One difficult problem appeared only in the Electron Chromium window. After one local service stopped and another started, Chromium sometimes reused an old API response and showed data from the previous service.</> },
      { cue: '先調查', text: <>We compared it with normal Chrome, followed the local-service lifecycle, and added an explicit cache-clearing command. The command helped in some cases, but it was not reliable enough.</> },
      { cue: 'Immediate mitigation', text: <>To reduce user impact immediately, I introduced a reserved pool of one thousand ports. A new service used a different port, which created a new origin and avoided the stale cache in practice while we continued investigating.</> },
      { cue: '誠實 boundary', text: <>I treated the port change as <mark className="concept">a mitigation, not a confirmed root-cause fix</mark>. That distinction stopped us from claiming more confidence than the evidence supported.</> },
      { cue: '現在的責任', text: <>I now focus more on shared platform infrastructure. I see fewer feature-level incidents, but one shared-layer defect can affect many applications. Testing, debugging, staging checks, and safe rollout are still part of my daily work.</> },
    ],
  },
  {
    id: 'deep-seminar', section: 'stories', nav: 'Deep · GenAI Seminar', step: 'D3', title: 'Deep dive: Building an AI-first culture', duration: 'Technical / behavioral follow-up',
    purpose: '被追問 influence without authority、conflict、resilience 或 senior communication 時使用。',
    focus: ['Deep dive', 'Influence', 'Communication'],
    points: [
      { cue: 'Situation', text: <>In early 2023, when generative AI was starting to grow quickly, our VP wanted the whole department to explore how it could change our work and products.</> },
      { cue: '為何選我', text: <>He selected an administrator for logistics and me as the engineering lead for a seminar every two weeks. I found speakers, shaped topics, and helped people prepare. My manager later said I was chosen because of my relationships across teams and my AI master’s background.</> },
      { cue: '第一個困難', text: <>The biggest problem was motivation. People were busy, AI was still limited, and many engineers thought their experiments were too basic to present to more than one hundred colleagues.</> },
      { cue: '沒有 authority 怎麼推動', text: <>I relied on trust instead of authority. I found volunteers, discussed the direction with them, researched what other teams were trying, tested the ideas in our codebase, and helped turn each experiment into a useful story.</> },
      { cue: '扛住 VP review', text: <>Every session had a rehearsal with the VP, and the feedback could be very direct. Because people had volunteered after I asked them, I felt responsible for supporting them. I helped rebuild their confidence, researched with them, and sometimes spent the weekend rewriting the material.</> },
      { cue: '和 VP 不同意', text: <>Later, the VP questioned whether similar topics were worth the time. I respectfully offered a different view: the value was not a rare breakthrough every two weeks. It was making AI experimentation <mark className="concept">a normal part of how the team worked</mark>. He agreed, and the program continued.</> },
      { cue: '帶入真正 user', text: <>I also worked with a physician who was spending a gap year with us. We prepared a session about how hospitals were using GPT and what he hoped AI could bring to healthcare. That kept the discussion connected to real user needs.</> },
      { cue: 'Result', text: <>We ran <mark className="metric">more than ten sessions over six months for around 120 people</mark>. One idea became an internal DevOps Q&amp;A system, and leadership started funding more AI tools and experiments.</> },
      { cue: '長期影響', text: <>The formal program later paused after a company change, but teams kept sharing. That experience helped the organization adapt when our AI work accelerated later, and another division eventually invited me to present our AI platform.</> },
    ],
  },
  {
    id: 'deep-graphql', section: 'stories', nav: 'Deep · GraphQL', step: 'D4', title: 'Deep dive: Removing GraphQL and building xDS', duration: 'Technical / behavioral follow-up',
    purpose: '被追問 performance evidence、workarounds、sunk cost 或 xDS data model 時使用。',
    focus: ['Deep dive', 'Failure', 'Data architecture'],
    points: [
      { cue: '原本的問題', text: <>Our frontend needed data from many backend services. Features made several API calls and sometimes fetched the same data more than once. We also lacked one shared schema, so frontend and backend teams could make different assumptions about the data.</> },
      { cue: '我的失誤', text: <>GraphQL looked like a good way to reduce those calls and provide clear data contracts. I joined the integration work, but I did not test the scaling assumptions with realistic clinical datasets early enough.</> },
      { cue: 'Scale 後失敗', text: <>It worked for smaller cases. With large patient histories, medication records, and lab results, however, the response became much larger and more complex. Parsing, processing, and checking the full response cost more than the saved API calls.</> },
      { cue: '前兩個 workaround', text: <>We first measured and improved the JSON parsing path. Then we cached data that changed less often, such as department settings and drug catalogs. Both helped specific cases, but large and changing patient data was still expensive.</> },
      { cue: 'Turning point', text: <>For some large queries, we finally returned raw JSON and skipped parts of the schema check. That removed one of the main reasons we had selected GraphQL, while leaving us with two data-access patterns to maintain.</> },
      { cue: '決定移除', text: <>The team chose to remove GraphQL instead of adding another patch. The backend returned to smaller REST APIs, and we built xDS as a shared in-memory data layer on the frontend.</> },
      { cue: 'xDS 做什麼', text: <>xDS organizes data into meaningful areas such as patient identity, encounter, medication, and vital signs. Widgets use the same patient and encounter context instead of fetching and combining everything independently.</> },
      { cue: '結果與 lesson', text: <>xDS became the data backbone of our add-on platform and contributed to a granted Taiwan patent. I learned to test the assumptions most likely to fail at scale and to <mark className="outcome">remove an invested solution when its fixes have already removed its original value</mark>.</> },
    ],
    reminders: ['不要說 GraphQL 一定慢；限定為 our workload and implementation。', '不要說 JSON parsing 指數成長；說 payload 與 query complexity 增加後成本明顯上升。'],
  },
  {
    id: 'deep-hal', section: 'stories', nav: 'Deep · HAL Redesign', step: 'D5', title: 'Deep dive: Replacing my own HAL design', duration: 'Technical / behavioral follow-up',
    purpose: '回答 growth、self-critique、integration architecture 與主動重構自己的設計。',
    focus: ['Deep dive', 'Growth', 'Integration'],
    points: [
      { cue: 'Situation', text: <>Our healthcare platform had to connect with each hospital’s appointment, patient, and prescription systems. Hospitals used different vendors, REST or SOAP APIs, data formats, and login methods.</> },
      { cue: '第一版 HAL', text: <>For the first hospital, I designed HAL, the Hospital Abstraction Layer. It was a frontend package with one common interface and hospital-specific code that converted each hospital’s APIs into our format. It also handled credentials and communication through Electron.</> },
      { cue: '第二間醫院暴露問題', text: <>HAL worked for the first hospital, but the second hospital showed that the deployment model would not grow well. We were creating separate copies of the integration code. If one vendor changed an API, we might need to update every hospital copy using that vendor.</> },
      { cue: '當時還沒有答案', text: <>I could see the maintenance problem, but at that time I did not yet have a better design. After building the Add-on Module Framework, I looked at HAL again and realized that the same separation idea could work for hospital integrations.</> },
      { cue: '新的 Add-on API', text: <>I proposed Add-on APIs. We moved each vendor integration into its own module while keeping one common API contract for operations such as patient lookup and prescription submission.</> },
      { cue: '組合與 authentication', text: <>Each hospital selected the modules that matched its vendors, and authentication moved to a separate API gateway. We also used AI tools for repeated migration work, while engineers still owned the interface decisions and validation.</> },
      { cue: 'Result', text: <>We now had <mark className="outcome">one shared implementation for each vendor</mark>. A vendor change could be updated once and rolled out to every hospital using that module. New hospitals could reuse existing integrations instead of starting again.</> },
      { cue: 'Lesson', text: <>HAL was a reasonable answer for the first hospital and what I knew at that time. My growth was becoming able and willing to look back at my own design, admit that its limits had changed, and replace it with a platform-level solution.</> },
    ],
    reminders: ['不要籠統說 O(n) → O(1)；限定為同一 vendor change 的維護份數。', 'Add-on API 是相同 design philosophy，不一定是完全相同 implementation。'],
  },
  {
    id: 'role-map', section: 'sre', nav: 'Role & Gap Map', step: 'T0', title: 'What this Apple SRE role actually needs', duration: 'Orientation',
    purpose: '這個 team 的中心不是一般 web availability，而是 Apple Silicon datacenter fleet 的自動化與可靠性。',
    focus: ['JD mapping', 'Priorities'],
    points: [
      { cue: 'Mission', text: <>The team supports the hyperscaling of <mark className="concept">Apple Silicon systems in the datacenter</mark>, including infrastructure used by Private Cloud Compute and Apple Services.</> },
      { cue: 'Software side', text: <>The role wants an engineer who builds services and tools: automation, reliability instrumentation, operational workflows, and ways to eliminate repeated manual work.</> },
      { cue: 'Fleet side', text: <>The unfamiliar side is large-scale server provisioning and lifecycle management: inventory, bootstrap, configuration, health, repair, capacity, and safe replacement across a fleet.</> },
      { cue: 'System foundation', text: <>The expected foundation includes Linux, networking, Kubernetes internals, DNS and DHCP, monitoring, distributed-system failure, and the interaction between hardware, operating systems, and software.</> },
      { cue: 'Your strongest match', text: <>Your strongest evidence is platform software, automation, Kubernetes deployment, production diagnosis, rollout thinking, dependency isolation, and cross-team adoption.</> },
      { cue: 'Your real gaps', text: <>The clearest gaps are bare-metal provisioning, hardware bootstrap and security, fleet configuration tooling, Kubernetes operators/controllers, and experience with hyperscale failure and capacity.</> },
      { cue: 'Priority order', text: <>Prepare in this order: <mark className="outcome">Linux triage → networking → SRE reliability concepts → Kubernetes internals → fleet lifecycle → Apple Silicon fleet design</mark>.</> },
    ],
  },
  {
    id: 'incident-triage', section: 'sre', nav: 'Incident Triage', step: 'T1', title: 'A reusable incident-response framework', duration: 'Think aloud',
    purpose: '面試官不只看你知不知道 command，而是能否控制風險、建立假設並逐步縮小範圍。',
    focus: ['Debugging', 'Operations'],
    points: [
      { cue: '1 · Stabilize', text: <>First I would confirm the customer impact, affected scope, and whether the system is still degrading. If the impact is severe, I would assign incident roles, stop risky changes, and consider rollback, failover, load shedding, or another known-safe mitigation.</> },
      { cue: '2 · Establish time', text: <>I would establish when the problem started and correlate it with deployments, configuration changes, traffic shifts, hardware events, dependency incidents, and alert history.</> },
      { cue: '3 · Compare', text: <>I would compare healthy and unhealthy instances by region, host, rack, version, workload, and dependency path. A useful comparison often narrows the failure domain faster than reading every log.</> },
      { cue: '4 · Use signals', text: <>I would use metrics to identify the resource or service boundary, logs to explain events, traces to follow request paths, and direct system inspection to validate the current state.</> },
      { cue: '5 · Form hypotheses', text: <>I would state one hypothesis at a time, explain what evidence would support or reject it, and prefer low-risk tests. I would avoid changing several variables together during an active incident.</> },
      { cue: '6 · Recover', text: <>After restoring service, I would verify customer-facing health, monitor for recurrence, document the remaining uncertainty, and only then move from mitigation into a deeper root-cause investigation.</> },
      { cue: '7 · Learn', text: <>The postmortem should produce concrete system changes: better detection, safer rollout, reduced blast radius, automated repair, clearer ownership, or removal of the condition that created the failure.</> },
    ],
    reminders: ['開頭先問 scope、impact、recent changes。', '永遠區分 symptom、contributing factor、root cause 和 mitigation。', 'Command 是驗證假設的工具，不是回答本身。'],
  },
  {
    id: 'linux', section: 'sre', nav: 'Linux Debugging', step: 'T2', title: 'Linux: CPU, memory, disk, and file descriptors', duration: 'Core drill',
    purpose: '先記 reasoning path，再把 command 放進對應層次。',
    focus: ['Linux', 'Resource analysis'],
    points: [
      { cue: '主機總覽', text: <><code>uptime</code>, <code>top</code>/<code>htop</code>, <code>vmstat 1</code>, and <code>dmesg</code>. Check load, runnable tasks, I/O wait, memory pressure, recent kernel errors, and whether the problem is host-wide or process-specific.</> },
      { cue: 'CPU high', text: <>Separate user, system, iowait, and steal time. Identify the process and threads with <code>pidstat</code> or <code>top -H</code>. Then ask whether the cause is traffic, a busy loop, lock contention, syscall pressure, GC, or noisy-neighbor contention.</> },
      { cue: 'Load high but CPU not busy', text: <>High load includes tasks waiting in uninterruptible sleep. Check <code>vmstat</code>, process states, disk latency, NFS or device stalls. Do not assume load average means CPU saturation.</> },
      { cue: 'Memory', text: <>Use <code>free -m</code>, <code>vmstat</code>, <code>ps</code>, <code>smem</code>, and cgroup metrics. Distinguish useful page cache from unreclaimable use, RSS from virtual memory, application leak from kernel slab growth, and host memory from container limits.</> },
      { cue: 'OOM', text: <>Check kernel logs for the OOM killer, the killed cgroup or process, memory limits, working-set trend, and allocation pattern. Restarting may recover service, but the follow-up must determine leak, undersized limit, burst, or bad concurrency control.</> },
      { cue: 'Disk', text: <>Use <code>df -h</code> for filesystem space, <code>df -i</code> for inodes, <code>du</code> for directories, <code>lsof +L1</code> for deleted-but-open files, and <code>iostat -xz 1</code> for device latency and saturation.</> },
      { cue: 'File descriptors', text: <>Check the process limit and current use with <code>/proc/&lt;pid&gt;/limits</code>, <code>ls /proc/&lt;pid&gt;/fd</code>, <code>lsof</code>, and socket state with <code>ss</code>. Then distinguish a real leak from legitimate connection growth or an undersized limit.</> },
    ],
  },
  {
    id: 'network-kubernetes', section: 'sre', nav: 'Network & Kubernetes', step: 'T3', title: 'Networking and Kubernetes debugging', duration: 'Core drill',
    purpose: '用分層方式避免看到 timeout 就直接怪網路或 Kubernetes。',
    focus: ['Networking', 'Kubernetes'],
    points: [
      { cue: 'DNS path', text: <>Check whether the name is correct, resolvable from the affected environment, and returning the expected records. Inspect <code>resolv.conf</code>, use <code>dig</code>, compare nodes, and check TTL, caching, search domains, and the DNS service itself.</> },
      { cue: 'Connection path', text: <>Separate DNS resolution, route, TCP handshake, TLS handshake, and application response. Use <code>ip route</code>, <code>ss</code>, <code>curl -v</code>, <code>openssl s_client</code>, and packet capture only when needed to identify the failing layer.</> },
      { cue: 'Timeout versus refusal', text: <>Connection refused usually means the destination is reachable but nothing is listening or a reject is returned. A timeout can mean packet loss, firewall drop, overloaded destination, broken route, or an application that accepted but did not respond.</> },
      { cue: 'Pod triage', text: <>Start with <code>kubectl get</code>, <code>describe</code>, events, current and previous logs, readiness/liveness probes, requests and limits, restart reason, and node placement. Compare the failing pod with a healthy replica.</> },
      { cue: 'Service path', text: <>Verify labels and selectors, EndpointSlices, target ports, readiness, DNS, network policy, ingress or load balancer, and whether the failure occurs inside the pod, node, cluster, or upstream dependency.</> },
      { cue: 'Pending / CrashLoop', text: <>For Pending, inspect scheduling constraints, resources, affinity, taints, volumes, and quotas. For CrashLoopBackOff, inspect the previous container logs, exit code, command, config, secrets, dependency readiness, and backoff pattern.</> },
      { cue: 'Operator gap', text: <>An operator is a controller that continuously reconciles actual state toward a desired state expressed through Kubernetes resources, often CRDs. Your honest gap is production implementation; prepare to explain reconciliation, idempotency, retries, finalizers, and status conditions.</> },
    ],
  },
  {
    id: 'reliability', section: 'sre', nav: 'SLO & Safe Operations', step: 'T4', title: 'SRE principles: measure, budget, and improve', duration: 'Concept drill',
    purpose: '把 reliability 從「不要壞」變成能衡量、能取捨、能持續改善的工程系統。',
    focus: ['SLO', 'Observability', 'Rollout'],
    points: [
      { cue: 'SLI', text: <>An SLI is the measured behavior users care about, such as successful request ratio, latency under a threshold, freshness, durability, or successful provisioning time.</> },
      { cue: 'SLO', text: <>An SLO is the target for that SLI over a defined window. It should represent user experience and be strict enough to drive action without pretending that every system needs 100% availability.</> },
      { cue: 'Error budget', text: <>The error budget is the allowed unreliability implied by the SLO. Burn rate shows how quickly it is being consumed. Multi-window burn-rate alerts can detect both fast incidents and slower degradation without paging on every small fluctuation.</> },
      { cue: 'Good alert', text: <>A page should be actionable, urgent, and tied to user or fleet impact. Dashboards help investigation; tickets handle non-urgent work. Every noisy alert trains responders to ignore the system.</> },
      { cue: 'Safe rollout', text: <>Use staged rollout, representative canaries, automatic health gates, bounded concurrency, failure-domain awareness, pause controls, and a tested rollback. A rollout system should know when not to continue.</> },
      { cue: 'Capacity', text: <>Capacity planning combines demand trend, headroom, failure scenarios, provisioning lead time, and service limits. Average utilization is not enough; plan for peaks and for losing a failure domain.</> },
      { cue: 'Toil', text: <>Toil is manual, repetitive, automatable operational work that scales with service growth and creates little enduring value. Automate it after understanding the failure modes, not by hiding an unstable process behind a script.</> },
    ],
  },
  {
    id: 'fleet', section: 'sre', nav: 'Fleet Lifecycle', step: 'T5', title: 'Bare-metal fleet: the lifecycle to remember', duration: 'Gap preparation',
    purpose: '你不需要假裝做過；需要先能畫出 lifecycle、風險與 controller model。',
    focus: ['Provisioning', 'Hardware'],
    points: [
      { cue: 'Inventory', text: <>Start with a source of truth for hardware identity, location, model, network interfaces, ownership, firmware, desired role, and lifecycle state. Bad inventory makes every later automation unsafe.</> },
      { cue: 'Discover and bootstrap', text: <>A new machine is discovered, validated, and given network configuration, often using DHCP and PXE to boot a controlled installer or provisioning environment.</> },
      { cue: 'Establish trust', text: <>Firmware and boot settings must match policy. Secure boot verifies signed boot components, while TPM-backed measurements and attestation can help verify that the machine started in an expected state.</> },
      { cue: 'Provision', text: <>Install the operating system, apply identity and credentials, configure network and storage, register monitoring, and run hardware and software validation before admitting the host to production capacity.</> },
      { cue: 'Reconcile', text: <>A controller compares desired and observed state and performs idempotent actions with retries, timeouts, state transitions, and an auditable history. Failed machines should not loop forever without quarantine or human escalation.</> },
      { cue: 'Operate', text: <>Continuously monitor hardware health, OS state, workload health, capacity, configuration drift, and correlated failures by rack or batch. Repair should be safe, rate-limited, and aware of remaining redundancy.</> },
      { cue: 'Retire', text: <>Drain workloads, verify replication and capacity, revoke credentials, erase data securely, update inventory, and preserve the audit trail. Decommissioning is part of reliability and security, not an afterthought.</> },
    ],
    reminders: ['PXE 是 network boot mechanism，不是完整 provisioning system。', 'TPM 不等於 secure boot；一個提供可信硬體能力與 measurements，一個驗證 boot chain。', 'Fleet automation 的關鍵是 state machine、idempotency、rate limit、quarantine。'],
  },
  {
    id: 'fleet-design', section: 'sre', nav: 'Fleet System Design', step: 'T6', title: 'Design a safe server-provisioning platform', duration: 'System-design skeleton',
    purpose: '用一個骨架回答 fleet provisioning、rollout 或 repair automation 題。',
    focus: ['System design', 'Failure handling'],
    points: [
      { cue: 'Clarify first', text: <>Ask about fleet size, locations and failure domains, provisioning rate, hardware diversity, target time, security requirements, allowed manual steps, consistency needs, and what success or rollback means.</> },
      { cue: 'Core model', text: <>Use a durable source of truth containing desired state and observed state. A workflow service creates jobs; controllers reconcile machines through explicit lifecycle states; workers perform bounded actions; an event log records every transition.</> },
      { cue: 'Main components', text: <>Inventory and identity, DHCP/PXE or bootstrap service, artifact and image store, configuration service, credential and attestation service, scheduler, health validator, monitoring, audit log, and operator console.</> },
      { cue: 'Safety', text: <>Make operations idempotent and resumable. Use leases to prevent two workers acting on one host, timeouts and retry budgets, per-rack concurrency limits, canary batches, approval gates for risky actions, and quarantine for ambiguous states.</> },
      { cue: 'Availability', text: <>Replicate control-plane state, partition work by failure domain, queue jobs durably, and allow workers to retry after controller restarts. A control-plane outage should stop new changes safely rather than corrupt machines already serving traffic.</> },
      { cue: 'Observability', text: <>Track provisioning success rate and duration by stage, stuck-state age, retry count, hardware failure rate, drift, rollout progress, and capacity unavailable due to repair. Correlate by image, firmware batch, rack, and hardware model.</> },
      { cue: 'Failure drills', text: <>Discuss DHCP or image-service failure, partial installation, bad firmware batch, network partition, duplicated job, host disappearing mid-step, credential failure, controller restart, and a rollout that harms an entire rack.</> },
      { cue: 'Scale last', text: <>Only after correctness and safety, discuss sharding controllers, regional control planes, batch scheduling, caching immutable artifacts, backpressure, and capacity-aware admission.</> },
    ],
    reminders: ['順序：requirements → lifecycle/data model → components → safety → failures → observability → scale。', '不要一開始就列產品名；先說需要什麼能力。', '對 unfamiliar hardware 細節，可以說假設並請 interviewer 校準。'],
  },
  {
    id: 'final-review', section: 'close', nav: 'Tonight / Tomorrow', step: '✓', title: 'What to prepare before the recruiter call', duration: 'Priority order',
    purpose: '今晚不是把 SRE 全讀完；先讓明天 HR 的每個答案都能自然說出口。',
    focus: ['Execution plan'],
    points: [
      { cue: 'P0 · 口說三題', text: <>Without reading a script, answer About Me, Why This Role, and Why Apple twice. Keep each answer within its target time and preserve only the key sequence.</> },
      { cue: 'P0 · Gap 回答', text: <>Practice the technical-gap answer until it sounds calm and direct. The goal is not to apologize; it is to show accurate self-awareness and credible learning evidence.</> },
      { cue: 'P0 · Logistics', text: <>Confirm one-month notice, Singapore PR and no sponsorship, compensation response, on-call comfort, and whether you are comfortable describing other interview activity.</> },
      { cue: 'P0 · 問題', text: <>Choose your first two recruiter questions now. Recommended: why the role is open / first-year problems, and the interview-loop structure.</> },
      { cue: 'P1 · Story', text: <>Practice the Add-on story in 90 seconds and the production/on-call answer in 60 seconds. Keep the Electron case available only if the recruiter asks for an example.</> },
      { cue: 'After HR', text: <>Start technical preparation with incident triage and Linux. Then cover networking, SRE principles, Kubernetes controllers, fleet lifecycle, and finally the provisioning system-design mock.</> },
      { cue: 'Tomorrow mindset', text: <>The recruiter does not need you to prove every qualification. Your job is to show a clear career story, a real reason for this team, honest boundaries, and enough evidence that the hiring team should speak with you.</> },
    ],
  },
]

export const applePageById = new Map(appleGuidePages.map((page) => [page.id, page]))
