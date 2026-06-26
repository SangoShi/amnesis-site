'use client';

import { useEffect, useRef } from 'react';

export default function useScrollBlur(threshold = 50) {
  const lastScroll = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const velocity = Math.abs(current - lastScroll.current);
      lastScroll.current = current;

      if (velocity > threshold) {
        document.body.classList.add('scroll-blur');
        document.body.classList.remove('scroll-blur-clear');

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          document.body.classList.remove('scroll-blur');
          document.body.classList.add('scroll-blur-clear');
          setTimeout(() => {
            document.body.classList.remove('scroll-blur-clear');
          }, 300);
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [threshold]);
}
