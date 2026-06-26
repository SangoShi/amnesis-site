import { getFactionBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import FactionForm from '@/components/admin/FactionForm';

export const dynamic = 'force-dynamic';

export default async function EditFactionPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const faction = getFactionBySlug(slug);
  if (!faction) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">EDIT: {faction.name}</h1>
      <FactionForm locale={locale} faction={faction} />
    </div>
  );
}
