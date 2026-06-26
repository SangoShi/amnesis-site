import { notFound } from 'next/navigation';
import { getArtifactBySlug } from '@/lib/content';
import { Link } from '@/i18n/navigation';

export const dynamic = 'force-dynamic';

const rarityColors: Record<string, string> = {
  green: 'text-green',
  red: 'text-red',
  blue: 'text-blue',
};

export default async function ArtifactPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const artifact = getArtifactBySlug(slug);

  if (!artifact) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/artifacts"
        className="mb-8 inline-block rounded-full border border-accent/30 bg-surface/50 px-6 py-2 text-lg uppercase text-accent transition-all hover:bg-accent/10 hover:text-green"
      >
        &lt; {locale === 'en' ? 'BACK TO ARTIFACTS' : 'НАЗАД К АРТЕФАКТАМ'}
      </Link>

      <div className="mt-8">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-xs uppercase text-muted">[ARTEFACT]</span>
          <span className={`rounded-full bg-surface px-2 py-0.5 text-xs ${rarityColors[artifact.rarity]}`}>
            {artifact.rarity.toUpperCase()}
          </span>
        </div>

        <h1 className="mb-2 text-3xl text-accent">
          {artifact.name}
        </h1>

        <p className="mb-8 text-muted">
          {locale === 'en' ? artifact.descriptionEn : artifact.descriptionRu}
        </p>

        {artifact.owner && (
          <div className="mb-6 rounded-full border border-purple/20 bg-surface/50 px-4 py-2 inline-block">
            <span className="text-xs text-muted">
              {locale === 'en' ? 'OWNER: ' : 'ВЛАДЕЛЕЦ: '}
            </span>
            <Link href={`/character/${artifact.owner}`} className="text-sm text-accent hover:text-green">
              {artifact.owner}
            </Link>
          </div>
        )}

        <div className="border-t border-purple/20 pt-6">
          {artifact.body.split('\n\n').map((paragraph: string, i: number) => (
            <p key={i} className="mb-4 text-sm leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
