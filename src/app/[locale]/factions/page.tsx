import { getAllFactions } from '@/lib/content';
import FactionCard from '@/components/faction/FactionCard';
import type { Locale } from '@/types';

export default async function FactionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const factions = getAllFactions(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-4xl text-accent">
        {locale === 'en' ? 'FACTIONS' : 'ФРАКЦИИ'}
      </h1>
      <p className="mb-12 text-muted">
        {locale === 'en'
          ? 'Organizations operating within sector Amnesis'
          : 'Организации, действующие в секторе Амнезис'}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {factions.map((faction) => (
          <FactionCard key={faction.slug} faction={faction} />
        ))}
      </div>
    </div>
  );
}
