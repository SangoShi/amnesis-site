import CharacterForm from '@/components/admin/CharacterForm';

export default async function NewCharacterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-gold">
        New Character
      </h1>
      <CharacterForm locale={locale} />
    </div>
  );
}
