import { getUniverses } from '@/lib/content';
import { notFound } from 'next/navigation';
import UniverseForm from '@/components/admin/UniverseForm';

export const dynamic = 'force-dynamic';

export default async function EditUniversePage({
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

  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">EDIT: {universe.nameRu}</h1>
      <UniverseForm locale={locale} universe={universe} />
    </div>
  );
}
