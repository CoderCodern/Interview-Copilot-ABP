import type { ReactNode } from "react";
import "@/styles/app.css";
import "@/styles/admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
