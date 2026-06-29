import { useEffect, useRef, useState } from 'react';
import { BeelineLogo } from './BeelineLogo';
import { IconSearch } from '@carnica/icons/actions/IconSearch';
import { IconSun } from '@carnica/icons/weather/IconSun';
import { IconSunFilled } from '@carnica/icons/weather/IconSunFilled';
import { IconMoon } from '@carnica/icons/weather/IconMoon';
import { IconMoonFilled } from '@carnica/icons/weather/IconMoonFilled';
import { SEARCH_INDEX, type SearchEntry } from '../lib/searchIndex';
import { useUser } from '../lib/UserContext';
import { useZoom } from '../lib/ZoomContext';

interface Props {
  theme: 'light' | 'dark';
  onTheme: (t: 'light' | 'dark') => void;
  search: string;
  onSearch: (q: string) => void;
}

export function Header({ theme, onTheme, search, onSearch }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openZoom = useZoom();
  const q = search.trim().toLowerCase();

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        // схлопываем поиск если внутри пусто
        if (search.length === 0) setExpanded(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        onSearch('');
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [search, onSearch]);

  function expand() {
    setExpanded(true);
    // фокус после анимации, чтобы курсор не скакал во время transition
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const results = q
    ? SEARCH_INDEX.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        r.section.toLowerCase().includes(q) ||
        (r.keywords ?? []).some((k) => k.toLowerCase().includes(q))
      ).slice(0, 20)
    : [];

  function pick(entry: SearchEntry) {
    if (entry.iconNode && entry.iconFullName && openZoom) {
      // иконка — открываем zoom-модалку
      openZoom({
        title:    entry.iconFullName,
        subtitle: entry.section,
        node:     entry.iconNode,
        scale:    6,
      });
    } else if (entry.href) {
      window.location.assign(entry.href);
    }
    setOpen(false);
    onSearch('');
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-bee-bg-primary border-b border-bee-border-secondary">
      <div className="h-16 px-6 flex items-center gap-4">
        <a
          href="#/"
          className="shrink-0 inline-flex items-center"
          aria-label="на главную"
        >
          <BeelineLogo size={32} />
        </a>

        <div className="ml-auto flex items-center gap-3">
          {/* Внешний враппер БЕЗ overflow-hidden — иначе клипает дропдаун
              результатов, который absolute top-full. overflow-hidden оставляем
              только на внутреннем «капсуле», чтобы width-transition выглядел чисто. */}
          <div ref={wrapRef} className="relative">
            <div
              className={`relative h-11 rounded-pill bg-bee-el-primary flex items-center transition-[width] duration-300 ease-out overflow-hidden ${
                expanded ? 'w-[240px]' : 'w-11 cursor-pointer hover:opacity-90'
              }`}
              onClick={!expanded ? expand : undefined}
              role={!expanded ? 'button' : undefined}
              aria-label={!expanded ? 'открыть поиск' : undefined}
              tabIndex={!expanded ? 0 : undefined}
              onKeyDown={(e) => {
                if (!expanded && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  expand();
                }
              }}
            >
              <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-bee-content-tertiary pointer-events-none w-6 h-6 flex items-center justify-center">
                <IconSearch />
              </span>
              <input
                ref={inputRef}
                type="search"
                value={search}
                onChange={(e) => {
                  onSearch(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="поиск"
                className={`w-full h-11 pl-11 pr-4 rounded-pill text-body-sm bg-transparent text-bee-content-primary placeholder-bee-content-tertiary focus:outline-none transition-opacity duration-200 ${
                  expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                tabIndex={expanded ? 0 : -1}
              />
            </div>

            {open && expanded && q.length > 0 ? (
              <div className="absolute top-full mt-2 left-0 right-0 bg-bee-el-primary rounded-2xl shadow-lg overflow-hidden z-40">
                {results.length === 0 ? (
                  <p className="px-4 py-3 text-caption-md text-bee-content-tertiary">
                    ничего не нашли
                  </p>
                ) : (
                  <ul className="max-h-[360px] overflow-y-auto scrollbar-hide py-1">
                    {results.map((r, i) => (
                      <li key={r.iconFullName ?? r.href ?? `${r.title}-${i}`}>
                        <button
                          type="button"
                          onClick={() => pick(r)}
                          className="w-full text-left px-4 py-2.5 hover:bg-bee-el-secondary transition-colors flex items-center gap-3"
                        >
                          {r.iconNode ? (
                            <span className="w-6 h-6 inline-flex items-center justify-center text-bee-content-primary shrink-0">
                              {r.iconNode}
                            </span>
                          ) : null}
                          <span className="flex flex-col min-w-0 flex-1">
                            <span className="text-body-accent-sm text-bee-content-primary truncate">
                              {r.title}
                            </span>
                            <span className="text-caption-md text-bee-content-tertiary truncate">
                              {r.section}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>

          <ThemeSwitch theme={theme} onTheme={onTheme} />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

function ProfileButton() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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

  const initials = user.displayName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="профиль"
        className="w-10 h-10 rounded-full bg-bee-yellow text-bee-dark flex items-center justify-center text-body-accent-sm hover:opacity-90 transition-opacity"
      >
        {initials}
      </button>
      {open ? (
        <div className="absolute right-0 top-full mt-2 min-w-[220px] bg-bee-el-primary rounded-2xl shadow-lg p-2 flex flex-col gap-1">
          <div className="px-3 py-2 flex flex-col">
            <span className="text-body-accent-sm text-bee-content-primary">
              {user.displayName}
            </span>
            <span className="text-caption-md text-bee-content-tertiary">
              {user.role === 'editor' ? 'может править' : 'только смотрит'}
            </span>
          </div>
          {user.role === 'editor' ? (
            <a
              href="#/notes"
              onClick={() => setOpen(false)}
              className="text-left px-3 py-2 rounded-pill text-body-sm text-bee-content-primary hover:bg-bee-el-secondary transition-colors"
            >
              заметки
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="text-left px-3 py-2 rounded-pill text-body-sm text-bee-content-primary hover:bg-bee-el-secondary transition-colors"
          >
            выйти
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ThemeSwitch({
  theme,
  onTheme,
}: {
  theme: 'light' | 'dark';
  onTheme: (t: 'light' | 'dark') => void;
}) {
  // ширина кнопки-кружка = 36 (w-9), gap-0.5 = 2px → translateX = 38
  const isLight = theme === 'light';
  return (
    <div className="relative inline-flex items-center bg-bee-el-primary rounded-pill p-1 gap-0.5">
      {/* плашка-индикатор слайдит между двумя позициями */}
      <span
        aria-hidden="true"
        className="absolute top-1 left-1 w-9 h-9 rounded-full bg-bee-el-secondary transition-transform duration-300 ease-out"
        style={{ transform: isLight ? 'translateX(0)' : 'translateX(38px)' }}
      />
      <button
        type="button"
        onClick={() => onTheme('light')}
        aria-label="светлая тема"
        aria-pressed={isLight}
        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isLight ? 'text-bee-content-primary' : 'text-bee-content-tertiary hover:text-bee-content-primary'
        }`}
      >
        {isLight ? <IconSunFilled /> : <IconSun />}
      </button>
      <button
        type="button"
        onClick={() => onTheme('dark')}
        aria-label="тёмная тема"
        aria-pressed={!isLight}
        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
          !isLight ? 'text-bee-content-primary' : 'text-bee-content-tertiary hover:text-bee-content-primary'
        }`}
      >
        {!isLight ? <IconMoonFilled /> : <IconMoon />}
      </button>
    </div>
  );
}
