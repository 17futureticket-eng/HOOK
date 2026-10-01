import { Users, Code2, Music2, Leaf, Zap, ArrowUp, Unlock, Pill, Globe, Anchor, BarChart2 } from 'lucide-react'
import styles from './CommunityTicker.module.css'

const COMMUNITY = [
  { Icon: Users,  label: 'Perpshood' },
  { Icon: Code2,  label: 'Codemen'   },
  { Icon: Music2, label: 'Harmonic'  },
]

const COMING_SOON = [
  { Icon: Leaf,     label: 'Saffron'      },
  { Icon: Zap,      label: 'ZEAL'         },
  { Icon: ArrowUp,  label: 'Longbow'      },
  { Icon: Unlock,   label: 'OPEN'         },
  { Icon: Pill,     label: 'PumpPill'     },
  { Icon: Globe,    label: 'Hood Domains' },
  { Icon: Anchor,   label: 'rhook'        },
  { Icon: BarChart2,label: 'VolaDelta'    },
]

const TICKER_ITEMS = [...COMMUNITY, ...COMMUNITY, ...COMMUNITY, ...COMMUNITY]

export default function CommunityTicker() {
  return (
    <>
      <div className={styles.tickerWrap}>
        <span className={styles.tickerLabel}>Community</span>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerScroll}>
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className={styles.tickerItem}>
                <item.Icon size={13} strokeWidth={2} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.comingSoon}>
        <span className={styles.csLabel}>Coming soon</span>
        <div className={styles.csItems}>
          {COMING_SOON.map((item) => (
            <span key={item.label} className={styles.csChip}>
              <item.Icon size={13} strokeWidth={2} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
