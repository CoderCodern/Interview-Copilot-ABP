"use client";

import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminOverview } from "@/components/admin/Overview";
import { AdminModels } from "@/components/admin/Models";
import { AdminRouting } from "@/components/admin/TaskRouting";
import { AdminPrompts } from "@/components/admin/Prompts";
import { AdminAIUsage } from "@/components/admin/AIUsage";
import { AdminCost } from "@/components/admin/AICost";
import { AdminUsers } from "@/components/admin/Users";
import { AdminJobs, AdminHealth, AdminAudit, AdminPlaceholder } from "@/components/admin/Platform";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";

interface ScreenMeta {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  render: () => ReactNode;
}

const SCREENS: Record<string, ScreenMeta> = {
  dashboard: {
    eyebrow: "Operations",
    title: (
      <>
        Good morning, <em>Dana</em>.
      </>
    ),
    subtitle: "Thursday, June 12 · platform overview",
    actions: (
      <>
        <div className="env-chip">
          <span className="pulse" /> Production
        </div>
        <span className="icon-btn-bare">
          <Icons.Bell size={17} />
          <span className="dot-badge" />
        </span>
      </>
    ),
    render: () => <AdminOverview />,
  },
  models: {
    eyebrow: "AI Operations",
    title: "Models",
    subtitle: "Providers, capabilities and live traffic share",
    actions: (
      <Button variant="ghost" size="sm" iconLeft={<Icons.Plus size={13} />}>
        Add provider
      </Button>
    ),
    render: () => <AdminModels />,
  },
  routing: {
    eyebrow: "AI Operations",
    title: "Task Routing",
    subtitle: "Map each platform task to the right model",
    render: () => <AdminRouting />,
  },
  prompts: {
    eyebrow: "AI Operations",
    title: "Prompt Management",
    subtitle: "Versioned prompts with draft, publish and rollback",
    render: () => <AdminPrompts />,
  },
  "ai-usage": {
    eyebrow: "AI Operations",
    title: "AI Usage",
    subtitle: "Per-request tokens, cost and latency",
    render: () => <AdminAIUsage />,
  },
  "ai-cost": {
    eyebrow: "AI Operations",
    title: "AI Cost Analytics",
    subtitle: "Spend trends, model split and cost drivers",
    render: () => <AdminCost />,
  },
  users: {
    eyebrow: "Users",
    title: "Users",
    subtitle: "Directory, roles, plans and AI consumption",
    render: () => <AdminUsers />,
  },
  jobs: {
    eyebrow: "Platform",
    title: "Background Jobs",
    subtitle: "Workers, queues and scheduled runs",
    render: () => <AdminJobs />,
  },
  health: {
    eyebrow: "Platform",
    title: "System Health",
    subtitle: "Service status, latency and infrastructure",
    render: () => <AdminHealth />,
  },
  audit: {
    eyebrow: "Platform",
    title: "Audit Logs",
    subtitle: "Every operator and system action, recorded",
    render: () => <AdminAudit />,
  },
};

// id -> [label, icon, group eyebrow]
const PLACEHOLDERS: Record<string, [string, string, string]> = {
  roles: ["Roles & permissions", "Shield", "Users"],
  plans: ["Plans & billing", "Star", "Users"],
  "user-usage": ["Usage limits", "Gauge", "Users"],
  resumes: ["Resumes", "Doc", "Content"],
  jds: ["Job Descriptions", "Briefcase", "Content"],
  research: ["Company Research", "Building", "Content"],
  kb: ["Knowledge Base", "Book", "Content"],
  errors: ["Errors", "Alert", "Platform"],
  "usage-analytics": ["Usage Analytics", "Chart", "Analytics"],
  "ai-analytics": ["AI Analytics", "TrendUp", "Analytics"],
  "cost-analytics": ["Cost Analytics", "Wave", "Analytics"],
  general: ["General settings", "Settings", "Settings"],
  auth: ["Authentication", "Lock", "Settings"],
  providers: ["AI Providers", "Cloud", "Settings"],
  storage: ["Storage", "Database", "Settings"],
};

export default function AdminConsolePage() {
  const params = useParams<{ slug?: string[] }>();
  const slug = params.slug?.[0] ?? "dashboard";

  const screen = SCREENS[slug];
  if (screen) {
    return (
      <AdminShell eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} actions={screen.actions}>
        {screen.render()}
      </AdminShell>
    );
  }

  const ph = PLACEHOLDERS[slug] ?? ["Admin", "Grid", "Console"];
  return (
    <AdminShell eyebrow={ph[2]} title={ph[0]}>
      <AdminPlaceholder label={ph[0]} icon={ph[1]} />
    </AdminShell>
  );
}
