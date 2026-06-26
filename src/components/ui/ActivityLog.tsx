'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EVENTS = [
  'Объект 01: последняя активность {min} мин назад',
  'Сектор Амнезис: обнаружена аномалия #{id}',
  'Система: сканирование сектора завершено',
  'ОБЪЕКТ 02: СТАТУС ИЗМЕНЁН → НЕАКТИВЕН',
  'Система: уровень угрозы ██████░░░░ 60%',
  'ОБЪЕКТ 03: данные засекречены // уровень 3',
  'Сектор Амнезис: температура стабильна',
  'Система: резервное копирование завершено',
  'ОБЪЕКТ 01: обнаружен в секторе 7-G',
  'Система: обновление базы данных...',
];

export default function ActivityLog() {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const addEvent = () => {
      const template = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      const event = template
        .replace('{min}', String(Math.floor(Math.random() * 15) + 1))
        .replace('{id}', String(Math.floor(Math.random() * 900) + 100));
      setEvents((prev) => [event, ...prev].slice(0, 3));
    };

    addEvent();
    const interval = setInterval(addEvent, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <AnimatePresence mode="popLayout">
        {events.map((event, i) => (
          <motion.div
            key={event + i}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[11px] text-muted/60">
              <span className="text-accent/40">&gt;</span> {event}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
