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
