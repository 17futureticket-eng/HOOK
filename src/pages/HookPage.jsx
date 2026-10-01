import { useState } from 'react'
import {
  Search, ChevronRight, ShieldAlert, TrendingUp,
  Flame, Droplets, Trophy, RefreshCw, Plus
} from 'lucide-react'
import styles from './HookPage.module.css'

const HOOKS = [
  { name:'Hookr Modular Hook V6',   addr:'0xb3cA…e8cC', version:'V2',     score:91, conf:'High',   verified:true,  rules:['arbitrage','antisnipe','burn'],              pools:51, tvl:'$93.3K' },
  { name:'Hookr Legacy Root',       addr:'0xe7c3…E8CC', version:'Legacy',  score:72, conf:'Medium', verified:true,  rules:['burn'],                                      pools:18, tvl:'$12.1K' },
  { name:'Anti-Snipe Module',       addr:'0x3a1f…9dB3', version:'V1',      score:84, conf:'High',   verified:true,  rules:['antisnipe'],                                 pools:8,  tvl:'$6.3K'  },
  { name:'Dynamic Fee Hook',        addr:'0x8c2d…4e7a', version:'V2',      score:78, conf:'Medium', verified:false, rules:['dynamic'],                                   pools:5,  tvl:'$4.1K'  },
  { name:'LP Rewards Distributor',  addr:'0x5f3b…1c8d', version:'V1',      score:65, conf:'Medium', verified:true,  rules:['rewards'],                                   pools:3,  tvl:'$2.8K'  },
  { name:'Nth-Buy Pot Hook',        addr:'0x9e4c…2d6f', version:'V1',      score:70, conf:'Medium', verified:false, rules:['pot'],                                       pools:4,  tvl:'$1.9K'  },
  { name:'Recapture Root V2',       addr:'0xb914…68CC', version:'V2',      score:88, conf:'High',   verified:true,  rules:['arbitrage','antisnipe'],                     pools:22, tvl:'$44.7K' },
  { name:'Full Suite Hook',         addr:'0x2a7e…5b9c', version:'V2',      score:95, conf:'High',   verified:true,  rules:['antisnipe','dynamic','burn','rewards','pot'], pools:12, tvl:'$28.5K' },
]

const RULE_ICONS = {
  antisnipe: <ShieldAlert size={13} color="#a78bfa" strokeWidth={1.8} />,
  dynamic:   <TrendingUp  size={13} color="#fb923c" strokeWidth={1.8} />,
  burn:      <Flame       size={13} color="#f87171" strokeWidth={1.8} />,
  rewards:   <Droplets    size={13} color="#34d399" strokeWidth={1.8} />,
  pot:       <Trophy      size={13} color="#fbbf24" strokeWidth={1.8} />,
  arbitrage: <RefreshCw   size={13} color="#38bdf8" strokeWidth={1.8} />,
}

const scoreColor = (s) => s >= 85 ? '#34d399' : s >= 70 ? '#fbbf24' : '#f87171'

export default function HookPage({ onScanAddress }) {
  const [filter, setFilter] = useState('')
  const [vFilter, setVFilter] = useState('All')

  const filtered = HOOKS.filter(h => {
    const matchText = h.name.toLowerCase().includes(filter.toLowerCase()) ||
                      h.addr.toLowerCase().includes(filter.toLowerCase())
    const matchV = vFilter === 'All' || h.version === vFilter
    return matchText && matchV
  })

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Hooks</h1>
          <p className={styles.sub}>Browse all published hooks on Robinhood Chain</p>
        </div>
        <button className={styles.publishBtn}>
          <Plus size={14} strokeWidth={2.5} /> Publish a hook
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <Search size={14} color="var(--muted)" />
          <input className={styles.searchInput} placeholder="Search hooks…"
            value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
        <div className={styles.versionTabs}>
          {['All','V2','V1','Legacy'].map(v => (
            <button key={v}
              className={`${styles.vTab} ${vFilter === v ? styles.vTabActive : ''}`}
              onClick={() => setVFilter(v)}>{v}</button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map(h => (
          <button key={h.addr} className={styles.card}
            onClick={() => onScanAddress?.(h.addr.replace('…','0000000000'))}>
            <div className={styles.cardTop}>
              <div className={styles.cardName}>{h.name}</div>
              <div className={styles.cardScore} style={{ color: scoreColor(h.score) }}>
                {h.score}<span style={{color:'var(--muted)',fontSize:'11px'}}>/100</span>
              </div>
            </div>

            <div className={styles.cardAddr}>{h.addr}</div>

            <div className={styles.cardBadges}>
              {h.verified && <span className={styles.verified}>✓ Verified</span>}
              <span className={`${styles.conf} ${h.conf === 'High' ? styles.confHigh : styles.confMed}`}>
                ● {h.conf} confidence
              </span>
              <span className={styles.version}>{h.version}</span>
            </div>

            <div className={styles.cardRules}>
              {h.rules.map(r => <span key={r} className={styles.ruleIcon}>{RULE_ICONS[r]}</span>)}
            </div>

            <div className={styles.cardStats}>
              <span>{h.pools} pools</span>
              <span>{h.tvl} TVL</span>
              <ChevronRight size={14} color="var(--muted)" style={{marginLeft:'auto'}} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
