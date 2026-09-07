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
    id: 'about-me', section: 'recruiter', nav: 'About Me', step: '01', title: 'Tell me about yourself', duration: '75–90 sec',
    purpose: '先建立一條清楚主線：backend foundation → healthcare reliability → platform automation → Apple SRE。',
    focus: ['Positioning', 'Relevant experience'],
    points: [
      { cue: '現在是誰', text: <>Hi, I’m ChengDe. I’m currently a Senior Software Engineer at ASUS Intelligent Cloud Service, and I’ve spent the last <mark className="metric">five years building backend and platform systems for healthcare</mark>.</> },
      { cue: 'Backend 與 production 基礎', text: <>Earlier in my career, I maintained around ten backend services and hundreds of APIs. I worked with Kubernetes, Redis, RabbitMQ, and production deployments, and I was part of a <mark className="concept">formal production on-call duty</mark> handling SLA issues, service crashes, and critical clinical-data problems.</> },
      { cue: 'Performance 經驗', text: <>I also redesigned a medical-data pipeline for complex temporal queries and reduced query latency by around <mark className="metric">90%</mark>. That work taught me to measure the real bottleneck before choosing an architecture.</> },
      { cue: 'Platform 代表作', text: <>More recently, I led the architecture and migration of an add-on platform that changed a tightly coupled clinical product into independently deployable widgets and modules. It has grown to <mark className="metric">more than 300 components across about 20 engineers</mark>.</> },
      { cue: 'Automation 主線', text: <>I’ve also built automation for schema generation and AI-assisted product development. Across these projects, the pattern is the same: when I see a repeated manual problem, I try to turn it into <mark className="outcome">a reliable platform or tool that other engineers can use</mark>.</> },
      { cue: '收回 Apple SRE', text: <>That is why this SRE role caught my attention. It combines software engineering, infrastructure automation, and production responsibility at a scale I have not experienced before. I believe my backend and platform background is relevant, and I’m excited to deepen my experience in <mark className="concept">large-scale infrastructure and fleet reliability</mark>.</> },
    ],
    reminders: ['Recruiter 第一題不要超過 90 秒。', 'AI 是 supporting evidence，不要搶走 SRE 主線。', '如果時間很短，Performance 經驗可以略過。'],
  },
  {
    id: 'why-role', section: 'recruiter', nav: 'Why This Role / SRE', step: '02', title: 'Why this role, and why SRE?', duration: '60–75 sec',
    purpose: '不是說想「轉職試試 SRE」，而是證明你過去一直在做 reliability-minded engineering，現在想把它變成核心責任。',
    focus: ['Motivation', 'Role fit'],
    points: [
      { cue: '吸引我的組合', text: <>What attracts me to this role is the combination of <mark className="concept">software engineering, automation, and production responsibility</mark>. I enjoy operating systems, but I’m most motivated when I can prevent the same problem from happening again by building a better tool or platform.</> },
      { cue: 'Healthcare 帶來的習慣', text: <>Working in healthcare made reliability very concrete for me. A hidden dependency, stale patient context, or incomplete rollout is not only a technical inconvenience. It can affect clinical work, so I developed a strong habit of thinking about <mark className="concept">validation, failure modes, rollback, and blast radius</mark>.</> },
      { cue: '和過去工作的連結', text: <>Many of my strongest projects came from reducing operational risk: decoupling deployments, keeping shared patient data consistent, automating schema handoffs, and diagnosing production incidents. SRE feels like a natural extension of that way of working.</> },
      { cue: '這個 team 的吸引力', text: <>What makes this particular role exciting is that the team builds software and automation for Apple Silicon infrastructure in the datacenter. It is a chance to apply my platform mindset to <mark className="outcome">fleet reliability at a completely different scale</mark>.</> },
      { cue: '誠實定位', text: <>My background is stronger in backend and Kubernetes-based platforms than in physical-server fleets. I see that as a real learning area, but I also think I can contribute immediately through software design, automation, debugging, and production ownership.</> },
    ],
    reminders: ['先說正面動機，再說 gap；不要讓整題變成自我否定。', '重點是 eliminate repeated problems through engineering。'],
  },
  {
    id: 'why-apple', section: 'recruiter', nav: 'Why Apple', step: '03', title: 'Why Apple?', duration: '45–60 sec',
    purpose: '把 Apple 的 ecosystem 和這個職缺的 infrastructure impact 接起來，不只說喜歡產品。',
    focus: ['Apple motivation', 'Scale'],
    points: [
      { cue: '我在意完整系統', text: <>What makes Apple especially interesting to me is the complete ecosystem. Apple works across silicon, hardware, operating systems, cloud services, applications, and now AI. Very few companies have the opportunity to make decisions across that entire stack.</> },
      { cue: '和我的經歷連結', text: <>After building a platform that connects many applications and teams, I became curious about how an organization like Apple designs the infrastructure underneath a much larger ecosystem and keeps it reliable over the long term.</> },
      { cue: '不是看不見的 infra', text: <>This role is particularly meaningful because the infrastructure supports Apple services and the scaling of Apple Silicon systems for workloads including Private Cloud Compute. The work may be deep in the infrastructure, but it ultimately affects <mark className="outcome">products used by billions of people</mark>.</> },
      { cue: '個人收尾', text: <>I want my next step to combine deep technical learning with that level of real-world impact. Apple is one of the few places where both are possible at the same time.</> },
    ],
    reminders: ['不要只說 brand、產品或 user count。', '關鍵連結：integrated ecosystem → infrastructure foundation → global impact。'],
  },
  {
    id: 'why-change', section: 'recruiter', nav: 'Why Change / What Next', step: '04', title: 'Why are you considering a change?', duration: '45–60 sec',
    purpose: '肯定現職成果，再說你準備承擔更大的 scale、systems depth 與 production ownership。',
    focus: ['Career direction', 'Positive framing'],
    points: [
      { cue: '先肯定現在', text: <>I’m proud of what I have achieved in my current role. I’ve had the opportunity to lead platform changes, build systems that are now used across our product, and grow from backend engineering into broader architecture and automation work.</> },
      { cue: '為什麼是現在', text: <>I feel I have reached an important milestone there, and I’m ready to apply that experience to systems with a much larger operational scale and a deeper infrastructure focus.</> },
      { cue: '下一份工作要什麼', text: <>In my next role, I’m looking for three things: <mark className="concept">deep systems work, end-to-end ownership, and the chance to learn from engineers who operate infrastructure at very large scale</mark>.</> },
      { cue: '收回機會', text: <>This role gives me that combination while still letting me stay hands-on and build automation, which is why the timing feels right.</> },
    ],
    reminders: ['不要抱怨公司 roadmap 或醫院 migration 速度。', 'AI/global impact 可以提，但不要取代具體的職涯需求。'],
  },
  {
    id: 'production-oncall', section: 'recruiter', nav: 'Production & On-call', step: '05', title: 'Production and reliability experience', duration: '60 sec + follow-up',
    purpose: '第一層只證明你真的處理過 production；Electron 案例留給追問。',
    focus: ['Incident response', 'On-call'],
    points: [
      { cue: '正式 production duty', text: <>During my first two years, I was part of a formal production duty for our backend services. I was contacted for SLA failures, service crashes, and P0 issues where clinical data was missing or not updated correctly.</> },
      { cue: '診斷方式', text: <>We kept only the most critical logs in Azure Application Insights because of cost. I would start there, find the correlation ID, retrieve the detailed logs from disk storage, and reconstruct the request flow to identify the root cause.</> },
      { cue: '實際壓力', text: <>I supported several new hospital deployments and handled urgent issues under time pressure. That work helped me become known for understanding our framework and system behavior, and contributed to my accelerated promotion to Senior Engineer.</> },
      { cue: '現在的責任', text: <>I now work more on shared platform infrastructure. I see fewer feature-level incidents, but a defect in the shared layer has a much wider blast radius, so staging validation, regression coverage, and safe rollout remain part of my daily work.</> },
      { cue: 'On-call 回答', text: <>I’m comfortable joining an on-call rotation at Apple. I would also like to understand the rotation frequency, recent paging volume, and how escalation support works within the team.</> },
      { cue: '追問才講 Electron', text: <>One mitigation example was an intermittent Chromium cache issue in our Electron container. A restarted local service could occasionally receive a stale response from the previous service. Cache clearing was not reliable, so I introduced a reserved rotating-port pool to create a new origin and reduce user impact while we continued investigating.</>, note: '這是 immediate mitigation，不要說已找到或修正 Chromium 的根因。' },
    ],
  },
  {
    id: 'technical-gaps', section: 'recruiter', nav: 'Technical Gaps', step: '06', title: 'What would you need to learn?', duration: '60–75 sec',
    purpose: 'Senior candidate 的可信度來自清楚知道 gap，而不是假裝完全符合。',
    focus: ['Self-awareness', 'Learning evidence'],
    points: [
      { cue: '直接承認', text: <>To be honest, I do not have direct hands-on experience with physical-server provisioning or hardware bootstrap technologies such as PXE, BIOS, TPM, and secure boot. I also have not used Ansible in production.</> },
      { cue: 'Kubernetes 邊界', text: <>I have used Kubernetes to deploy and operate our services, but I have not yet built Kubernetes operators or controllers in production. I would not describe myself as an expert in that part of the ecosystem.</> },
      { cue: '相鄰能力', text: <>My strongest adjacent experience is in backend systems, Kubernetes deployments, platform architecture, automation, production debugging, and designing safer ways for many teams to change a shared system.</> },
      { cue: '用證據證明能學', text: <>I have taken ownership of unfamiliar infrastructure before. When the owner of our Electron container left, I had about three weeks to take over the base platform used by applications in five hospitals. I learned it, maintained it in production, and continued developing it.</> },
      { cue: '可信的收尾', text: <>So I would not claim that I already have the hardware-fleet experience, but I understand exactly where the gap is, and I’m confident I can close it by learning from the team and working through the real system and its failure cases.</> },
    ],
    reminders: ['Gap 順序：明確缺口 → 相鄰能力 → 學習證據 → 願意補足。', '不要只用 promotion 或「我是 fast learner」當證據。'],
  },
  {
    id: 'admin', section: 'recruiter', nav: 'Recruiter Logistics', step: '07', title: 'Administrative questions', duration: 'Short answers',
    purpose: '這些題目只需要清楚、短、不要多送不必要資訊。',
    focus: ['Work authorization', 'Compensation'],
    points: [
      { cue: 'Singapore', text: <>I’m a Singapore Permanent Resident, and I do not require employment sponsorship.</> },
      { cue: 'Notice period', text: <>My notice period is one month, so I would be available after completing that notice period.</> },
      { cue: 'Compensation', text: <>I’m still learning more about the role and level, so I’m flexible at this stage. Could you share the budgeted compensation range for this position?</> },
      { cue: 'Other interviews', text: <>I’m speaking with a few companies, but I’m still early in the process. Apple is a role I’m taking very seriously because the combination of platform engineering, infrastructure, and scale is particularly relevant to what I want next.</> },
      { cue: 'On-call', text: <>Yes, I’m comfortable with on-call. I would like to learn more about the rotation, escalation model, and the kinds of incidents the team typically handles.</> },
    ],
  },
  {
    id: 'questions', section: 'recruiter', nav: 'Questions to Ask', step: '08', title: 'Questions for the recruiter', duration: 'Ask 2–3',
    purpose: '先問能影響你如何準備與判斷角色的問題；不要把 recruiter 當 technical interviewer。',
    focus: ['Team context', 'Interview process'],
    points: [
      { cue: '1 · 為何現在招人', text: <>What created the need for this position, and what are the most important problems the team hopes this person will help solve in the first six to twelve months?</> },
      { cue: '2 · Role 實際比例', text: <>How does the team balance software and automation development with operational responsibilities such as on-call, incident response, and fleet maintenance?</> },
      { cue: '3 · Loop 準備方向', text: <>Could you walk me through the interview process and the main areas each stage is designed to evaluate?</> },
      { cue: '4 · 成功背景', text: <>The role spans software, Kubernetes, and physical infrastructure. What backgrounds have helped people become successful on this team?</> },
      { cue: '5 · On-call 細節', text: <>If you have visibility into it, how is the on-call rotation structured, and what has the recent paging volume been like?</> },
    ],
    reminders: ['時間只夠兩題就問 1 和 3。', 'Recruiter 若已在前面回答過，不要照單重問。', '深入 architecture、fleet size、failure mode 的問題留給 hiring manager。'],
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
      { cue: 'Result', text: <>The platform now supports more than <mark className="metric">300 independently deployable widgets and modules across about 20 engineers</mark>. In our initial review, delivery improved by 46% and defect age decreased by 58%.</> },
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
