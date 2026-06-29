import { radiiTokens } from '../../tokenData';
import { PageLayout, PageCard } from '../../layout/PageLayout';

export function RadiiPage() {
  return (
    <PageLayout
      title="скругления"
      subtitle="шкала скруглений из src/carnica/tokens/spacing.ts — 6 значений"
    >
      <PageCard title="radii">
        <div className="grid grid-cols-6 gap-5">
          {radiiTokens.map(({ name, value }) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div
                className="w-20 h-20 bg-bee-el-secondary"
                style={{ borderRadius: value }}
              />
              <div className="flex flex-col items-center">
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
