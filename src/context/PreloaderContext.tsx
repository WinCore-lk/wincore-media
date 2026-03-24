"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type PreloaderContextValue = {
  complete: boolean;
  markComplete: () => void;
};

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [complete, setComplete] = useState(false);
  const markComplete = useCallback(() => {
    setComplete((c) => (c ? c : true));
  }, []);

  return (
    <PreloaderContext.Provider value={{ complete, markComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}

/** True after the preloader exit animation finishes (safe to run hero / page motion). */
export function usePreloaderDone() {
  return useContext(PreloaderContext)?.complete ?? false;
}

export function usePreloaderMarkComplete() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) {
    throw new Error("usePreloaderMarkComplete must be used within PreloaderProvider");
  }
  return ctx.markComplete;
}
