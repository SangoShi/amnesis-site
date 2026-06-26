'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AdminNav() {
  const t = useTranslations('admin');

  const links = [
    { href: '/admin', label: t('dashboard') },
    { href: '/admin/characters', label: t('characters') },
    { href: '/admin/flora-fauna', label: t('floraFauna') },
    { href: '/admin/artefacts', label: t('artefacts') },
    { href: '/admin/factions', label: t('factions') },
    { href: '/admin/timeline', label: t('timeline') },
    { href: '/admin/universes', label: t('universes') },
    { href: '/admin/content', label: t('siteContent') },
    { href: '/admin/settings', label: 'Settings' },
  ];

  return (
    <nav className="flex gap-1 overflow-x-auto pb-2 md:flex-col md:gap-2 md:overflow-x-visible md:pb-0">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex-shrink-0 rounded-lg px-3 py-2 text-xs uppercase text-muted transition-all hover:bg-accent/10 hover:text-accent md:rounded-xl md:px-4 md:py-2.5 md:text-sm"
        >
          {link.label}
        </Link>
      ))}
      <form action="/api/auth/signout" method="POST" className="flex-shrink-0">
        <button
          type="submit"
          className="rounded-lg px-3 py-2 text-xs uppercase text-red transition-all hover:bg-red/10 md:rounded-xl md:px-4 md:py-2.5 md:text-sm"
        >
          {t('logout')}
        </button>
      </form>
    </nav>
  );
}
