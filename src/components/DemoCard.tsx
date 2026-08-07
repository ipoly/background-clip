import { useMemo, useState } from 'react'
import { CATEGORY_LABELS, type Demo } from '@/demos'
import { cn } from '@/lib/cn'
import { getEffectCss } from '@/lib/cssSource'
import { CodePanel } from './CodePanel'
import { ChevronIcon } from './icons'

/** Static strings so Tailwind can see every delay it needs to generate. */
const RISE_DELAYS = [
  '[animation-delay:0ms]',
  '[animation-delay:60ms]',
  '[animation-delay:120ms]',
  '[animation-delay:180ms]',
  '[animation-delay:240ms]',
  '[animation-delay:300ms]',
]

interface DemoCardProps {
  demo: Demo
  index: number
}

export function DemoCard({ demo, index }: DemoCardProps) {
  const [open, setOpen] = useState(false)
  const css = useMemo(() => getEffectCss(demo.id), [demo.id])
  const { Preview } = demo

  return (
    <article
      className={cn(
        'animate-rise group flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-sm transition duration-300 hover:border-white/25 hover:bg-white/[0.05]',
        RISE_DELAYS[index % RISE_DELAYS.length],
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-zinc-600">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[0.6rem] text-zinc-400">
          {CATEGORY_LABELS[demo.category]}
        </span>
      </div>

      <div className="demo-stage relative flex h-52 items-center justify-center overflow-hidden rounded-xl border border-white/10 px-4">
        <Preview />
      </div>

      <h2 className="mt-4 text-base font-semibold text-zinc-100">{demo.title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
        {demo.description}
      </p>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {demo.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[0.65rem] text-zinc-400"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
        >
          {open ? 'Hide CSS' : 'Show CSS'}
          <ChevronIcon
            className={cn(
              'size-4 stroke-current stroke-[1.75] transition-transform duration-300',
              open && 'rotate-180',
            )}
          />
        </button>

        {open && <CodePanel code={css} label={`${demo.id}.css`} />}
      </div>
    </article>
  )
}
