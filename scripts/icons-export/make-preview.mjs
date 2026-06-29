#!/usr/bin/env node
// Generates an HTML side-by-side comparison: old TSX (git HEAD) vs new TSX (current).
// Picks a curated sample of 12 icons: 3 known-broken, 4 complex, 2 new, 3 sanity.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

const SAMPLES = [
  { name: "IconTrash",            path: "src/carnica/icons/actions/IconTrash.tsx",            note: "Известный сдвиг (translate 3.82, 2.12)" },
  { name: "IconCheckShield",      path: "src/carnica/icons/security/IconCheckShield.tsx",    note: "Известный сдвиг (translate 3.83, 2.25)" },
  { name: "IconEyeClose",         path: "src/carnica/icons/security/IconEyeClose.tsx",       note: "Сломана — отрицательные координаты" },
  { name: "IconFaceId",           path: "src/carnica/icons/security/IconFaceId.tsx",         note: "Сложная (translate 3.13, 3.13)" },
  { name: "IconWallet",           path: "src/carnica/icons/finance/IconWallet.tsx",          note: "Часто используется" },
  { name: "IconCalculator",       path: "src/carnica/icons/finance/IconCalculator.tsx",      note: "Часто используется" },
  { name: "IconChevronRight",     path: "src/carnica/icons/navigation/IconChevronRight.tsx", note: "Direction variant" },
  { name: "IconStar",             path: "src/carnica/icons/bookmark/IconStar.tsx",           note: "3 variants в Figma" },
  { name: "IconThumbsUp",         path: "src/carnica/icons/bookmark/IconThumbsUp.tsx",       note: "🆕 Новая (не было в репо)" },
  { name: "IconSaleCoupon",       path: "src/carnica/icons/shop/IconSaleCoupon.tsx",         note: "🆕 Новая (не было в репо)" },
  { name: "IconCheckShieldFilled",path: "src/carnica/icons/security/IconCheckShieldFilled.tsx", note: "🆕 Новый filled-вариант" },
  { name: "IconCheck",            path: "src/carnica/icons/actions/IconCheck.tsx",           note: "Простая (sanity check)" },
];

// Extract <svg ... /svg> from TSX (between `return (` and the closing `);`).
function extractSvg(tsx) {
  const m = tsx.match(/<svg[\s\S]*?<\/svg>/);
  if (!m) return null;
  // JSX → HTML attribute names: revert fillRule/clipRule for browser rendering
  return m[0]
    .replace(/fillRule="/g, 'fill-rule="')
    .replace(/clipRule="/g, 'clip-rule="')
    .replace(/strokeWidth="/g, 'stroke-width="')
    .replace(/strokeLinecap="/g, 'stroke-linecap="')
    .replace(/strokeLinejoin="/g, 'stroke-linejoin="')
    .replace(/\s*\{\.\.\.props\}/g, "")
    .replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, 'xmlns="http://www.w3.org/2000/svg"');
}

const rows = [];
for (const sample of SAMPLES) {
  let oldSvg = "<em>not in git HEAD</em>";
  try {
    const oldTsx = execSync(`git show HEAD:${sample.path}`, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    oldSvg = extractSvg(oldTsx) || "<em>parse failed</em>";
  } catch {
    // file didn't exist on HEAD (new icon)
  }
  let newSvg = "<em>missing</em>";
  if (existsSync(join(ROOT, sample.path))) {
    const newTsx = readFileSync(join(ROOT, sample.path), "utf8");
    newSvg = extractSvg(newTsx) || "<em>parse failed</em>";
  }
  rows.push({ ...sample, oldSvg, newSvg });
}

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>Icons regeneration — QA preview</title>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; margin: 24px; background: #fafafa; color: #28303f; }
  h1 { font-size: 18px; margin-bottom: 4px; }
  p.intro { color: #6b7280; margin-top: 0; margin-bottom: 24px; font-size: 13px; max-width: 700px; }
  table { border-collapse: collapse; max-width: 1000px; }
  th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: center; vertical-align: middle; }
  th { background: #f3f4f6; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #6b7280; font-weight: 600; }
  td.label { text-align: left; font-weight: 600; background: #f9fafb; max-width: 200px; }
  td.label small { font-weight: normal; color: #6b7280; display: block; margin-top: 4px; font-size: 11px; }
  td.icon { width: 100px; }
  td.icon .frame { display: inline-block; padding: 6px; background: white; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); background-image: linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px); background-size: 8px 8px; }
  td.icon svg { width: 64px; height: 64px; display: block; color: #28303f; }
  .summary { margin-top: 24px; font-size: 13px; color: #374151; max-width: 700px; line-height: 1.6; }
  .badge-new { display: inline-block; background: #ecfeff; color: #0891b2; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
</style>
</head>
<body>
  <h1>Регенерация иконок — QA preview</h1>
  <p class="intro">
    Выборка из 12 иконок: проблемные (Trash/CheckShield/EyeClose), сложные (FaceId/Wallet/Calculator), новые (ThumbsUp/SaleCoupon/CheckShieldFilled),
    и sanity-check (Check). Слева — старый TSX из <code>git HEAD</code>, справа — новый сгенерированный из Figma <code>exportAsync</code>.
    Цвет иконки = <code>currentColor</code> = #28303f, размер 64×64 (увеличено).
  </p>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>До (старый TSX из git HEAD)</th>
        <th>После (новый, Figma exportAsync)</th>
      </tr>
    </thead>
    <tbody>
      ${rows.map(r => `
      <tr>
        <td class="label">
          ${r.name}<br>
          <small>${r.note}</small>
        </td>
        <td class="icon"><div class="frame">${r.oldSvg}</div></td>
        <td class="icon"><div class="frame">${r.newSvg}</div></td>
      </tr>`).join("")}
    </tbody>
  </table>

  <div class="summary">
    <h2 style="font-size:14px;">Сводка изменений</h2>
    <ul>
      <li><b>180</b> существующих TSX переписаны с чистого Figma <code>exportAsync({format:'SVG_STRING'})</code>.</li>
      <li><b>170</b> новых TSX добавлены: filled-варианты для большинства иконок + 5 совсем новых (sale coupon, right/left arrow, thumbs up/down).</li>
      <li>Удалена обёртка <code>&lt;g transform="translate(...)"&gt;</code> — теперь координаты в абсолютном 24×24 пространстве, без округлений на translate.</li>
      <li>Все категории <code>index.ts</code> обновлены: 23 файла с сортированными экспортами.</li>
      <li>Raw SVG сохранены в <code>src/carnica/icons-raw/</code> (354 файла) — voor reproducibility и быстрого rollback.</li>
    </ul>
  </div>
</body>
</html>
`;

writeFileSync(join(__dirname, "preview-qa.html"), html);
console.log(`Preview: scripts/icons-export/preview-qa.html (${rows.length} icons)`);
