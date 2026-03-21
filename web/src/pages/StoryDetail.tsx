import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
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

        {story.bqTypes.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {story.bqTypes.map((tag) => (
              <span key={tag} className="bq-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {story.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
