import { notFound } from 'next/navigation';
import { getCharacterBySlug, getRelatedCharacters, getCharacterArtifacts, getCharacterFactions } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';
import ScanOverlay from '@/components/ui/ScanOverlay';

export const dynamic = 'force-dynamic';

const statusColors: Record<string, string> = {
  active: 'text-green',
  inactive: 'text-red',
  frozen: 'text-blue',
  unknown: 'text-muted',
};

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  const related = getRelatedCharacters(slug, character.universe, locale as Locale);
  const artifacts = getCharacterArtifacts(slug, locale as Locale);
  const factions = getCharacterFactions(slug, locale as Locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-12">
      <Link
        href={`/universe/${character.universe}`}
        className="mb-6 inline-block rounded-full border border-accent/30 bg-surface/50 px-4 py-1.5 text-sm uppercase text-accent transition-all hover:bg-accent/10 hover:text-green md:mb-8 md:px-6 md:py-2 md:text-lg"
      >
        &lt; {locale === 'en' ? 'BACK' : 'НАЗАД'}
      </Link>

      <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-[280px_1fr] md:gap-8">
        <div
          className="overflow-hidden border border-green/30"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
        >
          <div className="relative">
            {character.portrait ? (
              <img
                src={character.portrait}
                alt={character.name}
                className="w-full object-cover"
                style={{ borderRadius: 0 }}
              />
            ) : (
              <div className="flex aspect-[3/4] items-center justify-center bg-background text-sm text-muted">
                [ NO SIGNAL ]
              </div>
            )}
            <div className="absolute right-2 top-2 rounded-full bg-red/20 px-2 py-0.5 text-xs text-red animate-rec-blink md:right-3 md:top-3">
              ● REC
            </div>
            <div className="absolute bottom-2 left-2 rounded-full bg-green/10 px-2 py-0.5 text-xs text-green md:bottom-3 md:left-3">
              CAM_01 // ACTIVE
            </div>
          </div>
        </div>

        <div>
          <h1 className="mb-1 text-2xl text-accent md:text-3xl">
            {character.name}
          </h1>
          <p className="mb-4 text-sm text-muted md:mb-6">{character.codename}</p>

          <div
            className="mb-6 border border-purple/20 bg-surface/50 p-3 md:mb-8 md:p-5"
            style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
          >
            <table className="w-full">
              <tbody>
                {[
                  { label: locale === 'en' ? 'STATUS' : 'СТАТУС', value: character.status.toUpperCase(), color: statusColors[character.status] },
                  { label: locale === 'en' ? 'CLASSIFICATION' : 'КЛАССИФИКАЦИЯ', value: character.classification },
                  { label: locale === 'en' ? 'MUTATIONS' : 'МУТАЦИИ', value: character.mutations },
                  { label: locale === 'en' ? 'LOCATION' : 'ЛОКАЦИЯ', value: character.location },
                  { label: locale === 'en' ? 'GENDER' : 'ПОЛ', value: character.gender },
                ].map((row, i) => (
                  <tr key={i} className={i < 4 ? 'border-b border-purple/10' : ''}>
                    <td className="py-2 pr-3 text-xs uppercase text-muted md:py-2.5 md:pr-4">{row.label}</td>
                    <td className={`py-2 text-xs md:py-2.5 md:text-sm ${row.color || ''}`}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            {character.body.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={i} className="mb-2 mt-4 border-b border-accent/20 pb-2 text-lg text-accent md:mb-3 md:mt-6 md:text-xl">
                    &gt; {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter((l) => l.startsWith('- '));
                return (
                  <ul key={i} className="mb-3 pl-3 md:mb-4 md:pl-4">
                    {items.map((item, j) => (
                      <li key={j} className="mb-1 text-xs text-muted md:text-sm">
                        <span className="text-accent">&gt;</span> {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="mb-3 text-xs leading-relaxed text-muted md:mb-4 md:text-sm">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-8 border-t border-purple/20 pt-6 md:mt-12 md:pt-8">
          <h2 className="mb-3 text-lg text-accent md:mb-4 md:text-xl">
            &gt; {locale === 'en' ? 'RELATED OBJECTS' : 'СВЯЗАННЫЕ ОБЪЕКТЫ'}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/character/${r.slug}`}
                className="border border-purple/20 bg-surface/50 p-3 transition-all hover:border-accent/30 md:p-4"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <p className="text-xs text-muted">{r.codename}</p>
                <p className="text-xs text-accent md:text-sm">{r.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {artifacts.length > 0 && (
        <div className="mt-6 border-t border-purple/20 pt-6 md:mt-8">
          <h2 className="mb-3 text-lg text-accent md:mb-4 md:text-xl">
            &gt; {locale === 'en' ? 'ARTIFACTS' : 'АРТЕФАКТЫ'}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {artifacts.map((a) => (
              <Link
                key={a.slug}
                href={`/artifact/${a.slug}`}
                className="border border-blue/20 bg-surface/50 p-3 transition-all hover:border-accent/30 md:p-4"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <p className="text-xs text-muted">[ARTEFACT]</p>
                <p className="text-xs text-blue md:text-sm">{a.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {factions.length > 0 && (
        <div className="mt-6 border-t border-purple/20 pt-6 md:mt-8">
          <h2 className="mb-3 text-lg text-accent md:mb-4 md:text-xl">
            &gt; {locale === 'en' ? 'FACTIONS' : 'ФРАКЦИИ'}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {factions.map((f) => (
              <Link
                key={f.slug}
                href={`/faction/${f.slug}`}
                className="border border-accent/20 bg-surface/50 p-3 transition-all hover:border-accent/30 md:p-4"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <p className="text-xs text-muted">[FACTION]</p>
                <p className="text-xs text-accent md:text-sm">{f.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 md:mt-8">
        <ScanOverlay>
          <p className="text-xs text-green md:text-sm">
            {locale === 'en'
              ? 'Hidden mutation detected: NEURAL_SYNC_7. Side effects: enhanced perception, temporal awareness.'
              : 'Обнаружена скрытая мутация: НЕЙРОННАЯ_СИНХРОНИЗАЦИЯ_7. Побочные эффекты: усиленное восприятие, осознание времени.'}
          </p>
          <p className="mt-2 text-xs text-green/60">
            {locale === 'en'
              ? 'Classification: RESTRICTED // Level 3 access required'
              : 'Классификация: ОГРАНИЧЕНО // Требуется доступ уровня 3'}
          </p>
        </ScanOverlay>
      </div>
    </div>
  );
}
