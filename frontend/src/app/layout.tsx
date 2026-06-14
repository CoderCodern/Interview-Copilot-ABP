import type { Metadata } from "next";
import { NO_FLASH_THEME_SCRIPT } from "@/lib/theme";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Interview Copilot — Prepare for something important",
  description:
    "A warm, AI career companion: resume intelligence, company research, job-fit analysis, a paced prep plan, and AI mock interviews — in one calm workflow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
