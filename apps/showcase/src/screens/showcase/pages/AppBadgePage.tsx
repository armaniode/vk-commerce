import {
  Badge,
  appBadgeColor,
  appBadgeSize,
  type AppBadgeColor,
} from '@carnica/components/app';
import { IconBell } from '@carnica/icons/alert/IconBell';
import { IconCheck } from '@carnica/icons/actions/IconCheck';

import { PageLayout, PageCard } from '../layout/PageLayout';
import { Zoomable } from '../layout/Zoomable';
import { StateRow } from './components/StateRow';

// app-badge-22 в Supabase · автор: Дима Нищев · status: in-progress.
// API: view=dot/text/icon · color (9 вариантов) · size=S/M.

const BADGE_COLORS: AppBadgeColor[] = [...appBadgeColor];
const SIZES = [...appBadgeSize];

// Цвет 'custom' требует кастомные токены — пропускаем по умолчанию
const DEMO_COLORS = BADGE_COLORS.filter((c) => c !== 'custom');

export function AppBadgePage() {
  return (
    <PageLayout
      title="badge 3.0"
      subtitle="APP Badge · view=dot/text/icon · 9 color × 2 size · автор: Дима Нищев"
    >
      <PageCard title="view=dot" hint="строки — color · колонки — size (S/M)">
        {DEMO_COLORS.map((color) => (
          <StateRow key={color} label={color}>
            {SIZES.map((size) => (
              <Zoomable key={size} title="badge 3.0" subtitle={`dot · ${color} · ${size}`}>
                <Badge view="dot" color={color} size={size} />
              </Zoomable>
            ))}
          </StateRow>
        ))}
      </PageCard>

      <PageCard title="view=text" hint="строки — color · колонки — size">
        {DEMO_COLORS.map((color) => (
          <StateRow key={color} label={color}>
            {SIZES.map((size) => (
              <Zoomable key={size} title="badge 3.0" subtitle={`text · ${color} · ${size}`}>
                <Badge view="text" color={color} size={size} label="new" />
              </Zoomable>
            ))}
          </StateRow>
        ))}
      </PageCard>

      <PageCard title="view=icon" hint="строки — color · колонки — size">
        {DEMO_COLORS.map((color) => (
          <StateRow key={color} label={color}>
            {SIZES.map((size) => (
              <Zoomable key={size} title="badge 3.0" subtitle={`icon · ${color} · ${size}`}>
                <Badge view="icon" color={color} size={size} icon={<IconCheck />} />
              </Zoomable>
            ))}
          </StateRow>
        ))}
      </PageCard>

      <PageCard title="stretch" hint="растяжение текста по контейнеру · только для view=text">
        <StateRow label="stretch=true">
          <Zoomable title="badge 3.0" subtitle="text · brand · stretch">
            <div className="w-[280px]">
              <Badge view="text" color="brand" size="M" label="распродажа недели" stretch />
            </div>
          </Zoomable>
          <Zoomable title="badge 3.0" subtitle="text · accent · stretch">
            <div className="w-[280px]">
              <Badge view="text" color="accent" size="M" label="новый тариф" stretch />
            </div>
          </Zoomable>
        </StateRow>
      </PageCard>

      <PageCard title="композиция с иконкой" hint="badge рядом с действием/уведомлением">
        <StateRow label="примеры">
          <Zoomable title="badge 3.0" subtitle="dot · error · рядом с иконкой">
            <div className="relative inline-flex">
              <IconBell />
              <span className="absolute -top-1 -right-1">
                <Badge view="dot" color="error" size="S" />
              </span>
            </div>
          </Zoomable>
          <Zoomable title="badge 3.0" subtitle="text · brand · рядом с иконкой">
            <div className="relative inline-flex">
              <IconBell />
              <span className="absolute -top-1 -right-1">
                <Badge view="text" color="brand" size="S" label="3" />
              </span>
            </div>
          </Zoomable>
        </StateRow>
      </PageCard>
    </PageLayout>
  );
}
