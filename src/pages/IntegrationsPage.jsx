import {
  ChevronRight, ExternalLink,
  Zap, BarChart2, Repeat2,
  Leaf, Activity, ArrowUpRight,
  Unlock, Pill, Globe, Anchor, TrendingUp
} from 'lucide-react'
import styles from './IntegrationsPage.module.css'

const LIVE = [
  {
    Icon: Zap,
    iconColor: '#fb923c', iconBg: 'rgba(251,146,60,0.12)',
    name: 'What The Hook',
    desc: 'Arbitrage retention for Hookr pools. Captures cross-venue price gaps and shares profit with pool participants.',
    tags: ['Arbitrage', 'MEV protection'],
  },
  {
    Icon: BarChart2,
    iconColor: '#ff2d78', iconBg: 'rgba(255,45,120,0.12)',
    name: 'Fomo',
    desc: 'Independent trading venue for tokens on Robinhood Chain. Routes through Hookr default root.',
    tags: ['Trading', 'DEX'],
  },
  {
    Icon: Repeat2,
    iconColor: '#a78bfa', iconBg: 'rgba(167,139,250,0.12)',
    name: 'Uniswap',
    desc: "The Uniswap app and API route swaps through pools on Hookr's default root.",
    tags: ['Swaps', 'Routing'],
  },
]

const COMING = [
  { Icon: Leaf,        iconColor: '#fbbf24', name: 'Saffron',      desc: 'Yield optimization layer for Hookr LP positions.' },
  { Icon: Activity,    iconColor: '#38bdf8', name: 'ZEAL',         desc: 'Portfolio analytics for hooked pools.' },
  { Icon: ArrowUpRight,iconColor: '#34d399', name: 'Longbow',      desc: 'Limit orders built on Hookr V2 hooks.' },
  { Icon: Unlock,      iconColor: '#a78bfa', name: 'OPEN',         desc: 'Open-source hook registry and explorer.' },
  { Icon: Pill,        iconColor: '#f87171', name: 'PumpPill',     desc: 'Token launch platform with custom hooks.' },
  { Icon: Globe,       iconColor: '#60a5fa', name: 'Hood Domains', desc: 'On-chain identity for Robinhood Chain.' },
  { Icon: Anchor,      iconColor: '#fb923c', name: 'rhook',        desc: 'Hook analytics and monitoring dashboard.' },
  { Icon: TrendingUp,  iconColor: '#34d399', name: 'VolaDelta',    desc: 'Volatility-based dynamic fee hooks.' },
]

export default function IntegrationsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Integrations</h1>
      <p className={styles.sub}>Projects and protocols building on Hookr</p>

      <div className={styles.sectionLabel}>Live</div>
      <div className={styles.liveGrid}>
        {LIVE.map(i => (
          <div key={i.name} className={styles.liveCard}>
            <div className={styles.liveTop}>
              <div className={styles.liveIcon} style={{ background: i.iconBg, border: `1px solid ${i.iconColor}22` }}>
                <i.Icon size={20} color={i.iconColor} strokeWidth={1.8} />
              </div>
              <div>
                <div className={styles.liveName}>
                  {i.name}
                  <span className={styles.liveBadge}>● Live</span>
                </div>
                <div className={styles.liveDesc}>{i.desc}</div>
              </div>
            </div>
            <div className={styles.liveTags}>
              {i.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
            <a href="#" className={styles.liveLink}>
              Visit integration <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>

      <div className={styles.sectionLabel} style={{marginTop:36}}>Coming soon</div>
      <div className={styles.comingGrid}>
        {COMING.map(i => (
          <div key={i.name} className={styles.comingCard}>
            <div className={styles.comingIconWrap} style={{ background: `${i.iconColor}18`, border: `1px solid ${i.iconColor}22` }}>
              <i.Icon size={16} color={i.iconColor} strokeWidth={1.8} />
            </div>
            <div>
              <div className={styles.comingName}>{i.name}</div>
              <div className={styles.comingDesc}>{i.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buildCta}>
        <div>
          <div className={styles.ctaTitle}>Build on Hookr</div>
          <div className={styles.ctaSub}>Integrate your product with Hookr's SDK, launch pools, and reach hook users directly.</div>
        </div>
        <button className={styles.ctaBtn}>Get intake track <ChevronRight size={14} /></button>
      </div>
    </div>
  )
}
