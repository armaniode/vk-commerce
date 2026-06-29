import { spacingTokens } from '../../tokenData';
import { PageLayout, PageCard } from '../../layout/PageLayout';

export function SpacingPage() {
  return (
    <PageLayout
      title="отступы"
      subtitle="шкала отступов из src/carnica/tokens/spacing.ts — 6 значений"
    >
      <PageCard title="spacing">
        <div className="flex items-end gap-8">
          {spacingTokens.map(({ name, value }) => (
            <div key={name} className="flex flex-col items-start gap-2">
              <div
                className="bg-bee-yellow rounded-sm"
                style={{ width: value, height: value }}
              />
              <div className="flex flex-col">
                <span className="text-caption-accent-md">{name}</span>
                <span className="text-caption-md text-bee-content-tertiary font-mono">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </PageCard>
    </PageLayout>
  );
}
