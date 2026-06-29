import {
  Spinner,
  appSpinnerColor,
  type AppSpinnerColor,
} from '@carnica/components/app';

import { PageLayout, PageCard } from '../layout/PageLayout';
import { Zoomable } from '../layout/Zoomable';
import { StateRow } from './components/StateRow';

// app-spinner-21 в Supabase · автор: Дима Нищев · status: in-progress.
// API: color (5 вариантов) · theme=light/dark · size=number (произвольный пиксельный)

const COLORS: AppSpinnerColor[] = [...appSpinnerColor];
const SIZES = [16, 20, 24, 32, 40];

export function AppSpinnerPage() {
  return (
    <PageLayout
      title="spinner 2.1"
      subtitle="APP Spinner · 5 color × theme=light/dark · произвольный size · автор: Дима Нищев"
    >
      <PageCard title="color · theme=light" hint="строки — color · колонки — size">
        {COLORS.map((color) => (
          <StateRow key={color} label={color}>
            {SIZES.map((size) => (
              <Zoomable key={size} title="spinner 2.1" subtitle={`${color} · ${size}px · light`}>
                <Spinner color={color} theme="light" size={size} />
              </Zoomable>
            ))}
          </StateRow>
        ))}
      </PageCard>

      <PageCard title="color · theme=dark" hint="вариант для использования на тёмной подложке">
        {COLORS.map((color) => (
          <StateRow key={color} label={color}>
            {SIZES.map((size) => (
              <Zoomable
                key={size}
                title="spinner 2.1"
                subtitle={`${color} · ${size}px · dark`}
              >
                <Spinner color={color} theme="dark" size={size} />
              </Zoomable>
            ))}
          </StateRow>
        ))}
      </PageCard>
    </PageLayout>
  );
}
