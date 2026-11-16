// Moon Loop — make.fun ai-excited-01 entry (r9).
// Copies the entry artwork (entry.png, next to this file) into the
// output directory, byte for byte. Deterministic: two runs produce
// identical bytes.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

if (!existsSync(source)) {
  console.error(`entry.png not found next to main.ts (${source})`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const destination = join(outDir, "entry.png");
copyFileSync(source, destination);
const { size } = statSync(destination);
console.log(`wrote ${destination} (${size} bytes)`);
