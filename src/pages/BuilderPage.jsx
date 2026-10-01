import { useState } from 'react'
import { ShieldAlert, TrendingUp, Flame, Droplets, Trophy, RefreshCw, Plus, X, ChevronRight, Zap } from 'lucide-react'
import styles from './BuilderPage.module.css'

const BLOCKS = [
  { id:'antisnipe',  Icon:ShieldAlert, color:'#7c3aed', bg:'rgba(124,58,237,0.12)', name:'Anti-Snipe',           gas:160, desc:'Caps early buys and adds an LP fee in first blocks.' },
  { id:'dynamic',    Icon:TrendingUp,  color:'#f97316', bg:'rgba(249,115,22,0.12)', name:'Dynamic fees',         gas:120, desc:'Fee scales with trade size automatically.' },
  { id:'burn',       Icon:Flame,       color:'#ef4444', bg:'rgba(239,68,68,0.12)',  name:'Auto Burn',            gas:140, desc:'Burns a share of actual buy output.' },
  { id:'rewards',    Icon:Droplets,    color:'#22c55e', bg:'rgba(34,197,94,0.12)',  name:'LP Rewards',           gas:150, desc:'Fee share streams directly to LPs.' },
  { id:'pot',        Icon:Trophy,      color:'#eab308', bg:'rgba(234,179,8,0.12)',  name:'Nth-buy Pot',          gas:180, desc:'Public counter pays every Nth buyer.' },
  { id:'arbitrage',  Icon:RefreshCw,   color:'#38bdf8', bg:'rgba(56,189,248,0.12)', name:'Arbitrage recapture', gas:200, desc:'Keeps arbitrage value inside the pool.' },
]

export default function BuilderPage() {
  const [selected, setSelected] = useState([])

  const toggle = (id) => setSelected(s =>
    s.includes(id) ? s.filter(x => x !== id) : [...s, id]
  )

  const totalGas = selected.reduce((acc, id) => {
    const b = BLOCKS.find(b => b.id === id)
    return acc + (b?.gas ?? 0)
  }, 0)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Builder</h1>
          <p className={styles.sub}>Compose hook blocks, preview gas cost, then deploy</p>
        </div>
        <button className={styles.deployBtn} disabled={selected.length === 0}>
          <Zap size={14} /> Deploy hook
        </button>
      </div>

      <div className={styles.layout}>
        {/* Block picker */}
        <div className={styles.picker}>
          <div className={styles.pickerTitle}>Available blocks</div>
          <div className={styles.blocksGrid}>
            {BLOCKS.map(b => {
              const active = selected.includes(b.id)
              return (
                <button
                  key={b.id}
                  className={`${styles.block} ${active ? styles.blockActive : ''}`}
                  onClick={() => toggle(b.id)}
                  style={active ? { borderColor: b.color, background: b.bg } : {}}
                >
                  <div className={styles.blockIconWrap} style={{ background: b.bg, border: `1px solid ${b.color}22` }}>
                    <b.Icon size={18} color={b.color} strokeWidth={1.8} />
                  </div>
                  <div className={styles.blockName}>{b.name}</div>
                  <div className={styles.blockDesc}>{b.desc}</div>
                  <div className={styles.blockGas}>~{b.gas}K gas</div>
                  <div className={styles.blockToggle}>
                    {active
                      ? <span className={styles.removeIcon}><X size={14} /></span>
                      : <span className={styles.addIcon}><Plus size={14} /></span>
                    }
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Preview panel */}
        <div className={styles.preview}>
          <div className={styles.previewTitle}>Hook preview</div>

          {selected.length === 0 ? (
            <div className={styles.previewEmpty}>
              Select blocks from the left to compose your hook.
            </div>
          ) : (
            <>
              <div className={styles.previewBlocks}>
                {selected.map(id => {
                  const b = BLOCKS.find(b => b.id === id)
                  if (!b) return null
                  return (
                    <div key={id} className={styles.previewBlock}>
                      <b.Icon size={15} color={b.color} strokeWidth={1.8} />
                      <span>{b.name}</span>
                      <button className={styles.removeBtn} onClick={() => toggle(id)}>
                        <X size={12} />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className={styles.previewStats}>
                <div className={styles.previewStat}>
                  <span className={styles.previewStatLabel}>Blocks</span>
                  <span className={styles.previewStatVal}>{selected.length}</span>
                </div>
                <div className={styles.previewStat}>
                  <span className={styles.previewStatLabel}>Est. gas / swap</span>
                  <span className={styles.previewStatVal}>~{totalGas}K</span>
                </div>
                <div className={styles.previewStat}>
                  <span className={styles.previewStatLabel}>Fixed at pool open</span>
                  <span className={styles.previewStatVal} style={{color:'var(--green)'}}>Yes</span>
                </div>
              </div>

              <div className={styles.previewCost}>
                <div className={styles.costLabel}>Deployment cost</div>
                <div className={styles.costVal}>Free · manual review</div>
              </div>

              <button className={styles.deployBtnFull} onClick={() => alert('Deployment would open here')}>
                <Zap size={15} /> Review &amp; deploy
                <ChevronRight size={15} style={{marginLeft:'auto'}} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
