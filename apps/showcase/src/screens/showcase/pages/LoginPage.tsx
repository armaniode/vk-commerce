import { useState } from 'react';
import { Button } from '@carnica/components/app';
import { IconEyeOpen } from '@carnica/icons/security/IconEyeOpen';
import { IconEyeClose } from '@carnica/icons/security/IconEyeClose';
import { BeelineLogo } from '../layout/BeelineLogo';
import { tryLogin, type User } from '../lib/auth';

interface Props {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = login.trim().length > 0 && password.length > 0 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    const result = await tryLogin(login, password);
    setSubmitting(false);
    if (result.user) {
      setError(null);
      onLogin(result.user);
    } else {
      setError(result.error ?? 'неверный логин или пароль');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bee-bg-primary">
      {/* navbar с логотипом по центру — только на странице входа */}
      <header className="h-16 shrink-0 flex items-center justify-center">
        <BeelineLogo size={32} />
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[440px] flex flex-col items-center gap-6">
          <h1 className="text-display-md text-bee-content-primary">вход в дс</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-bee-bg-secondary rounded-[24px] p-8 flex flex-col gap-4"
        >
          <Field label="логин">
            <input
              type="text"
              autoComplete="username"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setError(null);
              }}
              className="w-full h-12 px-4 rounded-pill text-body-sm bg-bee-el-secondary text-bee-content-primary placeholder-bee-content-tertiary focus:outline-none"
              placeholder="guest"
            />
          </Field>

          <Field label="пароль">
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="w-full h-12 pl-4 pr-12 rounded-pill text-body-sm bg-bee-el-secondary text-bee-content-primary placeholder-bee-content-tertiary focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? 'скрыть пароль' : 'показать пароль'}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center text-bee-content-tertiary hover:text-bee-content-primary transition-colors"
              >
                {showPwd ? <IconEyeClose /> : <IconEyeOpen />}
              </button>
            </div>
          </Field>

          {error ? (
            <p className="text-caption-md text-bee-error">{error}</p>
          ) : null}

          <Button
            appearance="default"
            priority="primary"
            size="large"
            state={submitting ? 'loading' : 'default'}
            type="submit"
            className="mt-2 w-full"
          >
            войти
          </Button>
        </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-caption-md text-bee-content-tertiary">{label}</span>
      {children}
    </label>
  );
}
