// Moon Loop — make.fun ai-excited-01 entry (r10).
// Copies the entry artwork (entry.png, sitting beside this file) into
// the output directory, byte for byte. Fully deterministic: running
// this program twice writes identical bytes both times.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if (!existsSync(sourcePath)) {
  console.error(`entry.png not found next to main.ts (${sourcePath})`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
const targetPath = join(outputDir, "entry.png");
copyFileSync(sourcePath, targetPath);
const copied = statSync(targetPath);
const original = statSync(sourcePath);
if (copied.size !== original.size) {
  console.error(
    `copy size mismatch: source ${original.size} bytes, wrote ${copied.size} bytes`,
  );
  process.exit(1);
}
const { size } = copied;
console.log(`wrote ${targetPath} (${size} bytes)`);
