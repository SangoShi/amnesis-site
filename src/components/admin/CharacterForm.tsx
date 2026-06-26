'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { Character } from '@/types';

const inputClass = "w-full border border-purple/30 bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none";
const inputStyle = { borderRadius: 'var(--radius-md)' };

export default function CharacterForm({
  locale,
  character,
}: {
  locale: string;
  character?: Character;
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
codename: "${data.codename}"
slug: "${slug}"
status: "${data.status}"
rarity: "${data.rarity}"
classification: "${data.classification}"
mutationsRu: "${data.mutationsRu}"
mutationsEn: "${data.mutationsEn}"
locationRu: "${data.locationRu}"
locationEn: "${data.locationEn}"
genderRu: "${data.genderRu}"
genderEn: "${data.genderEn}"
universe: "${data.universe}"
type: "character"
tags: [${(data.tags as string).split(',').map((t) => `"${t.trim()}"`).join(', ')}]
portrait: "${data.portrait}"
order: ${data.order}
---

${data.bodyRu}`;

    try {
      const url = character
        ? `/api/admin/character/${character.slug}`
        : '/api/admin/character';
      const method = character ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, content: body }),
      });

      if (res.ok) {
        router.push(`/${locale}/admin/characters`);
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
          <input name="nameRu" defaultValue={character?.nameRu} required className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Name (EN)</label>
          <input name="nameEn" defaultValue={character?.nameEn} required className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Codename</label>
          <input name="codename" defaultValue={character?.codename} required className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Status</label>
          <select name="status" defaultValue={character?.status || 'active'} className={inputClass} style={inputStyle}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="frozen">Frozen</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Rarity</label>
          <select name="rarity" defaultValue={character?.rarity || 'green'} className={inputClass} style={inputStyle}>
            <option value="green">Green (Safe)</option>
            <option value="red">Red (Danger)</option>
            <option value="blue">Blue (Rare)</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Classification</label>
          <input name="classification" defaultValue={character?.classification} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Universe</label>
          <select name="universe" defaultValue={character?.universe || 'amnesis'} className={inputClass} style={inputStyle}>
            <option value="amnesis">Amnesis</option>
            <option value="ostrov">Ostrov</option>
            <option value="quarantine">Quarantine</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Mutations (RU)</label>
          <input name="mutationsRu" defaultValue={character?.mutationsRu} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Mutations (EN)</label>
          <input name="mutationsEn" defaultValue={character?.mutationsEn} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Location (RU)</label>
          <input name="locationRu" defaultValue={character?.locationRu} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Location (EN)</label>
          <input name="locationEn" defaultValue={character?.locationEn} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Gender (RU)</label>
          <input name="genderRu" defaultValue={character?.genderRu} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Gender (EN)</label>
          <input name="genderEn" defaultValue={character?.genderEn} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Order</label>
          <input name="order" type="number" defaultValue={character?.order || 1} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Portrait URL</label>
          <input name="portrait" defaultValue={character?.portrait} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Tags (comma-separated)</label>
          <input name="tags" defaultValue={character?.tags?.join(', ')} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase text-muted">Description (RU)</label>
        <textarea name="bodyRu" rows={6} defaultValue={character?.body} className={inputClass} style={inputStyle} />
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
