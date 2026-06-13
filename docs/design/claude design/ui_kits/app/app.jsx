/* app.jsx — wires the App UI kit: screen routing + per-screen topbar.
   DS components + icons are read at render time, inside each component,
   so the read never depends on the bundle's module evaluation order. */

const StreakChip = () => (
  <div className="streak-chip"><span className="streak-dot" />12-day streak&nbsp;<span>· 2h 10m today</span></div>
);

function Placeholder({ icon, title, desc }) {
  const { EmptyState, Badge } = window.InterviewCopilotDesignSystem_d59c8c;
  return (
    <div className="surface" style={{ padding: "20px" }}>
      <EmptyState icon={icon} title={title} description={desc}
        action={<Badge tone="outline">In the full product</Badge>} />
    </div>
  );
}

function App() {
  const { Button, Badge } = window.InterviewCopilotDesignSystem_d59c8c;
  const I = window.ICIcons;
  const [active, setActive] = React.useState("dashboard");
  const nav = (id) => setActive(id);

  // Built inside the component so the JSX is only constructed when App
  // actually renders (on the real page, where the DS namespace + icons
  // are populated) — never during the bundled copy's module eval.
  const SCREENS = {
  dashboard: {
    eyebrow: "Wednesday, June 11", title: "Good morning, <em>Coder</em>.",
    subtitle: "Four days until your on-site. Today is a deep-work day.",
    actions: <StreakChip />, render: (nav) => <Dashboard onNavigate={nav} />,
  },
  resume: {
    eyebrow: "Resume", title: "Resume <em>Analysis</em>",
    subtitle: "Skills, experience and a career profile, extracted from your latest upload.",
    actions: <Button variant="secondary" iconLeft={<I.Upload size={14} />}>Upload version</Button>,
    render: () => <ResumeAnalysis />,
  },
  jobs: {
    eyebrow: "Job description", title: "Job &amp; <em>Skill Gap</em>",
    subtitle: "What this role demands, and where you stand against it.",
    actions: <Button variant="secondary" iconLeft={<I.Plus size={14} />}>Add job</Button>,
    render: () => <JobAnalysis />,
  },
  mock: {
    eyebrow: "Practice", title: "Mock <em>Interview</em>",
    subtitle: "A live, recorded session. Answer aloud or in text — feedback follows.",
    actions: <Badge tone="accent">60 min · System Design</Badge>,
    render: () => <Chat mode="mock" />,
  },
  assistant: {
    eyebrow: "Assistant", title: "AI <em>Assistant</em>",
    subtitle: "Grounded in your resume, target role and notes.",
    actions: null, render: () => <Chat mode="assistant" />,
  },
  company: { eyebrow: "Research", title: "Company <em>Research</em>", subtitle: "Culture, interview style and recent news.",
    render: () => <Placeholder icon={<I.Building size={22} />} title="Company research" desc="Deep-dives on culture, hiring process and interview style assemble here once a company is added." /> },
  plan: { eyebrow: "Plan", title: "Preparation <em>Plan</em>", subtitle: "A day-by-day plan toward your target date.",
    render: () => <Placeholder icon={<I.Target size={22} />} title="Preparation plan" desc="Generate a plan from a job description and target date to see scheduled tracks here." /> },
  schedule: { eyebrow: "This week", title: "<em>Schedule</em>", subtitle: "Your planned study blocks and mock sessions.",
    render: () => <Placeholder icon={<I.Calendar size={22} />} title="Schedule" desc="Planned sessions and mock interviews show on a weekly calendar." /> },
  progress: { eyebrow: "Trends", title: "<em>Progress</em>", subtitle: "Readiness over time, by track.",
    render: () => <Placeholder icon={<I.Chart size={22} />} title="Progress" desc="Readiness trends, study-time charts and per-track breakdowns live here." /> },
  profile: { eyebrow: "Account", title: "<em>Profile</em>", subtitle: "Your details, target role and preferences.",
    render: () => <Placeholder icon={<I.User size={22} />} title="User profile" desc="Display name, timezone, target role and connected accounts." /> },
  };

  const s = SCREENS[active] || SCREENS.dashboard;
  return (
    <AppShell active={active} onNavigate={nav} eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} actions={s.actions}>
      {s.render(nav)}
    </AppShell>
  );
}

window.ICApp = App;
