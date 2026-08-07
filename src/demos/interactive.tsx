import { useCallback, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { Caption, Headline } from './shared'

/** Only truly dynamic values live in the style attribute — as CSS variables. */
type SpotlightVars = CSSProperties & {
  '--fx-x': string
  '--fx-y': string
}

const round = (value: number) => Math.round(value * 100) / 100

export function SpotlightPreview() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 50, y: 50 })

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const bounds = stageRef.current?.getBoundingClientRect()
    if (!bounds) return

    setPosition({
      x: round(((event.clientX - bounds.left) / bounds.width) * 100),
      y: round(((event.clientY - bounds.top) / bounds.height) * 100),
    })
  }, [])

  const vars: SpotlightVars = {
    '--fx-x': `${position.x}%`,
    '--fx-y': `${position.y}%`,
  }

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPosition({ x: 50, y: 50 })}
      className="flex h-full w-full flex-col items-center justify-center"
      style={vars}
    >
      <Headline className="fx-spotlight">SPOTLIGHT</Headline>
      <Caption>Move the pointer</Caption>
    </div>
  )
}

export function WipePreview() {
  return (
    <button
      type="button"
      className="fx-wipe-target flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-400"
    >
      <Headline className="fx-wipe">IGNITE</Headline>
      <Caption>Hover or focus</Caption>
    </button>
  )
}
