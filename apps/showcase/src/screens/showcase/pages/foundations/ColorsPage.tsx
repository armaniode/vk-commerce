import { colorGroups, type ColorToken } from '../../tokenData';
import { PageLayout, PageCard } from '../../layout/PageLayout';
import { useCarnicaTheme } from '@carnica/shared';

export function ColorsPage() {
  // Подписка на смену темы — без этого свотчи с CSS-var не обновятся при flip.
  useCarnicaTheme();

  return (
    <PageLayout
      title="цвета"
      subtitle={`полная палитра bee-* токенов · ${colorGroups.length} групп`}
    >
      {colorGroups.map((group) => (
        <PageCard key={group.title}>
          <h3 className="text-body-accent-md text-bee-content-primary mb-5">
            {group.title}
          </h3>
          <div className="grid grid-cols-4 gap-5">
            {group.tokens.map((t) => (
              <Swatch key={t.name} token={t} />
            ))}
          </div>
        </PageCard>
      ))}
    </PageLayout>
  );
}

// Читает живое значение CSS-переменной из document.documentElement.
// Возвращает либо hex (`#RRGGBB` / `#RRGGBBAA`), либо строку «r g b»
// (для rgb-триплетов, в этом случае конвертирует в hex).
function readLiveColor(token: ColorToken): string {
  if (!token.cssVar || typeof document === 'undefined') return token.hex;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(token.cssVar)
    .trim();
  if (!raw) return token.hex;
  if (raw.startsWith('#')) return raw.toUpperCase();
  // RGB-триплет вида "40 48 63" → переводим в #RRGGBB
  const parts = raw.split(/\s+/).map((n) => parseInt(n, 10));
  if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
    return (
      '#' +
      parts
        .map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()
    );
  }
  return token.hex;
}

function Swatch({ token }: { token: ColorToken }) {
  // Живое значение из CSS-var (если есть) или fallback hex для констант
  const liveHex = readLiveColor(token);
  const hasAlpha = liveHex.length === 9;
  // лёгкая обводка использует bee-border-secondary — автоматически адаптируется
  // под текущую тему через CSS-vars (светлая граница в тёмной теме и наоборот)
  const ringColor = 'rgba(var(--bee-border-primary) / 0.35)';

  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-20 rounded-xl"
        style={{
          backgroundColor: liveHex,
          backgroundImage: hasAlpha
            ? 'linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%), linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%)'
            : undefined,
          backgroundSize: hasAlpha ? '12px 12px' : undefined,
          backgroundPosition: hasAlpha ? '0 0, 6px 6px' : undefined,
          boxShadow: hasAlpha
            ? `inset 0 0 0 1000px ${liveHex}, inset 0 0 0 1px ${ringColor}`
            : `inset 0 0 0 1px ${ringColor}`,
        }}
      />
      <div className="flex flex-col">
        <span className="text-caption-accent-md break-all text-bee-content-primary">
          {token.name}
        </span>
        <span className="text-caption-md font-mono text-bee-content-tertiary">
          {liveHex.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
