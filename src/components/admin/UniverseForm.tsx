'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Universe } from '@/types';

const inputClass = "w-full border border-purple/30 bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none";
const inputStyle = { borderRadius: 'var(--radius-md)' };

export default function UniverseForm({
  locale,
  universe,
}: {
  locale: string;
  universe?: Universe;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const slug = (data.slug as string || data.nameEn as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    try {
      const url = universe
        ? `/api/admin/universe/${universe.slug}`
        : '/api/admin/universe';
      const method = universe ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          nameRu: data.nameRu,
          nameEn: data.nameEn,
          descriptionRu: data.descriptionRu,
          descriptionEn: data.descriptionEn,
          status: data.status,
          order: Number(data.order),
        }),
      });

      if (res.ok) {
        router.push(`/${locale}/admin/universes`);
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
          <input name="nameRu" defaultValue={universe?.nameRu} required className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Name (EN)</label>
          <input name="nameEn" defaultValue={universe?.nameEn} required className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase text-muted">Slug (URL, only latin)</label>
        <input name="slug" defaultValue={universe?.slug} placeholder="sector-amnesis" className={inputClass} style={inputStyle} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Description (RU)</label>
          <input name="descriptionRu" defaultValue={universe?.descriptionRu} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Description (EN)</label>
          <input name="descriptionEn" defaultValue={universe?.descriptionEn} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Status</label>
          <select name="status" defaultValue={universe?.status || 'active'} className={inputClass} style={inputStyle}>
            <option value="active">Active</option>
            <option value="locked">Locked</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase text-muted">Order</label>
          <input name="order" type="number" defaultValue={universe?.order || 1} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full border-2 border-accent/50 bg-accent/10 px-8 py-3 text-sm uppercase text-accent transition-all hover:bg-accent hover:text-background disabled:opacity-50"
        style={{ boxShadow: 'var(--shadow-glow)' }}
      >
        {loading ? '...' : '[ SAVE ]'}
      </button>
    </form>
  );
}
