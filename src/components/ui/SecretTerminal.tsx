'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playGlitch } from '@/lib/sounds';

const secrets: Record<string, string> = {
  help: 'Доступные команды: help, whoami, status, secrets, exit',
  whoami: 'Вы — наблюдатель. Доступ к архиву: УРОВЕНЬ 1.',
  status: 'СИСТЕМА: АКТИВНА\nАНОМАЛИИ: ОБНАРУЖЕНЫ\nУРОВЕНЬ УГРОЗЫ: ██████░░░░ 60%',
  secrets: 'Найдено секретов: 1/7\nПодсказка: попробуйте кликнуть на логотип 7 раз.',
};

export default function SecretTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['> СЕКРЕТНЫЙ ТЕРМИНАЛ v0.1', '> Введите "help" для списка команд', '']);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) playGlitch();
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const response = secrets[trimmed] || `> Команда не распознана: "${trimmed}"`;
    setOutput((prev) => [...prev, `> ${cmd}`, response, '']);
    setInput('');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 z-[200] mx-auto max-w-2xl border border-accent/30 bg-background/95 p-4 backdrop-blur-md"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-accent">SECRETS_TERMINAL</span>
            <button onClick={() => setOpen(false)} className="text-xs text-muted hover:text-red">[X]</button>
          </div>
          <div className="mb-2 max-h-40 overflow-y-auto font-mono text-xs text-green">
            {output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent">&gt;</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
              className="flex-1 bg-transparent text-sm text-foreground outline-none"
              placeholder="Введите команду..."
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
