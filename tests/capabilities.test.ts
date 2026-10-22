import { describe, expect, it } from "vitest";
import type { PluginApi, ThemeValues } from "../src/api.ts";
import { detectCapabilities } from "../src/capabilities.ts";

const none = (): void => undefined;

/**
 * A fake plugin API. `enabled` is the set of core plugins (`undefined` for Tailwind v4);
 * `themeKeys` are the theme keys that resolve, the others return `undefined` like Tailwind v3.
 */
function fakeApi(enabled?: string[], themeKeys: string[] = []): PluginApi {
  return {
    addBase: none,
    addComponents: none,
    addUtilities: none,
    matchUtilities: none,
    theme: (key) => (themeKeys.includes(key) ? {} : undefined) as ThemeValues,
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

  describe("with a restricted corePlugins list", () => {
    // Only `margin` stays enabled, so every core plugin used as a version probe is off.
    const restricted = ["margin"];

    const marginIsCore = (themeKeys: string[]) =>
      detectCapabilities(fakeApi(restricted, themeKeys)).core.margin;

    it("reads the version from theme markers", () => {
      expect(marginIsCore([])).toBe(false);
      expect(marginIsCore(["borderSpacing"])).toBe(false);
      for (const marker of ["lineClamp", "listStyleImage", "gradientColorStopPositions", "size"]) {
        expect(marginIsCore([marker]), marker).toBe(true);
      }
    });

    it("detects 3.1 from the borderSpacing theme key", () => {
      const caps = detectCapabilities(fakeApi(["textAlign"], ["borderSpacing"]));
      expect(caps.core).toEqual({ ...all(false), textAlign: true });
    });

    it("detects 3.4 from the size theme key, so float and clear are core's", () => {
      const caps = detectCapabilities(fakeApi(["margin", "float"], ["size"]));
      expect(caps.core).toEqual({ ...all(false), margin: true, float: true });
    });

    it("still treats a disabled feature as missing on 3.4", () => {
      const caps = detectCapabilities(fakeApi([], ["size"]));
      expect(caps).toEqual({ v4: false, core: all(false) });
    });
  });

  it("falls back to core plugin names when the theme lacks the markers", () => {
    expect(detectCapabilities(fakeApi(at34, []))).toEqual({ v4: false, core: all(true) });
    expect(detectCapabilities(fakeApi(at33, []))).toEqual({
      v4: false,
      core: { ...all(true), float: false, clear: false },
    });
  });

  it("reports a disabled core plugin as missing so this plugin fills it in", () => {
    const withoutMargin = at34.filter((name) => name !== "margin");
    expect(detectCapabilities(fakeApi(withoutMargin))).toEqual({
      v4: false,
      core: { ...all(true), margin: false },
    });
  });
});
