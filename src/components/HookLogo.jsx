/**
 * HOOK — pixel 3D retro logo
 * Bolder version: 2px pixel cells, 2px 3D shadow depth, chunky like the reference.
 */
export default function HookLogo({ height = 36 }) {
  const FACE  = '#FF2D9B'
  const MID   = '#C4186E'
  const DARK  = '#7A0049'
  const LIGHT = '#FFB0DC'

  // Letter height = 7 rows. Shadow = 2 units. Total height = 9 units.
  const u      = height / 9
  const SHADOW = 2   // 3D depth in pixel units — was 1, now 2 = much bolder

  // Bolder pixel grids — each letter is 5 cols wide, strokes are 2px thick
  const LETTERS = {
    H: [
      [1,1,0,0,1,1],
      [1,1,0,0,1,1],
      [1,1,0,0,1,1],
      [1,1,1,1,1,1],
      [1,1,1,1,1,1],
      [1,1,0,0,1,1],
      [1,1,0,0,1,1],
    ],
    O: [
      [0,1,1,1,1,0],
      [1,1,0,0,1,1],
      [1,1,0,0,1,1],
      [1,1,0,0,1,1],
      [1,1,0,0,1,1],
      [1,1,0,0,1,1],
      [0,1,1,1,1,0],
    ],
    K: [
      [1,1,0,0,1,1],
      [1,1,0,1,1,0],
      [1,1,1,1,0,0],
      [1,1,1,0,0,0],
      [1,1,1,1,0,0],
      [1,1,0,1,1,0],
      [1,1,0,0,1,1],
    ],
  }

  const sequence = ['H','O','O','K']
  const COL_W   = 6
  const GAP     = 2  // wider gap between letters for boldness

  const totalCols = sequence.length * COL_W + (sequence.length - 1) * GAP + SHADOW
  const totalRows = 7 + SHADOW

  const svgW = totalCols * u
  const svgH = totalRows * u

  const shadows = []
  const faces   = []

  sequence.forEach((letter, li) => {
    const grid = LETTERS[letter]
    const xOff = li * (COL_W + GAP)

    grid.forEach((row, ri) => {
      row.forEach((filled, ci) => {
        if (!filled) return
        const x = (xOff + ci) * u
        const y = ri * u

        // ── shadow (drawn behind) ──
        shadows.push(
          <rect
            key={`s-${li}-${ri}-${ci}`}
            x={x + SHADOW * u} y={y + SHADOW * u}
            width={u + 0.5} height={u + 0.5}
            fill={DARK}
          />
        )
      })
    })
  })

  sequence.forEach((letter, li) => {
    const grid = LETTERS[letter]
    const xOff = li * (COL_W + GAP)

    grid.forEach((row, ri) => {
      row.forEach((filled, ci) => {
        if (!filled) return
        const x = (xOff + ci) * u
        const y = ri * u

        // ── face ──
        faces.push(
          <rect key={`f-${li}-${ri}-${ci}`}
            x={x} y={y} width={u + 0.3} height={u + 0.3}
            fill={FACE}
          />
        )
        // top highlight bar
        faces.push(
          <rect key={`ht-${li}-${ri}-${ci}`}
            x={x} y={y} width={u + 0.3} height={u * 0.28}
            fill={LIGHT} opacity={0.6}
          />
        )
        // left highlight bar
        faces.push(
          <rect key={`hl-${li}-${ri}-${ci}`}
            x={x} y={y} width={u * 0.25} height={u + 0.3}
            fill={LIGHT} opacity={0.45}
          />
        )
        // right shade bar
        faces.push(
          <rect key={`sr-${li}-${ri}-${ci}`}
            x={x + u * 0.76} y={y} width={u * 0.24 + 0.3} height={u + 0.3}
            fill={MID} opacity={0.65}
          />
        )
        // bottom shade bar
        faces.push(
          <rect key={`sb-${li}-${ri}-${ci}`}
            x={x} y={y + u * 0.76} width={u + 0.3} height={u * 0.24 + 0.3}
            fill={MID} opacity={0.65}
          />
        )
      })
    })
  })

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      {shadows}
      {faces}
    </svg>
  )
}
