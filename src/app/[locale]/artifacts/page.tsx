import { getAllArtifacts } from '@/lib/content';
import ArtifactCard from '@/components/artifact/ArtifactCard';
import type { Locale } from '@/types';

export default async function ArtifactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artifacts = getAllArtifacts(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-4xl text-accent">
        {locale === 'en' ? 'ARTIFACTS' : 'АРТЕФАКТЫ'}
      </h1>
      <p className="mb-12 text-muted">
        {locale === 'en'
          ? 'Catalog of artifacts found in sector Amnesis'
          : 'Каталог артефактов, обнаруженных в секторе Амнезис'}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artifacts.map((artifact) => (
          <ArtifactCard key={artifact.slug} artifact={artifact} />
        ))}
      </div>
    </div>
  );
}
