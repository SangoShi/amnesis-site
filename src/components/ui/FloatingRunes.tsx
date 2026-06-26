'use client';

import { motion } from 'framer-motion';

const runes = ['◈', '◇', '◆', '⬡', '⬢', '✦', '✧', '⬥'];

export default function FloatingRunes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => {
        const rune = runes[i % runes.length];
        const left = `${(i * 8.3) % 100}%`;
        const top = `${(i * 13.7 + 5) % 100}%`;
        const size = 14 + (i % 4) * 4;
        const duration = 15 + (i % 5) * 5;
        const delay = i * 1.5;

        return (
          <motion.div
            key={i}
            className="absolute text-accent/[0.06]"
            style={{ left, top, fontSize: `${size}px` }}
            animate={{
              y: [0, -30, 0, 20, 0],
              x: [0, 15, -10, 5, 0],
              opacity: [0.03, 0.08, 0.04, 0.07, 0.03],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {rune}
          </motion.div>
        );
      })}
    </div>
  );
}
