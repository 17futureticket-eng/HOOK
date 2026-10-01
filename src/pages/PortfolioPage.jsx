import { Wallet, TrendingUp, Droplets, RefreshCw, ChevronRight } from 'lucide-react'
import styles from './PortfolioPage.module.css'

export default function PortfolioPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Portfolio</h1>
      <p className={styles.sub}>Track your positions, LP rewards, and hook activity</p>

      {/* Wallet connect CTA */}
      <div className={styles.connectCard}>
        <div className={styles.connectIcon}><Wallet size={32} color="var(--pink)" strokeWidth={1.5} /></div>
        <h2 className={styles.connectTitle}>Connect your wallet</h2>
        <p className={styles.connectSub}>Connect to see your pools, positions, and earned rewards across Hookr.</p>
        <button className={styles.connectBtn}>Connect wallet</button>
      </div>

      {/* Preview stats (blurred/locked) */}
      <div className={styles.previewSection}>
        <div className={styles.sectionTitle}>Preview</div>
        <div className={styles.statsGrid}>
          {[
            { Icon: TrendingUp, label: 'Total positions', value: '—',    sub: 'Connect to view' },
            { Icon: Droplets,   label: 'LP rewards',      value: '—',    sub: 'Connect to view' },
            { Icon: RefreshCw,  label: 'Recaptured fees', value: '—',    sub: 'Connect to view' },
            { Icon: Wallet,     label: 'Net PnL',         value: '—',    sub: 'Connect to view' },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <s.Icon size={18} color="var(--muted)" strokeWidth={1.5} />
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statSub}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Position rows locked */}
        <div className={styles.positionsList}>
          {['ETH / HOOKR','ETH / COIN','ETH / HOOK'].map(pool => (
            <div key={pool} className={`${styles.posRow} ${styles.locked}`}>
              <div className={styles.posIcon}>Ξ</div>
              <div className={styles.posName}>{pool}</div>
              <div className={styles.posLock}>🔒 Connect to view</div>
              <ChevronRight size={14} color="var(--muted)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
