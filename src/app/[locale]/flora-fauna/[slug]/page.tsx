import { notFound } from 'next/navigation';
import { getFloraFaunaBySlug } from '@/lib/content';
import { Link } from '@/i18n/navigation';

export const dynamic = 'force-dynamic';

const rarityColors: Record<string, string> = {
  green: 'text-green',
  red: 'text-red',
  blue: 'text-blue',
};

export default async function FloraFaunaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const entry = getFloraFaunaBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href={`/universe/${entry.universe}`}
        className="mb-8 inline-block rounded-full border border-accent/30 bg-surface/50 px-6 py-2 text-lg uppercase text-accent transition-all hover:bg-accent/10 hover:text-green"
      >
        &lt; {locale === 'en' ? 'BACK' : 'НАЗАД'}
      </Link>

      <div className="mt-8 grid gap-8 md:grid-cols-[300px_1fr]">
        <div
          className="overflow-hidden border border-purple/30"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
        >
          {entry.portrait ? (
            <img src={entry.portrait} alt={entry.name} className="w-full object-cover" style={{ borderRadius: 0 }} />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center bg-background text-sm text-muted">
              [ NO SIGNAL ]
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className={`rounded-full bg-surface px-2 py-0.5 text-xs ${rarityColors[entry.rarity]}`}>
              [{entry.rarity.toUpperCase()}]
            </span>
            <span className="text-xs uppercase text-muted">[{entry.type}]</span>
          </div>

          <h1 className="mb-6 text-3xl text-accent">
            {entry.name}
          </h1>

          <div
            className="mb-6 border border-purple/20 bg-surface/50 p-5"
            style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase text-muted">{locale === 'en' ? 'TYPE' : 'ТИП'}</span>
                <p className="text-sm">{entry.type}</p>
              </div>
              <div>
                <span className="text-xs uppercase text-muted">{locale === 'en' ? 'DANGER' : 'ОПАСНОСТЬ'}</span>
                <p className="text-sm">{entry.dangerLevel}</p>
              </div>
            </div>
          </div>

          {entry.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-4 text-sm leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
