import type { Page } from '../types'

interface Props {
  onNavigate: (page: Page) => void
}

export default function QuickReview({ onNavigate: _onNavigate }: Props) {
  return (
    <div className="quick-review">
      <h1>Quick Review</h1>
    </div>
  )
}
