'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playGlitch } from '@/lib/sounds';

function getInitialClicks() {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem('logo-clicks');
  return saved ? Number(saved) : 0;
}

function getInitialUnlocked() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('secret-unlocked') === 'true';
}

export default function SecretLogo() {
  const [clicks, setClicks] = useState(getInitialClicks);
  const [unlocked, setUnlocked] = useState(getInitialUnlocked);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    localStorage.setItem('logo-clicks', String(newClicks));

    if (newClicks === 7 && !unlocked) {
      setUnlocked(true);
      localStorage.setItem('secret-unlocked', 'true');
      setShowMessage(true);
      playGlitch();
      setTimeout(() => setShowMessage(false), 5000);
    }
  };

  return (
    <div className="relative">
      <img
        src="/images/logo.png"
        alt="Logo"
        className="mx-auto mb-6 w-20 cursor-pointer animate-pulse-glow"
        style={{ imageRendering: 'pixelated', borderRadius: 'var(--radius-md)' }}
        onClick={handleClick}
      />
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-green/30 bg-surface/90 px-4 py-2 text-xs text-green"
          >
            [ СЕКРЕТ РАЗБЛОКИРОВАН: 1/7 ]
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
