import postcss from "postcss";
import { beforeAll, describe, expect, it } from "vitest";
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
  "rounded-bs",
  "rounded-bs-lg",
  "rounded-be",
  "rounded-be-lg",
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

const variantSamples = ["md:ms-4", "hover:ms-4", "md:origin-start", "hover:space-s-4"];

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

describe.each(versions)("tailwindcss %s", (tw: TwVersion) => {
  let css: string;

  beforeAll(async () => {
    css = await compile(tw, [...inventoryA, ...inventoryB, ...variantSamples]);
  });

  it("matches the CSS snapshot of every class", async () => {
    await expect(css).toMatchFileSnapshot(`./__snapshots__/tw-${tw}.css`);
  });

  it("never emits [dir] selectors", () => {
    expect(css).not.toContain("[dir");
  });

  it("emits exactly one rule per class, never duplicating core", () => {
    for (const name of [...inventoryA, ...inventoryB]) {
      expect(rulesFor(css, name), name).toHaveLength(1);
    }
  });

  it("keeps specificity at one class so responsive variants win (#25)", async () => {
    const out = await compile(tw, [
      "text-start",
      "sm:text-center",
      "origin-start",
      "sm:origin-center",
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

    for (const selector of selectors) {
      if (!/text-start|origin-start/.test(selector)) continue;
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
});

describe("tailwindcss 3.4 with a disabled core plugin", () => {
  it("still generates ms-4 itself when margin is disabled", async () => {
    const out = await compile("3.4", ["ms-4"], undefined, {
      config: { corePlugins: { margin: false } },
    });
    expect(out).toContain("margin-inline-start");
  });
});
