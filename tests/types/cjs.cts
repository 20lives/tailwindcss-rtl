import rtl = require("../../dist/index.cjs");

const options: rtl.RtlOptions = { forms: "class" };
const plugin: rtl.RtlPlugin = rtl;

export const handlers = [rtl(options).handler, rtl({ forms: "class" }).handler, plugin().handler];

// @ts-expect-error `forms` only accepts a boolean, "base" or "class"
rtl({ forms: "x" });
