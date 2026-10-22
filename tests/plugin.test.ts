import postcss from "postcss";
import { beforeAll, describe, expect, it } from "vitest";
import type { RtlOptions } from "../src/index.ts";
import { compile, type TwVersion, versions } from "./helpers/compile.ts";

/** Inventory A: gap-fillers for logical utilities that Tailwind core gained over time. */
const inventoryA = [
  "text-start",
  "text-end",
  "ms-4",
  "-ms-4",
  "ms-auto",
  "ms-[3px]",
  "me-4",
  "-me-4",
  "me-[3px]",
  "ps-4",
  "ps-[3px]",
  "pe-4",
  "pe-[3px]",
  "start-4",
  "-start-4",
  "start-1/2",
  "start-[10%]",
  "end-4",
  "-end-4",
  "end-[10%]",
  "rounded-s",
  "rounded-s-lg",
  "rounded-s-[3px]",
  "rounded-e",
  "rounded-e-lg",
  "rounded-e-[3px]",
  "border-s",
  "border-s-2",
  "border-s-[3px]",
  "border-e",
  "border-e-4",
  "border-e-[3px]",
  "float-start",
  "float-end",
  "clear-start",
  "clear-end",
];

/** Inventory B: utilities only this plugin provides. */
const inventoryB = [
  "rounded-ts",
  "rounded-ts-lg",
  "rounded-ts-[3px]",
  "rounded-te",
  "rounded-te-lg",
  "rounded-te-[3px]",
  "rounded-bs",
  "rounded-bs-lg",
  "rounded-bs-[3px]",
  "rounded-be",
  "rounded-be-lg",
  "rounded-be-[3px]",
  "space-s-4",
  "-space-s-4",
  "space-s-0.5",
  "space-s-px",
  "space-s-[3px]",
  "space-s-reverse",
  "divide-s",
  "divide-s-2",
  "divide-s-[3px]",
  "divide-s-reverse",
  "origin-start",
  "origin-end",
  "origin-top-start",
  "origin-top-end",
  "origin-bottom-start",
  "origin-bottom-end",
];

/** Inventory C: utilities new in 1.0. */
const inventoryC = [
  "bg-start",
  "bg-end",
  "bg-top-start",
  "bg-top-end",
  "bg-bottom-start",
  "bg-bottom-end",
  "translate-e-4",
  "-translate-e-4",
  "translate-e-1/2",
  "translate-e-px",
  "translate-e-[3px]",
  "translate-s-4",
  "-translate-s-4",
  "translate-s-1/2",
  "translate-s-[3px]",
];

const variantSamples = [
  "md:ms-4",
  "hover:ms-4",
  "md:origin-start",
  "hover:space-s-4",
  "md:translate-e-4",
  "md:bg-start",
];

const escapeClass = (name: string) => name.replace(/[^\w-]/g, (char) => `\\${char}`);

/** Top-level rules (not CSS-nested ones) whose selector is exactly the class or its descendant. */
function rulesFor(css: string, name: string): string[] {
  const selector = `.${escapeClass(name)}`;
  const found: string[] = [];
  postcss.parse(css).walkRules((rule) => {
    if (rule.parent?.type === "rule") return;
    if (rule.selector === selector || rule.selector.startsWith(`${selector} `)) {
      found.push(rule.selector);
    }
  });
  return found;
}

const normalize = (selector: string) => selector.replace(/\s+/g, " ");

/** Declarations written directly in the rule with this exact selector. */
function declarations(css: string, selector: string): Record<string, string> {
  const found: Record<string, string> = {};
  postcss.parse(css).walkRules((rule) => {
    if (normalize(rule.selector) !== selector) return;
    rule.each((node) => {
      if (node.type === "decl") found[node.prop] = node.value;
    });
  });
  return found;
}

