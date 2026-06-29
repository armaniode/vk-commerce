import { typoStyles } from '../../tokenData';
import { PageLayout, PageCard } from '../../layout/PageLayout';

export function TypographyPage() {
  return (
    <PageLayout
      title="типографика"
      subtitle="шкала Carnica на BeelineSans Regular 400 и Medium 500 — 17 стилей"
    >
      <PageCard title="шкала стилей">
        <div className="flex flex-col">
          {typoStyles.map((style, idx) => (
            <div
              key={style.name}
              className={`grid grid-cols-[260px_1fr] gap-6 py-5 items-baseline ${
                idx === typoStyles.length - 1 ? '' : 'border-b border-bee-border-secondary'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className="text-body-accent-sm text-bee-content-primary">
                  {style.name}
                </span>
                <span className="text-caption-md text-bee-content-tertiary font-mono">
                  {style.size} / {style.lineHeight}
                </span>
                <span className="text-caption-md text-bee-content-tertiary font-mono">
                  {style.weight}
                </span>
                {style.hint ? (
                  <span className="text-caption-md text-bee-content-tertiary">
                    {style.hint}
                  </span>
                ) : null}
              </div>
              <span className={style.className}>
                {style.sample ?? 'привет, билайн — образец стиля'}
              </span>
            </div>
          ))}
        </div>
      </PageCard>
    </PageLayout>
  );
}
