import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import tailwindV4 from "@tailwindcss/postcss";
import postcss from "postcss";
import rtl, { type RtlOptions } from "../../src/index.ts";

export type TwVersion = "3.0" | "3.2" | "3.3" | "3.4" | "4";

export const versions: TwVersion[] = ["3.0", "3.2", "3.3", "3.4", "4"];

export interface CompileOptions {
  /** Tailwind v4 only: CSS placed inside `@theme { … }`. */
  theme?: string;
  /** Also return the base and components layers, not just utilities. */
  base?: boolean;
  /** Tailwind v4 only: return the complete stylesheet with its `@layer` blocks intact. */
  raw?: boolean;
  /** Tailwind v3 only: merged into the Tailwind config; `preflight` stays disabled. */
  config?: { corePlugins?: Record<string, boolean>; [key: string]: unknown };
}

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("../..", import.meta.url));
const pluginPath = fileURLToPath(new URL("../../src/index.ts", import.meta.url));

const v3Packages: Record<Exclude<TwVersion, "4">, string> = {
  "3.0": "tailwindcss-v3-0",
  "3.2": "tailwindcss-v3-2",
  "3.3": "tailwindcss-v3-3",
  "3.4": "tailwindcss-v3-4",
};

/** Compiles `classes` with Tailwind `tw` and this plugin, returning the generated CSS. */
export async function compile(
  tw: TwVersion,
  classes: string[],
  options?: RtlOptions,
  opts: CompileOptions = {},
): Promise<string> {
  return tw === "4"
    ? compileV4(classes, options, opts)
    : compileV3(v3Packages[tw], classes, options, opts);
}

async function compileV3(
  pkg: string,
  classes: string[],
  options: RtlOptions | undefined,
  opts: CompileOptions,
): Promise<string> {
  const tailwind = require(pkg);
  const { corePlugins, ...config } = opts.config ?? {};
  const input = `${opts.base ? "@tailwind base;\n@tailwind components;\n" : ""}@tailwind utilities;`;
  const result = await postcss([
    tailwind({
      content: [{ raw: classes.join(" ") }],
      ...config,
      // Tailwind v3 reuses a context for identical configs and does not hash plugin options, so
      // surface them as an unused config key to keep compilations with different options apart.
      rtlOptions: options ?? null,
      corePlugins: { preflight: false, ...corePlugins },
      plugins: [options ? rtl(options) : rtl],
    }),
  ]).process(input, { from: undefined });
  return result.css;
}

async function compileV4(
  classes: string[],
  options: RtlOptions | undefined,
  opts: CompileOptions,
): Promise<string> {
  const pluginOptions = Object.entries(options ?? {})
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
  const input = [
    '@import "tailwindcss" source(none);',
    opts.theme ? `@theme { ${opts.theme} }` : "",
    pluginOptions ? `@plugin "${pluginPath}" { ${pluginOptions} }` : `@plugin "${pluginPath}";`,
    `@source inline("${classes.join(" ")}");`,
  ].join("\n");

  const result = await postcss([tailwindV4()]).process(input, { from: `${root}input.css` });

  if (opts.raw) return result.css;

  // Keep only the layers the plugin writes to; `@property` and `@layer properties` are noise.
  const layers = opts.base ? ["base", "components", "utilities"] : ["utilities"];
  const parts: string[] = [];
  result.root.walkAtRules("layer", (layer) => {
    if (layer.nodes && layers.includes(layer.params)) {
      parts.push(...layer.nodes.map((node) => node.toString()));
    }
  });
  return parts.join("\n");
}
