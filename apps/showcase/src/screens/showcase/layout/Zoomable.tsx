import { type ReactNode } from 'react';
import { useZoom } from '../lib/ZoomContext';

interface Props {
  title: string;
  subtitle?: string;
  scale?: number;
  className?: string;
  children: ReactNode;
}

// Обёртка вокруг живого превью компонента — клик/Enter открывает zoom-модалку
// с увеличенной версией. role=button (не <button>), чтобы внутри можно было
// держать другой <button>.

export function Zoomable({ title, subtitle, scale = 2, className = '', children }: Props) {
  const openZoom = useZoom();
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`увеличить: ${title}`}
      onClick={() => openZoom?.({ title, subtitle, scale, node: children })}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && openZoom) {
          e.preventDefault();
          openZoom({ title, subtitle, scale, node: children });
        }
      }}
      className={`inline-flex rounded-pill cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bee-content-secondary/40 focus-visible:ring-offset-2 [&>*]:drop-shadow-sm ${className}`}
    >
      <div className="pointer-events-none">{children}</div>
    </div>
  );
}
