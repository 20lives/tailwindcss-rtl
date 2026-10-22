import type { PluginApi } from "./api.ts";

export type CoreFeature =
  | "textAlign"
  | "margin"
  | "padding"
  | "inset"
  | "borderRadius"
  | "borderWidth"
  | "float"
  | "clear";

export interface Capabilities {
  v4: boolean;
  core: Record<CoreFeature, boolean>;
}

/**
 * Reports which logical utilities Tailwind core already generates, so this plugin never
 * shadows them.
 *
 * Tailwind v3 has no version API, so the minor version is inferred from core plugins introduced
 * in it. A wrong guess costs differently per feature:
 * - Too new loses classes, so theme keys (which plugins can add, e.g. `@tailwindcss/line-clamp`
 *   adds `lineClamp`, size plugins add `size`) are never trusted on their own.
 * - Too old for the static 3.1/3.4 utilities only duplicates an identical rule.
 * - Too old for the 3.3 `matchUtilities` (`ms-*`, …) registers them twice, which makes arbitrary
 *   values such as `ms-[3px]` ambiguous so nothing is emitted. A restricted `corePlugins` list
 *   switches every probe off, so 3.3 is also recognised by a pair of default theme keys that
 *   it introduced and that no plugin defines together.
 * A user who disabled the feature itself, e.g. `margin`, gets `ms-*`/`me-*` from us.
 */
export function detectCapabilities(api: PluginApi): Capabilities {
  const corePlugins = api.corePlugins;
  if (typeof corePlugins !== "function") {
    // Tailwind v4 has no `corePlugins` and generates every logical utility itself.
    return {
      v4: true,
      core: {
        textAlign: true,
        margin: true,
        padding: true,
        inset: true,
        borderRadius: true,
        borderWidth: true,
        float: true,
        clear: true,
      },
    };
  }

  const has = (name: string) => corePlugins(name) === true;
  const hasTheme = (key: string) => api.theme(key) !== undefined;
  const at34 = has("size") || has("textWrap") || has("contain");
  const at33 =
    at34 ||
    has("lineClamp") ||
    has("hyphens") ||
    has("listStyleImage") ||
    (hasTheme("gradientColorStopPositions") && hasTheme("listStyleImage"));
  const at31 = at33 || has("borderSpacing");

  return {
    v4: false,
    core: {
      textAlign: at31 && has("textAlign"),
      margin: at33 && has("margin"),
      padding: at33 && has("padding"),
      inset: at33 && has("inset"),
      borderRadius: at33 && has("borderRadius"),
      borderWidth: at33 && has("borderWidth"),
      float: at34 && has("float"),
      clear: at34 && has("clear"),
    },
  };
}
