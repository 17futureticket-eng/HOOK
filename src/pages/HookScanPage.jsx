import { useState } from 'react'
import {
  ArrowLeft, Copy, Share2, Check, ChevronRight,
  Search, Layers, Box, Zap, Users, BookOpen, FileText, Tag,
  AlertTriangle, Info, GitFork, Bookmark, Download, RefreshCw,
  Globe, Hash, Wallet, Shield,
  Percent, ArrowLeftRight, Flame, Gift, Shuffle, Database,
  Building2, Lock, Droplets, Clock, Award, ArrowUpRight,
  Activity, FunctionSquare, ExternalLink, Cpu, Unplug, Settings2,
} from 'lucide-react'
import HookLogo from '../components/HookLogo'
import HookLifecycle from '../components/hookscan/HookLifecycle'
import DonutChart from '../components/hookscan/DonutChart'
import CallbackGraph from '../components/hookscan/CallbackGraph'
import styles from './HookScanPage.module.css'

/* ── Static mock data for the scanned hook ── */
const HOOK = {
  name:        'HookrModularHookV6',
  subtitle:    'Uniswap v4 hook',
  address:     '0xb3cA1e2d4f6a8b0c2d4e6f8a0b2c4e6f8a0b3cA',
  addressShort:'0xb3cA…e8cC',
  score:       79,
  scoreLabel:  'Good',
  permsEnabled: 6,
  permsTotal:   14,
  verified:    true,
  confidence:  'High confidence',
  uniswap:     true,
}

const BEHAVIORS = [
  { id:'dynfee',    Icon:Percent,         label:'Dynamic LP fees',                active: true  },
  { id:'swdelta',   Icon:ArrowLeftRight,  label:'Swap delta accounting',          active: false },
  { id:'burns',     Icon:Flame,           label:'Token burns',                    active: false },
  { id:'lprewards', Icon:Gift,            label:'LP rewards',                     active: false },
  { id:'random',    Icon:Shuffle,         label:'Randomness dependency',          active: false },
  { id:'hookdata',  Icon:Database,        label:'Custom hook data',               active: false },
  { id:'poolmgr',   Icon:Building2,       label:'PoolManager settlement',         active: false },
  { id:'tradeguard',Icon:Lock,            label:'Trade guards',                   active: false },
  { id:'liquidity', Icon:Droplets,        label:'Liquidity controls',             active: false },
  { id:'scheduled', Icon:Clock,           label:'Scheduled payouts',              active: false },
  { id:'reward',    Icon:Award,           label:'Reward distribution',            active: false },
  { id:'revenue',   Icon:ArrowUpRight,    label:'Revenue routing',               active: false },
  { id:'poolstate', Icon:Activity,        label:'Pool-state reads',               active: false },
  { id:'math',      Icon:FunctionSquare,  label:'Custom math or curve logic',     active: false },
  { id:'extliq',    Icon:ExternalLink,    label:'External liquidity integration', active: false },
  { id:'extprot',   Icon:Unplug,          label:'External protocol dependency',   active: false },
  { id:'autoparam', Icon:Settings2,       label:'Autonomous parameter updates',   active: false },
]

const SIGNALS = [
  { sev:'Low',  Icon:AlertTriangle, label:'Unchecked arithmetic block',              color:'#eab308' },
  { sev:'Info', Icon:Info,          label:'Block time or height influences behavior', color:'rgba(255,255,255,0.4)' },
  { sev:'Info', Icon:Info,          label:'Privileged state-changing controls',       color:'rgba(255,255,255,0.4)' },
]

const EVIDENCE = [
  { label:'Bytecode',    done:true  },
  { label:'Balance',     done:true  },
  { label:'Deployment',  done:true  },
  { label:'Sourcify',    done:true  },
  { label:'Hookr index', done:false },
]

const MORE = [
  { Icon:RefreshCw,     label:'Score details',        meta:'79/100 · Good'                   },
  { Icon:AlertTriangle, label:'What could go wrong',  meta:'5 scenarios'                     },
  { Icon:Layers,        label:'Pools',                meta:''                                },
  { Icon:Zap,           label:'Activity',             meta:'51 listed pools · 0 trades in 24h'},
  { Icon:Tag,           label:'List this hook',       meta:'Free · manual review'            },
  { Icon:GitFork,       label:'Fork',                 meta:'5 compatible blocks'             },
  { Icon:Bookmark,      label:'Field journal',        meta:'Not saved'                       },
]

const NAV = [
  { Icon:Search,    label:'Search'       },
  { Icon:Layers,    label:'Discover'     },
  { Icon:Box,       label:'Hook'         },
  { Icon:Zap,       label:'Builder'      },
  { Icon:Shield,    label:'HookrScan', active:true },
  { Icon:Users,     label:'Integrations', badge:'NEW' },
  { Icon:Hash,      label:'Agents',       badge:'NEW' },
]

