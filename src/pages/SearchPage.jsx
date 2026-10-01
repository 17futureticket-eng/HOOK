import { useState } from 'react'
import { Search, ArrowRight, ExternalLink, RefreshCw, ShieldAlert, Flame, Droplets } from 'lucide-react'
import styles from './SearchPage.module.css'

const RECENT = [
  { type: 'address', label: '0xb3cA…e8cC', sub: 'Default root hook' },
  { type: 'pool',    label: 'ETH / HOOKR',  sub: '$93.3K TVL · 116% APR' },
  { type: 'address', label: '0xe7c3…E8CC', sub: 'Legacy hook' },
]

const ALL_RESULTS = [
  { type:'hook',  icon:'♻️', name:'Hookr V2 · Arbitrage recapture', addr:'0xb3cA…e8cC', score:91, tags:['Verified','High confidence'] },
  { type:'hook',  icon:'🛡', name:'Anti-Snipe Module',               addr:'0x3a1f…9dB3', score:84, tags:['Verified'] },
  { type:'pool',  icon:'🔱', name:'ETH / HOOKR',                    addr:'0x7b4a…21b9', tvl:'$93.3K', apr:'116%' },
  { type:'pool',  icon:'🪝', name:'ETH / HOOKERS',                  addr:'0x3954…977c', tvl:'$8.1K',  apr:'312%' },
  { type:'token', icon:'🪙', name:'HOOKR',                          addr:'0x1a2b…3c4d', price:'$0.042', change:'+12.4%' },
]

function classify(q) {
  if (!q) return null
  if (/^0x[0-9a-fA-F]{10,}/.test(q)) return 'address'
  return 'text'
}

export default function SearchPage({ onScanAddress }) {
  const [q, setQ] = useState('')
  const cls = classify(q)

  const results = q.length > 1
    ? ALL_RESULTS.filter(r =>
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.addr?.toLowerCase().includes(q.toLowerCase())
      )
    : []

  const handleKey = (e) => {
    if (e.key === 'Enter' && cls === 'address') onScanAddress?.(q.trim())
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Search</h1>
        <p className={styles.sub}>Look up any hook address, token, or pool on Robinhood Chain</p>

        {/* Search input */}
        <div className={styles.inputWrap}>
          <Search size={18} color="var(--muted)" className={styles.inputIcon} />
          <input
            className={styles.input}
            autoFocus
            placeholder="Hook address, token name, or pool…"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={handleKey}
          />
          {cls === 'address' && (
            <button className={styles.scanBtn} onClick={() => onScanAddress?.(q.trim())}>
              Scan address <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* Recent searches */}
        {!q && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Recent</div>
            {RECENT.map((r, i) => (
              <button key={i} className={styles.recentRow}
                onClick={() => setQ(r.label)}>
                <span className={styles.recentIcon}>
                  {r.type === 'address' ? '📍' : '🌊'}
                </span>
                <div>
                  <div className={styles.recentLabel}>{r.label}</div>
                  <div className={styles.recentSub}>{r.sub}</div>
                </div>
                <ArrowRight size={14} color="var(--muted)" style={{marginLeft:'auto'}}/>
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{results.length} results</div>
            {results.map((r, i) => (
              <button key={i} className={styles.resultRow}
                onClick={() => r.type !== 'pool' && onScanAddress?.(r.addr)}>
                <span className={styles.resultIcon}>{r.icon}</span>
                <div className={styles.resultInfo}>
                  <div className={styles.resultName}>{r.name}</div>
                  <div className={styles.resultAddr}>{r.addr}</div>
                </div>
                <div className={styles.resultMeta}>
                  {r.score && <span className={styles.scorePill}>{r.score}/100</span>}
                  {r.tvl   && <span className={styles.metaVal}>{r.tvl} TVL</span>}
                  {r.apr   && <span className={styles.aprVal}>{r.apr} APR</span>}
                  {r.price && <span className={styles.metaVal}>{r.price}</span>}
                  {r.change && <span className={styles.changePos}>{r.change}</span>}
                </div>
                <ArrowRight size={14} color="var(--muted)" />
              </button>
            ))}
          </div>
        )}

        {q && results.length === 0 && cls !== 'address' && (
          <div className={styles.empty}>No results for <strong>"{q}"</strong></div>
        )}
      </div>
    </div>
  )
}
