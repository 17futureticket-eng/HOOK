import { useState, useEffect } from 'react'
import { ExternalLink, X, Clock, Zap, Lock } from 'lucide-react'
import HookLogo from './HookLogo'
import styles from './Navbar.module.css'

function ComingSoonModal({ onClose }) {
  // close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* close */}
        <button className={styles.modalClose} onClick={onClose}>
          <X size={18} strokeWidth={2} />
        </button>

        {/* icon */}
        <div className={styles.modalIcon}>
          <Clock size={32} color="var(--pink)" strokeWidth={1.5} />
        </div>

        <h2 className={styles.modalTitle}>Coming Soon</h2>
        <p className={styles.modalSub}>
          The Hookr app is launching on Robinhood Chain.<br />
          Stay tuned for the full on-chain experience.
        </p>

        {/* features */}
        <div className={styles.modalFeatures}>
          <div className={styles.modalFeature}>
            <Zap size={15} color="var(--pink)" strokeWidth={2} />
            <span>Launch tokens with custom hook rules</span>
          </div>
          <div className={styles.modalFeature}>
            <Lock size={15} color="var(--pink)" strokeWidth={2} />
            <span>Compose & deploy hook blocks on-chain</span>
          </div>
          <div className={styles.modalFeature}>
            <ExternalLink size={15} color="var(--pink)" strokeWidth={2} />
            <span>Full pool management &amp; LP interface</span>
          </div>
        </div>

        {/* notify CTA */}
        <div className={styles.modalNotify}>
          <input
            className={styles.modalInput}
            type="email"
            placeholder="Enter your email for early access"
          />
          <button className={styles.modalBtn}>Notify me</button>
        </div>

        <p className={styles.modalFollow}>
          Follow <a href="#" className={styles.pinkLink}>@hookrfun</a> on X for launch updates
        </p>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <nav className={styles.nav}>
        <a href="#" className={styles.logoLink}>
          <HookLogo height={30} />
        </a>
        <div className={styles.links}>
          <a href="#hooks">Hooks</a>
          <a href="#builder">Builder</a>
          <a href="#faq">FAQ</a>
        </div>
        <button className={styles.openApp} onClick={() => setShowModal(true)}>
          Open app
          <ExternalLink size={13} strokeWidth={2} style={{ opacity: 0.6 }} />
        </button>
      </nav>

      {showModal && <ComingSoonModal onClose={() => setShowModal(false)} />}
    </>
  )
}
