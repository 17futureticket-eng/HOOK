import styles from './CallbackGraph.module.css'

const CALLBACKS = [
  { id: 'unlock',    label: 'unlockCallback()', x: 120, y: 60,  guarded: true  },
  { id: 'claimTo',   label: 'claimTo()',        x: 310, y: 60,  guarded: false },
  { id: 'syncBase',  label: 'syncBaseFee()',    x: 90,  y: 180, guarded: false },
  { id: 'confPool',  label: 'configurePool()',  x: 295, y: 180, guarded: false },
]

export default function CallbackGraph() {
  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 420 260" className={styles.svg} fill="none">
        {/* center node — hook logo */}
        <circle cx="210" cy="120" r="26" fill="rgba(255,45,120,0.15)"
          stroke="#FF2D9B" strokeWidth="1.5" />
        <circle cx="210" cy="120" r="18" fill="rgba(255,45,120,0.2)" />
        <text x="210" y="125" textAnchor="middle"
          fill="#FF2D9B" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="700">
          ↩
        </text>

        {/* connecting lines */}
        <line x1="148" y1="72"  x2="192" y2="104" stroke="rgba(255,45,120,0.35)" strokeWidth="1.2" strokeDasharray="4 3"/>
        <line x1="286" y1="72"  x2="228" y2="104" stroke="rgba(255,45,120,0.2)"  strokeWidth="1.2" strokeDasharray="4 3"/>
        <line x1="148" y1="168" x2="192" y2="136" stroke="rgba(255,45,120,0.2)"  strokeWidth="1.2" strokeDasharray="4 3"/>
        <line x1="280" y1="168" x2="228" y2="136" stroke="rgba(255,45,120,0.2)"  strokeWidth="1.2" strokeDasharray="4 3"/>

        {/* callback labels */}
        {CALLBACKS.map(cb => (
          <g key={cb.id}>
            {cb.guarded && (
              <rect x={cb.x - 4} y={cb.y - 14} width={160} height={20}
                rx="5" fill="rgba(255,45,120,0.08)"
                stroke="rgba(255,45,120,0.25)" strokeWidth="1"
              />
            )}
            <text x={cb.x} y={cb.y} fill={cb.guarded ? '#FF2D9B' : 'rgba(255,255,255,0.55)'}
              fontSize="12" fontFamily="'SF Mono',Consolas,monospace">
              {cb.guarded ? '🔒 ' : ''}{cb.label}
            </text>
          </g>
        ))}

        {/* guard label */}
        <text x="100" y="220" fill="rgba(255,45,120,0.6)" fontSize="11" fontFamily="Inter,sans-serif">
          🔒 Guarded by onlyPoolManager
        </text>
      </svg>
    </div>
  )
}
