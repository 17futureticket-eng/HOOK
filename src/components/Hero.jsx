import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useSearch } from '../context/SearchContext'
import ChainDropdown from './ChainDropdown'
import { RobinhoodIcon } from './ChainIcons'
import styles from './Hero.module.css'

// TAB_CONFIG kept for potential future use but tabs removed from UI for simplicity


/* ─────────────────────────────────────────────────────────────────────
   PCB Circuit Canvas
   Nodes drift slowly along the grid (snapping between intersections).
   L-shaped traces connect them. Everything is pink on dark grid.
───────────────────────────────────────────────────────────────────── */
function CircuitCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const PINK = 'rgba(255,45,120,'
    const GRID = 44
    const NODE_R = 14
    const MOVE_SPEED = 0.18   // grid cells per second
    const CONNECT_DIST = 6    // grid cells max connection distance

    let W = 0, H = 0
    let nodes = []

    /* Each node moves continuously — position in px, velocity in px/s */
    const makeNode = () => ({
      x:     (8 + Math.random() * 12) * GRID,
      y:     (1 + Math.random() * 8)  * GRID,
      vx:    (Math.random() > 0.5 ? 1 : -1) * MOVE_SPEED * GRID,
      vy:    (Math.random() > 0.5 ? 1 : -1) * MOVE_SPEED * GRID,
      phase: Math.random() * Math.PI * 2,
      // each node alternates between horizontal and vertical movement
      axis:  Math.random() > 0.5 ? 'x' : 'y',
      // time until axis switch
      switchIn: 2 + Math.random() * 4,
    })

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      // Re-init nodes with proportional positions (right 55% of canvas)
      nodes = Array.from({ length: 8 }, () => ({
        x:       W * 0.43 + Math.random() * (W * 0.53),
        y:       GRID + Math.random() * (H - GRID * 2),
        vx:      (Math.random() > 0.5 ? 1 : -1) * MOVE_SPEED * GRID,
        vy:      (Math.random() > 0.5 ? 1 : -1) * MOVE_SPEED * GRID,
        phase:   Math.random() * Math.PI * 2,
        axis:    Math.random() > 0.5 ? 'x' : 'y',
        switchIn: 2 + Math.random() * 4,
      }))
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* ── Draw one node ── */
    const drawNode = (x, y, alpha) => {
      const a = (v) => `${PINK}${Math.min(1, v * alpha).toFixed(2)})`

      // soft glow
      const grd = ctx.createRadialGradient(x, y, 0, x, y, NODE_R * 3.5)
      grd.addColorStop(0,   `${PINK}${(0.12 * alpha).toFixed(2)})`)
      grd.addColorStop(1,   `${PINK}0)`)
      ctx.fillStyle = grd
      ctx.beginPath(); ctx.arc(x, y, NODE_R * 3.5, 0, Math.PI * 2); ctx.fill()

      // outer ring
      ctx.strokeStyle = a(0.75)
      ctx.lineWidth   = 1.5
      ctx.beginPath(); ctx.arc(x, y, NODE_R, 0, Math.PI * 2); ctx.stroke()

      // inner ring
      ctx.strokeStyle = a(0.4)
      ctx.lineWidth   = 1
      ctx.beginPath(); ctx.arc(x, y, NODE_R * 0.5, 0, Math.PI * 2); ctx.stroke()

      // center dot
      ctx.fillStyle = a(0.65)
      ctx.beginPath(); ctx.arc(x, y, NODE_R * 0.17, 0, Math.PI * 2); ctx.fill()

      // cardinal ticks
      ctx.strokeStyle = a(0.55)
      ctx.lineWidth   = 1.2
      const tick = NODE_R * 0.45
      ;[[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx, dy]) => {
        ctx.beginPath()
        ctx.moveTo(x + dx * NODE_R,          y + dy * NODE_R)
        ctx.lineTo(x + dx * (NODE_R + tick),  y + dy * (NODE_R + tick))
        ctx.stroke()
      })

      // chip square
      const sq = NODE_R * 0.3
      ctx.strokeStyle = a(0.3)
      ctx.lineWidth   = 0.8
      ctx.strokeRect(x - sq, y - sq, sq * 2, sq * 2)
    }

    let last = 0
    const draw = (ts) => {
      const dt = Math.min((ts - last) / 1000, 0.05) // seconds, capped
      last = ts

      ctx.clearRect(0, 0, W, H)

      /* ── grid ── */
      ctx.strokeStyle = 'rgba(42,42,46,0.55)'
      ctx.lineWidth   = 1
      for (let x = 0; x <= W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y <= H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      const t = ts / 1000

      /* ── update node positions ── */
      nodes.forEach((n) => {
        // move only along current axis
        if (n.axis === 'x') {
          n.x += n.vx * dt
        } else {
          n.y += n.vy * dt
        }

        // bounce off edges — keep nodes in right 50%+ of canvas
        if (n.x < W * 0.42)      { n.x = W * 0.42;         n.vx =  Math.abs(n.vx) }
        if (n.x > W - GRID)      { n.x = W - GRID;          n.vx = -Math.abs(n.vx) }
        if (n.y < GRID * 0.5)    { n.y = GRID * 0.5;        n.vy =  Math.abs(n.vy) }
        if (n.y > H - GRID * 0.5){ n.y = H - GRID * 0.5;   n.vy = -Math.abs(n.vy) }

        // periodically switch axis to create L-shaped movement
        n.switchIn -= dt
        if (n.switchIn <= 0) {
          n.axis    = n.axis === 'x' ? 'y' : 'x'
          n.switchIn = 1.5 + Math.random() * 3.5
          // reverse direction sometimes
          if (Math.random() > 0.5) { n.vx = -n.vx; n.vy = -n.vy }
        }
      })

      /* ── L-shaped traces between nearby nodes ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = Math.abs(a.x - b.x), dy = Math.abs(a.y - b.y)
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > CONNECT_DIST * GRID) continue

          const alpha = (1 - dist / (CONNECT_DIST * GRID)) * 0.4
          ctx.strokeStyle = `${PINK}${alpha.toFixed(2)})`
          ctx.lineWidth   = 1.5
          ctx.lineJoin    = 'round'
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          // L-route: horizontal first
          ctx.lineTo(b.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()

          // small square dot at the corner turn
          const cornerX = b.x, cornerY = a.y
          ctx.fillStyle = `${PINK}${(alpha * 1.4).toFixed(2)})`
          ctx.fillRect(cornerX - 2, cornerY - 2, 4, 4)
        }
      }

      /* ── nodes ── */
      nodes.forEach((n) => {
        const pulse = 0.6 + 0.3 * Math.sin(t * 1.2 + n.phase)
        drawNode(n.x, n.y, pulse)
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

/* ─────────────────────────────────────────────────────────────────────
   Hero — simplified single-address search bar
───────────────────────────────────────────────────────────────────── */
export default function Hero({ onScanAddress }) {
  const { setQuery } = useSearch()
  const [inputVal, setInputVal] = useState('')

  const isAddress = (v) => /^0x[0-9a-fA-F]{10,}/.test(v.trim())

  const handleScan = () => {
    const q = inputVal.trim()
    if (!q) return
    if (isAddress(q) && onScanAddress) {
      onScanAddress(q)   // navigate to HookScan page
    } else {
      setQuery(q)        // fall back to pool filter
      document.getElementById('pools')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.hero}>
      <CircuitCanvas />

      <div className={styles.content}>
        {/* badges */}
        <div className={styles.badges}>
          <span className={styles.badge}>
            <RobinhoodIcon size={16} />
            Live on <strong className={styles.pink}>&nbsp;Robinhood Chain</strong>&nbsp;4663
          </span>
          <span className={styles.badge}>
            <span className={styles.uniIcon}>🦄</span>
            Built on <strong className={styles.pink}>&nbsp;Uniswap</strong>
          </span>
        </div>

        <h1 className={styles.heading}>Hook Launchpad</h1>
        <p className={styles.sub}>
          Modular infrastructure for surfacing, composing and integrating custom Uniswap hooks.
        </p>

        {/* CTA row */}
        <div className={styles.ctaRow}>
          <a
            className={styles.buyBtn}
            href="https://pump.fun"
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.buyDot} />
            Buy $HOOKR
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
          <span className={styles.ctaPrice}>$0.042 <span className={styles.ctaChange}>+12.4%</span></span>
        </div>

        {/* ── Search bar — single address input ── */}
        <div className={styles.searchOuter}>
          <div className={styles.searchWrap}>

            <ChainDropdown />

            <div className={styles.divider} />

            <input
              className={styles.input}
              type="text"
              placeholder="Paste a token address"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              autoComplete="off"
              spellCheck={false}
            />

            <button className={styles.scanBtn} onClick={handleScan}>
              Scan <ArrowRight size={16} strokeWidth={2.5} />
            </button>

          </div>
        </div>

        {/* chips — click fills the input, user must press Scan to navigate */}
        <div className={styles.chips}>
          <button className={styles.chip} onClick={() => setInputVal('0xb3cA1e2d4f6a8b0c2d4e6f8a0b2c4e6f8a0b3cA')}>
            Default root <span>0xb3cA…e8cC</span>
          </button>
          <button className={styles.chip} onClick={() => setInputVal('0xb914168cc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7')}>
            Recapture root <span>0xb914…68CC</span>
          </button>
          <button className={styles.chip} onClick={() => setInputVal('0xe7c3e8cc1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d')}>
            Legacy hook <span>0xe7c3…E8CC</span>
          </button>
          <a className={styles.moreWays} href="#">More ways in ›</a>
        </div>
      </div>
    </div>
  )
}
