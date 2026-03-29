"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  isTransitionComplete: boolean;
  setTransitionComplete: (complete: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const [isTransitionComplete, setTransitionComplete] = useState(false);

  // Fallback timeout to prevent infinite loading if 3D context fails entirely
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        console.warn("Loading state timed out (6s), forcing load complete to unblock UI.");
        setLoading(false);
      }, 6000);
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
