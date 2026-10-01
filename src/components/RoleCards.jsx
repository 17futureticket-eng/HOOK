import styles from './RoleCards.module.css'

const ROLES = [
  { label: 'Traders',           title: 'See every rule before you trade',    desc: 'Decoded rule blocks on each market, with the onchain receipt behind them.' },
  { label: 'Liquidity Providers', title: 'Positions, fees and migration',    desc: 'Mint, manage and migrate between hooked pools.' },
  { label: 'Launchers',         title: 'New token or existing asset',         desc: 'Intent, hook, token and review, with the exact fee split before you deploy.' },
  { label: 'Hook Builders',     title: 'Compose, publish, earn',              desc: 'Blueprints with contract-backed royalty terms, priced before you sign anything.' },
  { label: 'Analysts',          title: 'Read any v4 hook',                    desc: 'Decode the callbacks and permissions of a hook address on Robinhood Chain.' },
  { label: 'Integrators',       title: 'Intake tracks and an SDK',            desc: 'Publication, launch, pools, launchpad, generator and executor lanes.' },
]

export default function RoleCards() {
  return (
    <section className={styles.section} id="roles">
      <div className={styles.grid}>
        {ROLES.map((r) => (
          <div key={r.label} className={styles.card}>
            <div className={styles.label}>{r.label}</div>
            <h3 className={styles.title}>{r.title}</h3>
            <p className={styles.desc}>{r.desc}</p>
          </div>
        ))}
      </div>
      {/* agents card sits below the 6-col row */}
      <div className={styles.agentWrap}>
        <div className={styles.card}>
          <div className={styles.label}>Agents</div>
          <h3 className={styles.title}>Manifests and signed packets</h3>
          <p className={styles.desc}>Machine-readable discovery, approvals and launch packets.</p>
        </div>
      </div>
    </section>
  )
}
