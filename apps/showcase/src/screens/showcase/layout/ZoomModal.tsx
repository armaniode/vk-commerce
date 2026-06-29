import { useEffect } from 'react';
import { ModalCloseButton } from '../ModalCloseButton';
import { CopyableTitle } from '../CopyableTitle';
import type { ZoomState } from '../lib/ZoomContext';

interface Props {
  zoom: ZoomState;
  onClose: () => void;
}

export function ZoomModal({ zoom, onClose }: Props) {
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
      aria-labelledby="zoom-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-8 backdrop-blur-md"
      style={{ backgroundColor: 'rgb(25 28 34 / 0.5)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[720px] bg-bee-bg-primary rounded-[32px] p-10 flex flex-col gap-6 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalCloseButton onClick={onClose} />

        <header className="flex flex-col gap-1 pr-16">
          <h2 id="zoom-title">
            <CopyableTitle text={zoom.title} />
          </h2>
          {zoom.subtitle ? (
            <span className="text-body-sm text-bee-content-secondary">
              {zoom.subtitle}
            </span>
          ) : null}
        </header>

        <div className="min-h-[320px] flex items-center justify-center bg-bee-el-primary rounded-2xl py-16 overflow-hidden">
          <div
            className="drop-shadow-sm"
            style={{
              transform: `scale(${zoom.scale ?? 2})`,
              transformOrigin: 'center',
            }}
          >
            {zoom.node}
          </div>
        </div>
      </div>
    </div>
  );
}
