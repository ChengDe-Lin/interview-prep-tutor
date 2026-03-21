import type { Page, CompanyResearch } from '../types'

interface Props {
  company: CompanyResearch | null
  slug: string
  onNavigate: (page: Page) => void
}

export default function CompanyView({ slug }: Props) {
  return (
    <div className="company-view">
      <h1>Company: {slug}</h1>
    </div>
  )
}
