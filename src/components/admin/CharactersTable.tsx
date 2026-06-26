'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import DeleteButton from '@/components/admin/DeleteButton';

interface CharacterRow {
  slug: string;
  name: string;
  codename: string;
  status: string;
  rarity: string;
  universe: string;
}

const statusColors: Record<string, string> = {
  active: 'text-green',
  inactive: 'text-red',
  frozen: 'text-blue',
  unknown: 'text-muted',
};

const rarityColors: Record<string, string> = {
  green: 'text-green',
  red: 'text-red',
  blue: 'text-blue',
};

export default function CharactersTable({ characters }: { characters: CharacterRow[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rarityFilter, setRarityFilter] = useState('');

  const filtered = characters.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.codename.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    const matchRarity = !rarityFilter || c.rarity === rarityFilter;
    return matchSearch && matchStatus && matchRarity;
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск / Search..."
          className="rounded-full border border-purple/30 bg-surface/50 px-4 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          style={{ minWidth: 200 }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full border border-purple/30 bg-surface/50 px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
        >
          <option value="">Все статусы</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="frozen">Frozen</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="rounded-full border border-purple/30 bg-surface/50 px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
        >
          <option value="">Все редкости</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
        <span className="text-xs text-muted">{filtered.length} / {characters.length}</span>
      </div>

      <div className="overflow-hidden border border-purple/20" style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}>
        <table className="w-full">
          <thead className="bg-surface/80">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase text-muted">Name</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-muted">Codename</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-muted">Rarity</th>
              <th className="px-4 py-3 text-right text-xs uppercase text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((char) => (
              <tr key={char.slug} className="border-t border-purple/10 hover:bg-surface/30 transition-colors">
                <td className="px-4 py-3 text-sm">{char.name}</td>
                <td className="px-4 py-3 text-xs text-muted">{char.codename}</td>
                <td className={`px-4 py-3 text-xs ${statusColors[char.status]}`}>{char.status.toUpperCase()}</td>
                <td className={`px-4 py-3 text-xs ${rarityColors[char.rarity]}`}>{char.rarity.toUpperCase()}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/character/${char.slug}/edit`} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent hover:bg-accent/20">[EDIT]</Link>
                    <DeleteButton apiPath={`/api/admin/character/${char.slug}`} />
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
