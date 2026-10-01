import { useState, useEffect } from 'react'
import { Search, ChevronRight, ShieldAlert, TrendingUp, Flame, Droplets, Trophy, RefreshCw } from 'lucide-react'
import { useSearch } from '../context/SearchContext'
import styles from './PoolsTable.module.css'

const TABS = ['Pools', 'Hooks', 'Tokens']

const RULE_ICONS = {
  antisnipe: <ShieldAlert size={15} color="#7c3aed" strokeWidth={1.8} />,
  dynamic:   <TrendingUp  size={15} color="#f97316" strokeWidth={1.8} />,
  burn:      <Flame       size={15} color="#ef4444" strokeWidth={1.8} />,
  rewards:   <Droplets    size={15} color="#22c55e" strokeWidth={1.8} />,
  pot:       <Trophy      size={15} color="#eab308" strokeWidth={1.8} />,
  arbitrage: <RefreshCw   size={15} color="#38bdf8" strokeWidth={1.8} />,
}

/* ── Pool data with FULL addresses + token tickers for real search ── */
const POOLS = [
  {
    pair: ['Ξ', '🔱'],
    name: 'ETH / HOOKR',
    ticker0: 'ETH',  ticker1: 'HOOKR',
    addr:     '0x7b4a21b9c3d8e5f0a2b4c6d8e0f2a4b6c8d0e2f4',
    addrShort:'0x7b4a…21b9',
    hookAddr: '0xb3cA1e2d4f6a8b0c2d4e6f8a0b2c4e6f8a0b3cA',
    rules: ['arbitrage'],
    ruleName: 'Hookr V2 · Arbitrage recapture',
    tvl: '$93.3K', h24: '+15.51%', apr: '116%', h24Type: 'pos',
  },
  {
    pair: ['Ξ', '🪝'],
    name: 'ETH / HOOKERS',
    ticker0: 'ETH', ticker1: 'HOOKERS',
    addr:     '0x3954977ca1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    addrShort:'0x3954…977c',
    hookAddr: '0xb914168cc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7',
    rules: ['burn'],
    ruleName: 'Hookr Legacy',
    tvl: '$8.1K', h24: '+178.5%', apr: '312%', h24Type: 'pos',
  },
  {
    pair: ['Ξ', '🎣'],
    name: 'ETH / RHOOK',
    ticker0: 'ETH', ticker1: 'RHOOK',
    addr:     '0x08d9379ae1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    addrShort:'0x08d9…379a',
    hookAddr: '0xe7c3e8cc1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    rules: ['antisnipe','dynamic','burn','rewards','pot'],
    ruleName: 'Hookr Legacy',
    tvl: '$3.9K', h24: '-8.4%', apr: '61.8%', h24Type: 'neg',
  },
  {
    pair: ['Ξ', '🅜'],
    name: 'ETH / MMR',
    ticker0: 'ETH', ticker1: 'MMR',
    addr:     '0x0205dc1fa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    addrShort:'0x0205…dc1f',
    hookAddr: '0xb3cA1e2d4f6a8b0c2d4e6f8a0b2c4e6f8a0b3cB',
    rules: ['antisnipe'],
    ruleName: 'Hookr V1',
    tvl: '$6.3K', h24: '0%', apr: '—', h24Type: 'neu',
  },
  {
    pair: ['Ξ', '🐕'],
    name: 'ETH / HOOKD',
    ticker0: 'ETH', ticker1: 'HOOKD',
    addr:     '0x04ba8783a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    addrShort:'0x04ba…8783',
    hookAddr: '0xb3cA1e2d4f6a8b0c2d4e6f8a0b2c4e6f8a0b3cC',
    rules: ['antisnipe','dynamic','burn','pot'],
    ruleName: 'Hookr V1',
    tvl: '$7.2K', h24: '0%', apr: '—', h24Type: 'neu',
  },
  {
    pair: ['Ξ', '🪙'],
    name: 'ETH / COIN',
    ticker0: 'ETH', ticker1: 'COIN',
    addr:     '0x0d4f9241a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    addrShort:'0x0d4f…9241',
    hookAddr: '0xb3cA1e2d4f6a8b0c2d4e6f8a0b2c4e6f8a0b3cD',
    rules: ['antisnipe','burn','rewards'],
    ruleName: 'Hookr V2',
    tvl: '$7.4K', h24: '0%', apr: '—', h24Type: 'neu',
  },
  {
    pair: ['Ξ', '🪝'],
    name: 'ETH / HOOK',
    ticker0: 'ETH', ticker1: 'HOOK',
    addr:     '0x0ea98dfba1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    addrShort:'0x0ea9…8dfb',
    hookAddr: '0xb3cA1e2d4f6a8b0c2d4e6f8a0b2c4e6f8a0b3cE',
    rules: ['antisnipe','burn','pot'],
    ruleName: 'Hookr V1',
    tvl: '$15.3K', h24: '0%', apr: '—', h24Type: 'neu',
  },
  {
    pair: ['Ξ', '🦄'],
    name: 'ETH / PONI',
    ticker0: 'ETH', ticker1: 'PONI',
    addr:     '0x128cb43ca1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    addrShort:'0x128c…b43c',
    hookAddr: '0xb3cA1e2d4f6a8b0c2d4e6f8a0b2c4e6f8a0b3cF',
    rules: ['rewards'],
    ruleName: 'Hookr Legacy',
    tvl: '$36', h24: '0%', apr: '—', h24Type: 'neu',
  },
]

