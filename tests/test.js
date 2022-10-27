const postcss = require("postcss");
const tailwindcss = require("tailwindcss");

const rules = {
  "ps-[JIT_VALUE]": `.ps-\\[JIT_VALUE\\] { padding-inline-start: JIT VALUE }`,
  "pe-[JIT_VALUE]": `.pe-\\[JIT_VALUE\\] { padding-inline-end: JIT VALUE }`,
  "ms-[JIT_VALUE]": `.ms-\\[JIT_VALUE\\] { margin-inline-start: JIT VALUE }`,
  "me-[JIT_VALUE]": `.me-\\[JIT_VALUE\\] { margin-inline-end: JIT VALUE }`,
  "start-[JIT_VALUE]": `[dir="rtl"] .start-\\[JIT_VALUE\\] { right: JIT VALUE }
  [dir="left"] .start-\\[JIT_VALUE\\] { left: JIT VALUE }`,
  "end-[JIT_VALUE]": `[dir="rtl"] .end-\\[JIT_VALUE\\] { left: JIT VALUE }
[dir="left"] .end-\\[JIT_VALUE\\] { right: JIT VALUE }`,
  "border-s-[JIT_VALUE]":
    ".border-s-\\[JIT_VALUE\\] { border-inline-start-width: JIT VALUE }",
  "border-e-[JIT_VALUE]":
    ".border-e-\\[JIT_VALUE\\] { border-inline-end-width: JIT VALUE }",
  "rounded-e-[JIT_VALUE]": `[dir="ltr"] .rounded-e-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE; border-bottom-right-radius: JIT VALUE }
[dir="rtl"] .rounded-e-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE; border-bottom-left-radius: JIT VALUE }`,
  "rounded-s-[JIT_VALUE]": `[dir="ltr"] .rounded-s-\\[JIT_VALUE\\] {
    border-top-left-radius: JIT VALUE;
    border-bottom-left-radius: JIT VALUE
}
[dir="rtl"] .rounded-s-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE; border-bottom-right-radius: JIT VALUE }`,
  "rounded-te-[JIT_VALUE]":
    '[dir="rtl"] .rounded-te-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE } [dir="ltr"] .rounded-te-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE }',
  "rounded-ts-[JIT_VALUE]":
    '[dir="ltr"] .rounded-ts-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE } [dir="rtl"] .rounded-ts-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE }',
  "rounded-be-[JIT_VALUE]":
    '[dir="ltr"] .rounded-be-\\[JIT_VALUE\\] { border-bottom-right-radius: JIT VALUE } [dir="rtl"] .rounded-be-\\[JIT_VALUE\\] { border-bottom-left-radius: JIT VALUE }',
  "rounded-bs-[JIT_VALUE]":
    '[dir="rtl"] .rounded-bs-\\[JIT_VALUE\\] { border-bottom-right-radius: JIT VALUE } [dir="ltr"] .rounded-bs-\\[JIT_VALUE\\] { border-bottom-left-radius: JIT VALUE }',
  "space-s-[JIT_VALUE]":
    ".space-s-\\[JIT_VALUE\\] > :not([hidden]) ~ :not([hidden]) { --tw-space-s-reverse: 0; margin-inline-end: calc(JIT VALUE * var(--tw-space-s-reverse)); margin-inline-start: calc(JIT VALUE * calc(1 - var(--tw-space-s-reverse))) }",
  "divide-s-[JIT_VALUE]":
    ".divide-s-\\[JIT_VALUE\\] > :not([hidden]) ~ :not([hidden]) { --tw-divide-s-reverse: 0; border-inline-end-width: calc(JIT VALUE * var(--tw-divide-s-reverse)); border-inline-start-width: calc(JIT VALUE * calc(1 - var(--tw-divide-s-reverse))) }",
  "space-s-reverse":
    ".space-s-reverse > :not([hidden]) ~ :not([hidden]) { --tw-space-s-reverse: 1 }",
  "divide-s-reverse":
    ".divide-s-reverse > :not([hidden]) ~ :not([hidden]) { --tw-divide-s-reverse: 1 }",
  "text-start": `.text-start { text-align: start } [dir=\"rtl\"] .text-start { text-align: right } [dir=\"ltr\"] .text-start { text-align: left }`,
  "text-end":
    '.text-end { text-align: end } [dir="rtl"] .text-end { text-align: left } [dir="ltr"] .text-end { text-align: right }',
  "float-start":
    '[dir="rtl"] .float-start { float: right } [dir="ltr"] .float-start { float: left }',
  "float-end":
    '[dir="rtl"] .float-end { float: left } [dir="ltr"] .float-end { float: right }',
  "clear-start":
    '[dir="ltr"] .clear-start { clear: left } [dir="rtl"] .clear-start { clear: right }',
  "clear-end":
    '[dir="ltr"] .clear-end { clear: right } [dir="rtl"] .clear-end { clear: left }',
};

const trimmer = (val) => val.replace(/\s+/g, " ").trim();
Object.entries(rules).forEach(([className, expected]) => {
  it(className, () => {
    const output = postcss([
      tailwindcss({
        content: [
          {
            raw: className,
          },
        ],
        plugins: [require("../")],
      }),
    ]).process("@tailwind utilities").css;

    expect(trimmer(output)).toBe(trimmer(expected));
  });
});
