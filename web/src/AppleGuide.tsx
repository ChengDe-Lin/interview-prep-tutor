import { useEffect, useMemo, useRef, useState } from 'react'
import { appleGuidePages, applePageById, appleSectionLabels } from './appleInterviewGuide'
import type { AppleGuidePage, AppleGuideSection } from './appleInterviewGuide'
import CommandReview from './CommandReview'
import { technicalHandbookById, technicalHandbooks } from './technicalHandbooks'
import type { TechnicalHandbookId } from './technicalHandbooks'

type View = 'home' | string
const sections: AppleGuideSection[] = ['hm', 'recruiter', 'stories', 'sre', 'close']

function initialView(): View {
  const route = window.location.hash.slice(1)
  const id = route.startsWith('apple/') ? route.slice('apple/'.length) : ''
  if (applePageById.has(id)) return id
  if (id.startsWith('review/') && technicalHandbookById.has(id.slice('review/'.length) as TechnicalHandbookId)) return id
  return 'home'
}

export default function AppleGuide() {
  const [view, setView] = useState<View>(initialView)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('apple-guide:sidebar-collapsed') === '1')
  const searchRef = useRef<HTMLInputElement>(null)
  const page = view === 'home' ? undefined : applePageById.get(view)
  const handbookId = view.startsWith('review/') ? view.slice('review/'.length) as TechnicalHandbookId : undefined
  const handbook = handbookId ? technicalHandbookById.get(handbookId) : undefined
  const pageIndex = page ? appleGuidePages.findIndex((item) => item.id === page.id) : -1

  useEffect(() => {
    const syncViewFromUrl = () => {
      const route = window.location.hash.slice(1)
      const id = route.startsWith('apple/') ? route.slice('apple/'.length) : ''
      const isHandbook = id.startsWith('review/') && technicalHandbookById.has(id.slice('review/'.length) as TechnicalHandbookId)
      setView(applePageById.has(id) || isHandbook ? id : 'home')
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

  const filteredHandbooks = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return technicalHandbooks
    return technicalHandbooks.filter((item) => `${item.nav} ${item.shortTitle} ${item.description}`.toLowerCase().includes(value))
  }, [query])

  function navigate(id: View) {
    setView(id)
    setSidebarOpen(false)
    window.location.hash = id === 'home' ? 'apple' : `apple/${id}`
    document.querySelector('.content-scroll')?.scrollTo({ top: 0 })
  }

  function navigateHandbook(id: TechnicalHandbookId) {
    navigate(`review/${id}`)
  }

  function toggleSidebar() {
    const next = !sidebarCollapsed
    setSidebarCollapsed(next)
    localStorage.setItem('apple-guide:sidebar-collapsed', next ? '1' : '0')
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
      if (handbook) return
      if (event.key.toLowerCase() === 'j') move(1)
      if (event.key.toLowerCase() === 'k') move(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return <div className="fde-guide apple-guide app-shell">
    <header className="mobile-header"><button onClick={() => setSidebarOpen(true)}>☰</button><strong>Apple SRE Prep</strong></header>
    {sidebarOpen && <button className="scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}
    <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''} ${sidebarCollapsed ? 'desktop-collapsed' : ''}`}>
      <button className="brand" onClick={() => navigate('home')}><strong>Apple SRE</strong><span>Hiring Manager · 30-minute conversation</span></button>
      <div className="search-wrap"><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋頁面或主題…" /><kbd>/</kbd></div>
      <nav className="section-nav">
        {!query && <button className={`nav-home ${view === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>Apple 面試準備總覽</button>}
        {sections.map((section) => {
          const pages = filteredPages.filter((item) => item.section === section)
          if (!pages.length) return null
          return <div className="nav-group" key={section}>
            <div className="nav-label">{appleSectionLabels[section]}</div>
            {pages.map((item) => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><span>{item.step}</span><div>{item.nav}<small>{item.duration}</small></div></button>)}
          </div>
        })}
        {!!filteredHandbooks.length && <div className="nav-group handbook-nav-group">
          <div className="nav-label">Apple technical handbooks</div>
          {filteredHandbooks.map((item) => <button key={item.id} className={handbook?.id === item.id ? 'active' : ''} onClick={() => navigateHandbook(item.id)}><span>{item.code}</span><div>{item.nav}<small>{item.description}</small></div></button>)}
        </div>}
        {!filteredPages.length && !filteredHandbooks.length && <p className="no-results">找不到符合的頁面</p>}
      </nav>
    </aside>
    <main className="workspace">
      <div className="topbar"><div className="guide-links"><button className="desktop-sidebar-toggle" onClick={toggleSidebar} aria-label={sidebarCollapsed ? '展開 Apple 導覽' : '收起 Apple 導覽'} title={sidebarCollapsed ? '展開 Apple 導覽' : '收起 Apple 導覽'}><span>{sidebarCollapsed ? '☰' : '‹'}</span>{sidebarCollapsed ? '展開導覽' : '收起導覽'}</button><button className="all-prep-link" onClick={() => { window.location.hash = '' }}>← 全部公司</button><button className="back-home" onClick={() => navigate('home')}>Apple 準備總覽</button></div>{!handbook && <div className="shortcuts"><span><kbd>K</kbd> 上一頁</span><span><kbd>J</kbd> 下一頁</span></div>}</div>
      <div className="content-scroll">{handbook ? <CommandReview key={handbook.id} handbook={handbook} /> : page ? <AppleInterviewPage key={page.id} page={page} index={pageIndex} onMove={move} /> : <AppleHome onOpen={navigate} onOpenHandbook={navigateHandbook} />}</div>
    </main>
  </div>
}

function AppleHome({ onOpen, onOpenHandbook }: { onOpen: (id: string) => void; onOpenHandbook: (id: TechnicalHandbookId) => void }) {
  return <div className="home-page">
    <header><p>APPLE · SENIOR SITE RELIABILITY ENGINEER · SINGAPORE</p><h1>Hiring Manager · 30 分鐘說服主線</h1><span>先用 HM 區建立定位，再依追問進入兩個 deep dive；原 recruiter、story bank 與 technical preparation 都保留在後面。</span></header>
    <section className="official-focus"><strong>這個 team 的核心</strong><div>{['Apple Silicon Fleet', 'Infrastructure Software', 'Platform Automation', 'Safe Lifecycle', 'Linux & Networking', 'Kubernetes', 'Provisioning', 'Reliability by Design'].map((focus) => <span key={focus}>{focus}</span>)}</div></section>
    <section className="interview-flow">
      {sections.map((section) => <div className="flow-section" key={section}>
        <h2>{appleSectionLabels[section]}</h2>
        {appleGuidePages.filter((page) => page.section === section).map((page) => <button key={page.id} onClick={() => onOpen(page.id)}><span>{page.step}</span><div><strong>{page.nav}</strong><small>{page.purpose}</small></div><b>{page.duration} →</b></button>)}
      </div>)}
      <div className="flow-section handbook-flow-section">
        <h2>Apple technical handbooks</h2>
        {technicalHandbooks.map((handbook) => <button key={handbook.id} onClick={() => onOpenHandbook(handbook.id)}><span>{handbook.code}</span><div><strong>{handbook.nav}</strong><small>{handbook.description}</small></div><b>開啟 →</b></button>)}
      </div>
    </section>
    <aside className="tomorrow-rule"><strong>HM 使用方式</strong><p>不要分享這個頁面；把它當成自己的回答導航。先講 HM1，自然接到 HM2。對方問 platform architecture 就進 HM3，問 automation 或 AI 就進 HM4。HM5 目前同時標出已知 production evidence 和仍需要補的真實案例。</p></aside>
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
