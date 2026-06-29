import { useEffect, useState } from 'react';
import { PageLayout, PageCard } from '../layout/PageLayout';
import { ComponentsTable } from '../ComponentsTable';
import { fetchComponents, updateComponent } from '../lib/componentsRepo';
import {
  STATUS_LABEL,
  STATUS_ORDER,
  type ComponentRecord,
  type ComponentStatus,
  type Author,
} from '../componentsData';
import { useUser } from '../lib/UserContext';
import { logChange, fetchChanges, type ChangeEntry } from '../lib/auditLog';

const statusColors: Record<ComponentStatus, string> = {
  'added':       'bg-bee-surface-green  text-bee-dark',
  'in-progress': 'bg-bee-surface-yellow text-bee-dark',
  'needs-fixes': 'bg-bee-surface-orange text-bee-dark',
  'not-added':   'bg-bee-el-additional02 text-bee-content-secondary',
};

function today(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const y = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm} ${day}.${mo}.${y}`;
}

export function ChangelogPage() {
  const { user } = useUser();
  const [records, setRecords] = useState<ComponentRecord[]>([]);
  const [changes, setChanges] = useState<ChangeEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<ComponentStatus | null>(null);

  useEffect(() => {
    fetchComponents().then(setRecords);
    fetchChanges().then(setChanges);
  }, []);

  function handleUpdate(id: string, patch: Partial<ComponentRecord>) {
    const prevRecord = records.find((r) => r.id === id);
    if (!prevRecord) return;

    // Аугментируем patch: если меняется статус, добавляем автора, дату
    const isStatusChange =
      patch.status !== undefined && patch.status !== prevRecord.status;

    const enriched: Partial<ComponentRecord> = { ...patch };
    if (isStatusChange) {
      enriched.lastChange = today();
      // author назначаем из текущего юзера, если у нас есть Author-enum совпадение
      const displayName = user.displayName;
      if (displayName === 'Дима Нищев' || displayName === 'Вита Сидляр') {
        enriched.author = displayName as Author;
      }
      // если впервые перевели в not-added → added, ставим addedDate тоже
      if (
        prevRecord.status === 'not-added' &&
        patch.status !== 'not-added' &&
        !prevRecord.addedDate
      ) {
        enriched.addedDate = today();
      }
    }

    setRecords((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, ...enriched } : r));
      const updated = next.find((r) => r.id === id);
      if (updated) updateComponent(updated);
      return next;
    });

    if (isStatusChange && patch.status) {
      logChange({
        componentId: id,
        fromStatus:  prevRecord.status,
        toStatus:    patch.status,
        fixReason:   patch.fixReason,
        changedBy:   user.displayName,
      }).then(() => {
        // обновим список аудит-лога — добавим новую запись наверх
        fetchChanges().then(setChanges);
      });
    }
  }

  function selectFilter(s: ComponentStatus | null) {
    setActiveFilter(s);
  }

  const filtered = activeFilter === null
    ? records
    : records.filter((r) => r.status === activeFilter);

  const componentById = new Map(records.map((r) => [r.id, r]));

  return (
    <PageLayout title="каталог компонентов">
      <FilterChips activeFilter={activeFilter} onSelect={selectFilter} />

      <PageCard>
        <ComponentsTable records={filtered} onUpdate={handleUpdate} />
      </PageCard>

      <PageCard title="история" hint={`${changes.length} событий`}>
        {changes.length === 0 ? (
          <p className="text-body-sm text-bee-content-tertiary">
            пока никто не менял статусы
          </p>
        ) : (
          <ol className="flex flex-col">
            {changes.map((e) => {
              const comp = componentById.get(e.componentId);
              const name = comp?.name ?? e.componentId;
              return (
                <li
                  key={e.id}
                  className="grid grid-cols-[160px_1fr_280px_140px] gap-4 py-3 border-b border-bee-border-secondary last:border-b-0 items-start"
                >
                  <span className="text-caption-md font-mono text-bee-content-secondary whitespace-nowrap pt-0.5">
                    {formatDateTime(e.changedAt)}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-body-sm text-bee-content-primary">
                      {name}
                    </span>
                    {e.fixReason ? (
                      <span className="text-caption-md text-bee-content-tertiary">
                        правки: {e.fixReason}
                      </span>
                    ) : null}
                  </div>
                  <span className="flex items-center gap-2 whitespace-nowrap pt-0.5">
                    {e.fromStatus ? (
                      <span className={`inline-flex items-center px-3 py-0.5 rounded-pill text-caption-md whitespace-nowrap ${statusColors[e.fromStatus]}`}>
                        {STATUS_LABEL[e.fromStatus]}
                      </span>
                    ) : null}
                    <span className="text-bee-content-tertiary">→</span>
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-pill text-caption-md whitespace-nowrap ${statusColors[e.toStatus]}`}>
                      {STATUS_LABEL[e.toStatus]}
                    </span>
                  </span>
                  <span className="text-caption-md text-bee-content-secondary whitespace-nowrap pt-0.5">
                    {e.changedBy}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </PageCard>
    </PageLayout>
  );
}

// ─────────────────────────────────────────────────────────────

function FilterChips({
  activeFilter,
  onSelect,
}: {
  activeFilter: ComponentStatus | null;
  onSelect: (s: ComponentStatus | null) => void;
}) {
  // Первый чип «все» = сброс фильтра (activeFilter === null).
  // Остальные — конкретные статусы. Один активен в каждый момент.
  const chips: { value: ComponentStatus | null; label: string }[] = [
    { value: null, label: 'все' },
    ...STATUS_ORDER.map((s) => ({ value: s, label: STATUS_LABEL[s] })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => {
        const isActive = activeFilter === chip.value;
        return (
          <button
            key={chip.value ?? '__all__'}
            type="button"
            onClick={() => onSelect(chip.value)}
            aria-pressed={isActive}
            className={`inline-flex items-center h-11 px-4 rounded-pill text-body-sm transition-colors ${
              isActive
                ? 'bg-bee-el-active text-bee-content-invert'
                : 'bg-bee-el-primary text-bee-content-primary hover:text-bee-content-secondary'
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
