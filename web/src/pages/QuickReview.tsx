import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { Page } from '../types'
import { getShortPitch, getGeneralPitch, getStories } from '../data'

interface Props {
  onNavigate: (page: Page) => void
}

function hasMeaningfulContent(markdown: string): boolean {
  if (!markdown || !markdown.trim()) return false
  // Look for actual text content after "## English Version" heading
  const afterEnglish = markdown.split(/##\s+English Version/i)[1]
  if (afterEnglish !== undefined) {
    // Check if there's non-whitespace, non-heading content after that heading
    const body = afterEnglish.replace(/^#+\s+.*/gm, '').trim()
    return body.length > 0
  }
  // Fallback: check if there's any non-heading, non-whitespace content at all
  const withoutHeadings = markdown.replace(/^#+\s+.*/gm, '').trim()
  return withoutHeadings.length > 0
}

const REMINDERS = [
  'Use the STAR structure for every answer',
  'Include specific numbers and metrics',
  'Keep answers under 2 minutes',
  'Ask clarifying questions before answering',
  'Prepare 2-3 questions to ask the interviewer',
  "Show enthusiasm for the company's mission",
]

export default function QuickReview({ onNavigate }: Props) {
  const shortPitch = getShortPitch()
  const generalPitch = getGeneralPitch()
  const stories = getStories()

  return (
    <div className="quick-review">
      <h1>Quick Review</h1>

      {/* Elevator Pitch */}
      <div className="pitch-section">
        <p className="pitch-label">Elevator Pitch (30 sec)</p>
        {hasMeaningfulContent(shortPitch) ? (
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {shortPitch}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="empty-state">
            還沒有 Elevator Pitch。跟 tutor 說「幫我寫 30 秒自我介紹」開始。
          </div>
        )}
      </div>

      {/* Full Pitch */}
      <div className="pitch-section">
        <p className="pitch-label">Self Introduction (2 min)</p>
        {hasMeaningfulContent(generalPitch) ? (
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {generalPitch}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="empty-state">
            還沒有完整自我介紹。跟 tutor 說「幫我寫 2 分鐘自我介紹」開始。
          </div>
        )}
      </div>

      {/* Story Bank */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
          Story Bank
        </h2>
        {stories.length > 0 ? (
          <div className="story-grid">
            {stories.map((story) => (
              <div
                key={story.slug}
                className="story-card"
                onClick={() => onNavigate({ type: 'story', slug: story.slug })}
              >
                <div className="story-card-name">{story.name}</div>
                {story.bqTypes.length > 0 && (
                  <div className="story-card-tags">
                    {story.bqTypes.map((tag) => (
                      <span key={tag} className="bq-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            還沒有故事。跟 tutor 說「我們來整理故事」開始。
          </div>
        )}
      </div>

      {/* Pre-Interview Reminders */}
      <div className="reminders">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
          Pre-Interview Reminders
        </h2>
        {REMINDERS.map((reminder) => (
          <div key={reminder} className="reminder-item">
            {reminder}
          </div>
        ))}
      </div>
    </div>
  )
}
