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
]

export * from './types'
