import { useEffect, useMemo, useRef, useState } from 'react'
import { appleGuidePages, applePageById, appleSectionLabels } from './appleInterviewGuide'
import type { AppleGuidePage, AppleGuideSection } from './appleInterviewGuide'

type View = 'home' | string
const sections: AppleGuideSection[] = ['recruiter', 'stories', 'sre', 'close']

function initialView(): View {
  const route = window.location.hash.slice(1)
  const id = route.startsWith('apple/') ? route.slice('apple/'.length) : ''
  return applePageById.has(id) ? id : 'home'
}

export default function AppleGuide() {
  const [view, setView] = useState<View>(initialView)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const page = view === 'home' ? undefined : applePageById.get(view)
  const pageIndex = page ? appleGuidePages.findIndex((item) => item.id === page.id) : -1

  useEffect(() => {
    const syncViewFromUrl = () => {
      const route = window.location.hash.slice(1)
      const id = route.startsWith('apple/') ? route.slice('apple/'.length) : ''
      setView(applePageById.has(id) ? id : 'home')
      setSidebarOpen(false)
      document.querySelector('.content-scroll')?.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', syncViewFromUrl)
    return () => window.removeEventListener('hashchange', syncViewFromUrl)
  }, [])

  const filteredPages = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return appleGuidePages
    return appleGuidePages.filter((item) => `${item.nav} ${item.title} ${item.purpose} ${item.focus.join(' ')}`.toLowerCase().includes(value))
  }, [query])

  function navigate(id: View) {
    setView(id)
    setSidebarOpen(false)
    window.location.hash = id === 'home' ? 'apple' : `apple/${id}`
    document.querySelector('.content-scroll')?.scrollTo({ top: 0 })
  }

  function move(delta: number) {
    const base = pageIndex < 0 ? (delta > 0 ? -1 : appleGuidePages.length) : pageIndex
    const next = appleGuidePages[base + delta]
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

  return <div className="fde-guide apple-guide app-shell">
    <header className="mobile-header"><button onClick={() => setSidebarOpen(true)}>☰</button><strong>Apple SRE Prep</strong></header>
    {sidebarOpen && <button className="scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}
    <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`}>
      <button className="brand" onClick={() => navigate('home')}><strong>Apple SRE</strong><span>Tomorrow · Recruiter Conversation</span></button>
      <div className="search-wrap"><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋頁面或主題…" /><kbd>/</kbd></div>
      <nav className="section-nav">
        {!query && <button className={`nav-home ${view === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>明天 HR 準備總覽</button>}
        {sections.map((section) => {
          const pages = filteredPages.filter((item) => item.section === section)
          if (!pages.length) return null
          return <div className="nav-group" key={section}>
            <div className="nav-label">{appleSectionLabels[section]}</div>
            {pages.map((item) => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><span>{item.step}</span><div>{item.nav}<small>{item.duration}</small></div></button>)}
          </div>
        })}
        {!filteredPages.length && <p className="no-results">找不到符合的頁面</p>}
      </nav>
    </aside>
    <main className="workspace">
      <div className="topbar"><div className="guide-links"><button className="all-prep-link" onClick={() => { window.location.hash = '' }}>← 全部公司</button><button className="back-home" onClick={() => navigate('home')}>Apple 準備總覽</button></div><div className="shortcuts"><span><kbd>K</kbd> 上一頁</span><span><kbd>J</kbd> 下一頁</span></div></div>
      <div className="content-scroll">{page ? <AppleInterviewPage key={page.id} page={page} index={pageIndex} onMove={move} /> : <AppleHome onOpen={navigate} />}</div>
    </main>
  </div>
}

function AppleHome({ onOpen }: { onOpen: (id: string) => void }) {
  return <div className="home-page">
    <header><p>APPLE · SENIOR SITE RELIABILITY ENGINEER · SINGAPORE</p><h1>先過明天 HR，再補齊 SRE</h1><span>第一區是明天能直接說的回答；故事庫按 SRE relevance 重排；技術區對準 Apple Silicon datacenter fleet。</span></header>
    <section className="official-focus"><strong>職缺核心</strong><div>{['Apple Silicon Fleet', 'Infrastructure Automation', 'Linux & Networking', 'Kubernetes', 'Provisioning', 'Monitoring & Alerting', 'On-call'].map((focus) => <span key={focus}>{focus}</span>)}</div></section>
    <section className="interview-flow">
      {sections.map((section) => <div className="flow-section" key={section}>
        <h2>{appleSectionLabels[section]}</h2>
        {appleGuidePages.filter((page) => page.section === section).map((page) => <button key={page.id} onClick={() => onOpen(page.id)}><span>{page.step}</span><div><strong>{page.nav}</strong><small>{page.purpose}</small></div><b>{page.duration} →</b></button>)}
      </div>)}
    </section>
    <aside className="tomorrow-rule"><strong>今晚的規則</strong><p>先練完 01–08，不要急著把技術區全部背完。Recruiter 要確認的是動機、經歷、基本 fit、誠實邊界與行政條件。技術準備從 T1 Incident Triage 開始，逐層補到 fleet system design。</p></aside>
  </div>
}

function AppleInterviewPage({ page, index, onMove }: { page: AppleGuidePage; index: number; onMove: (delta: number) => void }) {
  const storageKey = `apple-guide:${page.id}`
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
      <div><strong>練習進度</strong><span>{done.size} / {page.points.length}</span></div><div className="progress-bar"><i style={{ width: `${percent}%` }} /></div><button onClick={() => { setDone(new Set()); localStorage.removeItem(storageKey) }}>重設</button>
    </div>
    <div className="talking-points">
      {page.points.map((point, pointIndex) => <button className={done.has(pointIndex) ? 'done' : ''} key={`${page.id}-${pointIndex}`} onClick={() => toggle(pointIndex)}>
        <span className="check">{done.has(pointIndex) ? '✓' : pointIndex + 1}</span><div><small>{point.cue}</small><p>{point.text}</p>{point.note && <em>注意：{point.note}</em>}</div>
      </button>)}
    </div>
    {page.reminders && <aside className="reminders"><strong>這頁要記得</strong><ul>{page.reminders.map((item) => <li key={item}>{item}</li>)}</ul></aside>}
    <footer className="pagination"><button disabled={index === 0} onClick={() => onMove(-1)}>← 上一頁 <kbd>K</kbd></button><span>{index + 1} / {appleGuidePages.length}</span><button disabled={index === appleGuidePages.length - 1} onClick={() => onMove(1)}><kbd>J</kbd> 下一頁 →</button></footer>
  </article>
}
