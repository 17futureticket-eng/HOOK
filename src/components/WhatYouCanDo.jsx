import styles from './WhatYouCanDo.module.css'

const CARDS = [
  { title: 'Launch',      desc: 'Launch a token with custom rules, into ETH, HOOKR, USDG or a tokenized stock.' },
  { title: 'Open a pool', desc: "Open a pool for an asset that already exists, under your own rules, tokenized stock pairs included; a tokenized stock brings its own pause registry that can halt the pool." },
  { title: 'Builder',     desc: 'Compose the rules in the builder, from the current set, with a preview before you sign.' },
  { title: 'Integrate',   desc: 'Launch from your own product and manage liquidity after launch through the same venue.' },
  { title: 'Agents',      desc: "Read a pool's rules, quote and swap, open a market or claim a payout, from a skill file any agent can read." },
]

export default function WhatYouCanDo() {
  return (
    <section className={styles.section} id="builder">
      <div className="section-label">Get Started</div>
      <h2 className={styles.heading}>What you can do with Hookr</h2>
      <div className={styles.grid}>
        {CARDS.map((c) => (
          <div key={c.title} className={styles.card}>
            <div className={styles.title}>{c.title}</div>
            <p className={styles.desc}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
