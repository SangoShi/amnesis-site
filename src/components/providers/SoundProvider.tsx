'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

const SoundContext = createContext({ enabled: false, toggle: () => {} });

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <SoundContext.Provider value={{ enabled, toggle: () => setEnabled(!enabled) }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
