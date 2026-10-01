/* ─────────────────────────────────────────────────────────────────────
   Inline SVG chain icons — pixel-accurate brand colors, no external deps
───────────────────────────────────────────────────────────────────── */

export function RobinhoodIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#C8F400" />
      {/* Robinhood feather — black, matches the official logo */}
      <path
        d="M20.5 5.5
           C18.2 4.2 15.2 4.8 13.2 6.8
           L8.5 13.5
           L11.5 13.5
           L7.5 20.5
           L10.8 20.5
           L8.0 26.5
           L12.5 26.5
           L15.5 20.5
           L18.5 20.5
           L14.5 13.5
           L17.5 13.5
           L22.5 8.0
           C23.5 6.8 22.5 6.0 20.5 5.5Z"
        fill="#1A1A1A"
      />
      {/* slash mark across feather */}
      <line x1="13" y1="18" x2="17" y2="10" stroke="#C8F400" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

export function EthereumIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <path d="M16 5v8.87l7.5 3.35L16 5z"        fill="#fff" fillOpacity="0.6" />
      <path d="M16 5L8.5 17.22l7.5-3.35V5z"       fill="#fff" />
      <path d="M16 21.97v5.02l7.5-10.37L16 21.97z" fill="#fff" fillOpacity="0.6" />
      <path d="M16 26.99v-5.02l-7.5-5.35L16 26.99z" fill="#fff" />
      <path d="M16 20.57l7.5-4.35-7.5-3.35v7.7z"  fill="#fff" fillOpacity="0.2" />
      <path d="M8.5 16.22l7.5 4.35v-7.7l-7.5 3.35z" fill="#fff" fillOpacity="0.6" />
    </svg>
  )
}

export function BaseIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0052FF" />
      {/* Base "b" circle shape */}
      <circle cx="16" cy="16" r="7.5" fill="#0052FF" stroke="#fff" strokeWidth="3" />
      <circle cx="16" cy="16" r="3.5" fill="#fff" />
    </svg>
  )
}

export function UnichainIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FC72FF" />
      {/* Uniswap unicorn horn simplified */}
      <path
        d="M16 6 L20 14 L24 10 L20 22 L16 26 L12 22 L8 10 L12 14 Z"
        fill="#fff"
        fillOpacity="0.9"
      />
      <circle cx="16" cy="17" r="3.5" fill="#FC72FF" />
    </svg>
  )
}

export function ArbitrumIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#213147" />
      {/* Arbitrum stylized "A" */}
      <path
        d="M16 7l-7.5 13h4l1.5-2.6h4l1.5 2.6h4L16 7zm0 5.6l1.6 2.8h-3.2L16 12.6z"
        fill="#28A0F0"
      />
      <path d="M7 22l1.5-2.6 2.5 4.3H7V22z" fill="#28A0F0" fillOpacity="0.6" />
      <path d="M25 22v1.7h-4l2.5-4.3L25 22z"   fill="#28A0F0" fillOpacity="0.6" />
    </svg>
  )
}

export function OptimismIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF0420" />
      {/* OP circle mark */}
      <text
        x="16" y="21"
        textAnchor="middle"
        fontFamily="Arial Black, sans-serif"
        fontWeight="900"
        fontSize="13"
        fill="#fff"
        letterSpacing="-0.5"
      >OP</text>
    </svg>
  )
}
