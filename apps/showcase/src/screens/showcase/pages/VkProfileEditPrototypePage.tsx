import { useState, type CSSProperties } from 'react';

import {
  Avatar,
  Button,
  DatePicker,
  Input,
  Select,
  Textarea,
} from '../../../../../../src/vk-commerce/components';
import {
  getPlatformTokens,
  getSemanticColors,
  spacing,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkProfileEditPrototypePage.module.css';

const THEME = 'light' as const;
const PLATFORM = 'ios' as const;
const INITIAL_DESCRIPTION =
  'Небольшая студия, где мы делимся проектами,\nпроцессом и новостями команды.';

interface PrototypeCssProperties extends CSSProperties {
  '--prototype-width': string;
  '--prototype-min-height': string;
  '--prototype-page-padding': string;
  '--prototype-section-gap': string;
  '--prototype-field-gap': string;
  '--prototype-label-gap': string;
  '--prototype-top-bar-height': string;
  '--prototype-page-background': string;
  '--prototype-canvas-background': string;
  '--prototype-text-primary': string;
  '--prototype-text-secondary': string;
  '--prototype-separator': string;
  '--prototype-font-family': string;
  '--prototype-title-size': string;
  '--prototype-label-size': string;
  '--prototype-title-weight': number;
  '--prototype-label-weight': number;
}

export function VkProfileEditPrototypePage() {
  const [name, setName] = useState('Моя студия');
  const [shortName, setShortName] = useState('mystudio');
  const [description, setDescription] = useState(INITIAL_DESCRIPTION);
  const [foundationDate, setFoundationDate] = useState('12.05.2022');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const colors = getSemanticColors(THEME);
  const platform = getPlatformTokens(PLATFORM);
  const style: PrototypeCssProperties = {
    '--prototype-width': `${platform.viewport.width}px`,
    '--prototype-min-height': `${platform.viewport.height}px`,
    '--prototype-page-padding': `${platform.size.basePaddingHorizontal}px`,
    '--prototype-section-gap': `${spacing.size4xl}px`,
    '--prototype-field-gap': `${spacing.size2xl}px`,
    '--prototype-label-gap': `${spacing.sizeM}px`,
    '--prototype-top-bar-height': `${platform.size.panelHeaderHeight}px`,
    '--prototype-page-background': colors.background.contrast,
    '--prototype-canvas-background': colors.background.tertiary,
    '--prototype-text-primary': colors.text.primary,
    '--prototype-text-secondary': colors.text.secondary,
    '--prototype-separator': colors.separator.primary,
    '--prototype-font-family':
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", sans-serif',
    '--prototype-title-size': `${platform.typography.fontSize.headline1}px`,
    '--prototype-label-size': `${platform.typography.fontSize.headline1}px`,
    '--prototype-title-weight': platform.typography.weight.semibold,
    '--prototype-label-weight': platform.typography.weight.semibold,
  };

  const markChanged = () => setSaved(false);
  const handleSave = () => setSaved(true);

  return (
    <div className={styles.page} style={style}>
      <main
        aria-label="Редактирование профиля сообщества"
        className={styles.screen}
      >
        <header className={styles.topBar}>
          <h1 className={styles.title}>Редактирование</h1>
          <Button
            appearance="neutral"
            mode="link"
            onClick={handleSave}
            platform={PLATFORM}
            size="small"
            theme={THEME}
            type="button"
            width="hugged"
          >
            Готово
          </Button>
        </header>

        <div className={styles.content}>
          <section aria-label="Фото сообщества" className={styles.avatarSection}>
            <Avatar
              alt="Моя студия"
              content="picture"
              platform={PLATFORM}
              size={80}
              src="/vk-avatar-demo.svg"
              theme={THEME}
            />
            <Button
              appearance="neutral"
              mode="link"
              platform={PLATFORM}
              size="small"
              theme={THEME}
              type="button"
              width="hugged"
            >
              Изменить фото
            </Button>
          </section>

          <section aria-label="Основные данные" className={styles.fields}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="profile-name">
                Название
              </label>
              <Input
                id="profile-name"
                onChange={(event) => {
                  setName(event.target.value);
                  markChanged();
                }}
                platform={PLATFORM}
                theme={THEME}
                value={name}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="profile-short-name">
                Короткое имя
              </label>
              <Input
                autoCapitalize="none"
                id="profile-short-name"
                onChange={(event) => {
                  setShortName(event.target.value);
                  markChanged();
                }}
                platform={PLATFORM}
                spellCheck={false}
                theme={THEME}
                value={shortName}
              />
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel} id="profile-category-label">
                Категория
              </span>
              <Select
                aria-labelledby="profile-category-label"
                onClick={() => setCategoryOpen((current) => !current)}
                open={categoryOpen}
                platform={PLATFORM}
                theme={THEME}
                value="Дизайн и творчество"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="profile-description">
                Описание
              </label>
              <Textarea
                height="hug"
                id="profile-description"
                onChange={(event) => {
                  setDescription(event.target.value);
                  markChanged();
                }}
                platform={PLATFORM}
                theme={THEME}
                value={description}
              />
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel} id="profile-date-label">
                Дата основания
              </span>
              <DatePicker
                aria-labelledby="profile-date-label"
                date={foundationDate || undefined}
                onClear={() => {
                  setFoundationDate('');
                  setDateOpen(false);
                  markChanged();
                }}
                onTriggerClick={() => setDateOpen((current) => !current)}
                open={dateOpen}
                platform={PLATFORM}
                theme={THEME}
              />
            </div>
          </section>

          <div>
            <Button
              appearance="neutral"
              mode="primary"
              onClick={handleSave}
              platform={PLATFORM}
              size="large"
              theme={THEME}
              type="button"
              width="filled"
            >
              {saved ? 'Изменения сохранены' : 'Сохранить изменения'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
