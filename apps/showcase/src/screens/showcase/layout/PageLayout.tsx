import { type ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function PageLayout({ title, subtitle, children }: Props) {
  return (
    <article className="flex flex-col gap-8 max-w-[920px] mx-auto px-10 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-display-sm">{title}</h1>
        {subtitle ? (
          <p className="text-body-sm text-bee-content-secondary">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </article>
  );
}

// Карточка-секция страницы. Белый фон, мягкое скругление, тонкая граница.
export function PageCard({
  title,
  hint,
  children,
}: {
  title?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-bee-bg-secondary rounded-[24px] p-8 flex flex-col gap-5">
      {title ? (
        <div className="flex items-baseline gap-3">
          <h2 className="text-body-accent-sm">{title}</h2>
          {hint ? (
            <span className="text-body-sm text-bee-content-tertiary">{hint}</span>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

// Карточка «Правила использования» — единый шаблон.
// Если данных нет — показывает явную заглушку с пометкой «нет данных».
export function UsageRulesCard({
  when,
  whenNot,
  principles,
}: {
  when?: string[];
  whenNot?: string[];
  principles?: string[];
}) {
  const hasData =
    (when && when.length > 0) ||
    (whenNot && whenNot.length > 0) ||
    (principles && principles.length > 0);

  return (
    <PageCard title="правила использования">
      {!hasData ? (
        <p className="text-body-sm text-bee-content-tertiary">
          нет данных — заполни поля «когда использовать / когда не использовать /
          ключевые принципы» в карточке компонента
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <RuleColumn label="когда использовать" items={when} />
          <RuleColumn label="когда не использовать" items={whenNot} />
          <RuleColumn label="ключевые принципы" items={principles} />
        </div>
      )}
    </PageCard>
  );
}

function RuleColumn({ label, items }: { label: string; items?: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-body-sm text-bee-content-tertiary">{label}</span>
      {items && items.length > 0 ? (
        <ul className="flex flex-col gap-1.5 text-body-sm">
          {items.map((it, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-bee-content-tertiary">·</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-body-sm text-bee-content-tertiary">—</span>
      )}
    </div>
  );
}
