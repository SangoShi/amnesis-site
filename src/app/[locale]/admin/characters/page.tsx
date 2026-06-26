import { getAllCharacters } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';
import CharactersTable from '@/components/admin/CharactersTable';

export default async function AdminCharactersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const characters = getAllCharacters(locale as Locale);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl text-accent">CHARACTERS</h1>
        <Link
          href="/admin/character/new"
          className="rounded-full border border-accent/30 bg-surface/50 px-5 py-2 text-sm uppercase text-accent transition-all hover:bg-accent/10"
        >
          [+ NEW]
        </Link>
      </div>

      <CharactersTable characters={characters.map(c => ({
        slug: c.slug,
        name: c.name,
        codename: c.codename,
        status: c.status,
        rarity: c.rarity,
        universe: c.universe,
      }))} />
    </div>
  );
}
