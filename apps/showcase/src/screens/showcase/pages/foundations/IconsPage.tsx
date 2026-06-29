import { type ReactNode, type SVGProps } from 'react';
import { PageLayout, PageCard } from '../../layout/PageLayout';
import { useZoom } from '../../lib/ZoomContext';

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactNode;

interface IconEntry { category: string; name: string; Icon: IconComponent }

const iconModules = import.meta.glob<Record<string, IconComponent>>(
  '../../../../../../../src/carnica/icons/*/Icon*.tsx',
  { eager: true }
);

const ALL_ICONS: IconEntry[] = Object.entries(iconModules).flatMap(([path, mod]) => {
  const m = path.match(/icons\/([^/]+)\/(Icon[A-Za-z0-9]+)\.tsx$/);
  if (!m) return [];
  const [, category, fileName] = m;
  const exported = mod[fileName];
  if (typeof exported !== 'function') return [];
  return [{ category, name: fileName, Icon: exported }];
});

const BY_CATEGORY = ALL_ICONS.reduce<Record<string, IconEntry[]>>((acc, e) => {
  (acc[e.category] ??= []).push(e);
  return acc;
}, {});

const CATEGORIES = Object.keys(BY_CATEGORY).sort();

export function IconsPage() {
  const openZoom = useZoom();

  return (
    <PageLayout
      title="иконки"
      subtitle={`24×24 · currentColor · ${ALL_ICONS.length} файлов в ${CATEGORIES.length} категориях · клик → zoom`}
    >
      {CATEGORIES.map((cat) => {
        const list = BY_CATEGORY[cat];
        return (
          <PageCard key={cat} title={cat} hint={`${list.length} иконок`}>
            <div className="grid grid-cols-8 gap-x-3 gap-y-5">
              {list.map(({ name, Icon }) => {
                const label = name.replace(/^Icon/, '');
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => openZoom?.({
                      title: name,
                      subtitle: `${cat} · 24×24`,
                      node: <Icon />,
                      scale: 6,
                    })}
                    aria-label={`увеличить иконку ${label}`}
                    className="flex flex-col items-center gap-2 text-bee-content-primary cursor-pointer group focus-visible:outline-none"
                  >
                    <div className="w-12 h-12 rounded-xl bg-bee-el-secondary flex items-center justify-center transition-colors group-hover:bg-bee-el-tertiary group-focus-visible:ring-2 group-focus-visible:ring-bee-content-secondary/40">
                      <Icon />
                    </div>
                    <span
                      className="text-caption-md text-bee-content-tertiary text-center break-all leading-tight"
                      title={name}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </PageCard>
        );
      })}
    </PageLayout>
  );
}
