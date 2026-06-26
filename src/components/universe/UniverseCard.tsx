'use client';

import { Link } from '@/i18n/navigation';
import type { Universe, Locale } from '@/types';
import { useSound } from '@/components/providers/SoundProvider';
import { playHoverCard, playClickCard } from '@/lib/sounds';

interface UniverseCardProps {
  universe: Universe;
  locale: Locale;
}

export default function UniverseCard({ universe, locale }: UniverseCardProps) {
  const { enabled } = useSound();
  const name = locale === 'en' ? universe.nameEn : universe.nameRu;
  const description =
    locale === 'en' ? universe.descriptionEn : universe.descriptionRu;
  const isLocked = universe.status === 'locked';

  const content = (
    <div
      className={`group flex items-center gap-4 border p-4 transition-all duration-300 ${
        isLocked
          ? 'cursor-not-allowed border-red/20 bg-surface/30 opacity-50'
          : 'border-accent/20 bg-surface/50 hover:border-accent/40 hover:bg-accent/5'
      }`}
      style={{
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={() => enabled && !isLocked && playHoverCard()}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
          isLocked ? 'bg-red/10 text-red' : 'bg-accent/10 text-accent animate-blink'
        }`}
      >
        {isLocked ? 'X' : '>'}
      </div>
      <div className="flex-1">
        <h3 className="text-xl uppercase text-accent group-hover:text-green transition-colors">
          {name}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {description}
        </p>
      </div>
      <div className={`rounded-full px-3 py-1 text-xs ${isLocked ? 'bg-red/10 text-red' : 'bg-green/10 text-green'}`}>
        {isLocked
          ? locale === 'en' ? 'LOCKED' : 'ЗАБЛОКИРОВАНО'
          : locale === 'en' ? 'ONLINE' : 'ДОСТУП ОТКРЫТ'}
      </div>
    </div>
  );

  if (isLocked) {
    return content;
  }

  return (
    <Link href={`/universe/${universe.slug}`} onClick={() => enabled && playClickCard()}>
      {content}
    </Link>
  );
}
