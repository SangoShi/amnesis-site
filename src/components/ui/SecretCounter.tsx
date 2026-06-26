'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET_KEYS = [
  'secret-unlocked',
  'konami-used',
  'terminal-opened',
  'cmd-whoami',
  'cmd-secrets',
  'all-cards-clicked',
  'time-spent',
];

export default function SecretCounter() {
  const [count, setCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const found = SECRET_KEYS.filter((key) => localStorage.getItem(key) === 'true');
      setPrevCount(count);
      setCount(found.length);
      if (found.length > prevCount && prevCount > 0) {
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 1000);
      }
    };

    updateCount();

    const interval = setInterval(updateCount, 2000);

    const handleStorage = () => updateCount();
    window.addEventListener('storage', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
  }, [count, prevCount]);

  if (count === 0) return null;

  return (
    <div className="relative flex items-center gap-1 rounded-full border border-accent/20 bg-surface/50 px-3 py-1">
      <span className="text-xs text-accent">◈</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-xs text-green"
        >
          {count}/7
        </motion.span>
      </AnimatePresence>
      {showPulse && (
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 rounded-full border border-green/30"
        />
      )}
    </div>
  );
}