/** The base declarations of a utility and its RTL override, whether flat (v3) or nested (v4). */
function mirroredDeclarations(css: string, name: string) {
  const selector = `.${escapeClass(name)}`;
  const flat = declarations(css, `${selector}:where(:dir(rtl))`);
  let nested: Record<string, string> = {};
  postcss.parse(css).walkRules((rule) => {
    if (normalize(rule.selector) !== selector) return;
    for (const child of rule.nodes) {
      if (child.type === "rule" && child.selector === "&:where(:dir(rtl))") {
        nested = Object.fromEntries(
          child.nodes.flatMap((node) => (node.type === "decl" ? [[node.prop, node.value]] : [])),
        );
      }
    }
  });
  return {
    ltr: declarations(css, selector),
    rtl: Object.keys(flat).length > 0 ? flat : nested,
  };
}

const allSelectors = (css: string): string[] => {
  const selectors: string[] = [];
  postcss.parse(css).walkRules((rule) => {
    selectors.push(normalize(rule.selector));
  });
  return selectors;
};

const FORMS_RULES = {
  baseArrow: "select:where(:dir(rtl))",
  baseReset:
    'select:where([multiple]):where(:dir(rtl)), select:where([size]:not([size="1"])):where(:dir(rtl))',
  classArrow: ".form-select:where(:dir(rtl))",
  classReset: '.form-select:where([size]:not([size="1"])):where(:dir(rtl))',
};

const V3_TRANSFORM =
  "translate(var(--tw-translate-x), var(--tw-translate-y, 0)) rotate(var(--tw-rotate, 0)) skewX(var(--tw-skew-x, 0)) skewY(var(--tw-skew-y, 0)) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1))";

const v3Versions = versions.filter((tw) => tw !== "4");

