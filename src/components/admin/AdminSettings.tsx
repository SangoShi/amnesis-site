'use client';

import { useState } from 'react';

const inputClass = "w-full border border-purple/30 bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none";
const inputStyle = { borderRadius: 'var(--radius-md)' };

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('newPassword') as string;

    if (!newPassword || newPassword.length < 4) {
      setMessage('Пароль слишком короткий / Password too short');
      setSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      if (res.ok) {
        setMessage('Пароль обновлён / Password updated');
      } else {
        setMessage('Ошибка / Error');
      }
    } catch {
      setMessage('Ошибка / Error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">НАСТРОЙКИ / SETTINGS</h1>

      <div className="border border-purple/20 bg-surface/50 p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
        <h2 className="mb-4 text-lg text-accent">Смена пароля / Change Password</h2>
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs uppercase text-muted">Новый пароль / New Password</label>
            <input name="newPassword" type="password" required className={inputClass} style={inputStyle} />
          </div>
          {message && (
            <p className={`text-sm ${message.includes('обновлён') || message.includes('updated') ? 'text-green' : 'text-red'}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="rounded-full border-2 border-accent/50 bg-accent/10 px-6 py-2 text-sm uppercase text-accent transition-all hover:bg-accent hover:text-background disabled:opacity-50"
            style={{ boxShadow: 'var(--shadow-glow)' }}
          >
            {saving ? '...' : '[ СОХРАНИТЬ / SAVE ]'}
          </button>
        </form>
      </div>
    </div>
  );
}
