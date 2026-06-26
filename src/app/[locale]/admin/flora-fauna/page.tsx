import { getAllFloraFauna } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';
import DeleteButton from '@/components/admin/DeleteButton';

const rarityColors: Record<string, string> = {
  green: 'text-green',
  red: 'text-red',
  blue: 'text-blue',
};

export default async function AdminFloraFaunaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entries = getAllFloraFauna(locale as Locale);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl text-accent">FLORA & FAUNA</h1>
        <Link
          href="/admin/flora-fauna/new"
          className="rounded-full border border-accent/30 bg-surface/50 px-5 py-2 text-sm uppercase text-accent transition-all hover:bg-accent/10"
        >
          [+ NEW]
        </Link>
      </div>

      <div className="overflow-hidden border border-purple/20" style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}>
        <table className="w-full">
          <thead className="bg-surface/80">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase text-muted">Name</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-muted">Type</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-muted">Danger</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-muted">Rarity</th>
              <th className="px-4 py-3 text-right text-xs uppercase text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.slug} className="border-t border-purple/10 hover:bg-surface/30 transition-colors">
                <td className="px-4 py-3 text-sm">{entry.name}</td>
                <td className="px-4 py-3 text-xs text-muted">{entry.type}</td>
                <td className="px-4 py-3 text-xs text-muted">{entry.dangerLevel}</td>
                <td className={`px-4 py-3 text-xs ${rarityColors[entry.rarity]}`}>
                  {entry.rarity.toUpperCase()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/flora-fauna/${entry.slug}/edit`}
                      className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent transition-all hover:bg-accent/20"
                    >
                      [EDIT]
                    </Link>
                    <DeleteButton apiPath={`/api/admin/flora-fauna/${entry.slug}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
