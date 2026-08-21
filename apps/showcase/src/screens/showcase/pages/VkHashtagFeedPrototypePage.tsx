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
  { id: 'home', label: 'Главная', asset: 'tab-home.png' },
  { id: 'search', label: 'Поиск', asset: 'tab-search.png' },
  { id: 'messages', label: 'Сообщения', asset: 'tab-messages.png' },
  { id: 'music', label: 'Музыка', asset: 'tab-music.png' },
  { id: 'menu', label: 'Меню', asset: 'tab-menu.png' },
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
          <img alt="" aria-hidden="true" src={`${ASSET_ROOT}/more.png`} />
        </button>
      </div>
    </header>
  );
}

export function VkHashtagFeedPrototypePage() {
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('search');
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
          <img
            alt=""
            aria-hidden="true"
            className={styles.topBarAsset}
            src={`${ASSET_ROOT}/top-bar.png`}
          />
          <h1 className={styles.visuallyHidden}>#майскиемоменты</h1>
          <button
            aria-label="Назад"
            className={styles.backAction}
            onClick={() => {
              window.location.hash = '#/vk-prototypes/profile-edit';
            }}
            type="button"
          />
        </div>

        <div className={styles.feed}>
          <div aria-hidden="true" className={styles.topSpacing} />
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
                <img alt="" aria-hidden="true" src={`${ASSET_ROOT}/post-footer.png`} />
                <button
                  aria-label={liked ? 'Убрать отметку нравится' : 'Нравится'}
                  aria-pressed={liked}
                  className={styles.likeAction}
                  onClick={() => setLiked((current) => !current)}
                  type="button"
                />
                {liked ? <span className={styles.likeCount}>77</span> : null}
                <button aria-label="Комментарии" className={styles.commentAction} type="button" />
                <button aria-label="Поделиться" className={styles.shareAction} type="button" />
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
                aria-current={activeTab === item.id ? 'page' : undefined}
                aria-label={item.label}
                className={styles.tabItem}
                data-active={activeTab === item.id}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
              >
                <img alt="" aria-hidden="true" src={`${ASSET_ROOT}/${item.asset}`} />
              </button>
            ))}
          </div>
          <span aria-hidden="true" className={styles.homeIndicator} />
        </nav>
      </main>
    </div>
  );
}
