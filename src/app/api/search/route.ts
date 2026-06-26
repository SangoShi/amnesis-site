import { NextResponse } from 'next/server';
import { getAllCharacters, getAllFloraFauna, getAllArtifacts, getAllFactions, getUniverses } from '@/lib/content';
import fs from 'fs';
import path from 'path';
import type { Locale } from '@/types';

function getTimeline() {
  const filePath = path.join(process.cwd(), 'content', 'timeline.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const locale = (searchParams.get('locale') || 'ru') as Locale;

  const characters = getAllCharacters(locale).map((c) => ({
    slug: c.slug,
    name: c.name,
    type: 'character' as const,
    codename: c.codename,
    classification: c.classification,
    rarity: c.rarity,
    status: c.status,
    universe: c.universe,
    portrait: c.portrait,
    tags: c.tags || [],
  }));

  const floraFauna = getAllFloraFauna(locale).map((f) => ({
    slug: f.slug,
    name: f.name,
    type: f.type as 'flora' | 'fauna',
    rarity: f.rarity,
    universe: f.universe,
    portrait: f.portrait,
    tags: f.tags || [],
  }));

  const artifacts = getAllArtifacts(locale).map((a) => ({
    slug: a.slug,
    name: a.name,
    type: 'artifact' as const,
    rarity: a.rarity,
    universe: a.universe,
    portrait: a.portrait,
    description: locale === 'en' ? a.descriptionEn : a.descriptionRu,
    tags: [] as string[],
  }));

  const factions = getAllFactions(locale).map((f) => ({
    slug: f.slug,
    name: f.name,
    type: 'faction' as const,
    universe: f.universe,
    portrait: f.portrait,
    description: locale === 'en' ? f.descriptionEn : f.descriptionRu,
    tags: [] as string[],
  }));

  const universes = getUniverses().map((u) => ({
    slug: u.slug,
    name: locale === 'en' ? u.nameEn : u.nameRu,
    type: 'universe' as const,
    description: locale === 'en' ? u.descriptionEn : u.descriptionRu,
    status: u.status,
    portrait: '',
    tags: [] as string[],
  }));

  const timeline = getTimeline().map((ev: { date: string; titleRu: string; titleEn: string; descriptionRu: string; descriptionEn: string; universe: string }, i: number) => ({
    slug: `event-${i}`,
    name: locale === 'en' ? ev.titleEn : ev.titleRu,
    type: 'timeline' as const,
    date: ev.date,
    universe: ev.universe,
    description: locale === 'en' ? ev.descriptionEn : ev.descriptionRu,
    portrait: '',
    tags: [] as string[],
  }));

  const allItems = [...characters, ...floraFauna, ...artifacts, ...factions, ...universes, ...timeline];

  if (!q) {
    return NextResponse.json({ results: allItems });
  }

  const results = allItems.filter((item) => {
    const searchable = [
      item.name,
      'codename' in item ? (item as { codename?: string }).codename : '',
      'classification' in item ? (item as { classification?: string }).classification : '',
      'description' in item ? (item as { description?: string }).description : '',
      'date' in item ? (item as { date?: string }).date : '',
      ...(item.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchable.includes(q);
  });

  return NextResponse.json({ results });
}
