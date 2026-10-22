// Installs the packed tarball into throwaway projects, one per supported Tailwind version, and
// loads it the way consumers do: native Node ESM, native Node CJS, and a real compilation.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

/** `tailwindcss` version spec, and the extra packages each major needs. */
const targets = [
  { tailwind: "3.0.24", extra: [] },
  { tailwind: "3.4.19", extra: [] },
  { tailwind: "4", extra: ["@tailwindcss/postcss@4"] },
];

const esmCheck = `
import assert from "node:assert/strict";
import postcss from "postcss";
import rtl from "tailwindcss-rtl";

assert.equal(typeof rtl, "function", "ESM default export is not a function");
assert.equal(rtl.__isOptionsFunction, true, "ESM default export lacks __isOptionsFunction");

const input = process.argv[2] === "4"
  ? '@import "tailwindcss" source(none);\\n@plugin "tailwindcss-rtl";\\n@source inline("bg-start ms-4");'
  : "@tailwind utilities;";
let plugin;
if (process.argv[2] === "4") {
  plugin = (await import("@tailwindcss/postcss")).default();
} else {
  const tailwind = (await import("tailwindcss")).default;
  plugin = tailwind({ content: [{ raw: "bg-start ms-4" }], corePlugins: { preflight: false }, plugins: [rtl] });
}
const { css } = await postcss([plugin]).process(input, { from: new URL("./input.css", import.meta.url).pathname });
assert.match(css, /background-position/, "bg-start did not generate background-position");
assert.match(css, /margin-inline-start/, "ms-4 did not generate margin-inline-start");
`;

const cjsCheck = `
const assert = require("node:assert/strict");
const rtl = require("tailwindcss-rtl");

assert.equal(typeof rtl, "function", "require() result is not a function");
assert.equal(rtl.__isOptionsFunction, true, "require() result lacks __isOptionsFunction");
`;

function run(command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: ["ignore", "inherit", "inherit"] });
}

function smoke(tarball, work, { tailwind, extra }) {
  const label = `tailwindcss@${tailwind}`;
  const project = join(work, `project-${tailwind}`);
  mkdirSync(project);
  writeFileSync(join(project, "package.json"), '{ "private": true }\n');
  writeFileSync(join(project, "check.mjs"), esmCheck);
  writeFileSync(join(project, "check.cjs"), cjsCheck);

  console.log(`\n== ${label}`);
  run(
    "npm",
    ["install", "--no-audit", "--no-fund", tarball, `tailwindcss@${tailwind}`, "postcss", ...extra],
    project,
  );
  try {
    run("node", ["check.cjs"], project);
    run("node", ["check.mjs", tailwind.startsWith("4") ? "4" : "3"], project);
  } catch (error) {
    throw new Error(`${label}: smoke check failed (${error.message})`);
  }
  console.log(`ok  ${label}: ESM import, CJS require, bg-start + ms-4 compile`);
}

const work = mkdtempSync(join(tmpdir(), "tailwindcss-rtl-smoke-"));
try {
  run("pnpm", ["pack", "--pack-destination", work], root);
  const tarball = join(
    work,
    readdirSync(work).find((name) => name.endsWith(".tgz")),
  );
  for (const target of targets) smoke(tarball, work, target);
  console.log("\nsmoke: all checks passed");
} catch (error) {
  console.error(`\nsmoke: FAILED - ${error.message}`);
  process.exitCode = 1;
} finally {
  rmSync(work, { recursive: true, force: true });
}
