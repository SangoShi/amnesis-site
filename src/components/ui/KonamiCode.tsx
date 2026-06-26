'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playGlitch } from '@/lib/sounds';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const next = [...sequence, e.key];
      if (next.length > KONAMI.length) next.shift();

      const isMatch = next.every((k, i) => k === KONAMI[i]);
      if (isMatch && next.length === KONAMI.length) {
        setActivated(true);
        playGlitch();
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
          document.body.style.filter = '';
          setActivated(false);
        }, 3000);
      }

      setSequence(isMatch ? next : []);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [sequence]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="text-4xl text-accent animate-pulse-glow">◈ КОД ПРИНЯТ ◈</p>
            <p className="mt-4 text-sm text-green">+1 СЕКРЕТ (2/7)</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
