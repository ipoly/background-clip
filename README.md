# background-clip gallery

A gallery of 16 `background-clip` experiments — gradient text, holographic foil,
riso grain, gradient borders — built with React, TypeScript and Tailwind CSS v4.

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
```

Two rules shape the code:

1. **Effects live in CSS, layout lives in Tailwind.** No effect is expressed as
   an inline style. The app has exactly two `style` attributes, both carrying
   values that are genuinely dynamic and both passing them as custom
   properties: the cursor spotlight coordinates, and the colour a swatch in a
   code panel has to paint.
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

## Browser notes

- `background-clip: text` needs the `-webkit-` prefix for older Safari and
  Chrome, and a fallback `color` so text never disappears.
- Effects that animate a gradient angle use `@property`; where it is
  unsupported the gradient simply stops rotating.
- All animations are disabled under `prefers-reduced-motion: reduce`.
