---
name: css-clip-gotchas
description: Failure modes in background-clip, gradient text, gradient borders and animated gradients that render silently wrong instead of erroring. Use when writing or debugging background-clip:text, gradient or animated borders, rotating conic-gradients, @property custom-property animation, glow on clipped text, or scroll-driven background animation.
---

# CSS clip & gradient gotchas

Every entry below is a case where the CSS parses, the DevTools computed panel
looks right, and the pixels are still wrong. Read the symptom, not the title.

## 1. The outline disappears when you make the fill transparent

**Symptom** — gradient text with `-webkit-text-stroke` renders as a gradient
with no outline at all.

**Cause** — `-webkit-text-stroke-color` defaults to `currentColor`, and
`color: transparent` sets `currentColor` to transparent. The stroke is being
painted, in transparent.

**Fix** — use `-webkit-text-fill-color`, which kills only the fill:

```css
.headline {
  background-image: linear-gradient(#fef08a, #ef4444);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;   /* not `color: transparent` */
  -webkit-text-stroke: 2px #0b0b12;
  paint-order: stroke fill;               /* stroke behind fill */
}
```

Without `paint-order: stroke fill` the stroke is centred on the outline and
eats half its width out of the letterforms.

## 2. A conic-gradient will not rotate

**Symptom** — `animation` is running (you can see it in DevTools), the gradient
does not move.

**Cause** — gradients are not animatable, and an unregistered custom property
is an untyped string, so it snaps rather than interpolates. Animating
`background-image` or an unregistered `--angle` both do nothing useful.

**Fix** — register the property so it has a type:

```css
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.spinner {
  background-image: conic-gradient(from var(--angle), #22d3ee, #f472b6, #22d3ee);
  animation: turn 4s linear infinite;
}

@keyframes turn { to { --angle: 360deg; } }
```

Same trick for `<percentage>`, `<length>` and `<color>`.

## 3. A registered property silently falls back to its initial value

**Symptom** — JS writes `--x` on a wrapper, the style attribute updates, and
the child that reads `var(--x)` never changes.

**Cause** — `inherits: false` in the `@property` rule. The child does not
inherit it, so it resolves to `initial-value`. Nothing errors; the effect just
sits at its default forever.

**Fix** — either set `inherits: true`, or write the variable on the same
element that reads it. Decide by asking which element measures the value and
which element paints it. If they differ, it must inherit.

```css
@property --x {
  syntax: "<percentage>";
  inherits: true;      /* writer and reader are different elements */
  initial-value: 50%;
}
```

## 4. There is no gradient border-color

**Symptom** — you want a gradient border and reach for `border-image`, then
fight it over `border-radius` (which `border-image` ignores).

**Fix** — a transparent border plus two background layers, one clipped to each
box:

```css
.card {
  border: 2px solid transparent;
  border-radius: 1rem;
  background-image:
    linear-gradient(#0b0b12, #0b0b12),                 /* the card fill */
    linear-gradient(120deg, #22d3ee, #f472b6);         /* the border */
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
```

Two things break this if you get them wrong:

- **Layer order.** Backgrounds paint first-on-top. The padding-box fill must be
  listed first or it covers the gradient.
- **`background-origin: border-box`.** Without it the gradient is positioned
  against the padding box while being clipped to the border box, so it is
  offset by the border width and the corners look wrong.

## 5. A translucent border looks opaque

**Symptom** — `border: 6px solid rgb(255 255 255 / 0.2)` over a coloured
background does not read as translucent.

**Cause** — the default `background-clip: border-box` paints the element's own
background *underneath* the border area, so the border is blended against the
fill instead of against the page.

**Fix** — `background-clip: padding-box`. This is the single most practical use
of the property.

## 6. An angled repeating gradient jumps when the animation loops

**Symptom** — marching-ants or barber-pole stripes twitch once per iteration.

**Cause** — you translated by one stripe period along x, but the pattern
repeats along the *gradient axis*. For a gradient at angle θ, one period `p`
costs `p / cos(θ)` of horizontal travel.

**Fix** — for `-45deg` stripes with a 16px period, animate
`background-position` to `22.63px` (16 / cos 45°), not `16px`.

