import { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import commandReviewMarkdown from './content/commandParameterReview.md?raw'

type ReviewSection = {
  number: string
  title: string
  id: string
  markdown: string
}

function parseReview(markdown: string) {
  const parts = markdown.split(/^##\s+/m)
  const introLines = parts[0].trim().split('\n')
  const title = introLines.shift()?.replace(/^#\s+/, '') ?? '常用指令與參數複習表'
  const intro = introLines.join('\n').trim()

  const sections: ReviewSection[] = parts.slice(1).map((part) => {
    const [heading, ...body] = part.split('\n')
    const match = heading.match(/^(\d+)\s+(.+)$/)
    const number = match?.[1] ?? ''
    const sectionTitle = match?.[2] ?? heading
    return {
      number,
      title: sectionTitle,
      id: `command-section-${number}`,
      markdown: body.join('\n').trim(),
    }
  })

  return { title, intro, sections }
}

export default function CommandReview() {
  const review = useMemo(() => parseReview(commandReviewMarkdown), [])
  const [activeSection, setActiveSection] = useState(review.sections[0]?.id ?? '')
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = mainRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { root, rootMargin: '-12% 0px -72% 0px', threshold: 0 },
    )

    root.querySelectorAll('.command-section').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [review.sections])

  function goToSection(id: string) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="command-review-shell">
      <aside className="command-review-sidebar">
        <a className="command-back" href="#">← Interview Prep</a>
        <div className="command-sidebar-heading">
          <span>SRE Review</span>
          <strong>Commands</strong>
        </div>
        <nav aria-label="Command handbook sections">
          {review.sections.map((section) => (
            <button
              key={section.id}
              className={activeSection === section.id ? 'active' : ''}
              onClick={() => goToSection(section.id)}
            >
              <span>{section.number.padStart(2, '0')}</span>
              <div>{section.title}</div>
            </button>
          ))}
        </nav>
      </aside>

      <main className="command-review-main" ref={mainRef}>
        <div className="command-mobile-nav">
          <a href="#">← Home</a>
          <select
            aria-label="Jump to a section"
            value={activeSection}
            onChange={(event) => goToSection(event.target.value)}
          >
            {review.sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.number}. {section.title}
              </option>
            ))}
          </select>
        </div>

        <article className="command-review-article">
          <header className="command-review-hero">
            <p>SRE INTERVIEW · QUICK REFERENCE</p>
            <h1>{review.title}</h1>
            <div className="command-review-intro">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{review.intro}</ReactMarkdown>
            </div>
          </header>

          {review.sections.map((section) => (
            <section
              className="command-section"
              data-section={section.number}
              id={section.id}
              key={section.id}
            >
              <div className="command-section-title">
                <span>{section.number.padStart(2, '0')}</span>
                <h2>{section.title}</h2>
              </div>
              <div className="command-markdown">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ children, ...props }) => (
                      <a {...props} target="_blank" rel="noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {section.markdown}
                </ReactMarkdown>
              </div>
            </section>
          ))}
        </article>
      </main>
    </div>
  )
}
