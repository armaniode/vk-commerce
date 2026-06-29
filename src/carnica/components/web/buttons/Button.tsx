import { type ButtonHTMLAttributes, type ReactNode } from 'react';

export const buttonPropPriority = [
  'primary',
  'secondary-on-primary',
  'secondary-on-secondary',
  'secondary-on-tertiary',
  'tertiary',
  'destructive',
] as const;
export type ButtonPropPriority = (typeof buttonPropPriority)[number];

export const buttonPropSize = ['l', 'm'] as const;
export type ButtonPropSize = (typeof buttonPropSize)[number];

interface ButtonBaseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  priority?: ButtonPropPriority;
  size?: ButtonPropSize;
  width?: 'default' | 'full';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

interface ButtonTextVariantProps extends ButtonBaseProps {
  view?: 'text';
  children: ReactNode;
  sale?: ReactNode;
  badge?: boolean;
}

interface ButtonIconVariantProps extends ButtonBaseProps {
  view: 'icon';
  icon: ReactNode;
  'aria-label': string;
}

export type ButtonProps = ButtonTextVariantProps | ButtonIconVariantProps;

const priorityStyles: Record<ButtonPropPriority, string> = {
  'primary':
    'bg-bee-yellow hover:bg-bee-yellow-hover active:bg-bee-yellow-hover text-bee-dark',
  'secondary-on-primary':
    'bg-bee-el-primary text-bee-content-primary hover:text-bee-content-secondary active:text-bee-content-secondary',
  'secondary-on-secondary':
    'bg-bee-el-secondary text-bee-content-primary hover:text-bee-content-secondary active:text-bee-content-secondary',
  'secondary-on-tertiary':
    'bg-bee-el-additional01 text-bee-content-primary hover:text-bee-content-secondary active:text-bee-content-secondary',
  'tertiary':
    'bg-bee-el-active text-bee-content-invert hover:text-bee-content-secondary-invert active:text-bee-content-secondary-invert',
  'destructive':
    'bg-bee-error hover:bg-bee-error-hover active:bg-bee-error-hover text-bee-light',
};

const focusRingByPriority: Record<ButtonPropPriority, string> = {
  'primary': 'focus-visible:ring-bee-dark',
  'secondary-on-primary': 'focus-visible:ring-bee-dark',
  'secondary-on-secondary': 'focus-visible:ring-bee-dark',
  'secondary-on-tertiary': 'focus-visible:ring-bee-dark',
  'tertiary': 'focus-visible:ring-bee-yellow',
  'destructive': 'focus-visible:ring-bee-dark',
};

const sizeTextStyles: Record<ButtonPropSize, string> = {
  'l': 'h-14 px-5 gap-2',
  'm': 'h-11 px-4 gap-1',
};

const sizeIconStyles: Record<ButtonPropSize, string> = {
  'l': 'h-14 w-14',
  'm': 'h-11 w-11',
};

function Loader() {
  return (
    <span
      className="inline-flex items-center gap-1"
      aria-hidden="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current motion-safe:animate-pulse-soft" />
      <span className="w-1.5 h-1.5 rounded-full bg-current motion-safe:animate-pulse-soft motion-safe:[animation-delay:200ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-current motion-safe:animate-pulse-soft motion-safe:[animation-delay:400ms]" />
    </span>
  );
}

const disabledStyles =
  'bg-bee-el-disabled text-bee-content-disabled cursor-not-allowed pointer-events-none';

const baseStyles =
  'inline-flex items-center justify-center rounded-pill text-body-accent-sm transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'motion-safe:active:scale-[0.98] motion-safe:transition-transform';

export function Button(props: ButtonProps) {
  const {
    priority = 'primary',
    size = 'l',
    loading = false,
    disabled = false,
    className = '',
    type = 'button',
    width,
    ...rest
  } = props as ButtonBaseProps & { view?: 'text' | 'icon' };

  const priorityStyle = disabled ? disabledStyles : priorityStyles[priority];
  const focusRing = disabled ? '' : focusRingByPriority[priority];

  if (props.view === 'icon') {
    const { icon, ...iconRest } = rest as ButtonIconVariantProps & Record<string, unknown>;
    return (
      <button
        disabled={disabled}
        aria-busy={loading || undefined}
        className={[
          baseStyles,
          priorityStyle,
          focusRing,
          sizeIconStyles[size],
          className,
        ].filter(Boolean).join(' ')}
        type={type}
        {...(iconRest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading ? <Loader /> : icon}
      </button>
    );
  }

  const { children, sale, badge, ...textRest } = rest as ButtonTextVariantProps &
    Record<string, unknown>;

  return (
    <button
      disabled={disabled}
      aria-busy={loading || undefined}
      className={[
        baseStyles,
        priorityStyle,
        focusRing,
        sizeTextStyles[size],
        width === 'full' ? 'w-full' : '',
        badge ? 'relative' : '',
        className,
      ].filter(Boolean).join(' ')}
      type={type}
      {...(textRest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <span>{children as ReactNode}</span>
          {sale ? (
            <span className="line-through opacity-60">{sale as ReactNode}</span>
          ) : null}
          {badge ? (
            <span
              aria-hidden="true"
              className="absolute top-1 right-1 w-2 h-2 rounded-full bg-bee-error"
            />
          ) : null}
        </>
      )}
    </button>
  );
}
