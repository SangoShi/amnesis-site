import { notFound } from 'next/navigation';
import { getUniverses, getAllCharacters, getAllFloraFauna } from '@/lib/content';
import CharacterCard from '@/components/character/CharacterCard';
import FloraFaunaCard from '@/components/flora-fauna/FloraFaunaCard';
import type { Locale } from '@/types';
import { Link } from '@/i18n/navigation';

export const dynamic = 'force-dynamic';

export default async function UniversePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const universes = getUniverses();
  const universe = universes.find((u) => u.slug === slug);

  if (!universe) {
    notFound();
  }

  const characters = getAllCharacters(locale as Locale).filter(
    (c) => c.universe === slug
  );
  const floraFauna = getAllFloraFauna(locale as Locale).filter(
    (f) => f.universe === slug
  );

  const name = locale === 'en' ? universe.nameEn : universe.nameRu;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between border-b border-purple/20 pb-4">
        <Link
          href="/"
          className="rounded-full border border-accent/30 bg-surface/50 px-6 py-2 text-lg uppercase text-accent transition-all hover:bg-accent/10 hover:text-green"
        >
          &lt; {locale === 'en' ? 'RETURN TO TERMINAL' : 'ВЕРНУТЬСЯ К ТЕРМИНАЛУ'}
        </Link>
        <span className={`rounded-full px-3 py-1 text-sm ${universe.status === 'active' ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
          {universe.status === 'active' ? 'ONLINE' : 'LOCKED'}
        </span>
      </div>

      <h1 className="mb-2 text-4xl text-accent">
        {name}
      </h1>
      <p className="mb-12 text-muted">
        {locale === 'en' ? universe.descriptionEn : universe.descriptionRu}
      </p>

      {universe.status === 'locked' && (
        <div className="mb-12 rounded-full border border-red/20 bg-red/5 px-6 py-4 text-center text-red">
          {locale === 'en' ? 'ACCESS RESTRICTED — DATA CLASSIFIED' : 'ДОСТУП ОГРАНИЧЕН — ДАННЫЕ ЗАСЕКРЕЧЕНЫ'}
        </div>
      )}

      {characters.length > 0 && (
        <section className="mb-16" id="bestiary">
          <h2 className="mb-6 border-b border-accent/20 pb-2 text-2xl text-accent">
            {locale === 'en' ? 'CHARACTERS' : 'ПЕРСОНАЖИ'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((char) => (
              <CharacterCard key={char.slug} character={char} />
            ))}
          </div>
        </section>
      )}

      {floraFauna.length > 0 && (
        <section>
          <h2 className="mb-6 border-b border-accent/20 pb-2 text-2xl text-accent">
            {locale === 'en' ? 'FLORA & FAUNA' : 'ФЛОРА И ФАУНА'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {floraFauna.map((ff) => (
              <FloraFaunaCard key={ff.slug} entry={ff} />
            ))}
          </div>
        </section>
      )}

      {characters.length === 0 && floraFauna.length === 0 && universe.status !== 'locked' && (
        <div className="text-center text-muted">
          {locale === 'en' ? 'No entries yet. Add characters in the admin panel.' : 'Пока нет записей. Добавьте персонажей в админ-панели.'}
        </div>
      )}
    </div>
  );
}
