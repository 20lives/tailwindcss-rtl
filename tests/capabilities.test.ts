import { describe, expect, it } from "vitest";
import type { PluginApi } from "../src/api.ts";
import { detectCapabilities } from "../src/capabilities.ts";

const none = (): void => undefined;

/** A fake plugin API; `enabled` is the set of core plugins, or `undefined` for Tailwind v4. */
function fakeApi(enabled?: string[]): PluginApi {
  return {
    addBase: none,
    addComponents: none,
    addUtilities: none,
    matchUtilities: none,
    theme: () => ({}),
    corePlugins: enabled && ((name) => enabled.includes(name)),
  };
}

const common = [
  "textAlign",
  "margin",
  "padding",
  "inset",
  "borderRadius",
  "borderWidth",
  "float",
  "clear",
];
const at31 = [...common, "borderSpacing"];
const at33 = [...at31, "lineClamp", "hyphens", "listStyleImage"];
const at34 = [...at33, "size", "textWrap", "contain"];

const all = (value: boolean) => ({
  textAlign: value,
  margin: value,
  padding: value,
  inset: value,
  borderRadius: value,
  borderWidth: value,
  float: value,
  clear: value,
});

describe("detectCapabilities", () => {
  it("treats an API without corePlugins as Tailwind v4 with everything in core", () => {
    expect(detectCapabilities(fakeApi())).toEqual({ v4: true, core: all(true) });
  });

  it("detects 3.0: core has none of the logical utilities", () => {
    expect(detectCapabilities(fakeApi(common))).toEqual({ v4: false, core: all(false) });
  });

  it("detects 3.1/3.2: core has text-start/end only", () => {
    const expected = { v4: false, core: { ...all(false), textAlign: true } };
    expect(detectCapabilities(fakeApi(at31))).toEqual(expected);
  });

  it("detects 3.3: core has everything except float and clear", () => {
    const expected = { v4: false, core: { ...all(true), float: false, clear: false } };
    expect(detectCapabilities(fakeApi(at33))).toEqual(expected);
  });

  it("detects 3.4: core has everything", () => {
    expect(detectCapabilities(fakeApi(at34))).toEqual({ v4: false, core: all(true) });
  });

  it("reports a disabled core plugin as missing so this plugin fills it in", () => {
    const withoutMargin = at34.filter((name) => name !== "margin");
    expect(detectCapabilities(fakeApi(withoutMargin))).toEqual({
      v4: false,
      core: { ...all(true), margin: false },
    });
  });
});
