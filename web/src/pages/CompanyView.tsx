import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { Page, CompanyResearch } from '../types'
import { getCompanyPitches, getGeneralPitch, getStories } from '../data'

interface Props {
  company: CompanyResearch | null
  slug: string
  onNavigate: (page: Page) => void
}

export default function CompanyView({ company, slug, onNavigate }: Props) {
  const companyPitches = getCompanyPitches()
  const matchedPitch = companyPitches.find((p) => p.slug === slug)
  const generalPitch = getGeneralPitch()
  const pitchContent = matchedPitch ? matchedPitch.content : generalPitch
  const usingFallback = !matchedPitch

  const stories = getStories()

  if (!company) {
    return (
      <div className="company-view">
        <div className="empty-state">
          還沒準備這間公司。跟 tutor 說「我要面 {slug}」開始準備。
        </div>
      </div>
    )
  }

  return (
    <div className="company-view">
      <div className="company-header">
        <h1>{company.name}</h1>
      </div>

      {/* Company Research */}
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {company.content}
        </ReactMarkdown>
      </div>

      {/* Pitch Section */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
          Pitch
        </h2>
        {usingFallback && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            （使用通用版 pitch — 本地開發時可看到公司特化版）
          </p>
        )}
        {pitchContent ? (
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {pitchContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="empty-state">
            還沒有 Pitch。跟 tutor 說「幫我準備針對 {slug} 的自我介紹」開始。
          </div>
        )}
      </div>

      {/* Recommended Stories */}
      {stories.length > 0 && (
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
            Recommended Stories
          </h2>
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
        </div>
      )}
    </div>
  )
}
