import { useEffect, useState, type ReactElement } from 'react';

import { SEED_COMPONENTS } from './componentsData';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { ZoomModal } from './layout/ZoomModal';
import {
  getCurrentUser,
  logout as authLogout,
  onAuthChange,
  type User,
} from './lib/auth';
import { useHashRoute } from './lib/useHashRoute';
import { UserContext } from './lib/UserContext';
import { ZoomContext, type ZoomState } from './lib/ZoomContext';
import { AppBadgePage } from './pages/AppBadgePage';
import { AppButtonPage } from './pages/AppButtonPage';
import { AppSpinnerPage } from './pages/AppSpinnerPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { StubComponentPage } from './pages/components/StubComponentPage';
import { ColorsPage } from './pages/foundations/ColorsPage';
import { IconsPage } from './pages/foundations/IconsPage';
import { RadiiPage } from './pages/foundations/RadiiPage';
import { SpacingPage } from './pages/foundations/SpacingPage';
import { TypographyPage } from './pages/foundations/TypographyPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotesPage } from './pages/NotesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RulesPage } from './pages/RulesPage';

const COMPONENT_PAGES: Record<string, () => ReactElement> = {
  'app-button-23': AppButtonPage,
  'app-spinner-21': AppSpinnerPage,
  'app-badge-22': AppBadgePage,
};

const FOUNDATIONS_PAGES: Record<string, () => ReactElement> = {
  typography: TypographyPage,
  colors: ColorsPage,
  spacing: SpacingPage,
  radii: RadiiPage,
  icons: IconsPage,
};

type Theme = 'light' | 'dark';

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem('carnica-theme');
    return stored === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function writeStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('carnica-theme', theme);
  } catch {
    /* Storage can be unavailable in restricted browser contexts. */
  }
}

function renderPage(path: string): ReactElement {
  if (path === '/' || path === '') return <HomePage />;
  if (path === '/changelog') return <ChangelogPage />;
  if (path === '/rules') return <RulesPage />;
  if (path === '/notes') return <NotesPage />;

  const componentMatch = path.match(/^\/components\/([^/]+)$/);
  if (componentMatch) {
    const id = componentMatch[1];
    const Live = COMPONENT_PAGES[id];
    if (Live) return <Live />;
    const record = SEED_COMPONENTS.find((component) => component.id === id);
    if (record) return <StubComponentPage record={record} />;
    return <NotFoundPage path={path} />;
  }

  const foundationsMatch = path.match(/^\/foundations\/([^/]+)$/);
  if (foundationsMatch) {
    const Page = FOUNDATIONS_PAGES[foundationsMatch[1]];
    if (Page) return <Page />;
  }

  return <NotFoundPage path={path} />;
}

export function LegacyShowcase() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const [search, setSearch] = useState('');
  const [zoom, setZoom] = useState<ZoomState | null>(null);
  const path = useHashRoute();

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writeStoredTheme(theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [path]);

  function handleLogout() {
    void authLogout();
  }

  if (authLoading) {
    return <div className="min-h-screen bg-bee-bg-primary" />;
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <UserContext.Provider value={{ user, logout: handleLogout }}>
      <ZoomContext.Provider value={setZoom}>
        <div className="min-h-screen bg-bee-bg-primary text-bee-content-primary">
          <Header
            theme={theme}
            onTheme={setTheme}
            search={search}
            onSearch={setSearch}
          />
          <Sidebar currentPath={path} />
          <main className="ml-64 pt-16">{renderPage(path)}</main>
          {zoom ? <ZoomModal zoom={zoom} onClose={() => setZoom(null)} /> : null}
        </div>
      </ZoomContext.Provider>
    </UserContext.Provider>
  );
}
