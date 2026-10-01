import { Zap, BarChart2, Repeat2 } from 'lucide-react'
import styles from './Integrations.module.css'

const ITEMS = [
  {
    Icon: Zap,
    iconColor: '#fb923c',
    iconBg: 'rgba(251,146,60,0.12)',
    name: 'What The Hook',
    desc: 'Arbitrage retention for Hookr pools: captures cross-venue price gaps inside the swap and shares the profit with pool participants instead of external MEV bots.',
  },
  {
    Icon: BarChart2,
    iconColor: '#ff2d78',
    iconBg: 'rgba(255,45,120,0.12)',
    name: 'Fomo',
    desc: 'An independent trading venue for tokens on Robinhood Chain.',
  },
  {
    Icon: Repeat2,
    iconColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,0.12)',
    name: 'Uniswap',
    desc: "The Uniswap app and API can route swaps through pools on Hookr's default root.",
  },
]

export default function Integrations() {
  return (
    <section className={styles.section} id="integrations">
      <div className="section-label">Building on Hookr</div>
      <div className="section-header">
        <h2>Integrations</h2>
        <a className="section-link" href="#">All integrations ›</a>
      </div>

      <div className={styles.grid}>
        {ITEMS.map((item) => (
          <div key={item.name} className={styles.card}>
            <div className={styles.logo} style={{ background: item.iconBg, border: `1px solid ${item.iconColor}22` }}>
              <item.Icon size={20} color={item.iconColor} strokeWidth={1.8} />
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>
                {item.name}
                <span className="live-badge">Live</span>
              </h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
