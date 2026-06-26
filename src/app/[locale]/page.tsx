import { getTranslations } from 'next-intl/server';
import { getUniverses } from '@/lib/content';
import UniverseCard from '@/components/universe/UniverseCard';
import SecretLogo from '@/components/ui/SecretLogo';
import RandomCharacter from '@/components/ui/RandomCharacter';
import type { Locale } from '@/types';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const universes = getUniverses();

  return (
    <div>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 md:min-h-[80vh]">
        <div
          className="w-full max-w-2xl border border-accent/20 bg-background/60 p-6 text-center backdrop-blur-md sm:p-10 md:p-16"
          style={{
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-card), inset 0 0 60px rgba(255, 115, 0, 0.05)',
          }}
        >
          <SecretLogo />
          <h1 className="text-3xl font-bold text-accent sm:text-4xl md:text-6xl">
            {t('landing.title')}
          </h1>
          <div className="mx-auto mt-3 max-w-md rounded-full border border-purple/30 bg-surface/50 px-4 py-2 sm:mt-4 sm:px-6">
            <p className="text-sm sm:text-lg text-muted">{t('landing.subtitle')}</p>
          </div>
          <nav className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <a
              href="#worlds"
              className="rounded-full border-2 border-accent/50 bg-accent/10 px-6 py-2.5 text-sm uppercase text-accent transition-all hover:bg-accent hover:text-background sm:px-8 sm:py-3 sm:text-lg"
              style={{ boxShadow: 'var(--shadow-glow)' }}
            >
              {t('nav.collection')}
            </a>
            <a
              href="#about"
              className="rounded-full border-2 border-purple/30 bg-surface/50 px-6 py-2.5 text-sm uppercase text-muted transition-all hover:border-accent/50 hover:text-accent sm:px-8 sm:py-3 sm:text-lg"
            >
              {t('nav.home')}
            </a>
          </nav>
        </div>
      </section>

      <section id="worlds" className="border-t border-accent/20 bg-background px-4 py-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl text-accent md:mb-12 md:text-3xl">
            {t('nav.collection')}
          </h2>
          <div className="flex flex-col gap-3 md:gap-4">
            {universes.map((universe) => (
              <UniverseCard
                key={universe.slug}
                universe={universe}
                locale={locale as Locale}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-green/10 bg-background px-4 py-8 md:py-12">
        <RandomCharacter locale={locale} />
      </div>

      <section id="about" className="border-t border-purple/30 bg-background px-4 py-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl text-accent md:mb-12 md:text-3xl">
            {t('nav.home')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            <div
              className="border border-purple/20 bg-surface/50 p-4 md:p-6"
              style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="mb-2 text-lg text-green md:mb-3 md:text-xl">&gt; PURPOSE</h3>
              <p className="text-sm text-muted md:text-base">{t('landing.about.purpose')}</p>
            </div>
            <div
              className="border border-purple/20 bg-surface/50 p-4 md:p-6"
              style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="mb-2 text-lg text-green md:mb-3 md:text-xl">&gt; SYSTEM</h3>
              <p className="text-sm text-muted md:text-base">{t('landing.about.system')}</p>
            </div>
            <div
              className="border border-purple/20 bg-surface/50 p-4 md:p-6"
              style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="mb-2 text-lg text-green md:mb-3 md:text-xl">&gt; SECURITY</h3>
              <p className="text-sm text-muted md:text-base">{t('landing.about.security')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
