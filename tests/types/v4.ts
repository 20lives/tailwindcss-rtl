import type { Config } from "tailwindcss";
import rtl from "../../src/index.ts";

export const config: Config = {
  content: [],
  plugins: [rtl, rtl({ forms: true }), rtl({ forms: "base" }), rtl({ forms: "class" }), rtl()],
};

// @ts-expect-error `forms` only accepts a boolean, "base" or "class"
rtl({ forms: "x" });
