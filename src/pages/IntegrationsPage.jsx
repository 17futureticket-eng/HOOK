import { ExternalLink, ChevronRight } from 'lucide-react'
import styles from './IntegrationsPage.module.css'

const LIVE = [
  { icon:'⚡', name:'What The Hook', desc:'Arbitrage retention for Hookr pools. Captures cross-venue price gaps and shares profit with pool participants.', tags:['Arbitrage','MEV protection'], url:'#' },
  { icon:'😱', name:'Fomo',          desc:'Independent trading venue for tokens on Robinhood Chain. Routes through Hookr default root.', tags:['Trading','DEX'], url:'#' },
  { icon:'🦄', name:'Uniswap',       desc:'The Uniswap app and API route swaps through pools on Hookr\'s default root.', tags:['Swaps','Routing'], url:'#' },
]

const COMING = [
  { icon:'🌸', name:'Saffron',     desc:'Yield optimization layer for Hookr LP positions.' },
  { icon:'⚡', name:'ZEAL',        desc:'Portfolio analytics for hooked pools.' },
  { icon:'⬆',  name:'Longbow',    desc:'Limit orders built on Hookr V2 hooks.' },
  { icon:'🔓', name:'OPEN',        desc:'Open-source hook registry and explorer.' },
  { icon:'💊', name:'PumpPill',    desc:'Token launch platform with custom hooks.' },
  { icon:'🌐', name:'Hood Domains',desc:'On-chain identity for Robinhood Chain.' },
  { icon:'🎣', name:'rhook',       desc:'Hook analytics and monitoring dashboard.' },
  { icon:'📈', name:'VolaDelta',   desc:'Volatility-based dynamic fee hooks.' },
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
              <div className={styles.liveIcon}>{i.icon}</div>
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
            <a href={i.url} className={styles.liveLink}>
              Visit integration <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>

      <div className={styles.sectionLabel} style={{marginTop:36}}>Coming soon</div>
      <div className={styles.comingGrid}>
        {COMING.map(i => (
          <div key={i.name} className={styles.comingCard}>
            <span className={styles.comingIcon}>{i.icon}</span>
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
