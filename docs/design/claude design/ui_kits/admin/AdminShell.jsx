/* AdminShell — operations console frame. Reuses the warm sidebar/
   topbar vocabulary from the product app, re-grouped for platform
   administration. Composes NavItem / Avatar / IconButton from the DS. */
const { NavItem, Avatar, IconButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

function AdminThemeToggle() {
  const [dark, setDark] = React.useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("ic-admin-theme", next); } catch (e) {}
    setDark(!dark);
  };
  const I = window.ICIcons;
  return (
    <div className="theme-toggle" onClick={toggle} role="switch" aria-checked={dark}>
      <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
        {dark ? <I.Sparkle size={15} /> : <I.Clock size={15} />}
        {dark ? "Light console" : "Dark console"}
      </span>
      <span className="switch" data-on={dark} />
    </div>
  );
}

const ADMIN_NAV = [
  { group: null, items: [{ id: "dashboard", label: "Dashboard", icon: "Grid" }] },
  { group: "AI Operations", items: [
    { id: "models", label: "Models", icon: "Cpu" },
    { id: "routing", label: "Task Routing", icon: "Route" },
    { id: "prompts", label: "Prompt Management", icon: "Terminal" },
    { id: "ai-usage", label: "AI Usage", icon: "Activity" },
    { id: "ai-cost", label: "AI Cost Analytics", icon: "Dollar" },
  ]},
  { group: "Users", items: [
    { id: "users", label: "Users", icon: "Users" },
    { id: "roles", label: "Roles", icon: "Shield" },
    { id: "plans", label: "Plans", icon: "Star" },
    { id: "user-usage", label: "Usage", icon: "Gauge" },
  ]},
  { group: "Content", items: [
    { id: "resumes", label: "Resumes", icon: "Doc" },
    { id: "jds", label: "Job Descriptions", icon: "Briefcase" },
    { id: "research", label: "Company Research", icon: "Building" },
    { id: "kb", label: "Knowledge Base", icon: "Book" },
  ]},
  { group: "Platform", items: [
    { id: "jobs", label: "Background Jobs", icon: "Refresh", count: 6 },
    { id: "audit", label: "Audit Logs", icon: "History" },
    { id: "errors", label: "Errors", icon: "Alert", count: 2 },
    { id: "health", label: "System Health", icon: "Server" },
  ]},
  { group: "Analytics", items: [
    { id: "usage-analytics", label: "Usage Analytics", icon: "Chart" },
    { id: "ai-analytics", label: "AI Analytics", icon: "TrendUp" },
    { id: "cost-analytics", label: "Cost Analytics", icon: "Wave" },
  ]},
  { group: "Settings", items: [
    { id: "general", label: "General", icon: "Settings" },
    { id: "auth", label: "Authentication", icon: "Lock" },
    { id: "providers", label: "AI Providers", icon: "Cloud" },
    { id: "storage", label: "Storage", icon: "Database" },
  ]},
];

function AdminShell({ active, onNavigate, title, eyebrow, subtitle, actions, children }) {
  const I = window.ICIcons;
  return (
    <div className="app ic-grain">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">i<span>c</span></div>
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
            <React.Fragment key={sec.group || "top-" + si}>
              {sec.group && <div className="nav-label">{sec.group}</div>}
              {sec.items.map((it) => {
                const Ic = I[it.icon] || I.Grid;
                return (
                  <NavItem
                    key={it.id}
                    active={active === it.id}
                    count={it.count}
                    onClick={() => onNavigate(it.id)}
                    icon={<Ic size={16} />}
                  >
                    {it.label}
                  </NavItem>
                );
              })}
            </React.Fragment>
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
            <IconButton label="Sign out" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}><I.Logout size={15} /></IconButton>
          </div>
        </div>
      </aside>

      <main className="main admin-main">
        <div className="topbar">
          <div>
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <div className="topbar-sub">{subtitle}</div>}
          </div>
          <div className="topbar-actions">{actions}</div>
        </div>
        {children}
      </main>
    </div>
  );
}

window.AdminShell = AdminShell;
