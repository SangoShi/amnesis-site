'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FloraFauna } from '@/types';

const inputClass = "w-full border border-purple/30 bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none";
const inputStyle = { borderRadius: 'var(--radius-md)' };

export default function FloraFaunaForm({
  locale,
  entry,
}: {
  locale: string;
  entry?: FloraFauna;
}) {
  const t = useTranslations('admin');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const slug = (data.nameRu as string)
      .toLowerCase()
      .replace(/[^a-z0-9а-яё]+/gi, '-')
      .replace(/^-|-$/g, '');

    const body = `---
nameRu: "${data.nameRu}"
nameEn: "${data.nameEn}"
slug: "${slug}"
rarity: "${data.rarity}"
type: "${data.type}"
dangerLevel: "${data.dangerLevel}"
universe: "${data.universe}"
tags: [${(data.tags as string).split(',').map((t) => `"${t.trim()}"`).join(', ')}]
portrait: "${data.portrait}"
order: ${data.order}
---

${data.bodyRu}`;

    try {
      const url = entry
        ? `/api/admin/flora-fauna/${entry.slug}`
        : '/api/admin/flora-fauna';
      const method = entry ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, content: body }),
      });

      if (res.ok) {
        router.push(`/${locale}/admin/flora-fauna`);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Name (RU)</label>
          <input name="nameRu" defaultValue={entry?.nameRu} required className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Name (EN)</label>
          <input name="nameEn" defaultValue={entry?.nameEn} required className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Type</label>
          <select name="type" defaultValue={entry?.type || 'flora'} className={inputClass} style={inputStyle}>
            <option value="flora">Flora</option>
            <option value="fauna">Fauna</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Rarity</label>
          <select name="rarity" defaultValue={entry?.rarity || 'green'} className={inputClass} style={inputStyle}>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Danger Level</label>
          <select name="dangerLevel" defaultValue={entry?.dangerLevel || 'safe'} className={inputClass} style={inputStyle}>
            <option value="safe">Safe</option>
            <option value="predator">Predator</option>
            <option value="peaceful">Peaceful</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Universe</label>
          <select name="universe" defaultValue={entry?.universe || 'amnesis'} className={inputClass} style={inputStyle}>
            <option value="amnesis">Amnesis</option>
            <option value="ostrov">Ostrov</option>
            <option value="quarantine">Quarantine</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Portrait URL</label>
          <input name="portrait" defaultValue={entry?.portrait} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Tags (comma-separated)</label>
          <input name="tags" defaultValue={entry?.tags?.join(', ')} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Order</label>
          <input name="order" type="number" defaultValue={entry?.order || 1} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase text-muted">Description (RU)</label>
        <textarea name="bodyRu" rows={6} defaultValue={entry?.body} className={inputClass} style={inputStyle} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full border-2 border-accent/50 bg-accent/10 px-8 py-3 text-sm uppercase text-accent transition-all hover:bg-accent hover:text-background disabled:opacity-50"
        style={{ boxShadow: 'var(--shadow-glow)' }}
      >
        {loading ? '...' : `[ ${t('save')} ]`}
      </button>
    </form>
  );
}
