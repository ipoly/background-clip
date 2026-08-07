import { useMemo, useState } from 'react'
import { DemoCard } from '@/components/DemoCard'
import { FilterBar, type Filter } from '@/components/FilterBar'
import { Hero } from '@/components/Hero'
import { CATEGORIES, CATEGORY_LABELS, demos } from '@/demos'

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Everything' },
  ...CATEGORIES.map((category) => ({
    value: category as Filter,
    label: CATEGORY_LABELS[category],
  })),
]

function countByFilter(): Record<Filter, number> {
  const counts = { all: demos.length } as Record<Filter, number>

  for (const category of CATEGORIES) {
    counts[category] = demos.filter((demo) => demo.category === category).length
  }

  return counts
}

export default function App() {
  const [filter, setFilter] = useState<Filter>('all')
  const counts = useMemo(countByFilter, [])

  const visible = useMemo(
    () =>
      filter === 'all' ? demos : demos.filter((demo) => demo.category === filter),
    [filter],
  )

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="page-glow pointer-events-none fixed inset-0 -z-10"
      />

      <Hero demoCount={demos.length} />

      <main className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="sticky top-0 z-10 -mx-6 mb-8 border-b border-white/5 bg-ink/80 px-6 py-4 backdrop-blur-xl">
          <FilterBar
            options={FILTER_OPTIONS}
            value={filter}
            counts={counts}
            onChange={setFilter}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((demo, index) => (
            <DemoCard key={demo.id} demo={demo} index={index} />
          ))}
        </div>
      </main>

      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-xs leading-relaxed text-zinc-500">
          <p>
            <code className="font-mono text-zinc-400">background-clip: text</code>{' '}
            still wants the{' '}
            <code className="font-mono text-zinc-400">-webkit-</code> prefix for
            older Safari and Chrome. Always ship a fallback{' '}
            <code className="font-mono text-zinc-400">color</code> so the text
            never vanishes.
          </p>
          <p>
            Effects that animate a gradient angle rely on{' '}
            <code className="font-mono text-zinc-400">@property</code>, which
            degrades to a static gradient where unsupported.
          </p>
        </div>
      </footer>
    </div>
  )
}
