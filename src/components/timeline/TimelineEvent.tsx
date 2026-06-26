'use client';

import { Link } from '@/i18n/navigation';

interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  characters: string[];
  index: number;
}

export default function TimelineEvent({ date, title, description, characters, index }: TimelineEventProps) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div className="h-4 w-4 rounded-full border-2 border-accent bg-surface" />
        {index < 5 && <div className="w-px flex-1 bg-accent/20" />}
      </div>
      <div className="pb-8">
        <p className="text-xs text-accent">{date}</p>
        <h3 className="text-lg text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
        {characters.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {characters.map((c) => (
              <Link
                key={c}
                href={`/character/${c}`}
                className="rounded-full bg-accent/10 px-3 py-0.5 text-xs text-accent transition-all hover:bg-accent/20"
              >
                {c}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
