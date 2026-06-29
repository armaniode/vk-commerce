import { type ReactNode } from 'react';
import { PageLayout, PageCard } from '../layout/PageLayout';

// Источник: skill carnica-copy-tone из репозитория Carnica

const PHRASES: Array<[string, string]> = [
  ['бесшовный опыт',              'открывается за 1 секунду'],
  ['инновационный',               'работает без перезагрузки'],
  ['всё в одном месте',           'связь, ТВ и интернет — на одном экране'],
  ['оптимизировать',              'ускорить'],
  ['функционал',                  'функция, возможность, фича'],
  ['уважаемый клиент',            'имя пользователя или просто «вы»'],
  ['уведомляем вас, что',         'мы изменили условия — вот что важно'],
  ['осуществить платёж',          'оплатить'],
  ['в кратчайшие сроки',          'за час, к завтрашнему утру'],
  ['лучшее решение для вас',      'конкретное преимущество'],
];

const COPY_EXAMPLES: Array<{ ctx: string; good: string; bad: string }> = [
  { ctx: 'loading',          good: 'загружаем…',                                         bad: 'Идёт загрузка данных' },
  { ctx: 'empty state',      good: 'здесь пока пусто. начнём?',                          bad: 'У вас нет платежей.' },
  { ctx: 'error сетевая',    good: 'не получилось загрузить. проверьте интернет',        bad: 'Ошибка сети.' },
  { ctx: 'error серверная',  good: 'что-то пошло не так. мы уже разбираемся',            bad: 'Внутренняя ошибка сервера 500.' },
  { ctx: 'success',          good: 'готово',                                             bad: 'Сохранение завершено успешно.' },
  { ctx: 'confirm удаление', good: 'удалить «X»?',                                       bad: 'Подтвердите удаление.' },
  { ctx: 'confirm оплата',   good: 'оплатить 1 199 ₽?',                                  bad: 'Подтвердите оплату.' },
  { ctx: 'CTA primary',      good: 'оплатить 1 199 ₽',                                   bad: 'перейти к оплате' },
  { ctx: 'CTA secondary',    good: 'отмена',                                             bad: 'Возврат к предыдущему шагу' },
  { ctx: 'placeholder',      good: 'номер телефона',                                     bad: 'Введите ваш номер телефона' },
  { ctx: 'FAQ-вопрос',       good: 'когда привезут?',                                    bad: 'Когда будет осуществлена доставка?' },
];

