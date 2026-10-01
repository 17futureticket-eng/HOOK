import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import {
  RobinhoodIcon,
  EthereumIcon,
  BaseIcon,
  UnichainIcon,
  ArbitrumIcon,
  OptimismIcon,
} from './ChainIcons'
import styles from './ChainDropdown.module.css'

export const CHAINS = [
  { id: 'robinhood', label: 'Robinhood Chain', Icon: RobinhoodIcon, color: '#C8F400', live: true },
  { id: 'base',      label: 'Base',            Icon: BaseIcon,      color: '#0052FF', live: false },
  { id: 'unichain',  label: 'Unichain',        Icon: UnichainIcon,  color: '#FC72FF', live: false },
  { id: 'ethereum',  label: 'Ethereum',        Icon: EthereumIcon,  color: '#627EEA', live: false },
  { id: 'arbitrum',  label: 'Arbitrum One',    Icon: ArbitrumIcon,  color: '#28A0F0', live: false },
  { id: 'optimism',  label: 'OP Mainnet',      Icon: OptimismIcon,  color: '#FF0420', live: false },
]

export default function ChainDropdown() {
  const [selected, setSelected] = useState(CHAINS[0])
  const [open, setOpen]         = useState(false)
  const ref = useRef(null)

  // close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const pick = (chain) => { setSelected(chain); setOpen(false) }

  return (
    <div className={styles.wrap} ref={ref}>
      {/* trigger */}
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <selected.Icon size={18} />
        <span className={styles.triggerLabel}>{selected.label.split(' ')[0]}</span>
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
        />
      </button>

      {/* dropdown */}
      {open && (
        <div className={styles.dropdown}>
          {CHAINS.map((chain) => (
            <button
              key={chain.id}
              className={`${styles.option} ${selected.id === chain.id ? styles.optionActive : ''}`}
              onClick={() => pick(chain)}
              type="button"
            >
              <chain.Icon size={20} />
              <span className={styles.optionLabel}>{chain.label}</span>
              {!chain.live && (
                <span className={styles.soon}>soon</span>
              )}
              {selected.id === chain.id && (
                <Check size={13} strokeWidth={2.5} className={styles.check} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
