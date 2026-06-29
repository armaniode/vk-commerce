import { PageLayout, PageCard } from '../layout/PageLayout';

export function NotFoundPage({ path }: { path: string }) {
  return (
    <PageLayout title="страница не найдена" subtitle={path}>
      <PageCard>
        <a
          href="#/"
          className="text-body-accent-sm text-bee-content-primary hover:text-bee-content-secondary"
        >
          ← на главную
        </a>
      </PageCard>
    </PageLayout>
  );
}
