#!/usr/bin/env node
// Regenerate TSX components from src/carnica/icons-raw/*.svg.
// Reads mapping.json and writes src/carnica/icons/<category>/<TsxName>.tsx.
// Updates index.ts in each category with sorted exports.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const ICONS_DIR = join(ROOT, "src", "carnica", "icons");
const RAW_DIR = join(ROOT, "src", "carnica", "icons-raw");

const { mapping } = JSON.parse(readFileSync(join(__dirname, "mapping.json"), "utf8"));

// Convert raw SVG → TSX inner content + viewBox
function svgToTsxInner(svg, tsxName) {
  // Extract viewBox (always "0 0 24 24" from Figma, but be safe)
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

  // Extract content between <svg ...> and </svg>
  const inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>[\s\S]*$/, "")
    .trim();

  // Replace any solid hex fill with currentColor; leave fill="none" alone
  let processed = inner.replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"');

  // JSX-ify attribute names
  processed = processed
    .replace(/fill-rule="/g, 'fillRule="')
    .replace(/clip-rule="/g, 'clipRule="')
    .replace(/stroke-width="/g, 'strokeWidth="')
    .replace(/stroke-linecap="/g, 'strokeLinecap="')
    .replace(/stroke-linejoin="/g, 'strokeLinejoin="')
    .replace(/stroke-miterlimit="/g, 'strokeMiterlimit="');

  // Indent inner by 6 spaces (inside <svg>)
  const indented = processed
    .split("\n")
    .map((line) => (line.trim() ? "      " + line.trim() : ""))
    .filter(Boolean)
    .join("\n");

  return { viewBox, inner: indented };
}

function buildTsx(tsxName, svg) {
  const { viewBox, inner } = svgToTsxInner(svg, tsxName);
  return `import type { SVGProps } from 'react';

export function ${tsxName}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
${inner}
    </svg>
  );
}
`;
}

// Group mapping by category for index.ts regeneration
const byCategory = new Map();
let written = 0, skipped = 0, errors = [];

for (const entry of mapping) {
  const svgPath = join(RAW_DIR, `${entry.tsxName}.svg`);
  if (!existsSync(svgPath)) {
    errors.push(`Missing SVG: ${entry.tsxName}.svg (category ${entry.category})`);
    continue;
  }
  const svg = readFileSync(svgPath, "utf8");
  const tsx = buildTsx(entry.tsxName, svg);
  const catDir = join(ICONS_DIR, entry.category);
  const tsxPath = join(catDir, `${entry.tsxName}.tsx`);
  writeFileSync(tsxPath, tsx);
  written++;

  if (!byCategory.has(entry.category)) byCategory.set(entry.category, new Set());
  byCategory.get(entry.category).add(entry.tsxName);
}

// Regenerate each category's index.ts to include all TSX files in alphabetical order.
// Use ACTUAL .tsx files on disk (covers both freshly regenerated and any pre-existing).
let indexFilesUpdated = 0;
for (const cat of readdirSync(ICONS_DIR)) {
  const catPath = join(ICONS_DIR, cat);
  if (!statSync(catPath).isDirectory()) continue;
  if (!readdirSync(catPath, { withFileTypes: true }).some(d => d.isFile() && d.name.startsWith("Icon") && d.name.endsWith(".tsx"))) continue;
  const tsxFiles = readdirSync(catPath)
    .filter(f => f.startsWith("Icon") && f.endsWith(".tsx"))
    .map(f => f.replace(/\.tsx$/, ""))
    .sort();
  const indexContent = tsxFiles
    .map(name => `export { ${name} } from './${name}';`)
    .join("\n") + "\n";
  writeFileSync(join(catPath, "index.ts"), indexContent);
  indexFilesUpdated++;
}

console.log(`=== TSX build report ===`);
console.log(`Mapping entries:   ${mapping.length}`);
console.log(`TSX files written: ${written}`);
console.log(`Categories upd:    ${indexFilesUpdated}`);
console.log(`Errors:            ${errors.length}`);
if (errors.length) {
  console.log("First errors:");
  errors.slice(0, 5).forEach(e => console.log("  " + e));
}
