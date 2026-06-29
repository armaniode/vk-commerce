#!/usr/bin/env node
// Сопоставление Figma component_sets → TSX-компоненты в репо. ВСЕ варианты.
// Вход: manifest.json (180 sets), src/carnica/icons/<cat>/Icon*.tsx
// Выход: mapping.json (готовые пары + новые), unmatched.json (что не сошлось)

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const ICONS_DIR = join(ROOT, "src", "carnica", "icons");

// --- 1. Load Figma manifest ---
const manifest = JSON.parse(readFileSync(join(__dirname, "manifest.json"), "utf8"));

// --- 2. Scan TSX files: collect { tsxName, category } pairs ---
const tsxList = [];
for (const cat of readdirSync(ICONS_DIR)) {
  const catPath = join(ICONS_DIR, cat);
  if (!statSync(catPath).isDirectory()) continue;
  for (const f of readdirSync(catPath)) {
    if (!f.startsWith("Icon") || !f.endsWith(".tsx")) continue;
    tsxList.push({ tsxName: f.replace(/\.tsx$/, ""), category: cat });
  }
}

const toPascal = (s) =>
  s.split(/[\s_\-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join("");

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// --- 3. Direct base-name overrides for Figma sets (renames, typos, etc.) ---
const SET_OVERRIDES = {
  "lable": "IconLabel",
  "compas": "IconCompas",
  "iphone": "IconIPhone",
  "screen-menu-2": "IconScreenMenu1",
  "settings#dup": "IconSettings1",
  "mic#dup": "IconMicAlt",
  "wifi-2": "IconWifiAlt",
  "chart-alt": "IconChartAlt",
  "dots-message-2": "IconDotsMessage1",
  "question-message-3": "IconQuestionMessage1",
  "lightning-crossed-out": "IconLightningCrossed",
  "x5-points-icon": "IconX5Points",
  "pdf": "IconFilePdf",
  "doc": "IconFileDoc",
  "docx": "IconFileDocx",
  "img": "IconFileImg",
  "jpeg": "IconFileJpeg",
  "jpg": "IconFileJpg",
  "png": "IconFilePng",
  "honey-comb": "IconHoneyComb",
  "honeycombs": "IconHoneycombs",
  "calling-on-crossed": "IconCallingOnCrossed",
  // 32x32 file duplicates — skip
  "pdf#dup": "__SKIP__",
  "doc#dup": "__SKIP__",
  "docx#dup": "__SKIP__",
  "img#dup": "__SKIP__",
  "jpeg#dup": "__SKIP__",
  "jpg#dup": "__SKIP__",
  "png#dup": "__SKIP__",
};

// Per-set + variant explicit overrides (returns full TSX name, bypasses suffix logic).
// Keys are slugified: "direction=right" → "direction-right", "style=double check" → "style-double-check".
const FULL_OVERRIDES = {
  "chevron|direction-right": "IconChevronRight",
  "chevron|direction-left":  "IconChevronLeft",
  "chevron|direction-up":    "IconChevronUp",
  "chevron|direction-down":  "IconChevronDown",
  "arrows|direction-right":  "IconArrowRight",
  "arrows|direction-left":   "IconArrowLeft",
  "arrows|direction-up":     "IconArrowUp",
  "arrows|direction-down":   "IconArrowDown",
  "arrows-2|direction-up-right":    "IconArrowUpRight",
  "arrows-2|direction-up-left":     "IconArrowUpLeft",
  "arrows-2|direction-down-left":   "IconArrowDownLeft",
  "arrows-2|direction-down-right":  "IconArrowDownRight",
  "check-mark|style-check": "IconCheckMark",
  "check-mark|style-double-check": "IconDoubleCheckMark",
  // x5 points: type=spent → default, type=received → suffix
  "x5-points-icon|type-spent": "IconX5Points",
  "x5-points-icon|type-received": "IconX5PointsReceived",
  // orange has no outline variant — filled is the default
  "orange|style-filled": "IconOrange",
  "orange|style-style2": "IconOrangeStyle2",
  // Infinite is a standalone COMPONENT (not a set) — single "default" variant
  "infinite|default": "IconInfinite",
};

// Variant suffix logic (applied on top of base name from SET_OVERRIDES or auto-derived)
function variantSuffix(variantName, allVariantNames) {
  const v = variantName;
  // Default variants → no suffix
  if (v === "style=outline" || v === "Fill=False") return "";
  // Filled
  if (v === "style=filled" || v === "Fill=True") return "Filled";
  // Stroke (only used in plus/minus/close/dots round)
  if (v === "style=stroke") return "Stroke";
  // Half filled (star)
  if (v === "style=half filled") return "HalfFilled";
  // style2, style3 (orange, honey comb)
  if (v === "style=style2") return "Style2";
  if (v === "style=style3") return "Style3";
  // Single-variant sets: outline is the only one — no suffix
  return toPascal(v.replace(/^[^=]+=/, ""));
}

// --- 4. Category routing for NEW icons (not in repo yet) ---
const NEW_ICON_CATEGORIES = {
  IconSaleCoupon: "shop",
  IconSaleCouponFilled: "shop",
  IconRightArrow: "navigation",
  IconRightArrowFilled: "navigation",
  IconLeftArrow: "navigation",
  IconLeftArrowFilled: "navigation",
  IconThumbsUp: "bookmark",
  IconThumbsUpFilled: "bookmark",
  IconThumbsDown: "bookmark",
  IconThumbsDownFilled: "bookmark",
};

// --- 5. Build mapping ---
const usedTsx = new Set();
const mapping = [];
const unmatchedFigma = [];

for (const set of manifest.sets) {
  const dupKey = set._duplicate ? "#dup" : "";
  const setSlug = slugify(set.name);
  const baseKey = setSlug + dupKey;

  // Resolve base TSX name (without variant suffix)
  let baseName = SET_OVERRIDES[baseKey];
  if (baseName === "__SKIP__") {
    for (const v of set.variants) {
      unmatchedFigma.push({
        figmaName: set.name, variantName: v.name, variantId: v.id,
        expectedTsx: null, reason: "skipped (32x32 duplicate, no TSX pair in repo)",
      });
    }
    continue;
  }
  if (!baseName) baseName = "Icon" + toPascal(set.name);

  const allVariantNames = set.variants.map(v => v.name);

  for (const variant of set.variants) {
    const variantSlugForKey = slugify(variant.name);
    const fullKey = `${setSlug}${dupKey}|${variantSlugForKey}`;

    let tsxName;
    if (fullKey in FULL_OVERRIDES) {
      tsxName = FULL_OVERRIDES[fullKey];
    } else {
      tsxName = baseName + variantSuffix(variant.name, allVariantNames);
    }

    // Locate in repo
    const tsxEntry = tsxList.find(t => t.tsxName === tsxName);
    if (tsxEntry) {
      mapping.push({
        figmaSet: set.name,
        figmaVariant: variant.name,
        variantId: variant.id,
        tsxName,
        category: tsxEntry.category,
        create: false,
      });
      usedTsx.add(tsxName);
    } else if (tsxName in NEW_ICON_CATEGORIES) {
      // New icon — to be created in the planned category
      mapping.push({
        figmaSet: set.name,
        figmaVariant: variant.name,
        variantId: variant.id,
        tsxName,
        category: NEW_ICON_CATEGORIES[tsxName],
        create: true,
      });
    } else {
      // TSX doesn't exist yet — this is a "new" variant of an existing set
      // (e.g. IconMicFilled, IconMicAltFilled, IconCheckShieldFilled, ...).
      // We'll create them in the same category as the default variant.
      const baseTsx = tsxList.find(t => t.tsxName === baseName);
      const category = baseTsx ? baseTsx.category : null;
      if (category) {
        mapping.push({
          figmaSet: set.name,
          figmaVariant: variant.name,
          variantId: variant.id,
          tsxName,
          category,
          create: true,
        });
      } else {
        unmatchedFigma.push({
          figmaName: set.name, variantName: variant.name, variantId: variant.id,
          expectedTsx: tsxName, reason: `no category found (base ${baseName} not in repo)`,
        });
      }
    }
  }
}

const unmatchedTsx = tsxList
  .filter(t => !usedTsx.has(t.tsxName))
  .map(t => ({ tsxName: t.tsxName, category: t.category, reason: "no Figma set mapped to this TSX" }));

const stats = {
  totalFigmaSets: manifest.sets.length,
  totalTsxFiles: tsxList.length,
  mappedPairs: mapping.length,
  mappedExisting: mapping.filter(m => !m.create).length,
  mappedNewFiles: mapping.filter(m => m.create).length,
  unmatchedFigma: unmatchedFigma.length,
  unmatchedTsx: unmatchedTsx.length,
};

writeFileSync(
  join(__dirname, "mapping.json"),
  JSON.stringify({ _stats: stats, mapping }, null, 2)
);
writeFileSync(
  join(__dirname, "unmatched.json"),
  JSON.stringify({ _stats: stats, unmatchedFigma, unmatchedTsx }, null, 2)
);

console.log("=== Reconciliation report ===");
console.log(`Figma sets:       ${stats.totalFigmaSets}`);
console.log(`TSX files in repo:${stats.totalTsxFiles}`);
console.log(`Mapped pairs:     ${stats.mappedPairs}`);
console.log(`  existing:       ${stats.mappedExisting}`);
console.log(`  new (create):   ${stats.mappedNewFiles}`);
console.log(`Unmatched Figma:  ${stats.unmatchedFigma}`);
console.log(`Unmatched TSX:    ${stats.unmatchedTsx}`);
