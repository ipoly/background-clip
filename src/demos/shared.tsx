import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface HeadlineProps {
  className?: string
  children: ReactNode
  /** Forwarded to the element so pseudo-element effects can mirror the text. */
  dataText?: string
}

export function Headline({ className, children, dataText }: HeadlineProps) {
  return (
    <span
      data-text={dataText}
      className={cn(
        'select-none text-center text-5xl leading-none font-black tracking-tighter sm:text-6xl',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <span className="mt-3 block text-[0.65rem] font-medium tracking-[0.28em] text-zinc-500 uppercase">
      {children}
    </span>
  )
}
