import styles from './Stats.module.css'

const STATS = [
  { label: 'TVL',                  value: '$2.82M',   sub: 'Pooled assets · USD' },
  { label: 'Pool initializations', value: '107',      sub: 'Unique Hookr pools' },
  { label: 'Total volume',         value: '$166.4M',  sub: 'All-time · current USD prices' },
  { label: 'Total $HOOKR burned',  value: '5.54M',    sub: 'All permanent burn sources · just now' },
]

export default function Stats() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.card}>
            <div className={styles.label}>{s.label}</div>
            <div className={styles.value}>{s.value}</div>
            <div className={styles.sub}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
