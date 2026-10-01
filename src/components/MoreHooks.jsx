import styles from './MoreHooks.module.css'

const CARDS = [
  {
    label: 'Build a block',
    title: 'Build a block',
    badge: null,
    desc: 'Build a block and submit it for review to join the catalog.',
  },
  {
    label: 'In audit',
    title: 'In audit',
    badge: null,
    desc: 'Our own leverage hooks.',
  },
  {
    label: 'Coming soon',
    title: 'Arbitrage recapture',
    badge: 'New',
    desc: 'Retains arbitrage value for pool participants instead of external MEV bots. The current root blocks external arbitrage entering through registered v3 pool callbacks and shares captured profit; the root is deployed and sealed, and the launch flow offers it on a new market.',
  },
  {
    label: 'Partners',
    title: 'Partners',
    badge: null,
    desc: 'Saffron, ZEAL and 6 more integrations, coming soon.',
  },
]

export default function MoreHooks() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {CARDS.map((c) => (
          <div key={c.label} className={styles.card}>
            <div className={styles.label}>{c.label}</div>
            <h3 className={styles.title}>
              {c.title}
              {c.badge && <span className="new-badge">{c.badge}</span>}
            </h3>
            <p className={styles.desc}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