const LEARN_NAV = [
  { Icon:BookOpen,  label:'Learn' },
  { Icon:FileText,  label:'Docs'  },
  { Icon:Layers,    label:'Hookrs'},
]

/* ── Copy-to-clipboard mini hook ── */
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button className={styles.copyBtn} onClick={copy} title="Copy address">
      {copied ? <Check size={13} color="var(--green)" /> : <Copy size={13} />}
    </button>
  )
}

/* ── Main page — no internal sidebar, AppShell provides it ── */
export default function HookScanPage({ address = HOOK.address, onBack, onScanAddress }) {
  const [activeBehavior, setActiveBehavior] = useState('dynfee')
  const [scanInput, setScanInput] = useState(address || '')
  const active = BEHAVIORS.find(b => b.id === activeBehavior)
  const shortAddr = (scanInput || address).length > 14
    ? `${(scanInput || address).slice(0,6)}…${(scanInput || address).slice(-4)}`
    : (scanInput || address)

  const handleRescan = () => {
    const q = scanInput.trim()
    if (q && onScanAddress) onScanAddress(q)
  }

  return (
    <div className={styles.page}>

      {/* ── Top scan bar ── */}
      <div className={styles.scanBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className={styles.scanBarInner}>
          <div className={styles.scanTabs}>
            <button className={`${styles.scanTab} ${styles.scanTabActive}`}>Address</button>
            <button className={styles.scanTab}>Token / pool</button>
            <button className={styles.scanTab}>Source</button>
          </div>
          <span className={styles.scanChain}>Robinhood Chain ▾</span>
          <input
            className={styles.scanAddrInput}
            value={scanInput}
            onChange={e => setScanInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRescan()}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <button className={styles.scanBtn} onClick={handleRescan}>Scan →</button>
        <div className={styles.scanBarLinks}>
          <a href="#" className={styles.scanLink}>How hooks work</a>
          <a href="#" className={`${styles.scanLink} ${styles.scanLinkPink}`}>Example ›</a>
        </div>
      </div>

      <div className={styles.content}>

          {/* ── Hero section ── */}
          <section className={styles.heroSection}>
            <div className={styles.heroLeft}>
              {/* score */}
              <div className={styles.score}>
                <span className={styles.scoreNum}>{HOOK.score}</span>
                <span className={styles.scoreTotal}>/100</span>
              </div>
              <div className={styles.scoreLabel}>
                Hook Score <span className={styles.scoreBadge}>● {HOOK.scoreLabel}</span>
                <ChevronRight size={13} />
              </div>
            </div>

            <div className={styles.heroCenter}>
              <div className={styles.hookSubtitle}>{HOOK.subtitle}</div>
              <h1 className={styles.hookName}>{HOOK.name}</h1>

              {/* status badges */}
              <div className={styles.hookBadges}>
                <span className={styles.badgeGreen}>
                  <Check size={12} strokeWidth={2.5} /> Verified
                </span>
                <span className={styles.badgePink}>
                  ● {HOOK.confidence}
                </span>
                <span className={styles.badgeAddr}>
                  {shortAddr}
                  <CopyBtn text={address} />
                </span>
                <span className={styles.badgeGreen}>
                  <Check size={12} strokeWidth={2.5} /> Uniswap routing
                </span>
                <button className={styles.shareBtn}>
                  <Share2 size={13} /> Share
                </button>
              </div>

              {/* lifecycle diagram */}
              <HookLifecycle />
            </div>

            <div className={styles.heroRight}>
              <div className={styles.score}>
                <span className={styles.scoreNum}>{HOOK.permsEnabled}</span>
                <span className={styles.scoreTotal}>/{HOOK.permsTotal}</span>
              </div>
              <div className={styles.scoreLabel}>Permissions enabled</div>
            </div>
          </section>

          {/* ── Behavior section ── */}
          <section className={styles.card}>
            <div className={styles.behaviorHeader}>
              <DonutChart total={17} high={7} medium={10} />

              <div className={styles.behaviorGrid}>
                {BEHAVIORS.map(b => (
                  <button
                    key={b.id}
                    className={`${styles.behaviorCard} ${activeBehavior === b.id ? styles.behaviorCardActive : ''}`}
                    onClick={() => setActiveBehavior(b.id)}
                  >
                    <span className={styles.behaviorIcon}>{b.icon}</span>
                    <span className={styles.behaviorLabel}>{b.label}</span>
                    <span className={`${styles.behaviorDot} ${b.active ? styles.behaviorDotPink : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            {active && (
              <div className={styles.behaviorDesc}>
                <span className={styles.behaviorDescIcon}>{active.icon}</span>
                Contains logic that updates or overrides the pool's LP fee around swaps.
                <a href="#" className={styles.evidenceLink}>Evidence ›</a>
              </div>
            )}
          </section>

          {/* ── Signals + Callback graph ── */}
          <div className={styles.twoCol}>
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Signals</h3>
              <div className={styles.signalsList}>
                {SIGNALS.map((s, i) => (
                  <div key={i} className={styles.signalRow}>
                    <s.Icon size={15} color={s.color} />
                    <span className={styles.signalLabel}>{s.label}</span>
                    <span
                      className={styles.signalSev}
                      style={{ color: s.sev === 'Low' ? '#eab308' : 'rgba(255,255,255,0.4)' }}
                    >{s.sev}</span>
                    <ChevronRight size={13} color="var(--muted)" />
                  </div>
                ))}
              </div>
            </section>

            <CallbackGraph />
          </div>

          {/* ── Runtime + Source ── */}
          <div className={styles.twoCol}>
            <section className={styles.card}>
              <div className={styles.runtimeLabel}>Runtime</div>
              <div className={styles.runtimeValue}>12,194 <span className={styles.runtimeUnit}>bytes</span></div>
              <div className={styles.runtimeBar}>
                <div className={styles.runtimeFill} style={{ width: '12.4%' }} />
                <div className={styles.runtimeMarker} />
              </div>
              <div className={styles.runtimeMeta}>
                <span>EIP-170</span>
                <span>12.4% of 98,304 max</span>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.sourceHeader}>
                <span className={styles.runtimeLabel}>Source</span>
                <span className={styles.badgeGreen}><Check size={11} /> Verified</span>
              </div>
              <div className={styles.sourceValue}>22 <span className={styles.runtimeUnit}>files ›</span></div>
              <div className={styles.sourceFiles}>
                {Array.from({ length: 22 }).map((_, i) => (
                  <span key={i} className={styles.sourceFile} />
                ))}
              </div>
            </section>
          </div>

          {/* ── Chain info cards ── */}
          <div className={styles.fourCol}>
            {[
              { Icon: Globe,  label:'Network', value:'Robinhood Chain' },
              { Icon: Hash,   label:'Block',   value:'77,051,751'      },
              { Icon: Wallet, label:'Balance',  value:'0 ETH'          },
              { Icon: Shield, label:'Proxy',    value:'Not detected'   },
            ].map(c => (
              <section key={c.label} className={styles.card}>
                <div className={styles.infoCardIcon}><c.Icon size={18} color="var(--muted)" strokeWidth={1.5} /></div>
                <div className={styles.infoCardLabel}>{c.label}</div>
                <div className={styles.infoCardValue}>{c.value}</div>
              </section>
            ))}
          </div>

          {/* ── Evidence pipeline ── */}
          <section className={styles.card}>
            <div className={styles.evidenceHeader}>
              <span className={styles.cardTitle}>Evidence</span>
              <span className={styles.evidenceScore}>4/5</span>
            </div>
            <div className={styles.evidencePipeline}>
              {EVIDENCE.map((e, i) => (
                <div key={e.label} className={styles.evidenceStep}>
                  <div className={`${styles.evidenceNode} ${e.done ? styles.evidenceNodeDone : styles.evidenceNodePending}`}>
                    {e.done
                      ? <Check size={14} strokeWidth={2.5} color="#fff" />
                      : <span className={styles.evidenceMinus}>−</span>
                    }
                  </div>
                  <span className={styles.evidenceLabel}>{e.label}</span>
                  {i < EVIDENCE.length - 1 && (
                    <div className={`${styles.evidenceLine} ${e.done ? styles.evidenceLineDone : ''}`} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── More about this hook ── */}
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>More about this hook</h3>
            <div className={styles.moreList}>
              {MORE.map((m, i) => (
                <button key={i} className={styles.moreRow}>
                  <m.Icon size={16} color="var(--muted)" strokeWidth={1.5} />
                  <span className={styles.moreLabel}>{m.label}</span>
                  {m.meta && <span className={styles.moreMeta}>{m.meta}</span>}
                  <ChevronRight size={14} color="var(--muted)" />
                </button>
              ))}
            </div>
          </section>

          {/* ── Footer ── */}
          <div className={styles.scanFooter}>
            <span>Automated screening, not an audit.</span>
            <a href="#" className={styles.footerLink} style={{ color:'var(--red)' }}>Limits ›</a>
            <span className={styles.footerDivider}>|</span>
            <button className={styles.footerBtn}>
              <Download size={13} /> Download JSON
            </button>
            <button className={styles.footerBtn}>
              <RefreshCw size={13} /> New analysis
            </button>
          </div>

          {/* ── Recent activity ── */}
          <section className={styles.card}>
            <div className={styles.recentHeader}>
              <span className={styles.cardTitle}>Recent activity across Hookr</span>
              <a href="#" className={styles.evidenceLink}>Latest 20 <ChevronRight size={13} /></a>
            </div>
            <div className={styles.recentEmpty}>
              No recent activity to display.
            </div>
          </section>

        </div>
    </div>
  )
}
