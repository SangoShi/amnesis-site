'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Search } from 'lucide-react';

interface SearchResult {
  slug: string;
  type: string;
  name: string;
  codename?: string;
  rarity?: string;
  status?: string;
  universe?: string;
  portrait?: string;
  description?: string;
  date?: string;
}

const typeLabels: Record<string, { ru: string; en: string }> = {
  character: { ru: 'ПЕРСОНАЖ', en: 'CHARACTER' },
  flora: { ru: 'ФЛОРА', en: 'FLORA' },
  fauna: { ru: 'ФАУНА', en: 'FAUNA' },
  artifact: { ru: 'АРТЕФАКТ', en: 'ARTIFACT' },
  faction: { ru: 'ФРАКЦИЯ', en: 'FACTION' },
  universe: { ru: 'ВСЕЛЕННАЯ', en: 'UNIVERSE' },
  timeline: { ru: 'СОБЫТИЕ', en: 'EVENT' },
};

const typeLinks: Record<string, (slug: string) => string> = {
  character: (s) => `/character/${s}`,
  flora: (s) => `/flora-fauna/${s}`,
  fauna: (s) => `/flora-fauna/${s}`,
  artifact: (s) => `/artifact/${s}`,
  faction: (s) => `/faction/${s}`,
  universe: (s) => `/universe/${s}`,
  timeline: () => `/timeline`,
};

const rarityColors: Record<string, string> = {
  green: 'border-green/30 text-green',
  red: 'border-red/30 text-red',
  blue: 'border-blue/30 text-blue',
};

export default function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations('search');
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<string>('ru');
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  const performSearch = useCallback(
    async (q: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&locale=${locale}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [locale]
  );

  useEffect(() => {
    const timer = setTimeout(() => performSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const getLink = (result: SearchResult) => {
    const fn = typeLinks[result.type];
    return fn ? fn(result.slug) : '#';
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-center text-4xl text-accent">
        {t('results')}
      </h1>

      <div className="relative mx-auto mb-12 max-w-xl">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-muted"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={locale === 'en' ? 'Search everything...' : 'Искать по всему...'}
          className="w-full border border-accent/20 bg-surface/50 py-3 pl-14 pr-6 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          style={{ borderRadius: 'var(--radius-full)' }}
        />
      </div>

      {loading && (
        <p className="text-center text-sm text-muted">
          {locale === 'en' ? 'Searching...' : 'Поиск...'}
        </p>
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-center text-sm text-muted">
          {t('noResults')}
        </p>
      )}

      {results.length > 0 && (
        <div className="flex flex-col gap-3">
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.slug}`}
              href={getLink(result)}
              className={`group flex items-center gap-4 border bg-surface/50 p-4 transition-all hover:bg-surface/80 ${
                result.rarity ? rarityColors[result.rarity] || 'border-purple/20' : 'border-purple/20'
              }`}
              style={{ borderRadius: 'var(--radius-lg)' }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-xs text-accent">
                {(typeLabels[result.type]?.[locale as 'ru' | 'en'] || result.type).slice(0, 3)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase text-muted">
                    [{typeLabels[result.type]?.[locale as 'ru' | 'en'] || result.type}]
                  </span>
                  {result.date && (
                    <span className="text-xs text-accent/60">{result.date}</span>
                  )}
                </div>
                <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                  {result.name}
                </p>
                {result.description && (
                  <p className="text-xs text-muted line-clamp-1">{result.description}</p>
                )}
              </div>
              {result.rarity && (
                <span className={`rounded-full bg-surface px-2 py-0.5 text-xs ${rarityColors[result.rarity]?.split(' ')[1] || ''}`}>
                  {result.rarity.toUpperCase()}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}

      {!loading && !query && results.length > 0 && (
        <div>
          <p className="mb-4 text-center text-xs text-muted">
            {locale === 'en' ? 'All content' : 'Весь контент'} ({results.length})
          </p>
          <div className="flex flex-col gap-3">
            {results.slice(0, 20).map((result) => (
              <Link
                key={`${result.type}-${result.slug}`}
                href={getLink(result)}
                className="group flex items-center gap-4 border border-purple/20 bg-surface/50 p-4 transition-all hover:bg-surface/80"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-xs text-accent">
                  {(typeLabels[result.type]?.[locale as 'ru' | 'en'] || result.type).slice(0, 3)}
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase text-muted">
                    [{typeLabels[result.type]?.[locale as 'ru' | 'en'] || result.type}]
                  </span>
                  <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                    {result.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
