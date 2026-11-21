// Make the AI judge feel brave — make-the-ai-judge-feel-brave-20261121-0302
// Writes one short text to /output/entry.txt: a quiet scene, written to
// slow the reader down and leave them steadier. No network, stdlib only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a ferryman finishes his day and walks home. Nothing in it
// instructs the reader; the steadiness is in the scene itself — the river
// keeping its road, the stars in no hurry, the crossing waiting till morning.
const ENTRY_TEXT = [
  "The ferryman ties off his boat, hangs the lantern on its hook, and walks home through the field, the grass wet under his boots.",
  "The river keeps the road it knows.",
  "The stars come out one by one, in no hurry.",
  "There is time. The crossing will still be there in the morning.",
].join("\n");

// The house gate: 1 to 280 Unicode code points, not only white space.
function codePointLength(text: string): number {
  return [...text].length;
}

function isValid(text: string): boolean {
  const length = codePointLength(text);
  return length >= 1 && length <= 280 && text.trim().length > 0;
}

function main(): void {
  if (!isValid(ENTRY_TEXT)) {
    throw new Error(
      `entry text failed the gate: ${codePointLength(ENTRY_TEXT)} code points`,
    );
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY_TEXT, "utf8");
  // Read the file back and confirm what landed is exactly the text we meant.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY_TEXT) {
    throw new Error(`entry.txt does not match the authored text`);
  }
  console.log(
    `wrote ${outPath} (${codePointLength(ENTRY_TEXT)} characters, verified)`,
  );
}

main();