**A related trap if you are after marching ants specifically.** One angled
layer cannot circulate. It translates as a single piece, so every edge drifts
the same way and two of the four end up running counter to the direction a
selection marquee would — measured on a rectangle, top and right go clockwise
while bottom and left go anticlockwise. Getting real circulation means one
layer per side, each with its own travel:

```css
background-size:     auto, 16px 3px, 3px 16px, 16px 3px, 3px 16px;
background-repeat:   no-repeat, repeat-x, repeat-y, repeat-x, repeat-y;
background-position: 0 0, 0 0, 100% 0, 0 100%, 0 0;
/* to: */            0 0, 16px 0, 100% 16px, -16px 100%, 0 -16px;
```

Those strips are axis-aligned, so `cos θ` drops out and each simply travels a
whole tile — but they cannot follow a `border-radius`, so the corners have to
be square. If you need rounded corners, SVG `stroke-dasharray` with an animated
`stroke-dashoffset` is the tool; it follows the path and handles `rx` natively.

## 7. `filter` cannot shape a clipped background

**Symptom** — a `filter: contrast()` halftone or threshold trick works on a
`div` and does nothing sensible on `background-clip: text`.

**Cause** — `background-blend-mode` blends background *layers*, which happens
before the clip. `filter` applies to the element's rendered output, which
happens after. You cannot use a filter to modify the background that is about
to be clipped.

**Fix** — do the shaping with hard-stop gradients and blend modes, or move the
filter to a wrapper element.

Related and useful: `drop-shadow()` respects the alpha the clip leaves behind,
so it traces the glyph outlines. `box-shadow` traces the element box and will
look like a rectangle behind your text.

## 8. `background-position` will not animate

**Symptom** — a shimmer or gradient pan keyframe runs and nothing moves.

**Cause** — the background is exactly the size of the element, so there is
nowhere to pan to.

**Fix** — give it headroom first: `background-size: 300% 100%`, then animate
`background-position`. Same idea in reverse for reveals — start at
`background-size: 0% 100%` with `background-repeat: no-repeat`, and remember
`background-position: 0 100%` if you want it to grow upward instead of
downward.

## 9. `animation-timeline` gets wiped by the `animation` shorthand

**Symptom** — a scroll-driven animation runs on the clock instead of on scroll.

**Cause** — the `animation` shorthand resets `animation-timeline` to `auto`.
If the shorthand comes second, it clobbers your timeline.

**Fix** — order matters, and Firefox wants a real duration:

```css
@supports (animation-timeline: view()) {
  .reveal {
    background-size: 0% 100%;
    animation: fill 1ms linear both;   /* duration required by Firefox */
    animation-timeline: view();        /* must come after the shorthand */
    animation-range: entry 25% cover 55%;
  }
}
```

Guard it with `@supports` and make the un-enhanced state the *finished* state,
not the empty one, or unsupporting browsers show blank text.

## 10. `view()` measures against the nearest scroll container, which is rarely the page

**Symptom** — a `view()` timeline never advances. `getAnimations()[0]` exists,
its timeline is a real `ViewTimeline`, and `timeline.currentTime` is frozen at
one value no matter how far you scroll.

**Cause** — `view()` resolves against the subject's nearest *scroll container*,
and `overflow: hidden` makes an element a scroll container. Any clipping
wrapper between the subject and the page — a card, a stage, a rounded-corner
container — captures the timeline. That wrapper never scrolls, so progress
never moves.

**Fix** — `overflow: clip`. It clips identically but is not a scroll container,
so the timeline resolves to the page.

```css
.stage { overflow: clip; }   /* `hidden` would swallow the view() timeline */
```

Diagnose it in one line — if this is not `<html>`, you have found the culprit:

```js
el.getAnimations()[0].timeline.source
```

Note that `scroll()` takes a scroller keyword (`scroll(root)`) so you can point
it at the page explicitly. `view()` does not; the containment has to go.

**The same rule run in reverse is useful.** Give a component its own scroll
container and the timeline is scoped to it — the effect no longer depends on
where the component sits on the page, and it works the moment it is on screen.
A scroller with a taller track inside is the whole trick.

Leave `overscroll-behavior` alone when you do. `contain` looks like the tidy
choice and turns the component into a trap: once the inner scroller is at its
end, the page will not move at all while the pointer is over it.

