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
  demos/               metadata + preview components, grouped by category
  components/          gallery chrome (hero, filter, card, code panel)
  lib/cssSource.ts     pulls the CSS snippets straight out of effects.css
```

Two rules shape the code:

1. **Effects live in CSS, layout lives in Tailwind.** No effect is expressed as
   an inline style. The only `style` attribute in the app sets two custom
   properties for the cursor spotlight, because those values are genuinely
   dynamic.
2. **The code panels are not copies.** Each effect in `effects.css` is wrapped in
   `/* @demo <id> */ … /* @end */`, and the gallery imports the stylesheet with
   `?raw` to extract those blocks. What a card shows is the code that renders
   it, so the two can never drift apart.

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
