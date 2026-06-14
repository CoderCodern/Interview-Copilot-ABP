import type { ReactNode } from "react";
import { AppShell } from "@/components/app/AppShell";
import "@/styles/app.css";

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
