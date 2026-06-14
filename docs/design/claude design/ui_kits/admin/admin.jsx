/* admin.jsx — the console router. Maps nav id → screen + topbar meta.
   Hash-routable so the design canvas can deep-link each surface. */

const SCREENS = {
  dashboard: {
    eyebrow: "Operations", title: "Good morning, <em>Dana</em>.",
    sub: "Thursday, June 12 · platform overview",
    render: (nav) => <window.AdminOverview onNavigate={nav} />,
    actions: (I) => (<>
      <div className="env-chip"><span className="pulse" /> Production</div>
      <span className="icon-btn-bare"><I.Bell size={17} /><span className="dot-badge" /></span>
    </>),
  },
  models: { eyebrow: "AI Operations", title: "Models", sub: "Providers, capabilities and live traffic share",
    render: (nav) => <window.AdminModels onNavigate={nav} />,
    actions: (I) => <window.DSBtn variant="ghost" size="sm" iconLeft={<I.Plus size={13} />}>Add provider</window.DSBtn> },
  routing: { eyebrow: "AI Operations", title: "Task Routing", sub: "Map each platform task to the right model",
    render: (nav) => <window.AdminRouting /> },
  prompts: { eyebrow: "AI Operations", title: "Prompt Management", sub: "Versioned prompts with draft, publish and rollback",
    render: (nav) => <window.AdminPrompts /> },
  "ai-usage": { eyebrow: "AI Operations", title: "AI Usage", sub: "Per-request tokens, cost and latency",
    render: (nav) => <window.AdminAIUsage /> },
  "ai-cost": { eyebrow: "AI Operations", title: "AI Cost Analytics", sub: "Spend trends, model split and cost drivers",
    render: (nav) => <window.AdminCost /> },
  users: { eyebrow: "Users", title: "Users", sub: "Directory, roles, plans and AI consumption",
    render: (nav) => <window.AdminUsers /> },
  jobs: { eyebrow: "Platform", title: "Background Jobs", sub: "Workers, queues and scheduled runs",
    render: (nav) => <window.AdminJobs /> },
  health: { eyebrow: "Platform", title: "System Health", sub: "Service status, latency and infrastructure",
    render: (nav) => <window.AdminHealth /> },
  audit: { eyebrow: "Platform", title: "Audit Logs", sub: "Every operator and system action, recorded",
    render: (nav) => <window.AdminAudit /> },
};

const PLACEHOLDERS = {
  roles: ["Roles & permissions", "Shield"], plans: ["Plans & billing", "Star"], "user-usage": ["Usage limits", "Gauge"],
  resumes: ["Resumes", "Doc"], jds: ["Job Descriptions", "Briefcase"], research: ["Company Research", "Building"], kb: ["Knowledge Base", "Book"],
  errors: ["Errors", "Alert"], "usage-analytics": ["Usage Analytics", "Chart"], "ai-analytics": ["AI Analytics", "TrendUp"], "cost-analytics": ["Cost Analytics", "Wave"],
  general: ["General settings", "Settings"], auth: ["Authentication", "Lock"], providers: ["AI Providers", "Cloud"], storage: ["Storage", "Database"],
};

function AdminApp() {
  const I = window.ICIcons;
  const getId = () => {
    const h = (location.hash || "").replace(/^#\/?/, "");
    return h || "dashboard";
  };
  const [active, setActive] = React.useState(getId());

  React.useEffect(() => {
    const onHash = () => setActive(getId());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (id) => {
    location.hash = "/" + id;
    setActive(id);
    const main = document.querySelector(".main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  const screen = SCREENS[active];
  let body, eyebrow, title, sub, actions;

  if (screen) {
    body = screen.render(navigate);
    eyebrow = screen.eyebrow; title = screen.title; sub = screen.sub;
    actions = screen.actions ? screen.actions(I) : null;
  } else {
    const ph = PLACEHOLDERS[active] || ["Admin", "Grid"];
    const groupMap = { roles: "Users", plans: "Users", "user-usage": "Users", resumes: "Content", jds: "Content", research: "Content", kb: "Content", errors: "Platform", "usage-analytics": "Analytics", "ai-analytics": "Analytics", "cost-analytics": "Analytics", general: "Settings", auth: "Settings", providers: "Settings", storage: "Settings" };
    eyebrow = groupMap[active] || "Console"; title = ph[0]; sub = null;
    body = <window.AdminPlaceholder label={ph[0]} icon={ph[1]} />;
  }

  return (
    <window.AdminShell active={active} onNavigate={navigate} eyebrow={eyebrow} title={title} subtitle={sub} actions={actions}>
      {body}
    </window.AdminShell>
  );
}

window.DSBtn = (window.InterviewCopilotDesignSystem_d59c8c || {}).Button;
window.AdminApp = AdminApp;