describe.each(versions)("tailwindcss %s", (tw: TwVersion) => {
  let css: string;

  beforeAll(async () => {
    css = await compile(tw, [...inventoryA, ...inventoryB, ...inventoryC, ...variantSamples]);
  });

  it("matches the CSS snapshot of every class", async () => {
    await expect(css).toMatchFileSnapshot(`./__snapshots__/tw-${tw}.css`);
  });

  it("never emits [dir] selectors", () => {
    expect(css).not.toContain("[dir");
  });

  it("emits exactly one rule per class, never duplicating core", () => {
    for (const name of [...inventoryA, ...inventoryB, ...inventoryC]) {
      expect(rulesFor(css, name), name).toHaveLength(1);
    }
  });

  it("keeps specificity at one class so responsive variants win (#25)", async () => {
    const out = await compile(tw, [
      "text-start",
      "sm:text-center",
      "origin-start",
      "sm:origin-center",
      "bg-start",
      "sm:bg-center",
    ]);
    const selectors: string[] = [];
    postcss.parse(out).walkRules((rule) => {
      selectors.push(rule.selector);
    });
    const index = (selector: string) => selectors.indexOf(selector);

    expect(index(".text-start")).toBeGreaterThanOrEqual(0);
    expect(index(".text-start")).toBeLessThan(index(".sm\\:text-center"));
    expect(index(".origin-start")).toBeGreaterThanOrEqual(0);
    expect(index(".origin-start")).toBeLessThan(index(".sm\\:origin-center"));
    expect(index(".bg-start")).toBeGreaterThanOrEqual(0);
    expect(index(".bg-start")).toBeLessThan(index(".sm\\:bg-center"));

    for (const selector of selectors) {
      if (!/text-start|origin-start|bg-start/.test(selector)) continue;
      const withoutWhere = selector.replace(/:where\((?:[^()]|\([^()]*\))*\)/g, "");
      expect(withoutWhere.match(/\./g), selector).toHaveLength(1);
    }
  });

  it("generates nothing for invalid negatives (B7)", async () => {
    const out = await compile(tw, [
      "-ps-4",
      "-pe-4",
      "-border-s-2",
      "-divide-s-2",
      "-rounded-ts-lg",
    ]);
    expect(out).not.toMatch(/-(ps|pe|border-s|divide-s|rounded-ts)-/);
  });

  it("uses logical inset properties for start/end, never left/right (B1, #69)", async () => {
    const out = await compile(tw, ["start-4", "end-[10%]"]);
    expect(out).toContain("inset-inline-start");
    expect(out).toContain("inset-inline-end");
    expect(out).not.toMatch(/(^|[\s{;])(left|right)\s*:/);
  });
});

describe("tailwindcss 4 theme", () => {
  it("follows a custom --spacing (B6)", async () => {
    const out = await compile("4", ["ms-4", "space-s-4"], undefined, { theme: "--spacing: 3px;" });
    expect(out).not.toContain("1rem");
    expect(out).toContain("calc(var(--spacing) * 4)");
    expect(rulesFor(out, "space-s-4")).toHaveLength(1);
    expect(out).toMatch(/margin-inline-end: calc\(calc\(var\(--spacing\) \* 4\)/);
  });

  it("rejects bare values that are not a multiple of 0.25 or not an integer", async () => {
    const out = await compile("4", ["space-s-0.3", "divide-s-1.5"]);
    expect(out.trim()).toBe("");
  });
});

describe("tailwindcss 3.4 with a disabled core plugin", () => {
  it("still generates ms-4 itself when margin is disabled", async () => {
    const out = await compile("3.4", ["ms-4"], undefined, {
      config: { corePlugins: { margin: false } },
    });
    expect(out).toContain("margin-inline-start");
  });
});

describe.each(v3Versions)("tailwindcss %s translate-s/e", (tw: TwVersion) => {
  it("mirrors the x offset and sets the exact v3 transform", async () => {
    const e = mirroredDeclarations(await compile(tw, ["translate-e-4"]), "translate-e-4");
    expect(e.ltr).toEqual({ "--tw-translate-x": "1rem", transform: V3_TRANSFORM });
    expect(e.rtl).toEqual({ "--tw-translate-x": "calc(1rem * -1)" });
  });

  it("supports negative values", async () => {
    const s = mirroredDeclarations(await compile(tw, ["-translate-s-4"]), "-translate-s-4");
    expect(s.ltr["--tw-translate-x"]).toBe("calc(-1rem * -1)");
    expect(s.rtl).toEqual({ "--tw-translate-x": "-1rem" });
  });

  it("resolves fractions and arbitrary values", async () => {
    const half = mirroredDeclarations(await compile(tw, ["translate-e-1/2"]), "translate-e-1/2");
    expect(half.ltr["--tw-translate-x"]).toBe("50%");
    const arbitrary = mirroredDeclarations(
      await compile(tw, ["translate-e-[3px]"]),
      "translate-e-[3px]",
    );
    expect(arbitrary.ltr["--tw-translate-x"]).toBe("3px");
  });
});

describe("tailwindcss 4 translate-s/e", () => {
  it("follows a custom --spacing and uses the translate property", async () => {
    const out = await compile("4", ["translate-e-4"], undefined, { theme: "--spacing: 3px;" });
    const e = mirroredDeclarations(out, "translate-e-4");
    expect(e.ltr).toEqual({
      "--tw-translate-x": "calc(var(--spacing) * 4)",
      translate: "var(--tw-translate-x) var(--tw-translate-y, 0)",
    });
    expect(e.rtl).toEqual({ "--tw-translate-x": "calc(calc(var(--spacing) * 4) * -1)" });
    expect(out).not.toContain("1rem");
  });

  it("resolves theme keys such as 1/2 and arbitrary values", async () => {
    const half = mirroredDeclarations(await compile("4", ["translate-e-1/2"]), "translate-e-1/2");
    expect(half.ltr["--tw-translate-x"]).toBe("50%");
    const arbitrary = mirroredDeclarations(
      await compile("4", ["translate-e-[3px]"]),
      "translate-e-[3px]",
    );
    expect(arbitrary.ltr["--tw-translate-x"]).toBe("3px");
  });
});

describe.each(versions)("tailwindcss %s forms option", (tw: TwVersion) => {
  const rulesOf = async (options?: RtlOptions) =>
    allSelectors(await compile(tw, ["form-select"], options, { base: true }));
  const emitted = (selectors: string[]) =>
    Object.entries(FORMS_RULES)
      .filter(([, selector]) => selectors.includes(selector))
      .map(([key]) => key);

  it("emits nothing by default or when disabled", async () => {
    expect(emitted(await rulesOf())).toEqual([]);
    expect(emitted(await rulesOf({ forms: false }))).toEqual([]);
  });

  it("emits both strategies for true, each reset after its arrow rule", async () => {
    const selectors = await rulesOf({ forms: true });
    expect(emitted(selectors)).toHaveLength(4);
    const index = (key: keyof typeof FORMS_RULES) => selectors.indexOf(FORMS_RULES[key]);
    expect(index("baseArrow")).toBeLessThan(index("baseReset"));
    expect(index("classArrow")).toBeLessThan(index("classReset"));
  });

  it("emits only the select rules for base", async () => {
    expect(emitted(await rulesOf({ forms: "base" }))).toEqual(["baseArrow", "baseReset"]);
  });

  it("ignores unknown values without throwing", async () => {
    expect(emitted(await rulesOf({ forms: "x" as never }))).toEqual([]);
  });

  it("emits only the .form-select rules for class", async () => {
    expect(emitted(await rulesOf({ forms: "class" }))).toEqual(["classArrow", "classReset"]);
  });

  it("mirrors the select arrow and padding", async () => {
    const css = await compile(tw, ["form-select"], { forms: true }, { base: true });
    expect(declarations(css, FORMS_RULES.baseArrow)).toEqual({
      "background-position": "left 0.5rem center",
      "padding-right": "0.75rem",
      "padding-left": "2.5rem",
    });
    expect(declarations(css, FORMS_RULES.classReset)).toEqual({
      "background-position": "initial",
      "padding-left": "0.75rem",
    });
  });
});

// On v4 the base rules sit in `@layer base` and the class rules in `@layer utilities`, so cascade
// layers order them; on v3 the base layer is emitted before components.
describe.each(v3Versions)("tailwindcss %s forms ordering", (tw: TwVersion) => {
  it("emits the base rules before the class rules", async () => {
    const css = await compile(tw, ["form-select"], { forms: true }, { base: true });
    const selectors = allSelectors(css);
    expect(selectors.indexOf(FORMS_RULES.baseReset)).toBeGreaterThanOrEqual(0);
    expect(selectors.indexOf(FORMS_RULES.baseReset)).toBeLessThan(
      selectors.indexOf(FORMS_RULES.classArrow),
    );
  });
});

describe("tailwindcss 4 forms layers", () => {
  it("puts the base rules in @layer base and the class rules in @layer utilities", async () => {
    const css = await compile("4", ["form-select"], { forms: true }, { raw: true });
    const layerOf = (selector: string): string[] => {
      const layers: string[] = [];
      postcss.parse(css).walkRules((rule) => {
        if (normalize(rule.selector) !== selector) return;
        const layer = rule.parent;
        if (layer?.type === "atrule" && (layer as postcss.AtRule).name === "layer") {
          layers.push((layer as postcss.AtRule).params);
        }
      });
      return layers;
    };
    expect(layerOf(FORMS_RULES.baseArrow)).toEqual(["base"]);
    expect(layerOf(FORMS_RULES.baseReset)).toEqual(["base"]);
    expect(layerOf(FORMS_RULES.classArrow)).toEqual(["utilities"]);
    expect(layerOf(FORMS_RULES.classReset)).toEqual(["utilities"]);
  });
});
