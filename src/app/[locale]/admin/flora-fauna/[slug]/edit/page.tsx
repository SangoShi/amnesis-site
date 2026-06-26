import { getFloraFaunaBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import FloraFaunaForm from '@/components/admin/FloraFaunaForm';

export const dynamic = 'force-dynamic';

export default async function EditFloraFaunaPage({
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
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-gold">
        Edit: {entry.name}
      </h1>
      <FloraFaunaForm locale={locale} entry={entry} />
    </div>
  );
}
