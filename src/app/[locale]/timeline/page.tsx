import fs from 'fs';
import path from 'path';
import TimelineEvent from '@/components/timeline/TimelineEvent';

function getTimeline() {
  const filePath = path.join(process.cwd(), 'content', 'timeline.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const events = getTimeline();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-4xl text-accent">
        {locale === 'en' ? 'TIMELINE' : 'ХРОНОЛОГИЯ'}
      </h1>
      <p className="mb-12 text-muted">
        {locale === 'en'
          ? 'Key events in the history of sector Amnesis'
          : 'Ключевые события в истории сектора Амнезис'}
      </p>

      <div className="ml-4">
        {events.map((event: { date: string; titleRu: string; titleEn: string; descriptionRu: string; descriptionEn: string; characters: string[] }, i: number) => (
          <TimelineEvent
            key={i}
            date={event.date}
            title={locale === 'en' ? event.titleEn : event.titleRu}
            description={locale === 'en' ? event.descriptionEn : event.descriptionRu}
            characters={event.characters}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
