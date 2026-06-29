import { type ReactNode } from 'react';

// Строка-демо состояний компонента: лейбл слева, набор живых превью справа.

interface Props {
  label: string;
  children: ReactNode;
  align?: 'start' | 'center';
}

export function StateRow({ label, children, align = 'center' }: Props) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-6 py-4 border-b border-bee-border-secondary last:border-b-0">
      <span className="text-body-sm text-bee-content-tertiary pt-1">{label}</span>
      <div
        className={`flex flex-wrap gap-3 ${align === 'start' ? 'items-start' : 'items-center'}`}
      >
        {children}
      </div>
    </div>
  );
}
