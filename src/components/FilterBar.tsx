import { cn } from '@/lib/cn'
import type { DemoCategory } from '@/demos'

export type Filter = DemoCategory | 'all'

interface FilterOption {
  value: Filter
  label: string
}

interface FilterBarProps {
  options: FilterOption[]
  value: Filter
  counts: Record<Filter, number>
  onChange: (next: Filter) => void
}

export function FilterBar({ options, value, counts, onChange }: FilterBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter demos by technique"
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const active = option.value === value

        return (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400',
              active
                ? 'border-white/40 bg-white text-zinc-900'
                : 'border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-100',
            )}
          >
            {option.label}
            <span
              className={cn(
                'font-mono text-[0.65rem]',
                active ? 'text-zinc-500' : 'text-zinc-600',
              )}
            >
              {counts[option.value]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
