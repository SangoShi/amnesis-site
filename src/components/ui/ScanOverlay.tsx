'use client';

import { ReactNode } from 'react';
import { useScanMode } from '@/components/providers/ScanProvider';

export default function ScanOverlay({ children }: { children: ReactNode }) {
  const { active } = useScanMode();

  if (!active) return null;

  return (
    <div className="animate-fade-in rounded-lg border border-green/30 bg-green/5 p-4"
      style={{ boxShadow: '0 0 20px rgba(29, 242, 125, 0.1)' }}>
      <p className="mb-1 text-[10px] uppercase text-green/50">[ SCAN DATA ]</p>
      {children}
    </div>
  );
}
