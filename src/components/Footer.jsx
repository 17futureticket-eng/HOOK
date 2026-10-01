import styles from './Footer.module.css'

const LINKS = [
  'root hook contract',
  'how it works',
  'learn',
  '$HOOKR token',
  'activity',
  'Hooks',
  'open app',
  'methodology',
  'privacy',
  'terms',
  '@hookrfun on X',
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.main}>
        Hookr.fun · Uniswap v4 hooks on Robinhood Chain · not financial advice
      </p>
      <div className={styles.links}>
        {LINKS.map((l) => (
          <a key={l} href="#">{l}</a>
        ))}
      </div>
    </footer>
  )
}
