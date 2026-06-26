import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Character, FloraFauna, Universe, Locale, Artifact, Faction } from '@/types';

const contentDir = path.join(process.cwd(), 'content');

function readMDXFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data, body: content };
}

export function getAllCharacters(locale: Locale): Character[] {
  const charsDir = path.join(contentDir, 'characters');
  if (!fs.existsSync(charsDir)) return [];

  const files = fs.readdirSync(charsDir).filter((f) => f.endsWith('.mdx'));

  const characters = files.map((file) => {
    const { frontmatter, body } = readMDXFile(path.join(charsDir, file));
    return {
      ...frontmatter,
      body,
      name: locale === 'en' ? frontmatter.nameEn : frontmatter.nameRu,
      mutations: locale === 'en' ? frontmatter.mutationsEn : frontmatter.mutationsRu,
      location: locale === 'en' ? frontmatter.locationEn : frontmatter.locationRu,
      gender: locale === 'en' ? frontmatter.genderEn : frontmatter.genderRu,
    } as Character;
  });

  return characters.sort((a, b) => a.order - b.order);
}

export function getCharacterBySlug(slug: string): Character | null {
  const filePath = path.join(contentDir, 'characters', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { frontmatter, body } = readMDXFile(filePath);
  return {
    ...frontmatter,
    body,
    name: frontmatter.nameRu,
    mutations: frontmatter.mutationsRu,
    location: frontmatter.locationRu,
    gender: frontmatter.genderRu,
  } as Character;
}

export function getAllFloraFauna(locale: Locale): FloraFauna[] {
  const ffDir = path.join(contentDir, 'flora-fauna');
  if (!fs.existsSync(ffDir)) return [];

  const files = fs.readdirSync(ffDir).filter((f) => f.endsWith('.mdx'));

  const entries = files.map((file) => {
    const { frontmatter, body } = readMDXFile(path.join(ffDir, file));
    return {
      ...frontmatter,
      body,
      name: locale === 'en' ? frontmatter.nameEn : frontmatter.nameRu,
    } as FloraFauna;
  });

  return entries.sort((a, b) => a.order - b.order);
}

export function getFloraFaunaBySlug(slug: string): FloraFauna | null {
  const filePath = path.join(contentDir, 'flora-fauna', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { frontmatter, body } = readMDXFile(filePath);
  return {
    ...frontmatter,
    body,
    name: frontmatter.nameRu,
  } as FloraFauna;
}

export function getUniverses(): Universe[] {
  const filePath = path.join(contentDir, 'universes.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function getAllSlugs(type: 'characters' | 'flora-fauna' | 'artifacts' | 'factions'): string[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

export function getLocalizedField(
  obj: Record<string, unknown>,
  field: string,
  locale: Locale
): string {
  const ruKey = `${field}Ru`;
  const enKey = `${field}En`;
  if (locale === 'en' && obj[enKey]) return obj[enKey] as string;
  return (obj[ruKey] as string) || '';
}

export function getRelatedCharacters(slug: string, universe: string, locale: Locale): Character[] {
  return getAllCharacters(locale)
    .filter((c) => c.universe === universe && c.slug !== slug)
    .slice(0, 3);
}

export function getAllArtifacts(locale: Locale): Artifact[] {
  const dir = path.join(contentDir, 'artifacts');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const entries = files.map((file) => {
    const { frontmatter, body } = readMDXFile(path.join(dir, file));
    return {
      ...frontmatter,
      body,
      name: locale === 'en' ? frontmatter.nameEn : frontmatter.nameRu,
    } as Artifact;
  });

  return entries.sort((a, b) => a.order - b.order);
}

export function getArtifactBySlug(slug: string): Artifact | null {
  const filePath = path.join(contentDir, 'artifacts', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { frontmatter, body } = readMDXFile(filePath);
  return {
    ...frontmatter,
    body,
    name: frontmatter.nameRu,
  } as Artifact;
}

export function getCharacterArtifacts(slug: string, locale: Locale): Artifact[] {
  return getAllArtifacts(locale).filter((a) => a.owner === slug);
}

export function getAllFactions(locale: Locale): Faction[] {
  const dir = path.join(contentDir, 'factions');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const entries = files.map((file) => {
    const { frontmatter, body } = readMDXFile(path.join(dir, file));
    return {
      ...frontmatter,
      body,
      name: locale === 'en' ? frontmatter.nameEn : frontmatter.nameRu,
    } as Faction;
  });

  return entries.sort((a, b) => a.order - b.order);
}

export function getFactionBySlug(slug: string): Faction | null {
  const filePath = path.join(contentDir, 'factions', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { frontmatter, body } = readMDXFile(filePath);
  return {
    ...frontmatter,
    body,
    name: frontmatter.nameRu,
  } as Faction;
}

export function getCharacterFactions(slug: string, locale: Locale): Faction[] {
  return getAllFactions(locale).filter((f) => f.members?.includes(slug));
}
