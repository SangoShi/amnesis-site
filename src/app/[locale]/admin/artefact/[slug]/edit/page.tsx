import { getArtifactBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import ArtefactForm from '@/components/admin/ArtefactForm';

export const dynamic = 'force-dynamic';

export default async function EditArtefactPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const artefact = getArtifactBySlug(slug);
  if (!artefact) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">EDIT: {artefact.name}</h1>
      <ArtefactForm locale={locale} artefact={artefact} />
    </div>
  );
}
