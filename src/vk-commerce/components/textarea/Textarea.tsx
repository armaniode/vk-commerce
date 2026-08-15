import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ForwardedRef,
  type InputEventHandler,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';

import {
  getPlatformTokens,
  getSemanticColors,
  radius,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';

import styles from './Textarea.module.css';

export type TextareaHeight = 'hug' | 'fixed';
export type TextareaStatus = 'default' | 'error' | 'valid';

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'rows'
> & {
  height?: TextareaHeight;
  status?: TextareaStatus;
  before?: ReactNode;
  after?: ReactNode;
  theme?: ThemeMode;
  platform?: PlatformMode;
};

interface TextareaCssProperties extends CSSProperties {
  '--textarea-height': string;
  '--textarea-radius': string;
  '--textarea-padding-horizontal': string;
  '--textarea-padding-vertical': string;
  '--textarea-content-gap': string;
  '--textarea-icon-size': string;
  '--textarea-font-family': string;
  '--textarea-font-size': string;
  '--textarea-font-weight': number;
  '--textarea-line-height': string;
  '--textarea-content-min-height': string;
  '--textarea-letter-spacing': string;
  '--textarea-text-color': string;
  '--textarea-placeholder-color': string;
  '--textarea-icon-color': string;
  '--textarea-scrollbar-color': string;
  '--textarea-background-color': string;
  '--textarea-border-color': string;
  '--textarea-hover-border-color': string;
  '--textarea-active-border-color': string;
  '--textarea-disabled-opacity': number;
}

const TEXTAREA_HUG_MIN_HEIGHT = 52;
const TEXTAREA_HUG_MAX_HEIGHT = 208;
const TEXTAREA_FIXED_HEIGHT = 120;
const TEXTAREA_PADDING_VERTICAL = 14;
const TEXTAREA_ICON_SIZE = 24;
const TEXTAREA_FONT_SIZE = 16.5;
const TEXTAREA_FONT_WEIGHT = 520;
const TEXTAREA_LINE_HEIGHT = 21;
const TEXTAREA_CONTENT_MIN_HEIGHT = 24;
const TEXTAREA_DISABLED_OPACITY = 0.52;
const IOS_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", sans-serif';

function assignRef<T>(ref: ForwardedRef<T>, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    ref.current = value;
  }
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      height = 'hug',
      status = 'default',
      before,
      after,
      theme = 'light',
      platform = 'ios',
      className,
      disabled = false,
      value,
      defaultValue,
      onInput,
      'aria-invalid': ariaInvalid,
      ...textareaProps
    },
    forwardedRef,
  ) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [hugHeight, setHugHeight] = useState(TEXTAREA_HUG_MIN_HEIGHT);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isSingleLine, setIsSingleLine] = useState(true);
    const colors = getSemanticColors(theme);
    const platformConfig = getPlatformTokens(platform);
    let textareaFontFamily: string = platformConfig.typography.family.base;

    if (platform === 'ios') {
      textareaFontFamily = IOS_FONT_FAMILY;
    } else if (platform === 'android') {
      textareaFontFamily = `"${platformConfig.typography.family.base}", Roboto, Arial, sans-serif`;
    }

    const measureHeight = useCallback(() => {
      const node = textareaRef.current;
      if (node == null) return;

      const previousInlinePaddingTop = node.style.paddingTop;
      const previousInlinePaddingBottom = node.style.paddingBottom;
      const previousInlineHeight = node.style.height;
      node.style.height = '0px';
      node.style.paddingTop = '0px';
      node.style.paddingBottom = '0px';
      const contentHeight = node.scrollHeight;
      node.style.height = previousInlineHeight;
      node.style.paddingTop = previousInlinePaddingTop;
      node.style.paddingBottom = previousInlinePaddingBottom;

      setIsSingleLine(contentHeight <= TEXTAREA_CONTENT_MIN_HEIGHT);

      if (height === 'fixed') {
        setIsOverflowing(contentHeight > node.clientHeight + 1);
        return;
      }

      const naturalHeight = contentHeight + TEXTAREA_PADDING_VERTICAL * 2;
      const nextHeight = Math.min(
        TEXTAREA_HUG_MAX_HEIGHT,
        Math.max(TEXTAREA_HUG_MIN_HEIGHT, naturalHeight),
      );

      setHugHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight,
      );
      setIsOverflowing(naturalHeight > TEXTAREA_HUG_MAX_HEIGHT);
    }, [height]);

    const setTextareaRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        assignRef(forwardedRef, node);
      },
      [forwardedRef],
    );

    useLayoutEffect(() => {
      measureHeight();
    }, [defaultValue, measureHeight, value]);

    useLayoutEffect(() => {
      const root = rootRef.current;
      if (root == null || typeof ResizeObserver === 'undefined') return;

      const resizeObserver = new ResizeObserver(measureHeight);
      resizeObserver.observe(root);

      return () => resizeObserver.disconnect();
    }, [measureHeight]);

    const handleInput: InputEventHandler<HTMLTextAreaElement> = (event) => {
      measureHeight();
      onInput?.(event);
    };

    const backgroundColor =
      status === 'error'
        ? colors.background.negativeTint
        : colors.background.secondary;
    const borderColor =
      status === 'error'
        ? colors.stroke.negative
        : status === 'valid'
          ? colors.stroke.positive
          : colors.stroke.fieldBorderAlpha;
    const rootHeight =
      height === 'fixed' ? TEXTAREA_FIXED_HEIGHT : hugHeight;
    const style: TextareaCssProperties = {
      '--textarea-height': `${rootHeight}px`,
      '--textarea-radius': `${radius.sizeL}px`,
      '--textarea-padding-horizontal': `${spacing.size2xl}px`,
      '--textarea-padding-vertical': `${TEXTAREA_PADDING_VERTICAL}px`,
      '--textarea-content-gap': `${spacing.sizeM}px`,
      '--textarea-icon-size': `${TEXTAREA_ICON_SIZE}px`,
      '--textarea-font-family': textareaFontFamily,
      '--textarea-font-size': `${TEXTAREA_FONT_SIZE}px`,
      '--textarea-font-weight': TEXTAREA_FONT_WEIGHT,
      '--textarea-line-height': `${TEXTAREA_LINE_HEIGHT}px`,
      '--textarea-content-min-height': `${TEXTAREA_CONTENT_MIN_HEIGHT}px`,
      '--textarea-letter-spacing': `${platformConfig.typography.letterSpacing.body}px`,
      '--textarea-text-color': colors.text.primary,
      '--textarea-placeholder-color': colors.text.secondary,
      '--textarea-icon-color': colors.icon.secondary,
      '--textarea-scrollbar-color': colors.icon.medium,
      '--textarea-background-color': backgroundColor,
      '--textarea-border-color': borderColor,
      '--textarea-hover-border-color': colors.states.hover.fieldBorderAlpha,
      '--textarea-active-border-color': colors.states.active.fieldBorderAlpha,
      '--textarea-disabled-opacity': TEXTAREA_DISABLED_OPACITY,
    };
    const rootClassName = className ? `${styles.root} ${className}` : styles.root;
    const resolvedAriaInvalid =
      ariaInvalid ?? (status === 'error' ? true : undefined);

    return (
      <div
        className={rootClassName}
        data-textarea-disabled={disabled}
        data-textarea-height={height}
        data-textarea-overflow={isOverflowing}
        data-textarea-platform={platform}
        data-textarea-single-line={isSingleLine}
        data-textarea-status={status}
        data-textarea-theme={theme}
        data-vk-textarea-root=""
        ref={rootRef}
        style={style}
      >
        <span
          aria-hidden="true"
          className={styles.surface}
          data-vk-textarea-surface=""
        />

        <span className={styles.content}>
          {before != null ? (
            <span className={styles.iconSlot}>{before}</span>
          ) : null}

          <textarea
            {...textareaProps}
            aria-invalid={resolvedAriaInvalid}
            className={styles.textarea}
            defaultValue={defaultValue}
            disabled={disabled}
            onInput={handleInput}
            ref={setTextareaRef}
            value={value}
          />

          {after != null ? (
            <span className={styles.iconSlot}>{after}</span>
          ) : null}
        </span>
      </div>
    );
  },
);