/* ── Detect what the user typed ── */
function classify(term) {
  if (!term) return 'empty'
  if (/^0x[0-9a-fA-F]{64}$/.test(term)) return 'txhash'      // 32-byte tx hash
  if (/^0x[0-9a-fA-F]{40}$/.test(term)) return 'address'     // exact 20-byte address
  if (/^0x[0-9a-fA-F]+/.test(term))     return 'address_partial' // partial hex
  return 'text'
}

/* ── Filter logic — searches every meaningful field ── */
function filterPools(pools, term) {
  if (!term) return pools
  const t   = term.toLowerCase().trim()
  const cls = classify(term)

  return pools.filter((p) => {
    // Always search: pool name, both tickers, rule name, hook version
    const textFields = [
      p.name, p.ticker0, p.ticker1, p.ruleName,
    ].join(' ').toLowerCase()

    if (cls === 'address') {
      // Exact 40-char hex: match full pool address or hook address
      return p.addr.toLowerCase() === t || p.hookAddr.toLowerCase() === t
    }

    if (cls === 'address_partial') {
      // Partial hex: match anywhere in pool addr, hook addr, or short addr
      return (
        p.addr.toLowerCase().includes(t) ||
        p.hookAddr.toLowerCase().includes(t) ||
        p.addrShort.toLowerCase().includes(t)
      )
    }

    if (cls === 'txhash') {
      // Tx hashes aren't in pool data — will show friendly message
      return false
    }

    // Plain text: match name, tickers, rule name
    return textFields.includes(t)
  })
}

/* ── Search result summary message ── */
function SearchHint({ term, count }) {
  if (!term) return null
  const cls = classify(term)

  let msg = null
  if (cls === 'txhash') {
    msg = (
      <>
        <strong>{term.slice(0, 10)}…{term.slice(-6)}</strong> looks like a transaction hash.
        Transaction-level lookup requires a block explorer — try{' '}
        <a href={`https://explorer.robinhood.com/tx/${term}`} target="_blank" rel="noreferrer" style={{color:'var(--pink)'}}>
          Robinhood Explorer ↗
        </a>
      </>
    )
  } else if (count === 0 && cls === 'address') {
    msg = (
      <>
        No pool found for address <strong>{term.slice(0,10)}…{term.slice(-6)}</strong>.
        This may be a token contract — try searching by ticker symbol instead.
      </>
    )
  } else if (count === 0) {
    msg = <>No pools match <strong>"{term}"</strong></>
  }

  if (!msg) return null
  return <div className={styles.noResults}>{msg}</div>
}

export default function PoolsTable() {
  const { query } = useSearch()
  const [activeTab,    setActiveTab]    = useState(0)
  const [localFilter,  setLocalFilter]  = useState('')
  const [committed,    setCommitted]    = useState('')  // term user actually searched

  // When hero Scan fires, adopt the query
  useEffect(() => {
    if (query) {
      setLocalFilter(query)
      setCommitted(query)
    }
  }, [query])

  // Live filter as user types in the table's own input
  const searchTerm = localFilter.trim()
  const filtered   = filterPools(POOLS, searchTerm)

  return (
    <section className={styles.section} id="pools">
      <div className={styles.controls}>
        {/* Pools / Hooks / Tokens tabs */}
        <div className={styles.tabGroup}>
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`${styles.ptab} ${activeTab === i ? styles.ptabActive : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filter input */}
        <div className={styles.filterWrap}>
          <Search size={14} color="var(--muted)" className={styles.filterIcon} />
          <input
            className={styles.filterInput}
            type="text"
            placeholder="Search by name, ticker, or 0x address…"
            value={localFilter}
            onChange={(e) => {
              setLocalFilter(e.target.value)
              setCommitted(e.target.value)
            }}
          />
          {localFilter && (
            <button
              className={styles.clearBtn}
              onClick={() => { setLocalFilter(''); setCommitted('') }}
              title="Clear"
            >
              ×
            </button>
          )}
        </div>

        <span className={styles.meta}>
          {searchTerm
            ? `${filtered.length} of ${POOLS.length} pools`
            : `Top ${POOLS.length} of 105 Hookr pools`}
        </span>
        <a className={`section-link ${styles.discoverLink}`} href="#">
          Open full Discover <ChevronRight size={13} />
        </a>
      </div>

      {/* Smart search hint */}
      <SearchHint term={committed} count={filtered.length} />

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pool</th>
              <th>Hook · rules</th>
              <th className={styles.right}>TVL</th>
              <th className={styles.right}>24h</th>
              <th className={styles.right}>Total APR</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.addr} className={styles.row}>
                <td>
                  <div className={styles.poolPair}>
                    <div className={styles.icons}>
                      <span className={styles.pi1}>{p.pair[0]}</span>
                      <span className={styles.pi2}>{p.pair[1]}</span>
                    </div>
                    <div>
                      <div className={styles.poolName}>{p.name}</div>
                      <div className={styles.poolAddr}>{p.addrShort}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.rules}>
                    <div className={styles.ruleIcons}>
                      {p.rules.map((r) => (
                        <span key={r} className={styles.ruleIcon}>{RULE_ICONS[r]}</span>
                      ))}
                    </div>
                    <span className={styles.ruleName}>{p.ruleName}</span>
                  </div>
                </td>
                <td className={`${styles.right} ${styles.tvl}`}>{p.tvl}</td>
                <td className={`${styles.right} ${styles[p.h24Type]}`}>{p.h24}</td>
                <td className={`${styles.right} ${p.apr === '—' ? styles.dash : styles.apr}`}>{p.apr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
