import plugin from "tailwindcss/plugin";
import { detectCapabilities } from "./capabilities.ts";
import { addFormsRtl } from "./forms.ts";
import { addLogicalUtilities } from "./logical.ts";
import { addMirroredUtilities } from "./mirrored.ts";
import { addPluginOnlyUtilities } from "./plugin-only.ts";

export interface RtlOptions {
  /** Mirror the @tailwindcss/forms select arrow in RTL. true = both strategies. */
  forms?: boolean | "base" | "class";
}

export interface RtlPlugin {
  // biome-ignore lint/suspicious/noExplicitAny: the Tailwind plugin API type is deliberately not exposed
  (options?: RtlOptions): { handler: (api: any) => void; config?: undefined };
  __isOptionsFunction: true;
}

const rtl = plugin.withOptions<RtlOptions>((options) => (api) => {
  const caps = detectCapabilities(api);
  addLogicalUtilities(api, caps);
  addPluginOnlyUtilities(api, caps);
  addMirroredUtilities(api, caps);
  addFormsRtl(api, options?.forms);
}) as unknown as RtlPlugin;

export default rtl;
