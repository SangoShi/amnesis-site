'use client';

import { Link } from '@/i18n/navigation';
import type { FloraFauna } from '@/types';
import { useSound } from '@/components/providers/SoundProvider';
import { playHoverCard, playClickCard } from '@/lib/sounds';

interface FloraFaunaCardProps {
  entry: FloraFauna;
}

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

export default function FloraFaunaCard({ entry }: FloraFaunaCardProps) {
  const { enabled } = useSound();

  return (
    <Link href={`/flora-fauna/${entry.slug}`} onClick={() => enabled && playClickCard()}>
      <div
        className={`group overflow-hidden border bg-surface/50 transition-all duration-300 hover:scale-[1.02] ${rarityBorders[entry.rarity]}`}
        style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
        onMouseEnter={() => enabled && playHoverCard()}
      >
        <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          {entry.portrait ? (
            <img
              src={entry.portrait}
              alt={entry.name}
              className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              style={{ borderRadius: 0 }}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-background text-sm text-muted">
              [ NO SIGNAL ]
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs uppercase text-muted">
              [{entry.type}]
            </span>
            <span className={`rounded-full bg-surface px-2 py-0.5 text-xs ${rarityTextColors[entry.rarity]}`}>
              {entry.rarity.toUpperCase()}
            </span>
          </div>
          <h3 className={`text-lg uppercase ${rarityTextColors[entry.rarity]}`}>
            {entry.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
