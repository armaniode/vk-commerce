// Fix BeelineSans — post-processing plugin for Figma MCP generated layouts
// Fixes glyph cache: re-sets characters with Beeline Sans loaded locally

const BEELINE_FONTS = [
  { family: 'Beeline Sans', style: 'Regular' },
  { family: 'Beeline Sans', style: 'Medium' },
];

async function fixTextNodes() {
  // Determine scope: selection or entire page
  const nodes = figma.currentPage.selection.length > 0
    ? figma.currentPage.selection
    : [figma.currentPage];

  // Find all text nodes
  const textNodes = [];
  for (const node of nodes) {
    if (node.type === 'TEXT') {
      textNodes.push(node);
    } else if ('findAll' in node) {
      textNodes.push(...node.findAll(n => n.type === 'TEXT'));
    }
  }

  if (textNodes.length === 0) {
    figma.notify('Текстовых слоёв не найдено');
    figma.closePlugin();
    return;
  }

  // Pre-load both Beeline Sans weights
  let fontsLoaded = 0;
  for (const font of BEELINE_FONTS) {
    try {
      await figma.loadFontAsync(font);
      fontsLoaded++;
    } catch (e) {
      // Font not available — skip
    }
  }

  if (fontsLoaded === 0) {
    figma.notify('Beeline Sans не найден. Установи шрифт на компьютер и перезапусти Figma.', { error: true });
    figma.closePlugin();
    return;
  }

  let fixed = 0;
  let skipped = 0;

  for (const textNode of textNodes) {
    try {
      const fontName = textNode.fontName;

      // Skip nodes with mixed fonts (styled ranges)
      if (fontName === figma.mixed) {
        skipped++;
        continue;
      }

      // Only fix nodes that should be Beeline Sans
      if (fontName.family !== 'Beeline Sans') {
        skipped++;
        continue;
      }

      // Load the exact font weight this node uses
      await figma.loadFontAsync(fontName);

      // Force glyph cache refresh:
      // 1. Explicitly re-set fontName (even if same) to force font engine reload
      textNode.fontName = fontName;
      // 2. Change characters to force re-render (same value is optimized away by Figma)
      const chars = textNode.characters;
      if (chars.length > 0) {
        textNode.characters = '';     // force actual change
        textNode.characters = chars;  // restore original text
        fixed++;
      }
    } catch (e) {
      skipped++;
    }
  }

  figma.notify(`BeelineSans: ${fixed} исправлено, ${skipped} пропущено (всего ${textNodes.length})`);
  figma.closePlugin();
}

fixTextNodes();
