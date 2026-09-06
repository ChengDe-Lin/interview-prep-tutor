import { useEffect, useState } from 'react'
import DatabricksGuide from './DatabricksGuide'
import LegacyTutor from './LegacyTutor'

function isDatabricksRoute() {
  const route = window.location.hash.slice(1)
  return route === 'databricks' || route.startsWith('databricks/')
}

export default function App() {
  const [showDatabricksGuide, setShowDatabricksGuide] = useState(isDatabricksRoute)

  useEffect(() => {
    const syncRoute = () => setShowDatabricksGuide(isDatabricksRoute())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    document.title = showDatabricksGuide ? 'Databricks FDE // Field Notes' : 'Interview Prep Tutor'
  }, [showDatabricksGuide])

  return showDatabricksGuide ? <DatabricksGuide /> : <LegacyTutor />
}
