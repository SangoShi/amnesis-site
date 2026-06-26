import { NextResponse } from 'next/server';
import { getAllCharacters, getAllFloraFauna, getAllArtifacts, getAllFactions, getUniverses } from '@/lib/content';
import fs from 'fs';
import path from 'path';
import type { Locale } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get('locale') || 'ru') as Locale;

  const urls: string[] = [];

  const characters = getAllCharacters(locale);
  characters.forEach((c) => urls.push(`/${locale}/character/${c.slug}`));

  const floraFauna = getAllFloraFauna(locale);
  floraFauna.forEach((f) => urls.push(`/${locale}/flora-fauna/${f.slug}`));

  const artifacts = getAllArtifacts(locale);
  artifacts.forEach((a) => urls.push(`/${locale}/artifact/${a.slug}`));

  const factions = getAllFactions(locale);
  factions.forEach((f) => urls.push(`/${locale}/faction/${f.slug}`));

  const universes = getUniverses().filter((u) => u.status === 'active');
  universes.forEach((u) => urls.push(`/${locale}/universe/${u.slug}`));

  const timelinePath = path.join(process.cwd(), 'content', 'timeline.json');
  if (fs.existsSync(timelinePath)) {
    urls.push(`/${locale}/timeline`);
  }

  if (urls.length === 0) {
    return NextResponse.json({ url: `/${locale}` });
  }

  const random = urls[Math.floor(Math.random() * urls.length)];
  return NextResponse.json({ url: random });
}
