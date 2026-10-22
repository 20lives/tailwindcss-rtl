import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { defineConfig } from "tsdown";

// The CJS runtime is `module.exports = rtl`, so its declaration file must say `export =`.
// tsdown only emits `export =` for modules whose sole export is the default one, and this entry
// also exports its option types, so it emits `export { rtl as default }` (flagged by attw as a
// false default export). Rewrite it to `export =`, merging the types into a namespace so
// `import rtl = require("tailwindcss-rtl")` can still reach `rtl.RtlOptions`.
const defaultMarker = "export { rtl as default };";

async function declareExportEquals(dir: string): Promise<void> {
  const file = join(dir, "index.d.cts");
  const source = await readFile(file, "utf8");
  if (!source.includes(defaultMarker)) {
    throw new Error(`${file}: expected "${defaultMarker}", tsdown's declaration output changed`);
  }
  const types = [...source.matchAll(/^export (?:interface|type) (\w+)/gm)].map((m) => m[1]);
  const body = source.replace(defaultMarker, "").replace(/^export (?=interface|type)/gm, "");
  await writeFile(
    file,
    `${body.trimEnd()}\ndeclare namespace rtl {\n  export type { ${types.join(", ")} };\n}\nexport = rtl;\n`,
  );
}

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  fixedExtension: false,
  hooks: {
    "build:done": async ({ options, chunks }) => {
      if (chunks.some((chunk) => chunk.fileName === "index.d.cts")) {
        await declareExportEquals(options.outDir);
      }
    },
  },
});
