<h1 align="center">
  tailwindcss-rtl
</h1>
<p align="center">
  <a href="https://workcation-rtl.netlify.app/en/" >
    <img src="https://i.imgur.com/QSY8nNU.gif">
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/tailwindcss-rtl"><img src="https://img.shields.io/npm/dt/tailwindcss-rtl.svg" alt="Total Downloads"></a>
  <a href="https://www.npmjs.com/package/tailwindcss-rtl"><img src="https://img.shields.io/npm/v/tailwindcss-rtl.svg" alt="Latest Release"> </a>
</p>

## Introduction

Internationalizing for Semitic languages takes more than translating text: you also need to mirror the layout horizontally.
Adding `dir="rtl"` to your page flips the text, but your `pl-6`, `mr-4` and `left-0` utilities stay where they are, so you would end up writing a second set of styles for RTL.

**tailwindcss-rtl** adds direction-aware utilities, so one set of classes serves both RTL and LTR. Use `ps-6` (padding at the start) instead of `pl-6`, and the padding lands on the correct side in either direction.

- Works with Tailwind CSS **3.0 – 3.4** and **4.x**. If you are on Tailwind 2 or older, stay on `tailwindcss-rtl@0.9`.
- Gives you the logical utilities Tailwind core does not provide, and only fills in the ones your Tailwind version lacks. It never overrides core output (see [Do you still need this plugin?](#do-you-still-need-this-plugin)).
- Ships TypeScript types, ESM and CJS.

**Live demo:** the official Tailwind "Workcation" course project, with i18n and RTL.

- [Workcation live demo](https://workcation-rtl.netlify.app/en/)
- [Workcation-nuxt-i18n-rtl](https://github.com/20lives/workcation-nuxt-i18n-rtl) (source)

## Do you still need this plugin?

Tailwind has been adding logical utilities itself. This table shows what core provides, by version:

| Tailwind version | What core added |
| --- | --- |
| 3.1 | `text-start`, `text-end` |
| 3.3 (Mar 2023) | `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `rounded-s/e/ss/se/es/ee`, `border-s/e` |
| 3.4 (Dec 2023) | `float-start`, `float-end`, `clear-start`, `clear-end` |
| 4.0 (Jan 2025) | `space-x-*` and `divide-x-*` use logical properties |
| 4.2 (Feb 2026) | `inset-s/e/bs/be-*`, `pbs/pbe-*`, `mbs/mbe-*`, `border-bs/be`, `inline-*` and `block-*` sizes. `start-*` and `end-*` are deprecated in favor of `inset-s-*` and `inset-e-*`. |

This plugin fills the rest:

- **Gap-filler classes** (`text-start`, `ms-*`, `start-*`, `float-start`, and so on) are generated only when the Tailwind version you run does not already provide them. The plugin checks this at build time, including when you disabled that core plugin through `corePlugins`. It never overrides core output.
- **Plugin-only classes** are never in Tailwind core, in any version, so they always come from this plugin: `rounded-ts/te/bs/be-*`, `space-s-*`, `divide-s-*`, `origin-start/end` and its corner variants, `bg-start/end` and its corner variants, `translate-s-*`, `translate-e-*`, and the `forms` option.

If you only need what core already provides, you do not need this plugin. The same class names keep working either way, so you can install it and let it fill in only what your Tailwind version lacks.

## Installation

```bash
# pnpm
pnpm add -D tailwindcss-rtl

# npm
npm install -D tailwindcss-rtl

# yarn
yarn add -D tailwindcss-rtl

# bun
bun add -D tailwindcss-rtl
```

## Setup

### Tailwind v4

Register the plugin in your CSS entry file:

```css
@import "tailwindcss";
@plugin "tailwindcss-rtl";
```

With [options](#options):

```css
@plugin "tailwindcss-rtl" {
  forms: true;
}
```

If you still load a JavaScript config with `@config`, you can register the plugin there instead (see the v3 setup below).

### Tailwind v3

Add the plugin to `tailwind.config.js`:

```js
module.exports = {
  // ...
  plugins: [require("tailwindcss-rtl")],
};
```

Or, in an ESM or TypeScript config (Tailwind 3.3+):

```js
import rtl from "tailwindcss-rtl";

export default {
  // ...
  plugins: [rtl],
};
```

With [options](#options), call the plugin: `plugins: [rtl({ forms: true })]`.

## Direction

Put `dir="rtl"` on the `<html>` element of right-to-left pages:

```html
<html lang="ar" dir="rtl">
```

Left-to-right is the default, so LTR pages need no `dir` attribute. Setting `dir="ltr"` is optional.

Set the direction with the `dir` attribute, not with CSS `direction: rtl`. The logical properties follow either, but `origin-*`, `bg-*`, `translate-s-*`/`translate-e-*` and the `forms` option follow only `dir` (they use `:dir()`).

Then replace utilities based on left and right with the logical ones from [Utilities](#utilities). For example, left padding on an LTR layout is `pl-6`. Left is the start side in LTR, so write `ps-6`.

### Nested direction

The direction is read from the nearest `dir` attribute, so a part of the page can have the opposite direction. This is how you keep a section unmirrored in an RTL page, for example a code sample or a navigation bar that must stay left-to-right:

```html
<html dir="rtl">
  <body>
    <nav dir="ltr">
      <!-- `ps-4`, `origin-start`, and so on behave as in LTR inside this element -->
    </nav>
  </body>
</html>
```

## Utilities

`*` stands for any value from your theme (`ms-4`, `rounded-s-lg`) or an arbitrary value (`ms-[3px]`). Negative values are available where a negative makes sense: margin, `start-*`/`end-*`, `space-s-*` and `translate-s-*`/`translate-e-*`. Padding, border width, divide width and border radius cannot be negative, so `-ps-4` generates nothing.

"Provided by" shows who generates the class. Where core provides it, the plugin generates nothing for that class (see [Do you still need this plugin?](#do-you-still-need-this-plugin)).

| Class | Description | Provided by |
| --- | --- | --- |
| `text-start`, `text-end` | Text aligned to the start or end | Tailwind 3.1+; this plugin on 3.0 |
| `ms-*`, `me-*` | Margin at the start or end | Tailwind 3.3+; this plugin on 3.0 – 3.2 |
| `ps-*`, `pe-*` | Padding at the start or end | Tailwind 3.3+; this plugin on 3.0 – 3.2 |
| `start-*`, `end-*` | Inset (position) from the start or end of a positioned element | Tailwind 3.3+; this plugin on 3.0 – 3.2 |
| `rounded-s[-*]`, `rounded-e[-*]` | Rounded corners on the start or end side | Tailwind 3.3+; this plugin on 3.0 – 3.2 |
| `border-s[-*]`, `border-e[-*]` | Border width on the start or end side | Tailwind 3.3+; this plugin on 3.0 – 3.2 |
| `float-start`, `float-end` | Float to the start or end | Tailwind 3.4+; this plugin on 3.0 – 3.3 |
| `clear-start`, `clear-end` | Clear floats at the start or end | Tailwind 3.4+; this plugin on 3.0 – 3.3 |
| `rounded-ts[-*]`, `rounded-te[-*]` | Rounded corner at the top start or top end | This plugin |
| `rounded-bs[-*]`, `rounded-be[-*]` | Rounded corner at the bottom start or bottom end | This plugin |
| `space-s-*`, `space-s-reverse` | Space between children, laid out along the inline direction | This plugin |
| `divide-s[-*]`, `divide-s-reverse` | Border width between children, along the inline direction | This plugin |
| `origin-start`, `origin-end` | Transform origin at the start or end | This plugin |
| `origin-top-start`, `origin-top-end` | Transform origin at the top start or top end corner | This plugin |
| `origin-bottom-start`, `origin-bottom-end` | Transform origin at the bottom start or bottom end corner | This plugin |
| `bg-start`, `bg-end` | Background position at the start or end | This plugin |
| `bg-top-start`, `bg-top-end` | Background position at the top start or top end corner | This plugin |
| `bg-bottom-start`, `bg-bottom-end` | Background position at the bottom start or bottom end corner | This plugin |
| `translate-s-*`, `translate-e-*` | Translate toward the inline start or end | This plugin |

Notes:

- `rounded-ts`, `rounded-te`, `rounded-bs` and `rounded-be` are equivalent to core's `rounded-ss`, `rounded-se`, `rounded-es` and `rounded-ee` (Tailwind 3.3+). The plugin names work on every supported Tailwind version; on 3.3+ you can use the core names instead. `rounded-bs` and `rounded-be` are bottom-start and bottom-end (core `rounded-es`/`rounded-ee`), not the block-axis `bs`/`be` of Tailwind 4.2.
- `space-s-*` is equivalent to core `space-x-*` on Tailwind v4, which is already logical. On v3, core `space-x-*` is physical (left and right), so use `space-s-*` there. The same applies to `divide-s-*` and `divide-x-*`.
- `translate-e-4` moves an element toward the inline end (right in LTR, left in RTL), and `translate-s-4` moves it toward the inline start. They compose with the other transform utilities. On Tailwind v3 they write the whole `transform` property after the core utilities, so an unprefixed `transform-none` on the same element does not cancel them. Use a variant (for example `md:transform-none`) or remove the class.
- On Tailwind v4, spacing values follow your theme: `@theme { --spacing: 3px; }` changes `space-s-*` and `translate-s-*`/`translate-e-*`, just like core utilities.
- Variants work as usual (`md:ps-4`, `hover:bg-start`), and each class is a single class selector, so a responsive or state variant overrides the base class as you expect.

## Options

### `forms`

Mirrors the select arrow (and its padding) of [`@tailwindcss/forms`](https://github.com/tailwindlabs/tailwindcss-forms) in RTL, so the arrow sits on the left. Default: off.

| Value | Effect |
| --- | --- |
| `true` | Both strategies below, matching the `@tailwindcss/forms` default (it also applies both) |
| `"base"` | Styles `select` elements; matches forms' `strategy: 'base'` |
| `"class"` | Styles `.form-select`; matches forms' `strategy: 'class'` |

Register `tailwindcss-rtl` **after** `@tailwindcss/forms`; the RTL rules have to come later to take effect.

Tailwind v4:

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@plugin "tailwindcss-rtl" {
  forms: true; /* or: base; or: class; */
}
```

Tailwind v3:

```js
const rtl = require("tailwindcss-rtl");

module.exports = {
  // ...
  plugins: [require("@tailwindcss/forms"), rtl({ forms: true })],
};
```

## Recipes

### Pseudo-elements: `before:` and `after:`

Pseudo-elements use the core variants, so the logical classes work on them:

```html
<a class="relative ps-6 before:absolute before:start-0 before:content-['']">
  Link with a marker at the start
</a>
```

On Tailwind 4.2+, you can write `before:inset-s-0` instead of `before:start-0`.

### Switch knob

`translate-e-*` moves the knob toward the inline end, so one set of classes works in both directions:

```html
<label class="relative inline-block h-6 w-11">
  <input type="checkbox" class="peer sr-only" />
  <span class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-blue-600"></span>
  <span
    class="absolute start-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition translate-e-0 peer-checked:translate-e-5"
  ></span>
</label>
```

## Browser support

- `origin-*`, `bg-*`, `translate-s-*`, `translate-e-*` and the `forms` option use the CSS [`:dir()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir) pseudo-class for the RTL value. It is supported in Chrome 120+, Safari 16.4+ and Firefox 49+. In older browsers these utilities fall back to their LTR value.
- `float-start`, `float-end`, `clear-start` and `clear-end` use the `inline-start` and `inline-end` values, which need Chrome 118+, Safari 15+ and Firefox 55+. The plugin emits them on Tailwind 3.0 – 3.3; on 3.4+ and 4, Tailwind core emits the same values.
- All other utilities use [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values). Check the support tables there against your browser targets.

## Migrating from 0.x

1.0 keeps every class name from 0.x. What changes:

- **Tailwind 2 and older:** no longer supported. Stay on `tailwindcss-rtl@0.9`. Tailwind 3.0 to 3.4 and 4.x are supported.
- **No more `[dir]` selectors.** Each utility is now a single class, so responsive and state variants (`sm:`, `hover:`) override it as expected ([#25](https://github.com/20lives/tailwindcss-rtl/issues/25)). Nested `dir` islands work ([#67](https://github.com/20lives/tailwindcss-rtl/issues/67)).
- **`dir="ltr"` is no longer required.** LTR is the default; only RTL pages need `dir="rtl"`.
- **Browser support changed.** 0.9 used `[dir]` attribute selectors, which work in every browser. 1.0 uses `:dir()` for `origin-*`, `bg-*`, `translate-s-*`/`translate-e-*` and the `forms` option (Chrome 120, Safari 16.4, Firefox 49) and logical values for `float`/`clear`. Check your browser targets in [Browser support](#browser-support).
- **Classes Tailwind already has are left to Tailwind.** The plugin generates a class only if your Tailwind version lacks it.
- **Invalid negatives are gone.** Negative padding, border width, divide width and border radius used to generate invalid CSS; they are no longer generated.
- **`start-*` and `end-*` work in LTR again** ([#69](https://github.com/20lives/tailwindcss-rtl/issues/69), thanks to [#64](https://github.com/20lives/tailwindcss-rtl/pull/64)).
- **`rounded-ts/te/bs/be` still work.** On Tailwind 3.3+ they are equivalent to core's `rounded-ss/se/es/ee`; consider switching.
- **On Tailwind 4.2+,** Tailwind deprecates `start-*`/`end-*` in favor of `inset-s-*`/`inset-e-*`.
- **Tailwind v4 values follow your `@theme`** (for example `--spacing`).
- **TypeScript types are included**, for both ESM and CJS.

The full list is in the [changelog](CHANGELOG.md).

## Contributing

Issues and pull requests are welcome.

```bash
pnpm install
pnpm test        # builds, then runs the suite against Tailwind 3.0, 3.2, 3.3, 3.4 and 4
pnpm lint
pnpm typecheck
pnpm check       # publint and are-the-types-wrong on the packed package
pnpm smoke       # builds, installs the packed package into projects on Tailwind 3.0, 3.4 and 4 (needs network)
```

### Releasing

1. Bump `version` in `package.json` and update `CHANGELOG.md`.
2. Push a tag `vX.Y.Z` that matches the version.
3. The Release workflow runs the checks and publishes to npm with trusted publishing.

Configure the trusted publisher on npmjs.com once: repository `20lives/tailwindcss-rtl`, workflow `release.yml`.

## License

[MIT](LICENSE)
