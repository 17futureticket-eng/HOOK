import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import styles from './FAQ.module.css'

const QUESTIONS = [
  {
    q: 'What is Hookr.fun?',
    a: 'Hookr.fun is a modular infrastructure platform for surfacing, composing, and integrating custom Uniswap v4 hooks on Robinhood Chain. It lets launchers, LPs, traders, and developers interact with hook-enabled pools through a unified interface.',
  },
  {
    q: 'What rules can a pool run today?',
    a: 'Pools can currently run Anti-Snipe, Dynamic Fees, Auto Burn, LP Rewards, Nth-buy Pot, and Arbitrage Recapture. These composable hook blocks can be combined when deploying a new pool.',
  },
  {
    q: 'Is the Nth-buy Pot random?',
    a: 'No — it is deterministic. A public counter increments on every buy, and when it hits the configured N, the pot pays out to that buyer. The counter and target N are readable onchain at any time.',
  },
  {
    q: 'Where do Hookr tokens trade?',
    a: "$HOOKR trades on Uniswap v4 pools on Robinhood Chain, as well as through partner venues like Fomo and What The Hook that integrate with Hookr's default root.",
  },
  {
    q: 'Can I attach a hook to a token that already trades?',
    a: 'Yes. You can open a new pool for an existing asset with hook rules applied. Tokenized stock pairs are also supported; they come with their own pause registry.',
  },
  {
    q: 'Can a pool hold a tokenized stock?',
    a: 'Yes. Tokenized stocks are supported as pool assets. They bring their own pause registry that can halt the pool when required.',
  },
  {
    q: 'What is the official Hookr X (Twitter) account?',
    a: 'The official Hookr X account is @hookrfun. Follow it for launch announcements, integration updates, and community highlights.',
  },
  {
    q: 'What is the $HOOKR contract address?',
    a: 'The $HOOKR contract address is available via the root hook contract link in the footer. Always verify the address through official Hookr channels before interacting.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section className={styles.section} id="faq">
      <h2 className={styles.heading}>Questions</h2>
      <div className={styles.list}>
        {QUESTIONS.map((item, i) => (
          <div key={i} className={`${styles.item} ${open === i ? styles.open : ''}`}>
            <button className={styles.question} onClick={() => toggle(i)}>
              <span className={styles.icon}>
                {open === i
                  ? <X size={14} strokeWidth={2.5} />
                  : <Plus size={14} strokeWidth={2.5} />
                }
              </span>
              {item.q}
            </button>
            <div className={styles.answer}>
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
