'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

const ScanContext = createContext({ active: false, toggle: () => {} });

export function ScanProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);

  return (
    <ScanContext.Provider value={{ active, toggle: () => setActive(!active) }}>
      {children}
    </ScanContext.Provider>
  );
}

export function useScanMode() {
  return useContext(ScanContext);
}
