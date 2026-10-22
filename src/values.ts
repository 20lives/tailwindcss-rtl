import type { PluginApi, ThemeValues } from "./api.ts";
import type { Capabilities } from "./capabilities.ts";

interface BareValue {
  kind: string;
  value: string;
  fraction: string | null;
}

const NUMBER = /^\d+(\.\d+)?$/;
const INTEGER = /^\d+$/;

/** Theme entries whose keys are not plain numbers; numeric keys come from bare values on v4. */
function namedValues(theme: ThemeValues): ThemeValues {
  return Object.fromEntries(Object.entries(theme).filter(([key]) => !NUMBER.test(key)));
}

/**
 * `values` for utilities on a spacing scale (space-s, translate-s/e). On v3 the theme key is
 * used as-is. On v4 numeric keys resolve through `--spacing`, so a custom `@theme { --spacing }`
 * applies; like core, only non-negative multiples of 0.25 are accepted.
 */
export function spacingValues(api: PluginApi, caps: Capabilities, themeKey: string): ThemeValues {
  const theme = api.theme(themeKey);
  if (!caps.v4) return theme;
  return {
    ...namedValues(theme),
    __BARE_VALUE__: (v: BareValue) =>
      v.fraction === null && NUMBER.test(v.value) && Number(v.value) % 0.25 === 0
        ? `calc(var(--spacing) * ${v.value})`
        : undefined,
  };
}

/** `values` for divide-s: on v4 a bare integer N is N pixels, like core's divide width. */
export function divideWidthValues(api: PluginApi, caps: Capabilities): ThemeValues {
  const theme = api.theme("divideWidth");
  if (!caps.v4) return theme;
  return {
    ...namedValues(theme),
    __BARE_VALUE__: (v: BareValue) =>
      v.fraction === null && INTEGER.test(v.value) ? `${v.value}px` : undefined,
  };
}

/**
 * `values` for rounded-ts/te/bs/be. Tailwind v4's compat layer leaks the characters of a
 * string as the keys "0".."6" into `theme("borderRadius")`, so pure-digit keys are dropped.
 */
export function radiusValues(api: PluginApi, caps: Capabilities): ThemeValues {
  const theme = api.theme("borderRadius");
  if (!caps.v4) return theme;
  return Object.fromEntries(Object.entries(theme).filter(([key]) => !INTEGER.test(key)));
}
