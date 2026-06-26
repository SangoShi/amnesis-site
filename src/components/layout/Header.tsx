'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { useScanMode } from '@/components/providers/ScanProvider';
import { playClickNav, playClickButton } from '@/lib/sounds';
import SecretCounter from '@/components/ui/SecretCounter';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { enabled, toggle } = useSound();
  const { active: scanActive, toggle: toggleScan } = useScanMode();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const handleSoundClick = () => {
    toggle();
    if (!enabled) playClickButton();
  };

  const handleScanClick = () => {
    toggleScan();
    if (enabled) playClickButton();
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/search', label: t('search') },
    { href: '/artifacts', label: t('artefacts') },
    { href: '/timeline', label: t('timeline') },
    { href: '/factions', label: t('factions') },
  ];

  const closeMobile = () => setMobileOpen(false);

  const handleNavClick = () => {
    closeMobile();
    if (enabled) playClickNav();
  };

  const handleLocaleClick = (locale: string) => {
    switchLocale(locale);
    if (enabled) playClickButton();
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
    if (enabled) playClickButton();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-accent/20 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link
          href="/"
          className="text-xl uppercase tracking-wider text-accent transition-colors hover:text-green md:text-2xl"
          onClick={() => { if (enabled) playClickNav(); }}
        >
          Bestiary
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm uppercase tracking-wider text-muted transition-all hover:bg-accent/10 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-1 rounded-full border border-purple/30 px-2 py-1">
            <button onClick={() => handleLocaleClick('ru')} className="rounded-full px-2 py-0.5 text-xs uppercase text-muted hover:text-accent">RU</button>
            <span className="text-purple/50">|</span>
            <button onClick={() => handleLocaleClick('en')} className="rounded-full px-2 py-0.5 text-xs uppercase text-muted hover:text-accent">EN</button>
          </div>

          <SecretCounter />

          <button onClick={handleSoundClick}
            className="rounded-full px-2 py-1 text-xs text-muted hover:text-accent">
            {enabled ? '♪' : '♪̸'}
          </button>

          <button onClick={handleScanClick}
            className={`rounded-full px-2 py-1 text-xs transition-all ${scanActive ? 'bg-green/20 text-green' : 'text-muted hover:text-accent'}`}>
            {scanActive ? '◉' : '○'}
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <SecretCounter />
          <button onClick={handleScanClick}
            className={`rounded-full p-2 text-sm ${scanActive ? 'text-green' : 'text-muted'}`}>
            {scanActive ? '◉' : '○'}
          </button>
          <button onClick={handleSoundClick}
            className="rounded-full p-2 text-sm text-muted">
            {enabled ? '♪' : '♪̸'}
          </button>
          <button
            className="rounded-full p-2 text-accent"
            onClick={handleMobileToggle}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-accent/20 bg-background/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={handleNavClick}
                className="border-b border-purple/10 px-4 py-3 text-sm uppercase text-muted transition-all hover:text-accent">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex gap-2">
                <button onClick={() => handleLocaleClick('ru')}
                  className="rounded-full border border-purple/30 px-3 py-1 text-xs uppercase text-muted hover:text-accent">RU</button>
                <button onClick={() => handleLocaleClick('en')}
                  className="rounded-full border border-purple/30 px-3 py-1 text-xs uppercase text-muted hover:text-accent">EN</button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
