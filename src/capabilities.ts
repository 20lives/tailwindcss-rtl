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
 * Tailwind v3 has no version API, so the minor version is inferred from markers introduced in
 * it: a default theme key (present whatever `corePlugins` says) or a core plugin name. Both are
 * checked because a restricted `corePlugins` list switches every probe plugin off. Guessing too
 * old would register `ms-*` next to core's, and duplicate registration makes arbitrary values
 * such as `ms-[3px]` ambiguous so that nothing is emitted. A user who disabled the feature
 * itself, e.g. `margin`, still gets `ms-*`/`me-*` from us.
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
  const at34 = hasTheme("size") || has("size") || has("textWrap") || has("contain");
  const at33 =
    at34 ||
    hasTheme("lineClamp") ||
    hasTheme("listStyleImage") ||
    hasTheme("gradientColorStopPositions") ||
    has("lineClamp") ||
    has("hyphens") ||
    has("listStyleImage");
  const at31 = at33 || hasTheme("borderSpacing") || has("borderSpacing");

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
