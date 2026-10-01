import { ShieldAlert, TrendingUp, Flame, Droplets, Trophy, RefreshCw } from 'lucide-react'
import styles from './HookBlocks.module.css'

const BLOCKS = [
  {
    Icon: ShieldAlert,
    iconColor: '#7c3aed',
    iconBg: 'rgba(124,58,237,0.12)',
    name: 'Anti-Snipe',
    desc: 'Caps early buys and adds an LP fee in the first blocks.',
    gas: '~160K gas per swap · fixed at pool open',
  },
  {
    Icon: TrendingUp,
    iconColor: '#f97316',
    iconBg: 'rgba(249,115,22,0.12)',
    name: 'Dynamic fees',
    desc: 'Fee scales with trade size.',
    gas: '~120K gas per swap · fixed at pool open',
  },
  {
    Icon: Flame,
    iconColor: '#ef4444',
    iconBg: 'rgba(239,68,68,0.12)',
    name: 'Auto Burn',
    desc: 'Burns a share of actual buy output.',
    gas: '~140K gas per swap · fixed at pool open',
  },
  {
    Icon: Droplets,
    iconColor: '#22c55e',
    iconBg: 'rgba(34,197,94,0.12)',
    name: 'LP Rewards',
    desc: 'Fee share streams to LPs.',
    gas: '~150K gas per swap · fixed at pool open',
  },
  {
    Icon: Trophy,
    iconColor: '#eab308',
    iconBg: 'rgba(234,179,8,0.12)',
    name: 'Nth-buy Pot',
    desc: 'A public counter pays every Nth buy.',
    gas: '~180K gas per swap · fixed at pool open',
  },
  {
    Icon: RefreshCw,
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.12)',
    name: 'Arbitrage recapture',
    desc: 'Keeps arbitrage value with the pool instead of outside MEV bots.',
    gas: null,
    powered: true,
  },
]

export default function HookBlocks() {
  return (
    <section className={styles.section} id="hooks">
      <div className="section-header">
        <div>
          <h2>Hook Blocks</h2>
          <p>Composable hook rules you can use for your hook.</p>
        </div>
        <a className="section-link" href="#">How each block works ›</a>
      </div>

      <div className={styles.grid}>
        {BLOCKS.map((b) => (
          <div key={b.name} className={styles.card}>
            <div
              className={styles.iconWrap}
              style={{ background: b.iconBg, border: `1px solid ${b.iconColor}22` }}
            >
              <b.Icon size={20} color={b.iconColor} strokeWidth={1.8} />
            </div>
            <h3 className={styles.name}>{b.name}</h3>
            <p className={styles.desc}>{b.desc}</p>
            <div className={styles.footer}>
              {b.powered ? (
                <>
                  <div className={styles.powered}>
                    Powered by&nbsp;<strong>⚡ What The Hook</strong>
                  </div>
                  <a className={styles.poweredLink} href="#">whatthehook.io ↗</a>
                </>
              ) : (
                <span className={styles.gas}>{b.gas}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
