import { useState, useEffect, useRef } from 'react';
import { Button } from '@carnica/components/app';
import { ModalCloseButton } from './ModalCloseButton';
import { IconChevronDown } from '@carnica/icons/navigation/IconChevronDown';
import {
  STATUS_LABEL,
  STATUS_ORDER,
  type ComponentRecord,
  type ComponentStatus,
} from './componentsData';
import { useUser } from './lib/UserContext';

// ─────────────────────────────────────────────────────────────
// presentational helpers

const statusColors: Record<ComponentStatus, string> = {
  'added':       'bg-bee-surface-green  text-bee-dark',
  'in-progress': 'bg-bee-surface-yellow text-bee-dark',
  'needs-fixes': 'bg-bee-surface-orange text-bee-dark',
  'not-added':   'bg-bee-el-additional02 text-bee-content-secondary',
};

function formatDate(iso?: string): string {
  if (!iso) return '—';
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const [, y, mo, d] = m;
  return `${d}.${mo}.${y}`;
}

// ─────────────────────────────────────────────────────────────
// статус-дропдаун: плашка + шеврон, по клику открывается список

function StatusDropdown({
  value,
  onChange,
}: {
  value: ComponentStatus;
  onChange: (next: ComponentStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function pick(s: ComponentStatus) {
    setOpen(false);
    onChange(s);
  }

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-pill text-caption-md whitespace-nowrap transition-opacity hover:opacity-90 ${statusColors[value]}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{STATUS_LABEL[value]}</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <IconChevronDown width="14" height="14" />
        </span>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute z-20 left-0 mt-3 min-w-[180px] bg-bee-el-primary rounded-2xl p-1.5 shadow-lg flex flex-col gap-0.5"
        >
          {STATUS_ORDER.map((s) => (
            <li key={s}>
              <button
                type="button"
                role="option"
                aria-selected={s === value}
                onClick={(e) => {
                  e.stopPropagation();
                  pick(s);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-pill transition-colors hover:bg-bee-el-secondary ${s === value ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              >
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-pill text-caption-md whitespace-nowrap ${statusColors[s]}`}
                >
                  {STATUS_LABEL[s]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────
// модалка «почему нужны правки?»

interface FixReasonModalProps {
  record: ComponentRecord;
  onClose: () => void;
  onSave: (reason: string) => void;
}

function FixReasonModal({ record, onClose, onSave }: FixReasonModalProps) {
  const [reason, setReason] = useState(record.fixReason ?? '');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fix-reason-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-8 backdrop-blur-md"
      style={{ backgroundColor: 'rgb(25 28 34 / 0.5)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[520px] bg-bee-el-primary rounded-[32px] p-10 flex flex-col gap-6 text-body-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalCloseButton onClick={onClose} />

        <header className="flex flex-col gap-2 pr-16">
          <h2 id="fix-reason-title" className="text-display-sm text-bee-content-primary">
            почему нужны правки?
          </h2>
          <span className="text-body-sm text-bee-content-secondary">
            для компонента {record.name}
          </span>
        </header>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          autoFocus
          placeholder="опиши, что нужно поправить — что не так или каких нет состояний"
          className="w-full bg-bee-el-secondary text-bee-content-primary rounded-2xl px-4 py-3 text-body-sm focus:outline-none resize-none"
        />

        <div className="flex justify-end gap-2">
          <Button
            appearance="default"
            priority="secondary on bg_secondary"
            size="large"
            state="default"
            onClick={onClose}
          >
            отмена
          </Button>
          <Button
            appearance="default"
            priority="primary"
            size="large"
            state={reason.trim().length === 0 ? 'disabled' : 'default'}
            onClick={() => onSave(reason.trim())}
          >
            сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// маппинг id → href страницы (для тех у кого есть страница)

// Маппинг id → href живой страницы компонента в showcase.
// Если у компонента есть страница, его название в таблице становится кликабельной ссылкой.
const COMPONENT_HREF: Record<string, string> = {
  'app-button-23':  '#/components/app-button-23',
  'app-spinner-21': '#/components/app-spinner-21',
  'app-badge-22':   '#/components/app-badge-22',
};

// ─────────────────────────────────────────────────────────────
// сама таблица

interface ComponentsTableProps {
  records: ComponentRecord[];
  onUpdate: (id: string, patch: Partial<ComponentRecord>) => void;
}

export function ComponentsTable({ records, onUpdate }: ComponentsTableProps) {
  const { user } = useUser();
  const isEditor = user.role === 'editor';
  const [askingFor, setAskingFor] = useState<ComponentRecord | null>(null);

  function handleStatusChange(record: ComponentRecord, next: ComponentStatus) {
    if (!isEditor) return;
    if (next === 'needs-fixes') {
      setAskingFor(record);
      return;
    }
    onUpdate(record.id, { status: next, fixReason: undefined });
  }

  function applyFixReason(reason: string) {
    if (!askingFor) return;
    onUpdate(askingFor.id, { status: 'needs-fixes', fixReason: reason });
    setAskingFor(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <table className="w-full text-body-sm border-collapse table-fixed">
          <colgroup>
            <col style={{ width: '180px' }} />
            <col style={{ width: '170px' }} />
            <col style={{ width: '110px' }} />
            <col style={{ width: '130px' }} />
            <col />
          </colgroup>
          <thead>
            <tr className="text-caption-md text-bee-content-tertiary text-left">
              <th className="px-2 py-2 font-normal">компонент</th>
              <th className="px-2 py-2 font-normal">статус</th>
              <th className="px-2 py-2 font-normal whitespace-nowrap">добавлен</th>
              <th className="px-2 py-2 font-normal whitespace-nowrap">когда изменили</th>
              <th className="px-2 py-2 font-normal">комментарий</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => {
              const href = COMPONENT_HREF[r.id];
              return (
                <tr
                  key={r.id}
                  className="border-t border-bee-border-secondary"
                >
                  <td className="px-2 py-3 align-middle">
                    {href ? (
                      <a
                        href={href}
                        className="text-body-sm text-bee-content-primary hover:underline underline-offset-2 decoration-bee-content-tertiary transition-all"
                      >
                        {r.name}
                      </a>
                    ) : (
                      <span className="text-body-sm text-bee-content-primary">{r.name}</span>
                    )}
                  </td>
                  <td className="px-2 py-3 align-middle">
                    {isEditor ? (
                      <StatusDropdown
                        value={r.status}
                        onChange={(s) => handleStatusChange(r, s)}
                      />
                    ) : (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-pill text-caption-md whitespace-nowrap ${statusColors[r.status]}`}
                      >
                        {STATUS_LABEL[r.status]}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-3 align-middle text-caption-md font-mono text-bee-content-secondary whitespace-nowrap">
                    {formatDate(r.addedDate)}
                  </td>
                  <td className="px-2 py-3 align-middle text-caption-md font-mono text-bee-content-secondary whitespace-nowrap">
                    {formatDate(r.lastChange)}
                  </td>
                  <td className="px-2 py-3 align-middle text-caption-md text-bee-content-secondary">
                    {r.status === 'needs-fixes' && r.fixReason ? (
                      <span className="line-clamp-2" title={r.fixReason}>
                        {r.fixReason}
                      </span>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {askingFor ? (
        <FixReasonModal
          record={askingFor}
          onClose={() => setAskingFor(null)}
          onSave={applyFixReason}
        />
      ) : null}
    </div>
  );
}
