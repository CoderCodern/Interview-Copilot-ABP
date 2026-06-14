import type { ReactNode } from "react";
import { AppShell } from "@/components/app/AppShell";
import { OnboardingProvider } from "@/components/app/OnboardingProvider";
import "@/styles/app.css";
import "@/styles/app.extra.css";

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingProvider>
      <AppShell>{children}</AppShell>
    </OnboardingProvider>
  );
}
