'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inputClass = "w-full border border-purple/30 bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none";
const inputStyle = { borderRadius: 'var(--radius-md)' };

interface TimelineEvent {
  date: string;
  titleRu: string;
  titleEn: string;
  descriptionRu: string;
  descriptionEn: string;
  universe: string;
  characters: string[];
}

export default function TimelineEditor() {
  const router = useRouter();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<TimelineEvent>({
    date: '', titleRu: '', titleEn: '', descriptionRu: '', descriptionEn: '', universe: 'amnesis', characters: [],
  });

  useEffect(() => {
    fetch('/api/admin/timeline').then(r => r.json()).then(setEvents);
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editing !== null) {
        await fetch('/api/admin/timeline', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index: editing, data: form }),
        });
      } else {
        await fetch('/api/admin/timeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      const res = await fetch('/api/admin/timeline');
      setEvents(await res.json());
      setEditing(null);
      setForm({ date: '', titleRu: '', titleEn: '', descriptionRu: '', descriptionEn: '', universe: 'amnesis', characters: [] });
      router.refresh();
    } finally { setLoading(false); }
  };

  const handleDelete = async (index: number) => {
    await fetch('/api/admin/timeline', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    });
    const res = await fetch('/api/admin/timeline');
    setEvents(await res.json());
    router.refresh();
  };

  const handleEdit = (index: number) => {
    setEditing(index);
    setForm(events[index]);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="mb-4 text-xl text-accent">{editing !== null ? 'EDIT EVENT' : 'ADD EVENT'}</h2>
        <div className="flex flex-col gap-4 border border-purple/20 bg-surface/30 p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-xs uppercase text-muted">Date</label><input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} style={inputStyle} /></div>
            <div><label className="mb-1 block text-xs uppercase text-muted">Universe</label>
              <select value={form.universe} onChange={(e) => setForm({ ...form, universe: e.target.value })} className={inputClass} style={inputStyle}>
                <option value="amnesis">Amnesis</option><option value="ostrov">Ostrov</option><option value="quarantine">Quarantine</option>
              </select></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-xs uppercase text-muted">Title (RU)</label><input value={form.titleRu} onChange={(e) => setForm({ ...form, titleRu: e.target.value })} className={inputClass} style={inputStyle} /></div>
            <div><label className="mb-1 block text-xs uppercase text-muted">Title (EN)</label><input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className={inputClass} style={inputStyle} /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-xs uppercase text-muted">Description (RU)</label><input value={form.descriptionRu} onChange={(e) => setForm({ ...form, descriptionRu: e.target.value })} className={inputClass} style={inputStyle} /></div>
            <div><label className="mb-1 block text-xs uppercase text-muted">Description (EN)</label><input value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} className={inputClass} style={inputStyle} /></div>
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase text-muted">Characters (slugs, comma-sep)</label>
            <input value={form.characters.join(', ')} onChange={(e) => setForm({ ...form, characters: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className={inputClass} style={inputStyle} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={loading} className="rounded-full border-2 border-accent/50 bg-accent/10 px-6 py-2 text-sm uppercase text-accent transition-all hover:bg-accent hover:text-background disabled:opacity-50">
              {loading ? '...' : editing !== null ? '[ UPDATE ]' : '[ ADD ]'}
            </button>
            {editing !== null && (
              <button onClick={() => { setEditing(null); setForm({ date: '', titleRu: '', titleEn: '', descriptionRu: '', descriptionEn: '', universe: 'amnesis', characters: [] }); }} className="rounded-full border border-purple/30 px-6 py-2 text-sm uppercase text-muted hover:text-accent">
                [ CANCEL ]
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl text-accent">TIMELINE EVENTS</h2>
        <div className="flex flex-col gap-3">
          {events.map((ev, i) => (
            <div key={i} className="flex items-center justify-between border border-purple/20 bg-surface/30 p-4" style={{ borderRadius: 'var(--radius-lg)' }}>
              <div>
                <p className="text-xs text-accent">{ev.date}</p>
                <p className="text-sm">{ev.titleRu}</p>
                <p className="text-xs text-muted">{ev.descriptionRu}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(i)} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent hover:bg-accent/20">[EDIT]</button>
                <button onClick={() => handleDelete(i)} className="rounded-full bg-red/10 px-3 py-1 text-xs text-red hover:bg-red/20">[DEL]</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
