import effectsSource from '@/styles/effects.css?raw'

const BLOCK_PATTERN = /\/\*\s*@demo\s+([\w-]+)\s*\*\/([\s\S]*?)\/\*\s*@end\s*\*\//g

function collectBlocks(source: string): Record<string, string> {
  const blocks: Record<string, string> = {}

  for (const [, id, body] of source.matchAll(BLOCK_PATTERN)) {
    blocks[id] = body.trim()
  }

  return blocks
}

/**
 * The gallery shows the exact CSS that powers each demo instead of a
 * hand-maintained copy, so the snippets can never drift from the stylesheet.
 */
const blocks = collectBlocks(effectsSource)

export function getEffectCss(id: string): string {
  return blocks[id] ?? `/* No CSS block tagged "${id}" in effects.css */`
}
