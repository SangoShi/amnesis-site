import ArtefactForm from '@/components/admin/ArtefactForm';

export default async function NewArtefactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">NEW ARTEFACT</h1>
      <ArtefactForm locale={locale} />
    </div>
  );
}
