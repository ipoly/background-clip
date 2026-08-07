import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { tokenizeCss } from '@/lib/highlightCss'
import { CheckIcon, CopyIcon } from './icons'

/** The swatch colour is data, not styling, so it rides in as a variable. */
type SwatchStyle = CSSProperties & { '--tok-swatch': string }

interface CodePanelProps {
  code: string
  label: string
}

export function CodePanel({ code, label }: CodePanelProps) {
  const [copied, setCopied] = useState(false)
  const tokens = useMemo(() => tokenizeCss(code), [code])

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }, [code])

  return (
    <div className="code-monokai relative mt-4 overflow-hidden rounded-xl border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[0.65rem] tracking-[0.18em] text-zinc-500 uppercase">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.7rem] font-medium text-zinc-400 transition hover:bg-white/10 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="max-h-72 overflow-auto px-4 py-3 font-mono text-[0.7rem] leading-relaxed">
        <code>
          {tokens.map((token, position) => {
            if (token.kind === 'plain') return token.value

            if (token.swatch) {
              return (
                <span key={position} className="tok-color">
                  <span
                    aria-hidden="true"
                    className="tok-swatch"
                    style={{ '--tok-swatch': token.swatch } as SwatchStyle}
                  />
                  {token.value}
                </span>
              )
            }

            return (
              <span key={position} className={`tok-${token.kind}`}>
                {token.value}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
