/* AppShell — the product frame: sidebar nav, plan card, theme toggle,
   and a topbar. Composes NavItem / Avatar / Meter from the DS bundle. */
const { NavItem, Avatar, Meter, IconButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

function ThemeToggle() {
  const [dark, setDark] = React.useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setDark(!dark);
  };
  const I = window.ICIcons;
  return (
    <div className="theme-toggle" onClick={toggle} role="switch" aria-checked={dark}>
      <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
        {dark ? <I.Sparkle size={15} /> : <I.Clock size={15} />}
        {dark ? "Morning mode" : "Evening mode"}
      </span>
      <span className="switch" data-on={dark} />
    </div>
  );
}

function AppShell({ active, onNavigate, title, eyebrow, subtitle, actions, children }) {
  const I = window.ICIcons;
  const nav = [
    { group: "Workspace", items: [
      { id: "dashboard", label: "Dashboard", icon: I.Home },
      { id: "schedule", label: "Schedule", icon: I.Calendar, count: 3 },
    ]},
    { group: "Prepare", items: [
      { id: "resume", label: "Resume Analysis", icon: I.Doc },
      { id: "jobs", label: "Job Descriptions", icon: I.Briefcase, count: 4 },
      { id: "company", label: "Company Research", icon: I.Building },
      { id: "plan", label: "Preparation Plan", icon: I.Target },
    ]},
    { group: "Practice", items: [
      { id: "mock", label: "Mock Interview", icon: I.Mic },
      { id: "assistant", label: "AI Assistant", icon: I.Chat },
      { id: "progress", label: "Progress", icon: I.Chart },
    ]},
  ];

  return (
    <div className="app ic-grain">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">i<span>c</span></div>
          <div>
            <div className="brand-name">Interview&nbsp;Copilot</div>
            <div className="brand-sub">Career Prep</div>
          </div>
        </div>

        {nav.map((sec) => (
          <React.Fragment key={sec.group}>
            <div className="nav-label">{sec.group}</div>
            {sec.items.map((it) => (
              <NavItem
                key={it.id}
                active={active === it.id}
                count={it.count}
                onClick={() => onNavigate(it.id)}
                icon={<it.icon size={16} />}
              >
                {it.label}
              </NavItem>
            ))}
          </React.Fragment>
        ))}

        <div className="sidebar-foot">
          <div className="plan-card">
            <div className="plan-title">Stripe loop — 14-day plan</div>
            <div className="plan-meta">Day 9 of 14 · on track</div>
            <Meter value={64} />
            <div className="plan-pct">64% complete</div>
          </div>
          <ThemeToggle />
          <div className="user-row" onClick={() => onNavigate("profile")}>
            <Avatar name="Coder Codern" size={30} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">Coder Codern</div>
              <div className="user-mail">coder@example.com</div>
            </div>
            <IconButton label="Sign out" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); window.location.href = "../marketing/login.html"; }}><I.Logout size={15} /></IconButton>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <div className="topbar-sub">{subtitle}</div>}
          </div>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}

window.AppShell = AppShell;
