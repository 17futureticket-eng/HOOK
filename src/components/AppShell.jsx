import {
  Search, Layers, Box, Zap, Shield,
  Users, Hash, BookOpen, FileText
} from 'lucide-react'
import HookLogo from './HookLogo'
import styles from './AppShell.module.css'

/* Portfolio removed — only shown in HookScan context */
const NAV_ITEMS = [
  { id: 'search',       label: 'Search',       Icon: Search  },
  { id: 'discover',     label: 'Discover',     Icon: Layers  },
  { id: 'hook',         label: 'Hook',         Icon: Box     },
  { id: 'builder',      label: 'Builder',      Icon: Zap     },
  { id: 'hookscan',     label: 'HookrScan',    Icon: Shield  },
  { id: 'integrations', label: 'Integrations', Icon: Users,  badge: 'NEW' },
  { id: 'agents',       label: 'Agents',       Icon: Hash,   badge: 'NEW' },
]

const LEARN_ITEMS = [
  { id: 'learn', label: 'Learn', Icon: BookOpen },
  { id: 'docs',  label: 'Docs',  Icon: FileText },
]

/* ──────────────────────────────────────────────────────────────────
   AppShell — sidebar is ONLY rendered when showSidebar=true (HookScan).
   The sidebar is a collapsed icon rail (48px) that expands to 200px
   on hover via CSS alone — no JS state needed.
────────────────────────────────────────────────────────────────── */
export default function AppShell({ activePage, onNavigate, showSidebar = false, children }) {
  if (!showSidebar) {
    /* No sidebar — just render children full-width */
    return <div className={styles.bare}>{children}</div>
  }

  return (
    <div className={styles.shell}>
      {/* Slide-out sidebar */}
      <aside className={styles.sidebar}>
        {/* Logo — only visible when expanded */}
        <button className={styles.logoBtn} onClick={() => onNavigate('discover')}>
          <div className={styles.logoIcon}>H</div>
          <div className={styles.logoFull}><HookLogo height={22} /></div>
        </button>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ id, label, Icon, badge }) => (
            <button
              key={id}
              className={`${styles.navItem} ${activePage === id ? styles.navActive : ''}`}
              onClick={() => onNavigate(id)}
              title={label}
            >
              <span className={styles.iconWrap}>
                <Icon size={17} strokeWidth={1.8} />
              </span>
              <span className={styles.label}>{label}</span>
              {badge && <span className={styles.badge}>{badge}</span>}
            </button>
          ))}
        </nav>

        <div className={styles.learn}>
          <span className={styles.learnTitle}>LEARN</span>
          {LEARN_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`${styles.navItem} ${activePage === id ? styles.navActive : ''}`}
              onClick={() => onNavigate(id)}
              title={label}
            >
              <span className={styles.iconWrap}>
                <Icon size={17} strokeWidth={1.8} />
              </span>
              <span className={styles.label}>{label}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  )
}
