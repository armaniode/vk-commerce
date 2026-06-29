import { useState } from 'react';
import { IconCopyFilled } from '@carnica/icons/actions/IconCopyFilled';
import { IconCheckFilled } from '@carnica/icons/actions/IconCheckFilled';

// Заголовок с DS-иконкой копирования рядом. Клик копирует переданный
// текст в буфер обмена. После копирования иконка коротко превращается
// в зелёную галочку IconCheckFilled.

interface Props {
  text: string;
  /** что копировать — по умолчанию совпадает с text */
  copyText?: string;
}

export function CopyableTitle({ text, copyText }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const payload = copyText ?? text;
    // моментальный визуальный фидбэк до завершения clipboard API
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    try {
      navigator.clipboard.writeText(payload).catch(() => {
        /* clipboard недоступен (insecure context) */
      });
    } catch {
      /* navigator.clipboard вообще нет */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-display-sm text-left hover:opacity-80 transition-opacity"
      title={copied ? 'скопировано' : 'скопировать'}
    >
      <span>{text}</span>
      <span
        className={
          copied
            ? 'text-bee-success transition-colors'
            : 'text-bee-content-secondary transition-colors'
        }
      >
        {copied ? <IconCheckFilled /> : <IconCopyFilled />}
      </span>
    </button>
  );
}
