import { getCharacterBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import CharacterForm from '@/components/admin/CharacterForm';

export const dynamic = 'force-dynamic';

export default async function EditCharacterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-gold">
        Edit: {character.name}
      </h1>
      <CharacterForm locale={locale} character={character} />
    </div>
  );
}
