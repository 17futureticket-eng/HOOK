import { useState } from 'react'
import AppShell from './components/AppShell'
import DiscoverPage     from './pages/DiscoverPage'
import SearchPage       from './pages/SearchPage'
import HookPage         from './pages/HookPage'
import BuilderPage      from './pages/BuilderPage'
import HookScanPage     from './pages/HookScanPage'
import IntegrationsPage from './pages/IntegrationsPage'
import AgentsPage       from './pages/AgentsPage'

/* Pages that show the sidebar */
const SIDEBAR_PAGES = ['hookscan', 'search', 'hook', 'builder', 'integrations', 'agents', 'learn', 'docs']

export default function App() {
  const [page,     setPage]     = useState('discover')
  const [scanAddr, setScanAddr] = useState(null)

  /* Only called when user explicitly presses Scan with a valid address */
  const handleScanAddress = (addr) => {
    setScanAddr(addr)
    setPage('hookscan')
  }

  const navigate = (id) => {
    if (id !== 'hookscan') setScanAddr(null)
    setPage(id)
  }

  const showSidebar = SIDEBAR_PAGES.includes(page)

  const renderPage = () => {
    switch (page) {
      case 'discover':     return <DiscoverPage     onScanAddress={handleScanAddress} />
      case 'search':       return <SearchPage       onScanAddress={handleScanAddress} />
      case 'hook':         return <HookPage         onScanAddress={handleScanAddress} />
      case 'builder':      return <BuilderPage />
      case 'hookscan':     return <HookScanPage     address={scanAddr} onBack={() => navigate('discover')} onScanAddress={handleScanAddress} />
      case 'integrations': return <IntegrationsPage />
      case 'agents':       return <AgentsPage />
      case 'learn':        return <Placeholder title="Learn"  sub="Documentation and guides for Hookr." />
      case 'docs':         return <Placeholder title="Docs"   sub="Technical documentation and API reference." />
      default:             return <DiscoverPage     onScanAddress={handleScanAddress} />
    }
  }

  return (
    <AppShell activePage={page} onNavigate={navigate} showSidebar={showSidebar}>
      {renderPage()}
    </AppShell>
  )
}

function Placeholder({ title, sub }) {
  return (
    <div style={{ padding: '48px 40px' }}>
      <h1 style={{ fontSize:28, fontWeight:800, letterSpacing:'-0.5px', marginBottom:8 }}>{title}</h1>
      <p style={{ fontSize:14, color:'var(--muted)' }}>{sub}</p>
    </div>
  )
}
