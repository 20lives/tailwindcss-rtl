import type { CssRules, PluginApi } from "./api.ts";
import type { Capabilities } from "./capabilities.ts";
import { spacingValues } from "./values.ts";

// No logical CSS equivalent exists for these: the LTR value is the base declaration and the RTL
// value is nested in the same rule, so specificity stays one class and nested `dir` islands work.
const nested = (base: CssRules, rtl: CssRules): CssRules => ({
  ...base,
  "&:where(:dir(rtl))": rtl,
});

const mirrored = (property: string, ltr: string, rtl: string): CssRules =>
  nested({ [property]: ltr }, { [property]: rtl });

const positions = (property: string) => ({
  start: mirrored(property, "left", "right"),
  end: mirrored(property, "right", "left"),
  "top-start": mirrored(property, "top left", "top right"),
  "top-end": mirrored(property, "top right", "top left"),
  "bottom-start": mirrored(property, "bottom left", "bottom right"),
  "bottom-end": mirrored(property, "bottom right", "bottom left"),
});

const V3_TRANSFORM =
  "translate(var(--tw-translate-x), var(--tw-translate-y, 0)) rotate(var(--tw-rotate, 0)) skewX(var(--tw-skew-x, 0)) skewY(var(--tw-skew-y, 0)) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1))";
const V4_TRANSLATE = "var(--tw-translate-x) var(--tw-translate-y, 0)";

/** Direction-aware utilities that need an LTR value plus a nested RTL override. */
export function addMirroredUtilities(api: PluginApi, caps: Capabilities): void {
  const { addUtilities, matchUtilities } = api;

  for (const [property, prefix] of [
    ["transform-origin", "origin"],
    ["background-position", "bg"],
  ] as const) {
    addUtilities(
      Object.fromEntries(
        Object.entries(positions(property)).map(([name, rules]) => [`.${prefix}-${name}`, rules]),
      ),
    );
  }

  const transform: CssRules = caps.v4 ? { translate: V4_TRANSLATE } : { transform: V3_TRANSFORM };
  const flipped = (value: string) => `calc(${value} * -1)`;
  const translate = (ltr: string, rtl: string): CssRules =>
    nested({ "--tw-translate-x": ltr, ...transform }, { "--tw-translate-x": rtl });
  matchUtilities(
    {
      "translate-e": (value) => translate(value, flipped(value)),
      "translate-s": (value) => translate(flipped(value), value),
    },
    { values: spacingValues(api, caps, "translate"), supportsNegativeValues: true },
  );
}
