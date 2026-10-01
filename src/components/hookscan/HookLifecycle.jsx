import styles from './HookLifecycle.module.css'

/* 
  Animated hook lifecycle diagram matching the reference:
  A flowing curved path from Initialize → Add liquidity → Remove liquidity → Swap (before/after)
  with pink glowing nodes at active hooks and grey at inactive ones.
*/

const NODES = [
  { id: 'init',    label: 'Initialize',      x: 240, y: 60,  active: true  },
  { id: 'addliq',  label: 'Add liquidity',   x: 180, y: 155, active: true  },
  { id: 'remliq',  label: 'Remove liquidity',x: 175, y: 255, active: false },
  { id: 'donate',  label: 'Donate',          x: 340, y: 175, active: false },
  { id: 'before',  label: 'before',          x: 225, y: 345, active: true  },
  { id: 'after',   label: 'after',           x: 290, y: 345, active: false },
]

export default function HookLifecycle() {
  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 480 420"
        className={styles.svg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Main flow path — vertical spine ── */}
        <path
          d="M240 75 C240 100, 195 120, 185 155 C175 190, 175 220, 178 255 C182 300, 220 320, 240 345"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          fill="none"
        />

        {/* ── Pink active segment: Init → Add liquidity ── */}
        <path
          d="M240 75 C240 100, 195 120, 185 155"
          stroke="#FF2D9B"
          strokeWidth="2.5"
          fill="none"
          className={styles.animated}
        />

        {/* ── Pink: Add liquidity → partway down ── */}
        <path
          d="M185 155 C178 185, 177 210, 178 235"
          stroke="#FF2D9B"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* ── Curve out to Donate ── */}
        <path
          d="M240 75 C280 90, 310 130, 340 175"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M340 175 C350 210, 330 260, 260 290 C250 295, 245 315, 240 345"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* ── Glow line under swap nodes ── */}
        <line x1="205" y1="355" x2="320" y2="355"
          stroke="rgba(255,45,120,0.2)" strokeWidth="1" />

        {/* ── Swap label ── */}
        <text x="257" y="390" textAnchor="middle"
          fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="Inter,sans-serif">
          Swap
        </text>

        {/* ── Nodes ── */}
        {NODES.filter(n => n.id !== 'before' && n.id !== 'after').map(n => (
          <g key={n.id}>
            {n.active && (
              <circle cx={n.x} cy={n.y} r="16"
                fill="rgba(255,45,120,0.12)"
                className={styles.pulse}
              />
            )}
            <circle cx={n.x} cy={n.y} r="7"
              fill={n.active ? '#FF2D9B' : '#2a2a2e'}
              stroke={n.active ? '#FF2D9B' : 'rgba(255,255,255,0.2)'}
              strokeWidth="1.5"
            />
            {n.active && (
              <circle cx={n.x} cy={n.y} r="3.5" fill="#fff" opacity="0.9" />
            )}
            <text
              x={n.x + (n.id === 'donate' ? 14 : -14)}
              y={n.y + 4}
              textAnchor={n.id === 'donate' ? 'start' : 'end'}
              fill="rgba(255,255,255,0.55)"
              fontSize="11.5"
              fontFamily="Inter,sans-serif"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* ── Swap before/after nodes with labels ── */}
        {[
          { id:'before', x:225, y:348, active:true,  label:'before' },
          { id:'after',  x:290, y:348, active:false, label:'after'  },
        ].map(n => (
          <g key={n.id}>
            {n.active && (
              <circle cx={n.x} cy={n.y} r="13"
                fill="rgba(255,45,120,0.12)"
                className={styles.pulse}
              />
            )}
            <circle cx={n.x} cy={n.y} r="6"
              fill={n.active ? '#FF2D9B' : '#2a2a2e'}
              stroke={n.active ? '#FF2D9B' : 'rgba(255,255,255,0.2)'}
              strokeWidth="1.5"
            />
            {n.active && <circle cx={n.x} cy={n.y} r="3" fill="#fff" opacity="0.9" />}
            <text x={n.x} y={n.y - 14}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              fontFamily="Inter,sans-serif"
            >{n.label}</text>
          </g>
        ))}

        {/* ── beforeSwap Routable badge ── */}
        <rect x="155" y="398" width="160" height="22" rx="11"
          fill="rgba(255,45,120,0.12)" stroke="rgba(255,45,120,0.3)" strokeWidth="1" />
        <circle cx="171" cy="409" r="4" fill="#FF2D9B" />
        <text x="180" y="413" fill="#FF2D9B" fontSize="11" fontFamily="Inter,sans-serif">
          beforeSwap
        </text>
        <text x="248" y="413" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="Inter,sans-serif">
          Routable
        </text>
      </svg>
    </div>
  )
}
