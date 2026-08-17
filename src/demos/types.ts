import type { ComponentType } from 'react'

export const CATEGORIES = ['text', 'interactive', 'box'] as const

export type DemoCategory = (typeof CATEGORIES)[number]

export interface Demo {
  /** Also the id of the `@demo` block inside effects.css. */
  id: string
  title: string
  description: string
  category: DemoCategory
  /** Key CSS properties worth highlighting, shown as chips on the card. */
  tags: string[]
  /** Support or interop warning, shown on the card when the effect has one. */
  caveat?: string
  Preview: ComponentType
}

export const CATEGORY_LABELS: Record<DemoCategory, string> = {
  text: 'background-clip: text',
  interactive: 'Pointer driven',
  box: 'Box geometry',
}
