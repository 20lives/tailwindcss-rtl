import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { RtlPlugin } from "../src/index.ts";
import { compile } from "./helpers/compile.ts";

const require = createRequire(import.meta.url);
const cjsPath = fileURLToPath(new URL("../dist/index.cjs", import.meta.url));
const esmPath = fileURLToPath(new URL("../dist/index.js", import.meta.url));

const fixture = (name: string) => fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url));

const rtl: RtlPlugin = require(cjsPath);

describe("dist build", () => {
  it("CJS require returns the plugin function itself", () => {
    expect(typeof rtl).toBe("function");
    expect(rtl.__isOptionsFunction).toBe(true);
    expect(typeof rtl().handler).toBe("function");
    expect((rtl as unknown as { default?: unknown }).default).toBeUndefined();
  });

  it("ESM import has the same shape", async () => {
    const esm = (await import(esmPath)).default as RtlPlugin;
    expect(typeof esm).toBe("function");
    expect(esm.__isOptionsFunction).toBe(true);
    expect(typeof esm().handler).toBe("function");
  });

  it("generates bg-start on Tailwind 3.4 from the CJS build", async () => {
    const css = await compile("3.4", ["bg-start"], undefined, { plugins: [rtl] });
    expect(css).toContain(".bg-start");
    expect(css).toContain("background-position: left");
    expect(css).toContain(":where(:dir(rtl))");
  });

  it("generates ms-4 on Tailwind 3.0 from the CJS build", async () => {
    const css = await compile("3.0", ["ms-4"], undefined, { plugins: [rtl] });
    expect(css).toContain(".ms-4");
    expect(css).toContain("margin-inline-start");
  });

  it("generates bg-start on Tailwind 4 from dist/index.js", async () => {
    const css = await compile("4", ["bg-start"], undefined, { pluginCss: `@plugin "${esmPath}";` });
    expect(css).toContain(".bg-start");
    expect(css).toContain("background-position: left");
    expect(css).toContain(":where(:dir(rtl))");
  });

  it("loads the CJS build through @config on Tailwind 4", async () => {
    const bare = await compile("4", ["bg-start"], undefined, {
      pluginCss: `@config "${fixture("v4-bare.config.cjs")}";`,
    });
    expect(bare).toContain(".bg-start");

    const css = await compile("4", ["bg-start"], undefined, {
      base: true,
      pluginCss: `@config "${fixture("v4-options.config.cjs")}";`,
    });
    expect(css).toContain(".bg-start");
    expect(css).toContain("select:where(:dir(rtl))");
  });

  it("accepts options on Tailwind 4 from dist/index.js", async () => {
    const css = await compile("4", ["bg-start"], undefined, {
      base: true,
      pluginCss: `@plugin "${esmPath}" { forms: true; }`,
    });
    expect(css).toContain("select:where(:dir(rtl))");
    expect(css).toContain(".bg-start");
  });
});

/** Position of the first match of `pattern`, failing the test if the rule is missing. */
function positionOf(css: string, pattern: RegExp): number {
  const match = pattern.exec(css);
  expect(match, `${pattern} in\n${css}`).not.toBeNull();
  return match?.index ?? -1;
}

describe("dist build with the real @tailwindcss/forms", () => {
  const forms = require("@tailwindcss/forms");

  describe.each(["3.4", "4"] as const)("tailwindcss %s", (tw) => {
    it("places the base select arrow after forms' select rule", async () => {
      const css = await compile(tw, ["block"], undefined, {
        base: true,
        plugins: [forms, rtl({ forms: true })],
        pluginCss: `@plugin "@tailwindcss/forms";\n@plugin "${esmPath}" { forms: true; }`,
      });
      const formsSelect = positionOf(
        css,
        /^\s*select \{[^}]*background-position: right 0\.5rem center;/m,
      );
      const ourSelect = positionOf(css, /^\s*select:where\(:dir\(rtl\)\) \{/m);
      expect(ourSelect).toBeGreaterThan(formsSelect);
    });

    it("places the class strategy arrow after forms' .form-select", async () => {
      const css = await compile(tw, ["form-select"], undefined, {
        base: true,
        plugins: [forms({ strategy: "class" }), rtl({ forms: "class" })],
        pluginCss: `@plugin "@tailwindcss/forms" { strategy: class; }\n@plugin "${esmPath}" { forms: class; }`,
      });
      const formsClass = positionOf(css, /(?:^|\})\s*\.form-select \{/m);
      const ourClass = positionOf(css, /(?:^|\})\s*\.form-select:where\(:dir\(rtl\)\) \{/m);
      expect(ourClass).toBeGreaterThan(formsClass);
    });
  });
});
