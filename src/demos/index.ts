import * as box from './box'
import * as interactive from './interactive'
import * as text from './text'
import type { Demo } from './types'

/**
 * The catalog is the single source of truth for the gallery. Each `id` must
 * match an `@demo` block in styles/effects.css — that is where the code panel
 * reads its snippet from.
 */
export const demos: Demo[] = [
  {
    id: 'aurora',
    title: 'Aurora Pan',
    description:
      'A five-stop gradient stretched to 300% width, then scrolled with background-position. One keyframe, endless colour.',
    category: 'text',
    tags: ['linear-gradient', 'background-size', 'keyframes'],
    Preview: text.AuroraPreview,
  },
  {
    id: 'holographic',
    title: 'Holographic Foil',
    description:
      'A conic gradient spun through a registered @property angle, with a repeating diagonal sheen layered on top.',
    category: 'text',
    tags: ['conic-gradient', '@property', 'layered bg'],
    Preview: text.HolographicPreview,
  },
  {
    id: 'shimmer',
    title: 'Chrome Shimmer',
    description:
      'Brushed metal is just a grey ramp with a white spike in the middle. Sweep it across the glyphs for a polished highlight.',
    category: 'text',
    tags: ['linear-gradient', 'background-position'],
    Preview: text.ShimmerPreview,
  },
  {
    id: 'nebula',
    title: 'Image Fill',
    description:
      'The background can be a real asset, not just a gradient. Oversize it and drift it slowly so the letters feel like a window.',
    category: 'text',
    tags: ['url()', 'background-size', 'background-position'],
    Preview: text.NebulaPreview,
  },
  {
    id: 'riso',
    title: 'Riso Grain',
    description:
      'An inline SVG feTurbulence tile blended over a gradient with background-blend-mode gives print-style grain — no image files.',
    category: 'text',
    tags: ['feTurbulence', 'background-blend-mode'],
    Preview: text.RisoPreview,
  },
  {
    id: 'retro',
    title: 'Retro Scanlines',
    description:
      'Two layers: a dusk gradient underneath, hard repeating stripes above. Scroll only the stripe layer for a CRT crawl.',
    category: 'text',
    tags: ['repeating-linear-gradient', 'multi-layer'],
    Preview: text.RetroPreview,
  },
  {
    id: 'ember',
    title: 'Ember Glow',
    description:
      'Three radial hotspots parked below the baseline flicker upward, and drop-shadow spills the heat past the glyph edges.',
    category: 'text',
    tags: ['radial-gradient', 'drop-shadow'],
    Preview: text.EmberPreview,
  },
  {
    id: 'glitch',
    title: 'RGB Glitch',
    description:
      'Two pseudo-elements duplicate the text via attr(data-text), each clipped to its own gradient and torn apart with clip-path.',
    category: 'text',
    tags: ['::before / ::after', 'clip-path', 'mix-blend-mode'],
    Preview: text.GlitchPreview,
  },
  {
    id: 'crt',
    title: 'Phosphor Terminal',
    description:
      'Tight black scanlines over a green-to-cyan ramp, rolling forever. The glow is a drop-shadow on the clipped result.',
    category: 'text',
    tags: ['repeating-linear-gradient', 'filter'],
    Preview: text.CrtPreview,
  },
  {
    id: 'liquid',
    title: 'Liquid Blobs',
    description:
      'Three closest-side radial gradients wander across the box on independent paths. The dark background colour is clipped too.',
    category: 'text',
    tags: ['radial-gradient', 'closest-side', 'no-repeat'],
    Preview: text.LiquidPreview,
  },
  {
    id: 'marble',
    title: 'Marble Veins',
    description:
      'A repeating-conic-gradient anchored outside the box fans translucent veins across a stone ramp. No assets, no filters.',
    category: 'text',
    tags: ['repeating-conic-gradient', 'off-box origin'],
    Preview: text.MarblePreview,
  },
  {
    id: 'split',
    title: 'Hard Split',
    description:
      'Two stops a hair apart make a clean cut instead of a blend. Note the split follows the element box, not the individual letters.',
    category: 'text',
    tags: ['hard stops', 'linear-gradient'],
    Preview: text.SplitPreview,
  },
  {
    id: 'sticker',
    title: 'Sticker Outline',
    description:
      'Gradient fill plus a solid outline. The trick is -webkit-text-fill-color: the usual color: transparent would take the stroke down with it.',
    category: 'text',
    tags: ['-webkit-text-stroke', 'text-fill-color', 'paint-order'],
    Preview: text.StickerPreview,
  },
  {
    id: 'drop-cap',
    title: 'Illuminated Capital',
    description:
      'Pseudo-elements generate real boxes, so ::first-letter takes a background and a clip. A drop cap with no extra markup.',
    category: 'text',
    tags: ['::first-letter', 'float'],
    Preview: text.DropCapPreview,
  },
  {
    id: 'duotone',
    title: 'Duotone Photo',
    description:
      'background-blend-mode: color keeps the hue of the gradient on top and the luminosity of the image below. A duotone in one declaration.',
    category: 'text',
    tags: ['background-blend-mode', 'url()'],
    Preview: text.DuotonePreview,
  },
  {
    id: 'confetti',
    title: 'Confetti Scatter',
    description:
      'Nine radial gradients and a base fill in a single background-image list. Layers paint first-on-top, so order is the z-index here.',
    category: 'text',
    tags: ['radial-gradient', 'layer stack'],
    Preview: text.ConfettiPreview,
  },
  {
    id: 'neon',
    title: 'Neon Tube',
    description:
      'Stacked drop-shadow filters trace the alpha the clip leaves behind, so the glow hugs the glyphs. box-shadow would trace the box instead.',
    category: 'text',
    tags: ['drop-shadow', 'filter', 'steps()'],
    Preview: text.NeonPreview,
  },
  {
    id: 'box-decoration',
    title: 'Per-Line Gradient',
    description:
      'When an inline box wraps, box-decoration-break decides whether one gradient stretches across the whole run or restarts on every line.',
    category: 'text',
    tags: ['box-decoration-break', 'inline'],
    caveat: 'Safari still needs the -webkit- prefix.',
    Preview: text.BoxDecorationPreview,
  },
  {
    id: 'fixed-backdrop',
    title: 'Fixed Backdrop',
    description:
      'background-attachment: fixed makes the viewport the positioning area, turning the glyphs into a window onto a backdrop that stays put.',
    category: 'text',
    tags: ['background-attachment', 'cover'],
    caveat:
      'Interop is genuinely shaky: Firefox has a long-standing bug here and the CSSWG has an open issue on whether the combination is even defined. Fixed attachment is also unreliable on mobile.',
    Preview: text.FixedBackdropPreview,
  },
  {
    id: 'spotlight',
    title: 'Cursor Spotlight',
    description:
      'React writes two custom properties; CSS does the rest. Registering them with @property lets the light ease instead of snap.',
    category: 'interactive',
    tags: ['@property', 'custom properties', 'transition'],
    Preview: interactive.SpotlightPreview,
  },
  {
    id: 'wipe',
    title: 'Hover Wipe',
    description:
      'background-size animates from 0% to 100% width, revealing the gradient over a flat background-color underneath.',
    category: 'interactive',
    tags: ['background-size', 'transition', ':hover'],
    Preview: interactive.WipePreview,
  },
  {
    id: 'fill-level',
    title: 'Rising Level',
    description:
      'Anchor the gradient to the bottom and animate its height. The background-color is clipped too, and paints the part that has not filled yet.',
    category: 'interactive',
    tags: ['background-position', 'background-size', 'background-color'],
    Preview: interactive.FillLevelPreview,
  },
  {
    id: 'scroll-reveal',
    title: 'Scroll Reveal',
    description:
      'The same size animation, driven by scroll instead of by the clock. A timeline resolves against the nearest scroll container, so putting one inside the card scopes it here. The text is pinned, which is why scroll() is the right timeline: view() measures where its subject sits, and this one never moves.',
    category: 'interactive',
    tags: ['animation-timeline', 'scroll()', 'position: sticky'],
    caveat:
      'Where scroll timelines are unsupported the text simply renders fully filled.',
    Preview: interactive.ScrollRevealPreview,
  },
  {
    id: 'glass-border',
    title: 'Translucent Border',
    description:
      'The reason padding-box exists. On the right the fill paints under the translucent border and ruins it; on the left the clip holds it back.',
    category: 'box',
    tags: ['padding-box', 'translucent border'],
    Preview: box.GlassBorderPreview,
  },
  {
    id: 'marching-ants',
    title: 'Marching Ants',
    description:
      'A selection marquee needs its dashes to travel around the perimeter. One angled layer cannot do that — it drifts as a piece, so two sides run backwards. Four layers, one per side, each sliding along its own edge, actually circulate. Same padding-box / border-box sandwich either way.',
    category: 'box',
    tags: ['multi-layer', 'border-box', 'background-position'],
    Preview: box.MarchingAntsPreview,
  },
  {
    id: 'gradient-border',
    title: 'Gradient Border',
    description:
      'CSS has no gradient border-color, so stack two backgrounds: the card fill clipped to padding-box, the gradient to border-box.',
    category: 'box',
    tags: ['padding-box', 'border-box', 'background-origin'],
    Preview: box.GradientBorderPreview,
  },
  {
    id: 'spin-border',
    title: 'Rotating Border',
    description:
      'The same double-background sandwich, with an @property angle driving a conic gradient around the border box.',
    category: 'box',
    tags: ['conic-gradient', '@property', 'padding-box'],
    Preview: box.SpinBorderPreview,
  },
  {
    id: 'box-models',
    title: 'The Three Boxes',
    description:
      'Identical gradient, identical dashed border, three clip values. This is what background-clip does before you ever reach for text.',
    category: 'box',
    tags: ['border-box', 'padding-box', 'content-box'],
    Preview: box.BoxModelsPreview,
  },
  {
    id: 'tile-fitting',
    title: 'Tile Fitting',
    description:
      'One halftone tile, three repeat modes. The box is exactly three tiles tall but 5.45 tiles wide, so only the horizontal axis has a remainder to resolve — repeat clips it, space spaces it out, round rescales the tile.',
    category: 'box',
    tags: ['background-repeat', 'space', 'round'],
    caveat:
      'space and round fit tiles to the background positioning area, not to whatever you clip to. Under background-clip: text the glyph edges still cut straight through the dots.',
    Preview: box.TileFittingPreview,
  },
]

export * from './types'
