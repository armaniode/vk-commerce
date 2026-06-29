#!/usr/bin/env node
// Делит mapping.json на батчи по N variants и сохраняет batches.json.
// Каждый батч — JSON-массив [{id, tsxName}, ...], готовый к вставке в use_figma.

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BATCH_SIZE = Number(process.argv[2] || 12);

const { mapping } = JSON.parse(readFileSync(join(__dirname, "mapping.json"), "utf8"));

// Deduplicate by tsxName (some entries can collide if reconcile has bugs — safety)
const seen = new Set();
const items = [];
for (const m of mapping) {
  if (seen.has(m.tsxName)) continue;
  seen.add(m.tsxName);
  items.push({ id: m.variantId, tsxName: m.tsxName });
}

const batches = [];
for (let i = 0; i < items.length; i += BATCH_SIZE) {
  batches.push({ batchIdx: batches.length, items: items.slice(i, i + BATCH_SIZE) });
}

writeFileSync(
  join(__dirname, "batches.json"),
  JSON.stringify({ totalItems: items.length, batchSize: BATCH_SIZE, totalBatches: batches.length, batches }, null, 2)
);

console.log(`Prepared ${batches.length} batches × ${BATCH_SIZE} items (total ${items.length} icons)`);
