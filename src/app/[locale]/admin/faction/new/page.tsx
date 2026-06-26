import FactionForm from '@/components/admin/FactionForm';

export default async function NewFactionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">NEW FACTION</h1>
      <FactionForm locale={locale} />
    </div>
  );
}
