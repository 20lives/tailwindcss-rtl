# Changelog

## 1.0.0 (unreleased)

Supports Tailwind CSS 3.0 – 3.4 and 4.x. Every class name from 0.x keeps working. See [Migrating from 0.x](README.md#migrating-from-0x).

### Breaking

- Tailwind 2 and older are no longer supported; stay on `tailwindcss-rtl@0.9`.
- Output no longer uses `[dir=…]` selectors. Utilities now have single-class specificity, so `sm:`, `hover:` and other variants win over the base class ([#25]).
- `dir="ltr"` is no longer required; LTR is the default and only RTL pages need `dir="rtl"`.
- Classes that Tailwind core already generates are no longer emitted by the plugin, so core's output is always used ([#39], [#54]).
- Negative padding, border width, divide width and border radius are no longer generated (they were invalid CSS).
- The peer dependency is `tailwindcss ^3.0.0 || ^4.0.0`. Node.js 20 or newer is required.

### Added

- Tailwind v4 support: `@plugin "tailwindcss-rtl";`, with options in a block. Values follow your `@theme` (for example `--spacing`).
- `bg-start`, `bg-end`, `bg-top-start`, `bg-top-end`, `bg-bottom-start`, `bg-bottom-end` ([#66]).
- `translate-s-*` and `translate-e-*`, for example a switch knob that moves toward the inline end ([#32]).
- `forms` option (`true`, `"base"` or `"class"`) that mirrors the `@tailwindcss/forms` select arrow in RTL ([#18]).
- Nested `dir` islands: an element with its own `dir` keeps its own direction inside a page of the other direction ([#67]).
- Negative values for `ms-*`, `me-*`, `start-*`, `end-*`, `space-s-*`, `translate-s-*` and `translate-e-*` ([#53], [#65]).
- Arbitrary values, such as `ms-[3px]`, thanks to @vltansky ([#60], [#51]).
- TypeScript types, and both ESM and CJS builds.

### Fixed

- `start-*` and `end-*` work in LTR again, thanks to @AronNovak ([#64], [#69]).
- `start-*` and `end-*` use `inset-inline-start` and `inset-inline-end` ([#54]).
- `text-start` and `text-end` use the native `text-align: start` and `end` ([#39]).
- `divide-s-*` works with variants such as `md:` ([#31]).
- No more `Module not found: Can't resolve 'tailwindcss/lib/util/escapeClassName'`: the plugin no longer imports Tailwind internals ([#70]).

### Changed

- Rewritten in TypeScript and built with tsdown. Tooling moved to pnpm, Biome and Vitest.
- Tests run against Tailwind 3.0, 3.2, 3.3, 3.4 and 4, with CI on Node 22 and 24.
- README rewritten: Tailwind core coverage table, setup for v3 and v4, recipes and browser support.
- Releases are published from a version tag with npm trusted publishing.

[#18]: https://github.com/20lives/tailwindcss-rtl/issues/18
[#25]: https://github.com/20lives/tailwindcss-rtl/issues/25
[#31]: https://github.com/20lives/tailwindcss-rtl/issues/31
[#32]: https://github.com/20lives/tailwindcss-rtl/issues/32
[#39]: https://github.com/20lives/tailwindcss-rtl/issues/39
[#51]: https://github.com/20lives/tailwindcss-rtl/issues/51
[#53]: https://github.com/20lives/tailwindcss-rtl/issues/53
[#54]: https://github.com/20lives/tailwindcss-rtl/issues/54
[#60]: https://github.com/20lives/tailwindcss-rtl/pull/60
[#64]: https://github.com/20lives/tailwindcss-rtl/pull/64
[#65]: https://github.com/20lives/tailwindcss-rtl/issues/65
[#66]: https://github.com/20lives/tailwindcss-rtl/issues/66
[#67]: https://github.com/20lives/tailwindcss-rtl/issues/67
[#69]: https://github.com/20lives/tailwindcss-rtl/issues/69
[#70]: https://github.com/20lives/tailwindcss-rtl/issues/70
