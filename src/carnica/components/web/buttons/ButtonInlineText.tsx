import { type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonInlineTextPriority = 'primary' | 'secondary' | 'destructive';

export interface ButtonInlineTextProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  priority?: ButtonInlineTextPriority;
  invert?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

const priorityStyles: Record<ButtonInlineTextPriority, string> = {
  'primary': 'text-bee-content-primary hover:text-bee-content-secondary active:text-bee-content-secondary',
  'secondary': 'text-bee-content-secondary hover:opacity-70 active:opacity-70',
  'destructive': 'text-bee-error hover:text-bee-error-hover active:text-bee-error-hover',
};

const invertStyles: Record<ButtonInlineTextPriority, string> = {
  'primary': 'text-bee-content-invert hover:text-bee-content-secondary-invert active:text-bee-content-secondary-invert',
  'secondary': 'text-bee-content-secondary-invert hover:opacity-70 active:opacity-70',
  'destructive': 'text-bee-error hover:text-bee-error-hover active:text-bee-error-hover',
};

function Loader() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      <span className="w-1.5 h-1.5 rounded-full bg-current motion-safe:animate-pulse-soft" />
      <span className="w-1.5 h-1.5 rounded-full bg-current motion-safe:animate-pulse-soft motion-safe:[animation-delay:200ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-current motion-safe:animate-pulse-soft motion-safe:[animation-delay:400ms]" />
    </span>
  );
}

export function ButtonInlineText({
  priority = 'primary',
  invert = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  className = '',
  type = 'button',
  ...rest
}: ButtonInlineTextProps) {
  const colorStyle = disabled
    ? 'text-bee-content-disabled cursor-not-allowed pointer-events-none'
    : invert
      ? invertStyles[priority]
      : priorityStyles[priority];

  return (
    <button
      disabled={disabled}
      aria-busy={loading || undefined}
      className={[
        'inline-flex items-center gap-1 text-body-accent-sm bg-transparent border-none p-0 cursor-pointer',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bee-dark focus-visible:rounded-sm',
        colorStyle,
        className,
      ].filter(Boolean).join(' ')}
      type={type}
      {...rest}
    >
      {iconLeft ? (
        <span className="inline-flex items-center justify-center w-5 h-5">
          {iconLeft}
        </span>
      ) : null}
      {loading ? <Loader /> : children}
      {iconRight ? (
        <span className="inline-flex items-center justify-center w-5 h-5">
          {iconRight}
        </span>
      ) : null}
    </button>
  );
}
