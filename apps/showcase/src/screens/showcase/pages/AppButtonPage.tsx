import {
  Button,
  appButtonPriority,
  type AppButtonPriority,
  type ButtonState,
  type ButtonGlassState,
} from '@carnica/components/app';
import { IconBell } from '@carnica/icons/alert/IconBell';

import { PageLayout, PageCard } from '../layout/PageLayout';
import { Zoomable } from '../layout/Zoomable';
import { StateRow } from './components/StateRow';

// app-button-23 в Supabase · автор: Дима Нищев · status: in-progress.
// Логика отображения та же, что у WEB Buttons: matrix priority × state,
// на каждой кнопке подпись priority — видно и priority, и состояние сразу.

// box-shadow комбо для glass-кнопок: drop-shadow + inset-хайлайт сверху +
// inset-тень снизу. Имитирует «стеклянный объём», когда кнопка стоит на
// светлом фоне (на photo-фоне эффект и так виден через backdrop-blur).
const GLASS_EFFECT_CLASS =
  'shadow-[0_8px_24px_-6px_rgba(40,48,63,0.18),0_2px_4px_-1px_rgba(40,48,63,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_2px_0_rgba(40,48,63,0.06)]';

const APP_PRIORITIES: AppButtonPriority[] = [...appButtonPriority];
const DEFAULT_STATES: ButtonState[] = ['default', 'pressed', 'disabled', 'loading'];
const GLASS_STATES: ButtonGlassState[] = ['default', 'disabled', 'loading'];

const PRIORITY_LABEL: Record<AppButtonPriority, string> = {
  'primary':                    'primary',
  'secondary on bg_primary':    'sec · primary',
  'secondary on bg_secondary':  'sec · secondary',
  'secondary on bg_tertiary':   'sec · tertiary',
  'secondary on bg_additional': 'sec · additional',
  'tertiary':                   'tertiary',
  'destructive':                'destructive',
};

export function AppButtonPage() {
  return (
    <PageLayout
      title="button 2.5"
      subtitle="APP Button · 7 priority × 3 size × 2 appearance × 4 state · view=text/icon · автор: Дима Нищев"
    >
      <PageCard title="default appearance" hint="строки — priority · колонки — state">
        {APP_PRIORITIES.map((priority) => (
          <StateRow key={priority} label={PRIORITY_LABEL[priority]}>
            {DEFAULT_STATES.map((state) => (
              <Zoomable
                key={state}
                title="button 2.5"
                subtitle={`${priority} · ${state}`}
              >
                <Button
                  appearance="default"
                  priority={priority}
                  size="large"
                  state={state}
                >
                  {PRIORITY_LABEL[priority]}
                </Button>
              </Zoomable>
            ))}
          </StateRow>
        ))}
      </PageCard>

      <PageCard
        title="glass appearance"
        hint="полупрозрачная капсула с backdrop-blur · state=pressed недоступен"
      >
        {/* Светлая подложка elements/primary. Эффект «стекла» добавлен на сами
            кнопки через box-shadow (внутренний хайлайт сверху, мягкая тень
            снизу, drop-shadow вокруг) — даёт объём, без него glass-кнопки на
            светлом фоне выглядят как обычные полупрозрачные. */}
        <div className="rounded-2xl p-6 bg-bee-el-primary">
          <div className="flex flex-col gap-4">
            {APP_PRIORITIES.map((priority) => (
              <StateRow key={priority} label={PRIORITY_LABEL[priority]}>
                {GLASS_STATES.map((state) => (
                  <Zoomable
                    key={state}
                    title="button 2.5"
                    subtitle={`glass · ${priority} · ${state}`}
                  >
                    <Button
                      appearance="glass"
                      priority={priority}
                      size="large"
                      state={state}
                      className={GLASS_EFFECT_CLASS}
                    >
                      {PRIORITY_LABEL[priority]}
                    </Button>
                  </Zoomable>
                ))}
              </StateRow>
            ))}
          </div>
        </div>
      </PageCard>

      <PageCard title="size" hint="large · medium · small">
        {(['primary', 'secondary on bg_primary', 'tertiary', 'destructive'] as AppButtonPriority[]).map((p) => (
          <StateRow key={p} label={PRIORITY_LABEL[p]}>
            <Zoomable title="button 2.5" subtitle={`${p} · large`}>
              <Button appearance="default" priority={p} size="large" state="default">
                {PRIORITY_LABEL[p]}
              </Button>
            </Zoomable>
            <Zoomable title="button 2.5" subtitle={`${p} · medium`}>
              <Button appearance="default" priority={p} size="medium" state="default">
                {PRIORITY_LABEL[p]}
              </Button>
            </Zoomable>
            <Zoomable title="button 2.5" subtitle={`${p} · small`}>
              <Button appearance="default" priority={p} size="small" state="default">
                {PRIORITY_LABEL[p]}
              </Button>
            </Zoomable>
          </StateRow>
        ))}
      </PageCard>

      <PageCard title="sale" hint="зачёркнутая цена справа · size=large">
        <StateRow label="sale='990 ₽'">
          {(['primary', 'secondary on bg_primary', 'tertiary'] as AppButtonPriority[]).map((p) => (
            <Zoomable key={p} title="button 2.5" subtitle={`${p} · sale`}>
              <Button
                appearance="default"
                priority={p}
                size="large"
                state="default"
                sale="990 ₽"
              >
                499 ₽
              </Button>
            </Zoomable>
          ))}
        </StateRow>
      </PageCard>

      <PageCard title="view=icon" hint="иконочный вариант · опциональный badge">
        <StateRow label="size · primary">
          {(['large', 'medium', 'small'] as const).map((size) => (
            <Zoomable key={size} title="button 2.5" subtitle={`icon · primary · ${size}`}>
              <Button
                appearance="default"
                priority="primary"
                size={size}
                state="default"
                view="icon"
                icon={<IconBell />}
                aria-label="уведомления"
              />
            </Zoomable>
          ))}
        </StateRow>
        <StateRow label="badge">
          {(['primary', 'destructive', 'tertiary'] as AppButtonPriority[]).map((p) => (
            <Zoomable key={p} title="button 2.5" subtitle={`icon · ${p} · badge`}>
              <Button
                appearance="default"
                priority={p}
                size="large"
                state="default"
                view="icon"
                icon={<IconBell />}
                aria-label="срочно"
                badge
              />
            </Zoomable>
          ))}
        </StateRow>
      </PageCard>
    </PageLayout>
  );
}
