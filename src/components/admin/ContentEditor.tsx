'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inputClass = "w-full border border-purple/30 bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none";
const inputStyle = { borderRadius: 'var(--radius-md)' };

interface SiteConfig {
  landing: {
    titleRu: string;
    titleEn: string;
    subtitleRu: string;
    subtitleEn: string;
    aboutCards: {
      icon: string;
      titleRu: string;
      titleEn: string;
      descriptionRu: string;
      descriptionEn: string;
    }[];
  };
  footer: {
    telegram: string;
    copyright: string;
  };
  sections: Record<string, { enabled: boolean; order: number }>;
}

export default function ContentEditor() {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then(setConfig);
  }, []);

  async function handleSave() {
    if (!config) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (!config) return <p className="text-muted">Loading...</p>;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="mb-4 text-xl text-accent">LANDING PAGE</h2>
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs uppercase text-muted">Title (RU)</label>
              <input
                value={config.landing.titleRu}
                onChange={(e) => setConfig({ ...config, landing: { ...config.landing, titleRu: e.target.value } })}
                className={inputClass} style={inputStyle}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase text-muted">Title (EN)</label>
              <input
                value={config.landing.titleEn}
                onChange={(e) => setConfig({ ...config, landing: { ...config.landing, titleEn: e.target.value } })}
                className={inputClass} style={inputStyle}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs uppercase text-muted">Subtitle (RU)</label>
              <input
                value={config.landing.subtitleRu}
                onChange={(e) => setConfig({ ...config, landing: { ...config.landing, subtitleRu: e.target.value } })}
                className={inputClass} style={inputStyle}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase text-muted">Subtitle (EN)</label>
              <input
                value={config.landing.subtitleEn}
                onChange={(e) => setConfig({ ...config, landing: { ...config.landing, subtitleEn: e.target.value } })}
                className={inputClass} style={inputStyle}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl text-accent">ABOUT CARDS</h2>
        {config.landing.aboutCards.map((card, i) => (
          <div key={i} className="mb-4 border border-purple/20 bg-surface/30 p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase text-muted">Title (RU)</label>
                <input
                  value={card.titleRu}
                  onChange={(e) => {
                    const cards = [...config.landing.aboutCards];
                    cards[i] = { ...cards[i], titleRu: e.target.value };
                    setConfig({ ...config, landing: { ...config.landing, aboutCards: cards } });
                  }}
                  className={inputClass} style={inputStyle}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase text-muted">Title (EN)</label>
                <input
                  value={card.titleEn}
                  onChange={(e) => {
                    const cards = [...config.landing.aboutCards];
                    cards[i] = { ...cards[i], titleEn: e.target.value };
                    setConfig({ ...config, landing: { ...config.landing, aboutCards: cards } });
                  }}
                  className={inputClass} style={inputStyle}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase text-muted">Description (RU)</label>
                <input
                  value={card.descriptionRu}
                  onChange={(e) => {
                    const cards = [...config.landing.aboutCards];
                    cards[i] = { ...cards[i], descriptionRu: e.target.value };
                    setConfig({ ...config, landing: { ...config.landing, aboutCards: cards } });
                  }}
                  className={inputClass} style={inputStyle}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase text-muted">Description (EN)</label>
                <input
                  value={card.descriptionEn}
                  onChange={(e) => {
                    const cards = [...config.landing.aboutCards];
                    cards[i] = { ...cards[i], descriptionEn: e.target.value };
                    setConfig({ ...config, landing: { ...config.landing, aboutCards: cards } });
                  }}
                  className={inputClass} style={inputStyle}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-xl text-accent">SECTIONS</h2>
        <div className="flex flex-col gap-3">
          {Object.entries(config.sections).map(([key, section]) => (
            <div key={key} className="flex items-center justify-between border border-purple/20 bg-surface/30 p-4" style={{ borderRadius: 'var(--radius-lg)' }}>
              <span className="text-sm uppercase text-muted">{key}</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={section.enabled}
                    onChange={(e) => setConfig({
                      ...config,
                      sections: { ...config.sections, [key]: { ...section, enabled: e.target.checked } }
                    })}
                  />
                  Enabled
                </label>
                <input
                  type="number"
                  value={section.order}
                  onChange={(e) => setConfig({
                    ...config,
                    sections: { ...config.sections, [key]: { ...section, order: Number(e.target.value) } }
                  })}
                  className="w-16 border border-purple/30 bg-surface/50 px-3 py-1 text-sm text-foreground focus:border-accent focus:outline-none"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl text-accent">FOOTER</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs uppercase text-muted">Telegram</label>
            <input
              value={config.footer.telegram}
              onChange={(e) => setConfig({ ...config, footer: { ...config.footer, telegram: e.target.value } })}
              className={inputClass} style={inputStyle}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase text-muted">Copyright</label>
            <input
              value={config.footer.copyright}
              onChange={(e) => setConfig({ ...config, footer: { ...config.footer, copyright: e.target.value } })}
              className={inputClass} style={inputStyle}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="rounded-full border-2 border-accent/50 bg-accent/10 px-8 py-3 text-sm uppercase text-accent transition-all hover:bg-accent hover:text-background disabled:opacity-50"
        style={{ boxShadow: 'var(--shadow-glow)' }}
      >
        {loading ? '...' : '[ SAVE ALL ]'}
      </button>
    </div>
  );
}
