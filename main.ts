// Weirdest Job Title: Blind Judge Showdown — make.fun entry
// Writes one job title, 60 characters at most, to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// Node 22: run as `node main.ts`.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The final line, chosen from 15 candidates after a 3-round self-judge
// against the competition's own rule: a real-sounding job with one
// hilariously specific twist beats a generic oddity. "Regional Manager"
// is a dull, instantly credible corporate title; the twist is that the
// manager's territory is imaginary friends — and only for ages 4-6,
// which implies KPIs, territories and performance reviews for clients
// who do not exist. No close match appeared among the visible field
// entries (grief-counselor / mourner / apologizer / lost-sock frames).
const ENTRY = "Regional Manager of Imaginary Friends, Ages 4-6";

function main(): void {
  // Defensive gate: the competition allows one job title of at most
  // 60 characters and nothing else, on a single line.
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > 60) {
    throw new Error(`entry is ${chars.length} characters, must be 1-60`);
  }
  if (/[\r\n]/.test(ENTRY)) {
    throw new Error("entry must be a single line (no newline characters)");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Read-back: the file the grader reads must be byte-identical to the
  // gated entry, so a write failure can never silently ship a wrong line.
  if (readFileSync(outPath, "utf8") !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match ENTRY");
  }
}

main();
