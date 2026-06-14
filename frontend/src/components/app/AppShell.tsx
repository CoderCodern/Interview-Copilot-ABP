"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Avatar, IconButton, Meter, NavItem } from "@/components/ds";
import { Icons, type IconProps } from "@/components/icons";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  href: string;
  label: string;
  icon: (p: IconProps) => ReactNode;
  count?: number;
}

interface NavSection {
  group: string;
  items: NavLink[];
}

const NAV: NavSection[] = [
  {
    group: "Workspace",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: Icons.Home },
      { href: "/schedule", label: "Schedule", icon: Icons.Calendar, count: 3 },
    ],
  },
  {
    group: "Prepare",
    items: [
      { href: "/resume", label: "Resume Analysis", icon: Icons.Doc },
      { href: "/jobs", label: "Job Descriptions", icon: Icons.Briefcase, count: 4 },
      { href: "/company", label: "Company Research", icon: Icons.Building },
      { href: "/plan", label: "Preparation Plan", icon: Icons.Target },
    ],
  },
  {
    group: "Practice",
    items: [
      { href: "/mock", label: "Mock Interview", icon: Icons.Mic },
      { href: "/assistant", label: "AI Assistant", icon: Icons.Chat },
      { href: "/progress", label: "Progress", icon: Icons.Chart },
    ],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="app ic-grain">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            i<span>c</span>
          </div>
          <div>
            <div className="brand-name">Interview&nbsp;Copilot</div>
            <div className="brand-sub">Career Prep</div>
          </div>
        </div>

        {NAV.map((sec) => (
          <div key={sec.group}>
            <div className="nav-label">{sec.group}</div>
            {sec.items.map((it) => {
              const active = pathname === it.href || pathname.startsWith(it.href + "/");
              return (
                <Link key={it.href} href={it.href} style={{ display: "block" }}>
                  <NavItem active={active} count={it.count ?? null} icon={<it.icon size={16} />}>
                    {it.label}
                  </NavItem>
                </Link>
              );
            })}
          </div>
        ))}

        <div className="sidebar-foot">
          <div className="plan-card">
            <div className="plan-title">Stripe loop — 14-day plan</div>
            <div className="plan-meta">Day 9 of 14 · on track</div>
            <Meter value={64} />
            <div className="plan-pct">64% complete</div>
          </div>
          <ThemeToggle />
          <div className="user-row" onClick={() => router.push("/profile")}>
            <Avatar name="Coder Codern" size={30} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">Coder Codern</div>
              <div className="user-mail">coder@example.com</div>
            </div>
            <IconButton
              label="Sign out"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/login");
              }}
            >
              <Icons.Logout size={15} />
            </IconButton>
          </div>
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}
