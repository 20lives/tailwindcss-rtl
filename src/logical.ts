import type { PluginApi } from "./api.ts";
import type { Capabilities } from "./capabilities.ts";

/**
 * Logical utilities that Tailwind core only ships from a given v3 minor. Each group is added
 * only while core lacks it, with the same declarations core uses, so core always wins.
 */
export function addLogicalUtilities(api: PluginApi, caps: Capabilities): void {
  const { addUtilities, matchUtilities, theme } = api;
  const { core } = caps;

  if (!core.textAlign) {
    addUtilities({
      ".text-start": { "text-align": "start" },
      ".text-end": { "text-align": "end" },
    });
  }

  if (!core.margin) {
    matchUtilities(
      {
        ms: (value) => ({ "margin-inline-start": value }),
        me: (value) => ({ "margin-inline-end": value }),
      },
      { values: theme("margin"), supportsNegativeValues: true },
    );
  }

  if (!core.padding) {
    matchUtilities(
      {
        ps: (value) => ({ "padding-inline-start": value }),
        pe: (value) => ({ "padding-inline-end": value }),
      },
      { values: theme("padding"), supportsNegativeValues: false },
    );
  }

  if (!core.inset) {
    matchUtilities(
      {
        start: (value) => ({ "inset-inline-start": value }),
        end: (value) => ({ "inset-inline-end": value }),
      },
      { values: theme("inset"), supportsNegativeValues: true },
    );
  }

  if (!core.borderRadius) {
    matchUtilities(
      {
        "rounded-s": (value) => ({
          "border-start-start-radius": value,
          "border-end-start-radius": value,
        }),
        "rounded-e": (value) => ({
          "border-start-end-radius": value,
          "border-end-end-radius": value,
        }),
      },
      { values: theme("borderRadius"), supportsNegativeValues: false },
    );
  }

  if (!core.borderWidth) {
    matchUtilities(
      {
        "border-s": (value) => ({ "border-inline-start-width": value }),
        "border-e": (value) => ({ "border-inline-end-width": value }),
      },
      { values: theme("borderWidth"), supportsNegativeValues: false },
    );
  }

  if (!core.float) {
    addUtilities({
      ".float-start": { float: "inline-start" },
      ".float-end": { float: "inline-end" },
    });
  }

  if (!core.clear) {
    addUtilities({
      ".clear-start": { clear: "inline-start" },
      ".clear-end": { clear: "inline-end" },
    });
  }
}
