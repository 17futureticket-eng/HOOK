import styles from './DonutChart.module.css'

export default function DonutChart({ total = 17, high = 7, medium = 10 }) {
  const R = 44
  const STROKE = 8
  const C = 2 * Math.PI * R          // circumference
  const highArc   = (high   / total) * C
  const medArc    = (medium / total) * C

  return (
    <div className={styles.wrap}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        {/* background track */}
        <circle
          cx="55" cy="55" r={R}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />
        {/* medium confidence — grey, drawn first (bottom layer) */}
        <circle
          cx="55" cy="55" r={R}
          fill="none"
          stroke="#3a3a44"
          strokeWidth={STROKE}
          strokeDasharray={`${medArc} ${C - medArc}`}
          strokeDashoffset={-highArc}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px' }}
        />
        {/* high confidence — pink */}
        <circle
          cx="55" cy="55" r={R}
          fill="none"
          stroke="#FF2D9B"
          strokeWidth={STROKE}
          strokeDasharray={`${highArc} ${C - highArc}`}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px' }}
          className={styles.animated}
        />
        {/* center number */}
        <text x="55" y="60" textAnchor="middle"
          fill="#fff" fontSize="22" fontWeight="700"
          fontFamily="Inter,sans-serif"
        >{total}</text>
      </svg>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.dotPink} />
          High confidence {high}
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dotGrey} />
          Medium {medium}
        </div>
      </div>
    </div>
  )
}
