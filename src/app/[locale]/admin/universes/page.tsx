import { getUniverses } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function AdminUniversesPage() {
  const universes = getUniverses();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl text-accent">UNIVERSES</h1>
        <Link
          href="/admin/universe/new"
          className="rounded-full border border-accent/30 bg-surface/50 px-5 py-2 text-sm uppercase text-accent transition-all hover:bg-accent/10"
        >
          [+ NEW]
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {universes.map((u) => (
          <div
            key={u.slug}
            className="flex items-center justify-between border border-purple/20 bg-surface/50 p-5"
            style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
          >
            <div>
              <h3 className="text-lg text-accent">{u.nameRu}</h3>
              <p className="text-sm text-muted">{u.descriptionRu}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs ${u.status === 'active' ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
                {u.status.toUpperCase()}
              </span>
              <Link
                href={`/admin/universe/${u.slug}/edit`}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent transition-all hover:bg-accent/20"
              >
                [EDIT]
              </Link>
              <DeleteButton apiPath={`/api/admin/universe/${u.slug}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
