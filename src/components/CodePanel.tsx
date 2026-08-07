import { useCallback, useEffect, useState } from 'react'
import { CheckIcon, CopyIcon } from './icons'

interface CodePanelProps {
  code: string
  label: string
}

export function CodePanel({ code, label }: CodePanelProps) {
  const [copied, setCopied] = useState(false)

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
    <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/50">
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
      <pre className="max-h-72 overflow-auto px-4 py-3 font-mono text-[0.7rem] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}
