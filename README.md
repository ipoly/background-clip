# background-clip gallery

A gallery of 29 `background-clip` experiments — gradient text, holographic foil,
marching ants, gradient borders — built with React, TypeScript and Tailwind
CSS v4.

## Stack

- React 19 + TypeScript, bundled by Vite
- Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first config, no `tailwind.config.js`)
- Zero runtime dependencies beyond React

## Run it

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # type-check + production bundle
pnpm lint
```

## How it is put together

```
src/
  styles/effects.css   every effect, as plain CSS
  styles/syntax.css    Monokai palette for the code panels
  demos/               metadata + preview components, grouped by category
  components/          gallery chrome (hero, filter, card, code panel)
  lib/cssSource.ts     pulls the CSS snippets straight out of effects.css
  lib/highlightCss.ts  small CSS tokenizer behind the syntax highlighting
skills/
  css-clip-gotchas/    the failure modes behind these effects, as an agent skill
```

Two rules shape the code:

1. **Effects live in CSS, layout lives in Tailwind.** No effect is expressed as
   an inline style. The app has exactly three `style` attributes, each carrying
   a value that is genuinely dynamic and each passing it as a custom property:
   the cursor spotlight coordinates, the `background-repeat` mode the tile
   demo toggles, and the colour a swatch in a code panel has to paint.
2. **The code panels are not copies.** Each effect in `effects.css` is wrapped in
   `/* @demo <id> */ … /* @end */`, and the gallery imports the stylesheet with
   `?raw` to extract those blocks. What a card shows is the code that renders
   it, so the two can never drift apart.

Snippets are highlighted by a ~200-line CSS tokenizer rather than a
highlighting library, which keeps the dependency list at React alone. Colour
literals — hex and functional notations alike — get a swatch, drawn over a
checkerboard so translucent values read as translucent.

## Adding an effect

1. Add a `/* @demo my-effect */ … /* @end */` block to `src/styles/effects.css`.
2. Add a preview component and a `Demo` entry to the matching file in
   `src/demos/`, using `my-effect` as the `id`.

Effects with a support or interop caveat carry a `caveat` string in the
catalog, rendered as a warning on the card. Four currently do:
`background-attachment: fixed`, scroll-driven `animation-timeline`,
`box-decoration-break` and `background-repeat: space | round`.

## The gotchas skill

Building these turned up a set of failure modes that parse cleanly, look right
in the computed-style panel, and still render wrong —
`-webkit-text-fill-color` vs `color: transparent`, `@property` inheritance,
the two-background gradient-border sandwich, `filter` running after the clip.
They are written up in `skills/css-clip-gotchas/SKILL.md`.

To use it in every project rather than just this one:

```bash
ln -s "$PWD/skills/css-clip-gotchas" ~/.claude/skills/css-clip-gotchas
```

## Browser notes

- `background-clip: text` is broadly supported unprefixed now;
  `-webkit-background-clip: text` stays as a one-line safety net, alongside a
  fallback `color` so text never disappears.
- Effects that animate a gradient angle use `@property`; where it is
  unsupported the gradient simply stops rotating.
- All animations are disabled under `prefers-reduced-motion: reduce`.
