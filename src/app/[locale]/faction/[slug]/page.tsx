import { notFound } from 'next/navigation';
import { getFactionBySlug } from '@/lib/content';
import { Link } from '@/i18n/navigation';

export const dynamic = 'force-dynamic';

export default async function FactionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const faction = getFactionBySlug(slug);

  if (!faction) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/factions"
        className="mb-8 inline-block rounded-full border border-accent/30 bg-surface/50 px-6 py-2 text-lg uppercase text-accent transition-all hover:bg-accent/10 hover:text-green"
      >
        &lt; {locale === 'en' ? 'BACK TO FACTIONS' : 'НАЗАД К ФРАКЦИЯМ'}
      </Link>

      <div className="mt-8">
        <span className="text-xs uppercase text-muted">[FACTION]</span>
        <h1 className="mb-2 text-3xl text-accent">
          {faction.name}
        </h1>
        <p className="mb-8 text-muted">
          {locale === 'en' ? faction.descriptionEn : faction.descriptionRu}
        </p>

        {faction.members && faction.members.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl text-accent">
              &gt; {locale === 'en' ? 'MEMBERS' : 'УЧАСТНИКИ'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {faction.members.map((m: string) => (
                <Link
                  key={m}
                  href={`/character/${m}`}
                  className="rounded-full border border-accent/20 bg-surface/50 px-4 py-2 text-sm text-accent transition-all hover:border-accent/40 hover:text-green"
                >
                  {m}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-purple/20 pt-6">
          {faction.body.split('\n\n').map((paragraph: string, i: number) => (
            <p key={i} className="mb-4 text-sm leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
