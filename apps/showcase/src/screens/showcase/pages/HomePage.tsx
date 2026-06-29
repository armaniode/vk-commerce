import { PageLayout, PageCard } from '../layout/PageLayout';
import { SEED_COMPONENTS } from '../componentsData';

export function HomePage() {
  const totals = {
    added:        SEED_COMPONENTS.filter((c) => c.status === 'added').length,
    inProgress:   SEED_COMPONENTS.filter((c) => c.status === 'in-progress').length,
    needsFixes:   SEED_COMPONENTS.filter((c) => c.status === 'needs-fixes').length,
    notAdded:     SEED_COMPONENTS.filter((c) => c.status === 'not-added').length,
  };

  return (
    <PageLayout
      title="документация carnica"
      subtitle="каталог компонентов и foundations дизайн-системы билайн"
    >
      <PageCard title="что внутри">
        <ul className="flex flex-col gap-2 text-body-sm">
          <li>· все компоненты с состояниями и вариантами — раздел «компоненты»</li>
          <li>· типографика, цвета, spacing & radii, иконки — раздел «foundations»</li>
          <li>· таблица истории и статуса каждого компонента — «история обновлений»</li>
        </ul>
      </PageCard>

      <PageCard title="статус компонентов">
        <div className="grid grid-cols-4 gap-4">
          <Stat label="добавлен"           value={totals.added}      tone="green" />
          <Stat label="в процессе"         value={totals.inProgress} tone="yellow" />
          <Stat label="требуются правки"   value={totals.needsFixes} tone="orange" />
          <Stat label="не добавлен"        value={totals.notAdded}   tone="gray" />
        </div>
      </PageCard>
    </PageLayout>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: 'green' | 'yellow' | 'orange' | 'gray' }) {
  const bg = {
    green:  'bg-bee-surface-green',
    yellow: 'bg-bee-surface-yellow',
    orange: 'bg-bee-surface-orange',
    gray:   'bg-bee-el-secondary',
  }[tone];
  return (
    <div className={`${bg} rounded-2xl p-4 flex flex-col gap-1`}>
      <span className="text-display-sm text-bee-content-primary">{value}</span>
      <span className="text-caption-md text-bee-content-secondary">{label}</span>
    </div>
  );
}
