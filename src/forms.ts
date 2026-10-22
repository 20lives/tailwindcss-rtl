import type { PluginApi } from "./api.ts";
import type { RtlOptions } from "./index.ts";

const ARROW = {
  "background-position": "left 0.5rem center",
  "padding-right": "0.75rem",
  "padding-left": "2.5rem",
};
const MULTIPLE_OR_SIZE = { "background-position": "initial", "padding-left": "0.75rem" };

/**
 * Mirrors the @tailwindcss/forms select arrow. These rules must come after the forms plugin's,
 * so this plugin has to be registered after it.
 */
export function addFormsRtl(api: PluginApi, forms: RtlOptions["forms"]): void {
  if (forms === true || forms === "base") {
    api.addBase({
      "select:where(:dir(rtl))": ARROW,
      'select:where([multiple]):where(:dir(rtl)), select:where([size]:not([size="1"])):where(:dir(rtl))':
        MULTIPLE_OR_SIZE,
    });
  }
  if (forms === true || forms === "class") {
    api.addComponents({
      ".form-select:where(:dir(rtl))": ARROW,
      '.form-select:where([size]:not([size="1"])):where(:dir(rtl))': MULTIPLE_OR_SIZE,
    });
  }
}
