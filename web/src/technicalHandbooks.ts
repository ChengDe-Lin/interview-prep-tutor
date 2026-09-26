import osMarkdown from './content/osInterviewHandbook.md?raw'
import networkMarkdown from './content/networkInterviewHandbook.md?raw'
import distributedMarkdown from './content/distributedSystemsBible.md?raw'
import commandsMarkdown from './content/commandParameterReview.md?raw'
import osNetworkDeepDivesMarkdown from './content/osNetwork23StudyGuides.md?raw'

export type TechnicalHandbookId = 'commands' | 'os' | 'network' | 'distributed-systems' | 'os-network-deep-dives'

export type TechnicalHandbook = {
  id: TechnicalHandbookId
  code: string
  nav: string
  shortTitle: string
  description: string
  kicker: string
  markdown: string
}

export const technicalHandbooks: TechnicalHandbook[] = [
  {
    id: 'commands',
    code: 'T1',
    nav: 'Commands & Parameters',
    shortTitle: 'Commands',
    description: '面試前快速查 Linux、network、Kubernetes 指令與常用參數。',
    kicker: 'APPLE SRE · QUICK REFERENCE',
    markdown: commandsMarkdown,
  },
  {
    id: 'os',
    code: 'T2',
    nav: 'Operating Systems',
    shortTitle: 'Operating Systems',
    description: 'Process、memory、filesystem、I/O、containers 與系統化 troubleshooting。',
    kicker: 'APPLE SRE · TECHNICAL HANDBOOK',
    markdown: osMarkdown,
  },
  {
    id: 'network',
    code: 'T3',
    nav: 'Networking',
    shortTitle: 'Networking',
    description: 'DNS、TCP、TLS、HTTP、routing、packet capture 與 Kubernetes networking。',
    kicker: 'APPLE SRE · TECHNICAL HANDBOOK',
    markdown: networkMarkdown,
  },
  {
    id: 'distributed-systems',
    code: 'T4',
    nav: 'Distributed Systems',
    shortTitle: 'Distributed Systems',
    description: 'Consistency、replication、consensus、messaging、retries 與 system design。',
    kicker: 'APPLE SRE · TECHNICAL HANDBOOK',
    markdown: distributedMarkdown,
  },
  {
    id: 'os-network-deep-dives',
    code: 'T5',
    nav: 'OS & Network Deep Dives',
    shortTitle: 'OS & Network Deep Dives',
    description: '23 個 OS、network、fleet、security、Kubernetes、SLO 與 cloud 的深度複習主題。',
    kicker: 'APPLE SRE · DEEP-DIVE STUDY GUIDES',
    markdown: osNetworkDeepDivesMarkdown,
  },
]

export const technicalHandbookById = new Map(technicalHandbooks.map((handbook) => [handbook.id, handbook]))
