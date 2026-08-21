import { useState, type CSSProperties } from 'react';

import {
  Avatar,
  Button,
} from '../../../../../../src/vk-commerce/components';
import {
  getPlatformTokens,
  getSemanticColors,
  spacing,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkHashtagFeedPrototypePage.module.css';

const THEME = 'light' as const;
const PLATFORM = 'ios' as const;
const ASSET_ROOT = '/vk-hashtag-feed';
const POST_TEXT =
  'Мангистауская область на западе Казахстана остаётся одним из самых малоизвестных уголков Центральной Азии. Здесь природа создала необычные пейзажи: известняковые каньоны, меловые скалы и солончаки складываются в виды, больше похожие на марсианские, чем на земные.';
const POST_MEDIA = [
  'post-1-a.png',
  'post-1-b.png',
  'post-1-c.png',
  'post-1-d.png',
] as const;

type TabId = 'home' | 'search' | 'messages' | 'music' | 'menu';

const TAB_ITEMS: ReadonlyArray<{
  id: TabId;
  label: string;
  asset: string;
}> = [
  { id: 'home', label: 'Главная', asset: 'icons/home-28.svg' },
  { id: 'search', label: 'Поиск', asset: 'icons/search-filled-28.svg' },
  { id: 'messages', label: 'Сообщения', asset: 'icons/bubble-text-28.svg' },
  { id: 'music', label: 'Музыка', asset: 'icons/music-28.svg' },
  { id: 'menu', label: 'Меню', asset: 'icons/menu-28.svg' },
];

interface PrototypeCssProperties extends CSSProperties {
  '--hashtag-width': string;
  '--hashtag-height': string;
  '--hashtag-page-background': string;
  '--hashtag-canvas-background': string;
  '--hashtag-text-primary': string;
  '--hashtag-text-secondary': string;
  '--hashtag-icon-primary': string;
  '--hashtag-separator': string;
  '--hashtag-font-family': string;
  '--hashtag-post-header-height': string;
  '--hashtag-page-padding': string;
  '--hashtag-post-gap': string;
  '--hashtag-content-gap': string;
  '--hashtag-text-size': string;
  '--hashtag-paragraph-size': string;
  '--hashtag-footnote-size': string;
  '--hashtag-semibold': number;
}

interface PostHeaderProps {
  subscribed: boolean;
  onSubscribe: () => void;
}

function PostHeader({ subscribed, onSubscribe }: PostHeaderProps) {
  return (
    <header className={styles.postHeader}>
      <Avatar
        alt="Траектория"
        content="picture"
        platform={PLATFORM}
        size={36}
        src={`${ASSET_ROOT}/avatar.png`}
        theme={THEME}
      />
      <span className={styles.author}>Траектория</span>
      <div className={styles.postHeaderActions}>
        <Button
          appearance="neutral"
          mode="secondary"
          onClick={onSubscribe}
          platform={PLATFORM}
          size="small"
          theme={THEME}
          type="button"
          width="hugged"
        >
          {subscribed ? 'Вы подписаны' : 'Подписаться'}
        </Button>
        <button className={styles.moreAction} type="button" aria-label="Ещё">
          <img
            alt=""
            aria-hidden="true"
            src={`${ASSET_ROOT}/icons/more-horizontal-20.svg`}
          />
        </button>
      </div>
    </header>
  );
}

export function VkHashtagFeedPrototypePage() {
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const colors = getSemanticColors(THEME);
  const platform = getPlatformTokens(PLATFORM);
  const style: PrototypeCssProperties = {
    '--hashtag-width': `${platform.viewport.width}px`,
    '--hashtag-height': `${platform.viewport.height}px`,
    '--hashtag-page-background': colors.background.contrast,
    '--hashtag-canvas-background': colors.background.tertiary,
    '--hashtag-text-primary': colors.text.primary,
    '--hashtag-text-secondary': colors.text.secondary,
    '--hashtag-icon-primary': colors.icon.primary,
    '--hashtag-separator': colors.separator.primary,
    '--hashtag-font-family':
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    '--hashtag-post-header-height': `${platform.size.panelHeaderHeight}px`,
    '--hashtag-page-padding': `${platform.size.basePaddingHorizontal}px`,
    '--hashtag-post-gap': `${spacing.sizeXl}px`,
    '--hashtag-content-gap': `${spacing.sizeXs}px`,
    '--hashtag-text-size': `${platform.typography.fontSize.text}px`,
    '--hashtag-paragraph-size': `${platform.typography.fontSize.paragraph}px`,
    '--hashtag-footnote-size': `${platform.typography.fontSize.footnote}px`,
    '--hashtag-semibold': platform.typography.weight.semibold,
  };

  return (
    <div className={styles.page} style={style}>
      <main className={styles.screen} aria-label="Лента хэштега майские моменты">
        <div className={styles.topBar}>
          <button
            aria-label="Назад"
            className={styles.backAction}
            onClick={() => {
              window.location.hash = '#/vk-prototypes/profile-edit';
            }}
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              src={`${ASSET_ROOT}/icons/chevron-left-28.svg`}
            />
          </button>
          <h1 className={styles.title}>#майскиемоменты</h1>
        </div>

        <div className={styles.feed}>
          <div className={styles.posts}>
            <article className={styles.post}>
              <PostHeader
                subscribed={subscribed}
                onSubscribe={() => setSubscribed((current) => !current)}
              />

              <div
                aria-label="Четыре фотографии Мангистау"
                className={styles.mediaGrid}
                role="img"
              >
                {POST_MEDIA.map((asset) => (
                  <span className={styles.mediaTile} key={asset}>
                    <img alt="" aria-hidden="true" src={`${ASSET_ROOT}/${asset}`} />
                  </span>
                ))}
              </div>

              <div className={styles.postText} data-expanded={expanded}>
                <p>{POST_TEXT}</p>
                <button
                  className={styles.moreText}
                  onClick={() => setExpanded((current) => !current)}
                  type="button"
                >
                  {expanded ? 'Скрыть' : 'Показать ещё'}
                </button>
              </div>

              <footer className={styles.postFooter}>
                <div className={styles.footerActions}>
                  <button
                    aria-label={liked ? 'Убрать отметку нравится' : 'Нравится'}
                    aria-pressed={liked}
                    className={styles.footerAction}
                    onClick={() => setLiked((current) => !current)}
                    type="button"
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      src={`${ASSET_ROOT}/icons/heart-outline-24.svg`}
                    />
                    <span>{liked ? 77 : 76}</span>
                  </button>
                  <button aria-label="Комментарии" className={styles.footerAction} type="button">
                    <img
                      alt=""
                      aria-hidden="true"
                      src={`${ASSET_ROOT}/icons/bubble-outline-24.svg`}
                    />
                    <span>5</span>
                  </button>
                  <button aria-label="Поделиться" className={styles.footerAction} type="button">
                    <img
                      alt=""
                      aria-hidden="true"
                      src={`${ASSET_ROOT}/icons/share-outline-24.svg`}
                    />
                  </button>
                </div>
                <span className={styles.postAge}>1 д назад</span>
              </footer>
            </article>

            <article className={styles.post}>
              <PostHeader
                subscribed={subscribed}
                onSubscribe={() => setSubscribed((current) => !current)}
              />
              <img
                alt="Пейзаж Мангистау"
                className={styles.secondMedia}
                src={`${ASSET_ROOT}/second-media.png`}
              />
            </article>
          </div>
        </div>

        <nav aria-label="Основная навигация" className={styles.tabBar}>
          <div className={styles.tabItems}>
            {TAB_ITEMS.map((item) => (
              <button
                aria-current={item.id === 'search' ? 'page' : undefined}
                aria-label={item.label}
                className={styles.tabItem}
                data-active={item.id === 'search'}
                key={item.id}
                type="button"
              >
                <img alt="" aria-hidden="true" src={`${ASSET_ROOT}/${item.asset}`} />
              </button>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
}
