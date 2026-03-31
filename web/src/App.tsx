import { useState } from 'react'
import type { Page } from './types'
import { getStories, getCompanyResearch } from './data'
import QuickReview from './pages/QuickReview'
import CompanyView from './pages/CompanyView'
import StoryDetail from './pages/StoryDetail'

export default function App() {
  const [page, setPage] = useState<Page>({ type: 'quick-review' })
  const [menuOpen, setMenuOpen] = useState(false)

  const stories = getStories()
  const companies = getCompanyResearch()

  function renderPage() {
    switch (page.type) {
      case 'quick-review':
        return <QuickReview onNavigate={setPage} />
      case 'company': {
        const company = companies.find((c) => c.slug === page.slug)
        return <CompanyView company={company || null} slug={page.slug} onNavigate={setPage} />
      }
      case 'story': {
        const story = stories.find((s) => s.slug === page.slug)
        if (!story) return <div className="empty-state">Story not found</div>
        return <StoryDetail story={story} onBack={() => setPage({ type: 'quick-review' })} />
      }
    }
  }

  const isActive = (type: string, slug?: string) => {
    if (page.type !== type) return false
    if (slug && 'slug' in page) return page.slug === slug
    return true
  }

  function navigate(p: Page) {
    setPage(p)
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header" onClick={() => navigate({ type: 'quick-review' })}>
          <h1 className="sidebar-title">Interview Prep<br />Tutor</h1>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${isActive('quick-review') ? 'active' : ''}`}
            onClick={() => navigate({ type: 'quick-review' })}
          >
            Quick Review
          </button>

          {companies.length > 0 && (
            <>
              <div className="nav-section-header">Companies</div>
              {companies.map((c) => (
                <button
                  key={c.slug}
                  className={`nav-item nav-item-sub ${isActive('company', c.slug) ? 'active' : ''}`}
                  onClick={() => navigate({ type: 'company', slug: c.slug })}
                >
                  {c.name}
                </button>
              ))}
            </>
          )}

          {stories.length > 0 && (
            <>
              <div className="nav-section-header">Stories</div>
              {stories.map((s) => (
                <button
                  key={s.slug}
                  className={`nav-item nav-item-sub ${isActive('story', s.slug) ? 'active' : ''}`}
                  onClick={() => navigate({ type: 'story', slug: s.slug })}
                >
                  {s.name}
                </button>
              ))}
            </>
          )}
        </nav>
      </aside>
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}
