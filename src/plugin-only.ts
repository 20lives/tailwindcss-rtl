import type { PluginApi } from "./api.ts";
import type { Capabilities } from "./capabilities.ts";
import { divideWidthValues, radiusValues, spacingValues } from "./values.ts";

const SIBLINGS = "& > :not([hidden]) ~ :not([hidden])";

/** Utilities Tailwind core has no equivalent for; always emitted. */
export function addPluginOnlyUtilities(api: PluginApi, caps: Capabilities): void {
  const { addUtilities, matchUtilities } = api;

  matchUtilities(
    {
      "rounded-ts": (value) => ({ "border-start-start-radius": value }),
      "rounded-te": (value) => ({ "border-start-end-radius": value }),
      "rounded-bs": (value) => ({ "border-end-start-radius": value }),
      "rounded-be": (value) => ({ "border-end-end-radius": value }),
    },
    { values: radiusValues(api, caps), supportsNegativeValues: false },
  );

  // The explicit `&` selector is required: without it Tailwind v4 emits a double space.
  matchUtilities(
    {
      "space-s": (value) => ({
        [SIBLINGS]: {
          "--tw-space-s-reverse": "0",
          "margin-inline-end": `calc(${value} * var(--tw-space-s-reverse))`,
          "margin-inline-start": `calc(${value} * calc(1 - var(--tw-space-s-reverse)))`,
        },
      }),
    },
    { values: spacingValues(api, caps, "space"), supportsNegativeValues: true },
  );
  addUtilities({
    ".space-s-reverse > :not([hidden]) ~ :not([hidden])": { "--tw-space-s-reverse": "1" },
  });

  matchUtilities(
    {
      "divide-s": (value) => ({
        [SIBLINGS]: {
          "--tw-divide-s-reverse": "0",
          "border-inline-end-width": `calc(${value} * var(--tw-divide-s-reverse))`,
          "border-inline-start-width": `calc(${value} * calc(1 - var(--tw-divide-s-reverse)))`,
        },
      }),
    },
    { values: divideWidthValues(api, caps), supportsNegativeValues: false },
  );
  addUtilities({
    ".divide-s-reverse > :not([hidden]) ~ :not([hidden])": { "--tw-divide-s-reverse": "1" },
  });
}
