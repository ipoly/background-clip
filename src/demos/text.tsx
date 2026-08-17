import { Caption, Headline } from './shared'

export function AuroraPreview() {
  return <Headline className="fx-aurora">AURORA</Headline>
}

export function HolographicPreview() {
  return <Headline className="fx-holographic">HOLO·FOIL</Headline>
}

export function ShimmerPreview() {
  return <Headline className="fx-shimmer">CHROME</Headline>
}

export function NebulaPreview() {
  return <Headline className="fx-nebula">COSMOS</Headline>
}

export function RisoPreview() {
  return <Headline className="fx-riso">RISO·GRAIN</Headline>
}

export function RetroPreview() {
  return <Headline className="fx-retro">SUNSET</Headline>
}

export function EmberPreview() {
  return <Headline className="fx-ember">EMBER</Headline>
}

export function GlitchPreview() {
  return (
    <Headline className="fx-glitch" dataText="GLITCH">
      GLITCH
    </Headline>
  )
}

export function CrtPreview() {
  return <Headline className="fx-crt font-mono">READY_</Headline>
}

export function LiquidPreview() {
  return <Headline className="fx-liquid">LIQUID</Headline>
}

export function MarblePreview() {
  return <Headline className="fx-marble">MARBLE</Headline>
}

export function SplitPreview() {
  return <Headline className="fx-split">SPLIT</Headline>
}

export function StickerPreview() {
  return <Headline className="fx-sticker">STICKER</Headline>
}

export function DuotonePreview() {
  return <Headline className="fx-duotone">DUOTONE</Headline>
}

export function ConfettiPreview() {
  return <Headline className="fx-confetti">CONFETTI</Headline>
}

export function NeonPreview() {
  return <Headline className="fx-neon">NEON</Headline>
}

export function FixedBackdropPreview() {
  return (
    <div className="flex flex-col items-center">
      <Headline className="fx-fixed-backdrop">WINDOW</Headline>
      <Caption>Scroll the page</Caption>
    </div>
  )
}

export function DropCapPreview() {
  return (
    <p className="fx-drop-cap max-w-[19rem] text-sm leading-relaxed text-zinc-400">
      Pseudo-elements generate real boxes, so they take a background and they
      take a clip. One selector turns the first letter of a paragraph into an
      illuminated capital, with no extra span to maintain.
    </p>
  )
}

export function BoxDecorationPreview() {
  return (
    <p className="max-w-[16rem] text-center text-2xl leading-tight font-black tracking-tight">
      <span className="fx-box-decoration">
        every line gets the whole rainbow
      </span>
    </p>
  )
}
