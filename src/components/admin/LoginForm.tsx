'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoginForm({ locale }: { locale: string }) {
  const t = useTranslations('admin');
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('ACCESS DENIED');
      } else {
        router.push(`/${locale}/admin`);
        router.refresh();
      }
    } catch {
      setError('CONNECTION ERROR');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <div
        className="border border-accent/20 bg-background/60 p-10 backdrop-blur-md"
        style={{
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h1 className="mb-8 text-center text-2xl text-accent">
          &gt; {t('login')}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs uppercase text-muted">
              {t('username')}
            </label>
            <input
              name="username"
              type="text"
              required
              className="w-full border border-purple/30 bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
              style={{ borderRadius: 'var(--radius-md)' }}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase text-muted">
              {t('password')}
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-purple/30 bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
              style={{ borderRadius: 'var(--radius-md)' }}
            />
          </div>
          {error && (
            <p className="text-xs text-red">[!] {error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full border-2 border-accent/50 bg-accent/10 px-6 py-3 text-sm uppercase text-accent transition-all hover:bg-accent hover:text-background disabled:opacity-50"
            style={{ boxShadow: 'var(--shadow-glow)' }}
          >
            {loading ? '...' : `[ ${t('login')} ]`}
          </button>
        </form>
      </div>
    </div>
  );
}
