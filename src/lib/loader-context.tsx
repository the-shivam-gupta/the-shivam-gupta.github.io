"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface LoaderContextValue {
  ready: boolean;
  complete: () => void;
}

const LoaderContext = createContext<LoaderContextValue>({
  ready: false,
  complete: () => {},
});

const STORAGE_KEY = "shivam-portfolio-loaded";

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      seen = false;
    }

    if (seen) {
      const id = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  const complete = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* private mode - ignore */
    }
    setReady(true);
  };

  return (
    <LoaderContext.Provider value={{ ready, complete }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}