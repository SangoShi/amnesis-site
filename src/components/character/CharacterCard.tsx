'use client';

import { Link } from '@/i18n/navigation';
import type { Character } from '@/types';
import { useSound } from '@/components/providers/SoundProvider';
import { playHoverCard, playClickCard } from '@/lib/sounds';

interface CharacterCardProps {
  character: Character;
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

const statusLabels: Record<string, string> = {
  active: 'ACTIVE',
  inactive: 'INACTIVE',
  frozen: 'FROZEN',
  unknown: 'UNKNOWN',
};

const statusColors: Record<string, string> = {
  active: 'text-green',
  inactive: 'text-red',
  frozen: 'text-blue',
  unknown: 'text-muted',
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const { enabled } = useSound();
  const hash = character.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const flickerDelay = `${5 + (hash % 10)}s`;
  const isDanger = character.rarity === 'red';

  return (
    <Link href={`/character/${character.slug}`} onClick={() => enabled && playClickCard()}>
      <div
        className={`group card-flicker overflow-hidden border bg-surface/50 transition-all duration-300 hover:scale-[1.02] ${rarityBorders[character.rarity]} ${isDanger ? 'cursor-danger' : ''}`}
        style={{
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          '--flicker-delay': flickerDelay,
        } as React.CSSProperties}
        onMouseEnter={() => enabled && playHoverCard()}
      >
        <div className="relative aspect-[3/4] overflow-hidden" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          {character.portrait ? (
            <img
              src={character.portrait}
              alt={character.name}
              className={`portrait-glitch h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 ${isDanger ? 'vibrate-on-hover' : ''}`}
              style={{ borderRadius: 0 }}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-background text-sm text-muted">
              [ NO SIGNAL ]
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
          <div className="absolute right-3 top-3 rounded-full bg-red/20 px-2 py-0.5 text-xs text-red animate-rec-blink">
            REC
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className={`text-xs ${statusColors[character.status]}`}>
              [{statusLabels[character.status]}]
            </span>
            <span className={`rounded-full bg-surface px-2 py-0.5 text-xs ${rarityTextColors[character.rarity]}`}>
              {character.rarity.toUpperCase()}
            </span>
          </div>
          <h3 className={`text-lg uppercase ${rarityTextColors[character.rarity]}`}>
            {character.name}
          </h3>
          <p className="text-xs text-muted">{character.codename}</p>
        </div>
      </div>
    </Link>
  );
}