**On a sticky subject, use `scroll()`, not `view()`.** A view timeline is a
function of where its subject sits in the scrollport, and a pinned element does
not move. Chrome falls back to the pre-sticky layout position, which yields a
truncated range: measured over one scroller's full travel, an otherwise
identical pair gave

| subject | timeline | fill across the full scroll |
| --- | --- | --- |
| sticky | `view()` | 18% → 82%, reaching neither end |
| sticky | `scroll()` | 0% → 25% → 50% → 75% → 100% |

`scroll()` also needs no `animation-range` — it covers the whole travel by
default. Reserve `view()` for subjects that actually travel through the
scrollport.

## 11. `background-attachment: fixed` with `background-clip: text` is not interoperable

Chrome anchors the background to the viewport; Firefox has a long-standing
invalidation bug (bugzilla 1313757) and the CSSWG has an open question about
whether the combination is even defined (csswg-drafts 10595). Fixed attachment
is separately unreliable on mobile, where it thrashes on address-bar resize.

Treat it as a progressive enhancement, never as load-bearing layout.

## 12. `background-attachment: fixed` quietly anchors to an ancestor instead of the viewport

**Symptom** — the background renders, but scrolling does not change what shows
through. It behaves exactly like `scroll` attachment.

**Cause** — a `transform`, `filter`, `perspective`, `backdrop-filter` or
`will-change` on any ancestor makes that ancestor the containing block, and a
fixed background attaches to it rather than to the viewport.

The nasty version is an ancestor with no *visible* transform at all. An
entrance animation written with `animation-fill-mode: both` keeps applying its
final keyframe forever, so an element that animated `transform: translateY(14px)`
→ `transform: none` settles on the identity matrix `matrix(1, 0, 0, 1, 0, 0)` —
not `none`. That is enough to break the effect, permanently, on every card.

**Fix** — use `backwards` rather than `both` when the last keyframe already
matches the element's natural state, so the animation stops applying once it
finishes:

```css
.card { animation: rise 600ms ease backwards; }   /* not `both` */
```

**Diagnose** — walk up from the element and print `getComputedStyle(n).transform`.
Anything other than `none` is the containing block you did not want. Beware
that a screenshot taken with `captureBeyondViewport` will not reproduce the bug
either way: it changes what "viewport" means, so it can only mislead you here.

## 13. Noise and pattern layers are invisible at the wrong scale

**Symptom** — an SVG `feTurbulence` grain or a dot pattern renders as a flat
wash.

**Causes and fixes**

- `baseFrequency` too high makes the noise finer than a pixel. Drop it (0.4 is
  a reasonable print-grain starting point) and cut `numOctaves` to 2.
- Scale the tile up with `background-size` — the SVG's intrinsic size is rarely
  what you want.
- The blend mode matters more than the noise. `overlay` is usually too weak;
  `hard-light` and `multiply` actually bite.
- For dot grids use `background-repeat: space`, which fits a whole number of
  tiles per axis so no dot is cut in half at the edge.
- Remember `#` must be percent-encoded as `%23` inside a data-URI, or
  `filter="url(#n)"` silently fails to resolve.

## 14. Baseline hygiene

- **Know what your fallback actually is.** With `color: transparent`, a real
  `color` declaration is the safety net: if the clip fails — unsupported,
  forced-colors, a stray `background: none` — the text still paints. With
  `-webkit-text-fill-color: transparent` (entry 1) that net does not exist,
  because the fill is transparent whether or not the clip works. There the
  fallback is whatever else draws the glyphs, normally the
  `-webkit-text-stroke` outline. Pick the transparency mechanism that leaves
  you a legible failure mode.
- **The unprefixed property is broadly supported now**, but
  `-webkit-background-clip: text` remains a one-line safety net for older
  Safari and Chrome. Ship both.
- **Gate every keyframe on `prefers-reduced-motion: reduce`.** Note that
  `animation: none` is the wrong reset for reveal animations that start empty —
  set the finished state explicitly instead.
- **Pseudo-element overlays need `pointer-events: none`**, or they swallow text
  selection on the real text underneath.
- **Gradient text still has to pass contrast.** The lightest stop is what
  matters on a dark background, and the darkest on a light one.
- **`box-decoration-break: clone`** only affects inline boxes that wrap. Use it
  when you want each line of a wrapped run to get the whole gradient rather
  than a slice of one.
