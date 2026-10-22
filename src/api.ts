/** A CSS-in-JS rule object as accepted by Tailwind's plugin API. */
export interface CssRules {
  [key: string]: string | string[] | CssRules | CssRules[];
}

/** A resolved theme scale, e.g. `theme("spacing")`. */
export type ThemeValues = Record<string, unknown>;

export interface MatchOptions {
  values?: ThemeValues;
  supportsNegativeValues?: boolean;
}

type MatchFunctions = Record<string, (value: string) => CssRules>;

/** The subset of Tailwind's plugin API this package calls, shared by v3 and v4. */
export interface PluginApi {
  addBase(rules: CssRules | CssRules[]): void;
  addComponents(rules: CssRules | CssRules[]): void;
  addUtilities(rules: CssRules | CssRules[]): void;
  matchUtilities(utilities: MatchFunctions, options?: MatchOptions): void;
  theme(path: string): ThemeValues;
  /** Present on Tailwind v3 only. */
  corePlugins?: (name: string) => boolean;
}
