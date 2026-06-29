#!/usr/bin/env node
// Сохраняет результат экспорта батча в icons-raw/<tsxName>.svg.
// Usage: node save-batch.mjs <batchIdx> < svgs.json
// stdin = JSON-массив строк SVG (12 элементов, в порядке батча; null если экспорт failed)

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const RAW_DIR = join(ROOT, "src", "carnica", "icons-raw");
mkdirSync(RAW_DIR, { recursive: true });

const batchIdx = Number(process.argv[2]);
if (Number.isNaN(batchIdx)) {
  console.error("Usage: node save-batch.mjs <batchIdx> < svgs.json");
  process.exit(1);
}

const batchesData = JSON.parse(readFileSync(join(__dirname, "batches.json"), "utf8"));
const batch = batchesData.batches.find(b => b.batchIdx === batchIdx);
if (!batch) {
  console.error(`Batch ${batchIdx} not found (total: ${batchesData.totalBatches})`);
  process.exit(1);
}

// Support either stdin (single JSON array) or split files: tmp/batch-<N>-a.json + tmp/batch-<N>-b.json
let svgs;
try {
  const aPath = join(__dirname, "tmp", `batch-${batchIdx}-a.json`);
  const bPath = join(__dirname, "tmp", `batch-${batchIdx}-b.json`);
  const a = JSON.parse(readFileSync(aPath, "utf8"));
  const b = JSON.parse(readFileSync(bPath, "utf8"));
  svgs = [...a, ...b];
} catch {
  svgs = JSON.parse(readFileSync(0, "utf8"));
}
if (!Array.isArray(svgs)) {
  console.error("input must be a JSON array of SVG strings");
  process.exit(1);
}
if (svgs.length !== batch.items.length) {
  console.error(`Length mismatch: got ${svgs.length} SVGs, expected ${batch.items.length}`);
  process.exit(1);
}

let saved = 0, failed = 0;
for (let i = 0; i < batch.items.length; i++) {
  const { tsxName, id } = batch.items[i];
  const svg = svgs[i];
  if (!svg) {
    console.warn(`  [${id}] ${tsxName}: NULL (export failed)`);
    failed++;
    continue;
  }
  writeFileSync(join(RAW_DIR, `${tsxName}.svg`), svg);
  saved++;
}

console.log(`Batch ${batchIdx}: saved ${saved}/${batch.items.length}${failed ? ` (failed: ${failed})` : ""}`);
