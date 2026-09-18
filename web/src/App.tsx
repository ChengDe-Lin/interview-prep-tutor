import { useEffect, useState } from 'react'
import AppleGuide from './AppleGuide'
import DatabricksGuide from './DatabricksGuide'
import LegacyTutor from './LegacyTutor'

type GuideRoute = 'apple' | 'commands' | 'databricks' | 'legacy'

function activeRoute(): GuideRoute {
  const route = window.location.hash.slice(1)
  if (route === 'apple' || route.startsWith('apple/')) return 'apple'
  if (route === 'commands') return 'commands'
  if (route === 'databricks' || route.startsWith('databricks/')) return 'databricks'
  return 'legacy'
}

export default function App() {
  const [route, setRoute] = useState<GuideRoute>(activeRoute)

  useEffect(() => {
    const syncRoute = () => {
      setRoute(activeRoute())
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    document.title = route === 'apple'
      ? 'Apple SRE // Interview Prep'
      : route === 'commands'
        ? 'Apple SRE // Commands'
        : route === 'databricks'
          ? 'Databricks FDE // Field Notes'
          : 'Interview Prep Tutor'
  }, [route])

  if (route === 'apple') return <AppleGuide />
  if (route === 'commands') return <LegacyCommandRedirect />
  if (route === 'databricks') return <DatabricksGuide />
  return <LegacyTutor />
}

function LegacyCommandRedirect() {
  useEffect(() => {
    window.location.replace(`${window.location.pathname}${window.location.search}#apple/review/commands`)
  }, [])
  return null
}
