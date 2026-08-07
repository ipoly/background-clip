interface HeroProps {
  demoCount: number
}

const FACTS = [
  { value: '4', label: 'clip values' },
  { value: '0', label: 'canvas / JS paint' },
  { value: '97%', label: 'global support' },
]

export function Hero({ demoCount }: HeroProps) {
  return (
    <header className="relative mx-auto w-full max-w-7xl px-6 pt-20 pb-14 sm:pt-28">
      <p className="font-mono text-[0.7rem] tracking-[0.32em] text-zinc-500 uppercase">
        CSS Gallery · {demoCount} experiments
      </p>

      <h1 className="mt-5 text-6xl leading-[0.9] font-black tracking-tighter sm:text-8xl">
        <span className="fx-aurora">background</span>
        <span className="text-zinc-700">-</span>
        <span className="fx-shimmer">clip</span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
        One property decides how far a background is allowed to spill: to the
        border box, the padding box, the content box — or into the glyphs
        themselves. Everything below is plain CSS painted through that single
        switch.
      </p>

      <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <dt className="sr-only">{fact.label}</dt>
            <dd>
              <span className="block text-2xl font-bold text-zinc-100">
                {fact.value}
              </span>
              <span className="mt-0.5 block font-mono text-[0.65rem] tracking-[0.16em] text-zinc-500 uppercase">
                {fact.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
