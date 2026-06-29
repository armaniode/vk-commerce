import { BeelineBall } from './BeelineBall';
import { Button, ButtonInlineText } from '../buttons';
import { IconBurgerMenu } from '../../../icons/actions/IconBurgerMenu';
import { IconSearch } from '../../../icons/actions/IconSearch';
import { IconUser } from '../../../icons/user/IconUser';
import { IconSendFilled } from '../../../icons/message/IconSendFilled';

/**
 * Beeline web header — соответствует спецификации
 * Carnica WEB Header passport (Figma FU4Chchxuwku66ILPSG9mA / 75:589).
 *
 * Кнопки header реализованы через новый Carnica `Button` / `ButtonInlineText` API
 * (priority + view discriminated union).
 *
 * Состояния:
 * - desktop неавторизованная (burger, location, logo, search, помощь, войти)
 * - mobile  неавторизованная (burger, logo, user)
 */
export function Header() {
  return (
    <header role="banner" className="sticky top-0 z-40 w-full">
      {/* Blur layer — overlay/s + 15px blur */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-bee-overlay-s backdrop-blur-[15px]"
      />

      <div
        className="
          relative mx-auto max-w-[1440px]
          h-16 md:h-[76px]
          flex items-center justify-between gap-2
          px-5 md:px-10
        "
      >
        {/* LEFT wrapper */}
        <div className="flex flex-1 min-w-0 items-center gap-3 md:gap-6">
          <Button
            priority="secondary-on-primary"
            size="m"
            view="icon"
            icon={<IconBurgerMenu className="w-6 h-6" aria-hidden="true" />}
            aria-label="открыть меню"
          />

          {/* Location — desktop only */}
          <div className="hidden md:inline-flex">
            <ButtonInlineText
              priority="primary"
              iconLeft={<IconSendFilled className="w-5 h-5" aria-hidden="true" />}
              className="!text-[18px] !leading-[22px]"
            >
              Москва
            </ButtonInlineText>
          </div>
        </div>

        {/* CENTER — logo */}
        <a
          href="/"
          aria-label="на главную билайн"
          className="
            shrink-0 block w-11 h-11 rounded-full
            transition-transform duration-200 hover:scale-[1.04] active:scale-[0.96]
          "
        >
          <BeelineBall size={44} />
        </a>

        {/* RIGHT wrapper */}
        <div className="flex flex-1 min-w-0 items-center justify-end gap-2">
          {/* Search — desktop only */}
          <Button
            priority="secondary-on-primary"
            size="m"
            view="icon"
            icon={<IconSearch className="w-6 h-6" aria-hidden="true" />}
            aria-label="поиск"
            className="hidden md:inline-flex"
          />

          {/* Помощь — desktop only */}
          <Button
            priority="secondary-on-primary"
            size="m"
            className="hidden md:inline-flex"
          >
            помощь
          </Button>

          {/* Войти — desktop only, yellow */}
          <Button
            priority="primary"
            size="m"
            className="hidden md:inline-flex"
          >
            войти
          </Button>

          {/* User — mobile only */}
          <Button
            priority="secondary-on-primary"
            size="m"
            view="icon"
            icon={<IconUser className="w-6 h-6" aria-hidden="true" />}
            aria-label="профиль"
            className="md:hidden"
          />
        </div>
      </div>
    </header>
  );
}
