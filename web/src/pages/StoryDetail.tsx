import type { StoryFile } from '../types'

interface Props {
  story: StoryFile
  onBack: () => void
}

export default function StoryDetail({ story, onBack }: Props) {
  return (
    <div className="article-layout">
      <div className="article-content">
        <button className="article-back" onClick={onBack}>
          ← Back
        </button>
        <h1>{story.name}</h1>
      </div>
    </div>
  )
}
