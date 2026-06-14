"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Avatar, IconButton, NavItem } from "@/components/ds";
import { Icons } from "@/components/icons";
import { AdminIcons } from "./adminIcons";
import { AdminThemeToggle } from "./AdminThemeToggle";

interface AdminNavItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

interface AdminNavSection {
  group: string | null;
  items: AdminNavItem[];
}

const ADMIN_NAV: AdminNavSection[] = [
  { group: null, items: [{ id: "dashboard", label: "Dashboard", icon: "Grid" }] },
  {
    group: "AI Operations",
    items: [
      { id: "models", label: "Models", icon: "Cpu" },
      { id: "routing", label: "Task Routing", icon: "Route" },
      { id: "prompts", label: "Prompt Management", icon: "Terminal" },
      { id: "ai-usage", label: "AI Usage", icon: "Activity" },
      { id: "ai-cost", label: "AI Cost Analytics", icon: "Dollar" },
    ],
  },
  {
    group: "Users",
    items: [
      { id: "users", label: "Users", icon: "Users" },
      { id: "roles", label: "Roles", icon: "Shield" },
      { id: "plans", label: "Plans", icon: "Star" },
      { id: "user-usage", label: "Usage", icon: "Gauge" },
    ],
  },
  {
    group: "Content",
    items: [
      { id: "resumes", label: "Resumes", icon: "Doc" },
      { id: "jds", label: "Job Descriptions", icon: "Briefcase" },
      { id: "research", label: "Company Research", icon: "Building" },
      { id: "kb", label: "Knowledge Base", icon: "Book" },
    ],
  },
  {
    group: "Platform",
    items: [
      { id: "jobs", label: "Background Jobs", icon: "Refresh", count: 6 },
      { id: "audit", label: "Audit Logs", icon: "History" },
      { id: "errors", label: "Errors", icon: "Alert", count: 2 },
      { id: "health", label: "System Health", icon: "Server" },
    ],
  },
  {
    group: "Analytics",
    items: [
      { id: "usage-analytics", label: "Usage Analytics", icon: "Chart" },
      { id: "ai-analytics", label: "AI Analytics", icon: "TrendUp" },
      { id: "cost-analytics", label: "Cost Analytics", icon: "Wave" },
    ],
  },
  {
    group: "Settings",
    items: [
      { id: "general", label: "General", icon: "Settings" },
      { id: "auth", label: "Authentication", icon: "Lock" },
      { id: "providers", label: "AI Providers", icon: "Cloud" },
      { id: "storage", label: "Storage", icon: "Database" },
    ],
  },
];

const hrefFor = (id: string) => (id === "dashboard" ? "/admin" : "/admin/" + id);

export interface AdminShellProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminShell({ eyebrow, title, subtitle, actions, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const active = pathname === "/admin" ? "dashboard" : (pathname.split("/")[2] ?? "dashboard");

  return (
    <div className="app ic-grain admin-console">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            i<span>c</span>
          </div>
          <div>
            <div className="brand-name">Interview&nbsp;Copilot</div>
            <div className="brand-sub">Admin Console</div>
          </div>
        </div>

        <div className="env-chip" style={{ margin: "0 4px 4px", justifyContent: "center" }}>
          <span className="pulse" /> Production · all systems normal
        </div>

        <div className="sidebar-scroll">
          {ADMIN_NAV.map((sec, si) => (
            <div key={sec.group ?? "top-" + si}>
              {sec.group && <div className="nav-label">{sec.group}</div>}
              {sec.items.map((it) => {
                const Ic = AdminIcons[it.icon] ?? AdminIcons.Grid;
                return (
                  <Link key={it.id} href={hrefFor(it.id)} style={{ display: "block" }}>
                    <NavItem active={active === it.id} count={it.count ?? null} icon={<Ic size={16} />}>
                      {it.label}
                    </NavItem>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-foot">
          <AdminThemeToggle />
          <div className="user-row">
            <Avatar name="Dana Okonkwo" size={30} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">Dana Okonkwo</div>
              <div className="user-mail">Platform operator</div>
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

      <main className="main admin-main">
        <div className="topbar">
          <div>
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h1>{title}</h1>
            {subtitle && <div className="topbar-sub">{subtitle}</div>}
          </div>
          <div className="topbar-actions">{actions}</div>
        </div>
        {children}
      </main>
    </div>
  );
}
