import { useState, type ReactNode } from 'react';
import { IconChevronDown } from '@carnica/icons/navigation/IconChevronDown';
import { IconChevronUp } from '@carnica/icons/navigation/IconChevronUp';

// Порядок ВАЖЕН — он же отображается в сайдбаре.
export const FOUNDATIONS = [
  { id: 'icons',      label: 'иконки' },
  { id: 'colors',     label: 'цвета' },
  { id: 'typography', label: 'типографика' },
  { id: 'spacing',    label: 'отступы' },
  { id: 'radii',      label: 'скругления' },
];

// Список компонентов, у которых есть страница в showcase.
// При добавлении нового — допиши сюда. Сайдбар сам отсортирует по алфавиту.
const SIDEBAR_COMPONENTS = [
  { label: 'badge 3.0',   href: '/components/app-badge-22' },
  { label: 'button 2.5',  href: '/components/app-button-23' },
  { label: 'spinner 2.1', href: '/components/app-spinner-21' },
];

interface Props {
  currentPath: string;
}

export function Sidebar({ currentPath }: Props) {
  const components = [...SIDEBAR_COMPONENTS].sort((a, b) =>
    a.label.localeCompare(b.label, 'ru', { sensitivity: 'base' })
  );

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-bee-bg-primary border-r border-bee-border-secondary overflow-y-auto scrollbar-hide z-20">
      <nav className="p-3 flex flex-col gap-1">
        <NavLink href="#/changelog" active={currentPath === '/changelog'}>
          каталог компонентов
        </NavLink>

        {/* основы — плоский список наверху */}
        {FOUNDATIONS.map((it) => (
          <NavLink
            key={it.id}
            href={`#/foundations/${it.id}`}
            active={currentPath === `/foundations/${it.id}`}
          >
            {it.label}
          </NavLink>
        ))}

        {/* редполитика — над компонентами */}
        <NavLink href="#/rules" active={currentPath === '/rules'}>
          редполитика
        </NavLink>

        <Accordion title="VK Components" defaultOpen>
          <NavLink
            href="#/vk-components/avatar"
            active={currentPath === '/vk-components/avatar'}
            nested
          >
            Avatar
          </NavLink>
          <NavLink
            href="#/vk-components/button"
            active={currentPath === '/vk-components/button'}
            nested
          >
            Button
          </NavLink>
          <NavLink
            href="#/vk-components/users-stack"
            active={currentPath === '/vk-components/users-stack'}
            nested
          >
            Users Stack
          </NavLink>
        </Accordion>

        {/* компоненты — аккордеон, дети сортируются по алфавиту */}
        <Accordion title="компоненты" defaultOpen>
          {components.map((it) => (
            <NavLink
              key={it.href}
              href={`#${it.href}`}
              active={currentPath === it.href}
              nested
            >
              {it.label}
            </NavLink>
          ))}
        </Accordion>
      </nav>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────

function NavLink({
  href,
  active,
  nested = false,
  children,
}: {
  href: string;
  active: boolean;
  nested?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={[
        'px-3 py-2 rounded-pill text-body-sm transition-colors',
        nested ? 'ml-3' : '',
        active
          ? 'bg-bee-el-secondary text-bee-content-primary'
          : 'text-bee-content-secondary hover:text-bee-content-primary hover:bg-bee-el-secondary',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </a>
  );
}

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-pill text-body-sm text-bee-content-secondary hover:text-bee-content-primary hover:bg-bee-el-secondary transition-colors text-left"
      >
        <span className="flex-1">{title}</span>
        <span className="text-bee-content-tertiary">
          {open ? <IconChevronUp /> : <IconChevronDown />}
        </span>
      </button>
      {open ? <div className="flex flex-col gap-0.5">{children}</div> : null}
    </div>
  );
}
