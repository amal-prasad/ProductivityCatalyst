"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  isTransitionComplete: boolean;
  setTransitionComplete: (complete: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(pathname === "/");
  const [isTransitionComplete, setTransitionComplete] = useState(pathname !== "/");

  // Fallback timeout to prevent infinite loading if 3D context fails entirely
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        console.warn("Loading state timed out, forcing load complete to unblock UI.");
        setLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading,
        isTransitionComplete,
        setTransitionComplete,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
