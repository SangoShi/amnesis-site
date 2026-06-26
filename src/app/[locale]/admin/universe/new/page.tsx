import UniverseForm from '@/components/admin/UniverseForm';

export default async function NewUniversePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">NEW UNIVERSE</h1>
      <UniverseForm locale={locale} />
    </div>
  );
}
