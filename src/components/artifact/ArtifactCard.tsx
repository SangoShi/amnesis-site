'use client';

import { Link } from '@/i18n/navigation';
import type { Artifact } from '@/types';
import { useSound } from '@/components/providers/SoundProvider';
import { playHoverCard, playClickCard } from '@/lib/sounds';

const rarityBorders: Record<string, string> = {
  green: 'border-green/30',
  red: 'border-red/30',
  blue: 'border-blue/30',
};

const rarityTextColors: Record<string, string> = {
  green: 'text-green',
  red: 'text-red',
  blue: 'text-blue',
};

export default function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const { enabled } = useSound();

  return (
    <Link href={`/artifact/${artifact.slug}`} onClick={() => enabled && playClickCard()}>
      <div
        className={`group border bg-surface/50 p-5 transition-all duration-300 hover:scale-[1.02] ${rarityBorders[artifact.rarity]}`}
        style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
        onMouseEnter={() => enabled && playHoverCard()}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs uppercase text-muted">[ARTEFACT]</span>
          <span className={`rounded-full bg-surface px-2 py-0.5 text-xs ${rarityTextColors[artifact.rarity]}`}>
            {artifact.rarity.toUpperCase()}
          </span>
        </div>
        <h3 className={`text-lg uppercase ${rarityTextColors[artifact.rarity]}`}>
          {artifact.name}
        </h3>
        <p className="mt-1 text-xs text-muted line-clamp-2">
          {artifact.descriptionRu}
        </p>
      </div>
    </Link>
  );
}
