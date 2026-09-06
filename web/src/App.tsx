import { useEffect, useMemo, useRef, useState } from 'react'
import { guidePages, pageById, sectionLabels } from './interviewGuide'
import type { GuidePage, GuideSection } from './interviewGuide'

type View = 'home' | string
const sections: GuideSection[] = ['opening', 'flagship', 'backup', 'close']

function initialView(): View {
  const id = window.location.hash.slice(1)
  return pageById.has(id) ? id : 'home'
}

export default function App() {
  const [view, setView] = useState<View>(initialView)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const page = view === 'home' ? undefined : pageById.get(view)
  const pageIndex = page ? guidePages.findIndex((item) => item.id === page.id) : -1

  useEffect(() => {
    const syncViewFromUrl = () => {
      const id = window.location.hash.slice(1)
      setView(pageById.has(id) ? id : 'home')
      setSidebarOpen(false)
      document.querySelector('.content-scroll')?.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', syncViewFromUrl)
    return () => window.removeEventListener('hashchange', syncViewFromUrl)
  }, [])

  const filteredPages = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return guidePages
    return guidePages.filter((item) => `${item.nav} ${item.title} ${item.purpose} ${item.focus.join(' ')}`.toLowerCase().includes(value))
  }, [query])

  function navigate(id: View) {
    setView(id)
    setSidebarOpen(false)
    window.location.hash = id === 'home' ? '' : id
    document.querySelector('.content-scroll')?.scrollTo({ top: 0 })
  }

  function move(delta: number) {
    const base = pageIndex < 0 ? (delta > 0 ? -1 : guidePages.length) : pageIndex
    const next = guidePages[base + delta]
    if (next) navigate(next.id)
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.matches('input, textarea')) return
      if (event.key === '/') { event.preventDefault(); searchRef.current?.focus() }
      if (event.key.toLowerCase() === 'j') move(1)
      if (event.key.toLowerCase() === 'k') move(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return <div className="app-shell">
    <header className="mobile-header"><button onClick={() => setSidebarOpen(true)}>☰</button><strong>Databricks FDE Prep</strong></header>
    {sidebarOpen && <button className="scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}
    <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`}>
      <button className="brand" onClick={() => navigate('home')}><strong>Databricks FDE</strong><span>Tomorrow · Hiring Manager</span></button>
      <div className="search-wrap"><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋頁面…" /><kbd>/</kbd></div>
      <nav className="section-nav">
        {!query && <button className={`nav-home ${view === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>面試流程總覽</button>}
        {sections.map((section) => {
          const pages = filteredPages.filter((item) => item.section === section)
          if (!pages.length) return null
          return <div className="nav-group" key={section}>
            <div className="nav-label">{sectionLabels[section]}</div>
            {pages.map((item) => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><span>{item.step}</span><div>{item.nav}<small>{item.duration}</small></div></button>)}
          </div>
        })}
        {!filteredPages.length && <p className="no-results">找不到符合的頁面</p>}
      </nav>
    </aside>
    <main className="workspace">
      <div className="topbar"><button className="back-home" onClick={() => navigate('home')}>面試流程總覽</button><div className="shortcuts"><span><kbd>K</kbd> 上一頁</span><span><kbd>J</kbd> 下一頁</span></div></div>
      <div className="content-scroll">{page ? <InterviewPage key={page.id} page={page} index={pageIndex} onMove={move} /> : <Home onOpen={navigate} />}</div>
    </main>
  </div>
}

function Home({ onOpen }: { onOpen: (id: string) => void }) {
  return <div className="home-page">
    <header><p>60 MIN · ANKUR KHOSLA · HIRING MANAGER</p><h1>明天照這個順序回答</h1><span>先建立定位，再回答動機，接著用兩個主故事證明能力。其他故事只在被追問時使用。</span></header>
    <section className="official-focus"><strong>官方評估面向</strong><div>{['Builder Mindset', 'Data & AI Expertise', 'Customer Advisor', 'Execution & Adoption', 'Bias for Action', 'Team Fit'].map((focus) => <span key={focus}>{focus}</span>)}</div></section>
    <section className="interview-flow">
      {sections.map((section) => <div className="flow-section" key={section}>
        <h2>{sectionLabels[section]}</h2>
        {guidePages.filter((page) => page.section === section).map((page) => <button key={page.id} onClick={() => onOpen(page.id)}><span>{page.step}</span><div><strong>{page.nav}</strong><small>{page.purpose}</small></div><b>{page.duration} →</b></button>)}
      </div>)}
    </section>
    <aside className="tomorrow-rule"><strong>明天的規則</strong><p>每個回答先講結論，再照畫面一格一格講。講完一格就點掉；如果面試官插問，直接從左側跳到對應頁面，不必硬把原答案講完。</p></aside>
  </div>
}

function InterviewPage({ page, index, onMove }: { page: GuidePage; index: number; onMove: (delta: number) => void }) {
  const storageKey = `fde-custom:${page.id}`
  const [done, setDone] = useState<Set<number>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')) } catch { return new Set() }
  })
  const percent = Math.round((done.size / page.points.length) * 100)

  function toggle(point: number) {
    const next = new Set(done)
    next.has(point) ? next.delete(point) : next.add(point)
    setDone(next)
    localStorage.setItem(storageKey, JSON.stringify([...next]))
  }

  return <article className="answer-page">
    <header className="answer-header">
      <div className="page-meta"><span>STEP {page.step}</span><span>{page.duration}</span>{page.focus.map((focus) => <span key={focus}>{focus}</span>)}</div>
      <h1>{page.title}</h1><p>{page.purpose}</p>
    </header>
    <div className="progress-panel">
      <div><strong>必講進度</strong><span>{done.size} / {page.points.length}</span></div><div className="progress-bar"><i style={{ width: `${percent}%` }} /></div><button onClick={() => { setDone(new Set()); localStorage.removeItem(storageKey) }}>重設</button>
    </div>
    <div className="talking-points">
      {page.points.map((point, pointIndex) => <button className={done.has(pointIndex) ? 'done' : ''} key={`${page.id}-${pointIndex}`} onClick={() => toggle(pointIndex)}>
        <span className="check">{done.has(pointIndex) ? '✓' : pointIndex + 1}</span><div><small>{point.cue}</small><p>{point.text}</p>{point.note && <em>注意：{point.note}</em>}</div>
      </button>)}
    </div>
    {page.reminders && <aside className="reminders"><strong>這頁要記得</strong><ul>{page.reminders.map((item) => <li key={item}>{item}</li>)}</ul></aside>}
    <footer className="pagination"><button disabled={index === 0} onClick={() => onMove(-1)}>← 上一頁 <kbd>K</kbd></button><span>{index + 1} / {guidePages.length}</span><button disabled={index === guidePages.length - 1} onClick={() => onMove(1)}><kbd>J</kbd> 下一頁 →</button></footer>
  </article>
}
