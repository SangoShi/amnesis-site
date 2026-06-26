'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickButton } from '@/lib/sounds';
import { useSound } from '@/components/providers/SoundProvider';

export default function RandomCharacter({ locale }: { locale: string }) {
  const router = useRouter();
  const { enabled } = useSound();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const handleScan = async () => {
    if (scanning) return;
    setScanning(true);
    setProgress(0);
    if (enabled) playClickButton();

    const texts = locale === 'en'
      ? ['SCANNING SECTOR...', 'SIGNALS DETECTED...', 'IDENTIFYING OBJECT...', 'OBJECT FOUND']
      : ['СКАНИРОВАНИЕ СЕКТОРА...', 'ОБНАРУЖЕНЫ СИГНАЛЫ...', 'ИДЕНТИФИКАЦИЯ ОБЪЕКТА...', 'ОБЪЕКТ НАЙДЕН'];

    let step = 0;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 20 + 10;
        if (next >= 25 && step === 0) { setStatusText(texts[0]); step = 1; }
        if (next >= 50 && step === 1) { setStatusText(texts[1]); step = 2; }
        if (next >= 75 && step === 2) { setStatusText(texts[2]); step = 3; }
        if (next >= 100) { setStatusText(texts[3]); clearInterval(interval); return 100; }
        return next;
      });
    }, 200);

    await new Promise((r) => setTimeout(r, 2200));

    try {
      const res = await fetch(`/api/random?locale=${locale}`);
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        setScanning(false);
      }
    } catch {
      setScanning(false);
    }

    clearInterval(interval);
  };

  return (
    <div className="text-center">
      <button
        onClick={handleScan}
        disabled={scanning}
        className="rounded-full border-2 border-green/30 bg-green/5 px-8 py-3 text-sm uppercase text-green transition-all hover:bg-green/10 disabled:opacity-50"
        style={{ boxShadow: '0 0 20px rgba(29, 242, 125, 0.1)' }}
      >
        {scanning
          ? `[ ${locale === 'en' ? 'SCANNING...' : 'СКАНИРОВАНИЕ...'} ]`
          : `[ ${locale === 'en' ? 'DETECT RANDOM OBJECT' : 'ОБНАРУЖИТЬ СЛУЧАЙНЫЙ ОБЪЕКТ'} ]`}
      </button>

      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="mx-auto max-w-xs overflow-hidden rounded-full border border-green/20 bg-surface/50">
              <motion.div
                className="h-2 bg-green/50"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="mt-2 text-xs text-green/60">{statusText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
