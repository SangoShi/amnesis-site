import FloraFaunaForm from '@/components/admin/FloraFaunaForm';

export default async function NewFloraFaunaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-gold">
        New Flora/Fauna Entry
      </h1>
      <FloraFaunaForm locale={locale} />
    </div>
  );
}
