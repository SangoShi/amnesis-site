import { getAllCharacters, getAllFloraFauna, getAllArtifacts, getAllFactions, getUniverses } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const characters = getAllCharacters(locale as Locale);
  const floraFauna = getAllFloraFauna(locale as Locale);
  const artefacts = getAllArtifacts(locale as Locale);
  const factions = getAllFactions(locale as Locale);
  const universes = getUniverses();

  const stats = [
    { label: 'Персонажи / Characters', value: characters.length, color: 'text-accent' },
    { label: 'Флора и фауна', value: floraFauna.length, color: 'text-green' },
    { label: 'Артефакты / Artefacts', value: artefacts.length, color: 'text-blue' },
    { label: 'Фракции / Factions', value: factions.length, color: 'text-accent' },
    { label: 'Вселенные / Universes', value: universes.length, color: 'text-muted' },
  ];

  const byStatus = {
    active: characters.filter(c => c.status === 'active').length,
    inactive: characters.filter(c => c.status === 'inactive').length,
    frozen: characters.filter(c => c.status === 'frozen').length,
    unknown: characters.filter(c => c.status === 'unknown').length,
  };

  const byRarity = {
    green: characters.filter(c => c.rarity === 'green').length,
    red: characters.filter(c => c.rarity === 'red').length,
    blue: characters.filter(c => c.rarity === 'blue').length,
  };

  const quickLinks = [
    { href: '/admin/character/new', label: '+ Персонаж' },
    { href: '/admin/artefact/new', label: '+ Артефакт' },
    { href: '/admin/faction/new', label: '+ Фракция' },
    { href: '/admin/flora-fauna/new', label: '+ Флора/Фауна' },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl text-accent">DASHBOARD</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-purple/20 bg-surface/50 p-5"
            style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
          >
            <p className="text-xs uppercase text-muted">{stat.label}</p>
            <p className={`mt-2 text-4xl ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="border border-purple/20 bg-surface/50 p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
          <h2 className="mb-4 text-lg text-accent">По статусу</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between"><span className="text-sm text-green">Active</span><span className="text-sm">{byStatus.active}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-red">Inactive</span><span className="text-sm">{byStatus.inactive}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-blue">Frozen</span><span className="text-sm">{byStatus.frozen}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-muted">Unknown</span><span className="text-sm">{byStatus.unknown}</span></div>
          </div>
        </div>
        <div className="border border-purple/20 bg-surface/50 p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
          <h2 className="mb-4 text-lg text-accent">По редкости</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between"><span className="text-sm text-green">Green (Safe)</span><span className="text-sm">{byRarity.green}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-red">Red (Danger)</span><span className="text-sm">{byRarity.red}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-blue">Blue (Rare)</span><span className="text-sm">{byRarity.blue}</span></div>
          </div>
        </div>
      </div>

      <div className="border border-purple/20 bg-surface/50 p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
        <h2 className="mb-4 text-lg text-accent">Быстрые действия</h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-accent/30 bg-accent/5 px-5 py-2 text-sm text-accent transition-all hover:bg-accent/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
