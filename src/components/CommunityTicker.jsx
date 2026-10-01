import styles from './CommunityTicker.module.css'

const COMMUNITY = ['🐦 Perpshood', '© Codemen', 'H Harmonic']
const COMING_SOON = [
  '🌸 Saffron', '⚡ ZEAL', '⬆ Longbow', '🔓 OPEN',
  '💊 PumpPill', '🌐 Hood Domains', '🎣 rhook', '📈 VolaDelta',
]

// duplicate for seamless loop
const TICKER_ITEMS = [...COMMUNITY, ...COMMUNITY, ...COMMUNITY, ...COMMUNITY]

export default function CommunityTicker() {
  return (
    <>
      {/* scrolling community logos */}
      <div className={styles.tickerWrap}>
        <span className={styles.tickerLabel}>Community</span>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerScroll}>
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className={styles.tickerItem}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* coming soon row */}
      <div className={styles.comingSoon}>
        <span className={styles.csLabel}>Coming soon</span>
        <div className={styles.csItems}>
          {COMING_SOON.map((item) => (
            <span key={item} className={styles.csChip}>{item}</span>
          ))}
        </div>
      </div>
    </>
  )
}
