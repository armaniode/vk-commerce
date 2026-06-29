import { PageLayout, PageCard } from '../../layout/PageLayout';
import { STATUS_LABEL, type ComponentRecord } from '../../componentsData';

// Универсальная страница для компонента, который ещё не реализован
// (статус not-added / in-progress / needs-fixes). Показывает только мета-данные.

const statusBadge: Record<string, string> = {
  'added':       'bg-bee-surface-green text-bee-content-primary',
  'in-progress': 'bg-bee-surface-yellow text-bee-content-primary',
  'needs-fixes': 'bg-bee-surface-orange text-bee-content-primary',
  'not-added':   'bg-bee-el-secondary text-bee-content-secondary',
};

export function StubComponentPage({ record }: { record: ComponentRecord }) {
  return (
    <PageLayout
      title={record.name}
      subtitle={record.note ?? 'компонент ещё не реализован'}
    >
      <PageCard>
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-pill text-body-accent-sm ${statusBadge[record.status]}`}
          >
            {STATUS_LABEL[record.status]}
          </span>
          {record.author ? (
            <span className="text-body-sm text-bee-content-secondary">
              автор: {record.author}
            </span>
          ) : null}
        </div>
        <p className="text-body-sm text-bee-content-secondary">
          живой пример и состояния появятся, когда компонент будет реализован.
          текущий статус можно менять в разделе «история обновлений»
        </p>
      </PageCard>
    </PageLayout>
  );
}
