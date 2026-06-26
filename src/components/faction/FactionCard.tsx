'use client';

import { Link } from '@/i18n/navigation';
import type { Faction } from '@/types';
import { useSound } from '@/components/providers/SoundProvider';
import { playHoverCard, playClickCard } from '@/lib/sounds';

export default function FactionCard({ faction }: { faction: Faction }) {
  const { enabled } = useSound();

  return (
    <Link href={`/faction/${faction.slug}`} onClick={() => enabled && playClickCard()}>
      <div
        className="group border border-accent/20 bg-surface/50 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-accent/40"
        style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
        onMouseEnter={() => enabled && playHoverCard()}
      >
        <span className="text-xs uppercase text-muted">[FACTION]</span>
        <h3 className="mt-1 text-lg text-accent">
          {faction.name}
        </h3>
        <p className="mt-1 text-xs text-muted line-clamp-2">
          {faction.descriptionRu}
        </p>
      </div>
    </Link>
  );
}