export function RulesPage() {
  return (
    <PageLayout
      title="редполитика"
      subtitle="tone of voice билайн — как мы пишем UI-текст, кнопки, ошибки и микрокопию"
    >
      <PageCard title="мы и не мы">
        <p className="text-body-sm text-bee-content-secondary mb-2">
          голос билайна — близкий, человеческий, спокойный. читай вслух — если звучит как пресс-релиз
          или сайт, переписывай
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['спокойные («можно сделать»)',                 'наставительные («вы должны»)'],
            ['конкретные («загружается за 1 секунду»)',     'пафосные («мы создаём будущее связи»)'],
            ['на равных («оплачен», «вы»)',                 'формальные («уважаемый клиент»)'],
            ['без воды («оплачено. чек на почте»)',         'канцелярные («платёж осуществлён успешно»)'],
            ['минимальные слова',                            'панибратские («эй, привет!!!»)'],
          ].map(([yes, no], i) => (
            <ExamplePair key={i} good={yes} bad={no} />
          )).flat()}
        </div>
      </PageCard>

      <PageCard title="lowercase правила">
        <ul className="flex flex-col gap-2 text-body-sm">
          <li>· весь UI-текст — строчными: заголовки экранов, кнопки, лейблы, тэги, пункты меню</li>
          <li>· слово «билайн» — всегда строчными, даже в начале предложения. часть бренд-идентичности</li>
          <li>· сокращения единиц (гб, мб, мбит, ггц, мин, тб) — строчными</li>
          <li>· исключения: имена, география, бренды кроме билайн, аббревиатуры (eSIM, SMS, QR, 5G, HD), названия тарифов в кавычках («Вверх!»), email и номера</li>
        </ul>
        <p className="text-caption-md text-bee-content-tertiary">
          запрещено: CAPS LOCK, CSS text-transform: uppercase, ручная капитализация, letter-spacing под CAPS
        </p>
      </PageCard>

      <PageCard title="пунктуация">
        <div className="grid grid-cols-2 gap-4">
          <ExamplePair good="итог заказа"  bad="итог заказа." />
          <ExamplePair good="оплатить"     bad="оплатить." />
          <ExamplePair good="готово"       bad="готово!" />
          <ExamplePair good="«Чёрный титан»" bad='"Чёрный титан"' />
          <ExamplePair good="связь — это просто" bad="связь - это просто" />
          <ExamplePair good="5–10 дней"   bad="5-10 дней" />
        </div>
        <p className="text-caption-md text-bee-content-tertiary mt-3">
          точка в конце короткой подписи / кнопки / заголовка / FAQ-вопроса — не ставится.
          восклицательные в UI не используем (кроме названий тарифов в кавычках)
        </p>
      </PageCard>

      <PageCard title="запрещённые фразы">
        <p className="text-body-sm text-bee-content-secondary mb-3">
          generic-AI и канцелярит делают копию неотличимой от любого SaaS-сайта. P0 нарушение
        </p>
        <div className="grid grid-cols-2 gap-4">
          {PHRASES.map(([bad, good], i) => (
            <ExamplePair key={i} good={good} bad={bad} />
          ))}
        </div>
      </PageCard>

      <PageCard title="микрокопия — типовые шаблоны">
        <div className="grid grid-cols-2 gap-4">
          {COPY_EXAMPLES.map(({ ctx, good, bad }, i) => (
            <ExamplePair key={i} good={good} bad={bad} ctx={ctx} />
          ))}
        </div>
      </PageCard>

      <PageCard title="tone по контексту">
        <ul className="flex flex-col gap-2 text-body-sm">
          <li>· <b>транзакционный</b> (платёж, покупка) — спокойный, конкретный: «оплачено. чек на почте»</li>
          <li>· <b>проблема</b> (ошибка, лимит) — без обвинения, с предложением: «закончились гб. подключим ещё?»</li>
          <li>· <b>onboarding</b> — приветливый, без пафоса: «давайте настроим ваш номер»</li>
          <li>· <b>маркетинг / промо</b> — без давления, конкретно: «безлимитный интернет за 590 ₽/мес»</li>
          <li>· <b>юридическое / условия</b> — максимально просто: «можно отказаться в течение 14 дней без объяснения причин»</li>
        </ul>
      </PageCard>

      <PageCard title="чеклист перед сдачей">
        <ul className="flex flex-col gap-1.5 text-body-sm">
          {[
            'весь UI-текст строчными, кроме исключений',
            'слово «билайн» строчными даже в начале строки',
            'нет точки в конце короткой подписи / кнопки / лейбла',
            'нет CAPS LOCK и text-transform: uppercase',
            'нет ни одной фразы из списка запрещённых',
            'микрокопия imperative («продолжить», не «нажмите чтобы продолжить»)',
            'нет «дорогой клиент», «уважаемый пользователь», «уведомляем вас»',
            'кавычки «ёлочки», тире длинное с пробелами',
            'восклицательных нет (кроме названий тарифов в кавычках)',
            'CTA-кнопки конкретные (с суммой / действием)',
            'tone адекватный контексту (error мягче, success короче)',
            'для важного UI-текста есть 3 варианта формулировки',
            'lorem ipsum / «текст-заполнитель» отсутствует',
            'единицы (гб, мб, мин) строчными',
          ].map((it) => (
            <li key={it} className="flex gap-2">
              <span className="text-bee-content-tertiary">·</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <p className="text-caption-md text-bee-content-tertiary mt-3">
          источник: skill carnica-copy-tone из репозитория Carnica
        </p>
      </PageCard>
    </PageLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// Парная карточка «так можно / так нельзя»

function ExamplePair({
  good,
  bad,
  ctx,
}: {
  good: ReactNode;
  bad: ReactNode;
  ctx?: string;
}) {
  return (
    <>
      <ExampleCell kind="good" ctx={ctx}>{good}</ExampleCell>
      <ExampleCell kind="bad"  ctx={ctx}>{bad}</ExampleCell>
    </>
  );
}

function ExampleCell({
  kind,
  ctx,
  children,
}: {
  kind: 'good' | 'bad';
  ctx?: string;
  children: ReactNode;
}) {
  const tone =
    kind === 'good'
      ? 'bg-bee-surface-green'
      : 'bg-bee-surface-red';
  return (
    <div className={`${tone} rounded-2xl p-4 flex flex-col gap-1.5`}>
      <span className="text-caption-accent-md text-bee-dark">
        {kind === 'good' ? '✓ так можно' : '✗ так нельзя'}
        {ctx ? <span className="text-bee-dark/60"> · {ctx}</span> : null}
      </span>
      <span className="text-body-sm text-bee-dark">{children}</span>
    </div>
  );
}
