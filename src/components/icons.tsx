interface IconProps {
  className?: string
}

const BASE =
  'size-4 shrink-0 stroke-current stroke-[1.75] [stroke-linecap:round] [stroke-linejoin:round]'

export function CopyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? BASE} aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  )
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? BASE} aria-hidden>
      <path d="m5 13 4.5 4.5L19 7" />
    </svg>
  )
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? BASE} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
