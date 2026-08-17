import { useState } from 'react'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

const BOX_MODES = [
  { className: 'fx-box-border', label: 'border-box' },
  { className: 'fx-box-padding', label: 'padding-box' },
  { className: 'fx-box-content', label: 'content-box' },
]

export function GradientBorderPreview() {
  return (
    <div className="fx-gradient-border w-56 px-5 py-4">
      <p className="text-sm font-semibold text-zinc-100">Two backgrounds</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
        Solid fill clipped to the padding box, gradient clipped to the border box.
      </p>
    </div>
  )
}

export function SpinBorderPreview() {
  return (
    <div className="fx-spin-border w-56 px-5 py-4">
      <p className="text-sm font-semibold text-zinc-100">Conic sweep</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
        Same trick, but the border layer is a rotating conic gradient.
      </p>
    </div>
  )
}

export function GlassBorderPreview() {
  return (
    <div className="flex items-center gap-4">
      {[
        { className: 'fx-glass-border', label: 'padding-box' },
        { className: 'fx-glass-border-bleed', label: 'border-box' },
      ].map((mode) => (
        <div key={mode.label} className="flex flex-col items-center gap-2">
          <div className={cn('size-20', mode.className)} />
          <code className="text-[0.6rem] tracking-tight text-zinc-400">
            {mode.label}
          </code>
        </div>
      ))}
    </div>
  )
}

const ANT_MODES = ['per-edge', 'diagonal'] as const

type AntMode = (typeof ANT_MODES)[number]

const ANT_CLASSES: Record<AntMode, string> = {
  'per-edge': 'fx-marching-ants-edges',
  diagonal: 'fx-marching-ants-diagonal',
}

const ANT_NOTES: Record<AntMode, string> = {
  'per-edge': 'four layers, one per side — the dashes go round',
  diagonal: 'one angled layer — it drifts whole, so two sides run backwards',
}

export function MarchingAntsPreview() {
  const [mode, setMode] = useState<AntMode>('per-edge')

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="group"
        aria-label="Dash technique"
        className="flex gap-0.5 rounded-lg border border-white/10 p-0.5"
      >
        {ANT_MODES.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-pressed={mode === value}
            className={cn(
              'cursor-pointer rounded-md px-2.5 py-1 font-mono text-[0.65rem] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400',
              mode === value
                ? 'bg-white/15 text-white'
                : 'text-zinc-400 hover:text-zinc-100',
            )}
          >
            {value}
          </button>
        ))}
      </div>

      <div className={cn('fx-marching-ants h-20 w-56', ANT_CLASSES[mode])} />

      <code className="text-[0.6rem] tracking-tight text-zinc-400">
        {ANT_NOTES[mode]}
      </code>
    </div>
  )
}

const REPEAT_MODES = ['repeat', 'space', 'round'] as const

type RepeatMode = (typeof REPEAT_MODES)[number]

/** Only the switched value lives in the style attribute — as a CSS variable. */
type RepeatVars = CSSProperties & {
  '--fx-repeat': RepeatMode
}

const REPEAT_NOTES: Record<RepeatMode, string> = {
  repeat: 'the box edge slices the last column',
  space: 'same tile, gaps stretched to fit',
  round: 'no gaps, tile stretched instead',
}

export function TileFittingPreview() {
  const [mode, setMode] = useState<RepeatMode>('repeat')
  const vars: RepeatVars = { '--fx-repeat': mode }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="group"
        aria-label="background-repeat"
        className="flex gap-0.5 rounded-lg border border-white/10 p-0.5"
      >
        {REPEAT_MODES.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-pressed={mode === value}
            className={cn(
              'cursor-pointer rounded-md px-2.5 py-1 font-mono text-[0.65rem] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400',
              mode === value
                ? 'bg-white/15 text-white'
                : 'text-zinc-400 hover:text-zinc-100',
            )}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="fx-tile-fitting" style={vars} />

      <code className="text-[0.6rem] tracking-tight text-zinc-400">
        {REPEAT_NOTES[mode]}
      </code>
    </div>
  )
}

export function BoxModelsPreview() {
  return (
    <div className="flex items-end gap-4">
      {BOX_MODES.map((mode) => (
        <div key={mode.label} className="flex flex-col items-center gap-2">
          <div className={cn('fx-box-sample size-16', mode.className)} />
          <code className="text-[0.6rem] tracking-tight text-zinc-400">
            {mode.label}
          </code>
        </div>
      ))}
    </div>
  )
}
