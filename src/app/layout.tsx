import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { SoundProvider } from '@/components/providers/SoundProvider';
import { ScanProvider } from '@/components/providers/ScanProvider';
import CRTOverlay from '@/components/ui/CRTOverlay';
import Starfield from '@/components/ui/Starfield';
import AnimatedGrid from '@/components/ui/AnimatedGrid';
import FloatingRunes from '@/components/ui/FloatingRunes';
import SecretTerminal from '@/components/ui/SecretTerminal';
import KonamiCode from '@/components/ui/KonamiCode';
import PageTransition from '@/components/layout/PageTransition';
import ScrollBlurProvider from '@/components/providers/ScrollBlurProvider';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Shinagave's Bestiary",
  description: 'База данных персонажей / Character Database',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <SoundProvider>
          <AuthProvider>
            <ScanProvider>
              <ThemeProvider>
              <div className="hidden md:block">
                <Starfield />
                <AnimatedGrid />
                <FloatingRunes />
              </div>
              <CRTOverlay />
              <SecretTerminal />
              <KonamiCode />
              <ScrollBlurProvider />
              <div className="relative z-10">
                <PageTransition>{children}</PageTransition>
              </div>
              </ThemeProvider>
            </ScanProvider>
          </AuthProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
