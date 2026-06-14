"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Onboarding } from "./Onboarding";

interface OnboardingContextValue {
  openOnboarding: () => void;
  closeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within an OnboardingProvider");
  return ctx;
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const openOnboarding = useCallback(() => setOpen(true), []);
  const closeOnboarding = useCallback(() => setOpen(false), []);
  const finish = useCallback(() => {
    setOpen(false);
    router.push("/plan");
  }, [router]);

  return (
    <OnboardingContext.Provider value={{ openOnboarding, closeOnboarding }}>
      {children}
      <Onboarding open={open} onClose={closeOnboarding} onFinish={finish} />
    </OnboardingContext.Provider>
  );
}
