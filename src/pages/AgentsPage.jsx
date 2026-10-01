import { ChevronRight, Download, Copy, Hash, Zap, Layers, RefreshCw } from 'lucide-react'
import styles from './AgentsPage.module.css'

const SKILLS = [
  { Icon:Layers,    name:'read_pool_rules',    desc:'Read all hook blocks and permissions for any pool address. Returns structured JSON.', returns:'JSON skill file', status:'stable' },
  { Icon:Zap,       name:'quote_swap',         desc:'Get a swap quote with hook fee breakdown for a given token pair and amount.', returns:'Quote + fee split', status:'stable' },
  { Icon:RefreshCw, name:'claim_payout',       desc:'Claim pending Nth-buy pot or LP reward payouts for a connected wallet.', returns:'Tx calldata', status:'stable' },
  { Icon:Hash,      name:'open_market',        desc:'Open a new hooked pool for a token pair with specified hook block configuration.', returns:'Deployment packet', status:'beta' },
  { Icon:Download,  name:'list_hook_manifests',desc:'List all published hook manifests on Hookr index with metadata and approval status.', returns:'Manifest array', status:'stable' },
  { Icon:Copy,      name:'sign_launch_packet', desc:'Generate a signed launch packet for a new token with custom hook rules attached.', returns:'Signed packet', status:'beta' },
]

export default function AgentsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Agents</h1>
          <p className={styles.sub}>Machine-readable skill files — any agent can call these to interact with Hookr</p>
        </div>
        <a href="#" className={styles.docsLink}>View agent docs <ChevronRight size={14} /></a>
      </div>

      <div className={styles.intro}>
        <div className={styles.introText}>
          Hookr publishes a set of skill files at <code className={styles.code}>hookr.fun/agents/skills.json</code>.
          Any AI agent (OpenAI GPTs, Anthropic tools, custom agents) can read these skills to quote swaps,
          read pool rules, open markets, or claim payouts — all without a frontend.
        </div>
      </div>

      <div className={styles.sectionLabel}>Available skills</div>
      <div className={styles.skillsList}>
        {SKILLS.map(s => (
          <div key={s.name} className={styles.skillCard}>
            <div className={styles.skillIcon}>
              <s.Icon size={18} color="var(--pink)" strokeWidth={1.5} />
            </div>
            <div className={styles.skillInfo}>
              <div className={styles.skillName}>
                <code>{s.name}</code>
                <span className={`${styles.statusBadge} ${s.status === 'beta' ? styles.statusBeta : styles.statusStable}`}>
                  {s.status}
                </span>
              </div>
              <div className={styles.skillDesc}>{s.desc}</div>
            </div>
            <div className={styles.skillReturns}>
              <span className={styles.returnsLabel}>Returns</span>
              <span className={styles.returnsVal}>{s.returns}</span>
            </div>
            <button className={styles.copyBtn} title="Copy skill name">
              <Copy size={13} />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.sectionLabel} style={{marginTop:32}}>Integration example</div>
      <div className={styles.codeBlock}>
        <pre>{`// OpenAI function call example
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  tools: await fetch("https://hookr.fun/agents/skills.json"),
  messages: [
    { role: "user", content: "Quote a swap of 1 ETH → HOOKR" }
  ]
})`}</pre>
      </div>
    </div>
  )
}
