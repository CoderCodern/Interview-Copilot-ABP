/* app.jsx — wires the App UI kit: screen routing, per-screen topbar,
   and the first-run onboarding flow. DS components + icons are read at
   render time inside each component, so reads never depend on bundle
   module-evaluation order. */

const StreakChip = () => (
  <div className="streak-chip"><span className="streak-dot" />12-day streak&nbsp;<span>· 2h 10m today</span></div>
);

function App() {
  const { Button, Badge } = window.InterviewCopilotDesignSystem_d59c8c;
  const I = window.ICIcons;
  const parseHash = () => {
    const h = (window.location.hash || "").replace(/^#/, "");
    const [scr, view] = h.split("/");
    return { scr: scr || "dashboard", view: view || null };
  };
  const init = parseHash();
  const [active, setActive] = React.useState(init.scr === "onboarding" ? "dashboard" : init.scr);
  const [jdView, setJdView] = React.useState(init.view);
  const [onboarding, setOnboarding] = React.useState(init.scr === "onboarding");
  const nav = (id) => { setActive(id); setJdView(null); };

  React.useEffect(() => {
    const onHash = () => { const { scr, view } = parseHash(); setOnboarding(scr === "onboarding"); if (scr !== "onboarding") setActive(scr); setJdView(view); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

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
      actions: <Button variant="secondary" iconLeft={<I.Plus size={14} />} onClick={() => setOnboarding(true)}>Add job</Button>,
      render: (nav) => <JobAnalysis onNavigate={nav} initialView={jdView} />,
    },
    company: {
      eyebrow: "Research", title: "Company <em>Research</em>",
      subtitle: "Who you're meeting, how the loop runs, and what they'll probe.",
      actions: <Badge tone="accent">Stripe</Badge>, render: () => <CompanyResearch />,
    },
    plan: {
      eyebrow: "Plan", title: "Preparation <em>Plan</em>",
      subtitle: "A day-by-day plan toward your target date, weighted to your gaps.",
      actions: <Button variant="secondary" iconLeft={<I.Sparkle size={14} />}>Regenerate</Button>,
      render: (nav) => <PrepPlan onNavigate={nav} />,
    },
    schedule: {
      eyebrow: "This week", title: "<em>Schedule</em>",
      subtitle: "Your planned study blocks and mock sessions.",
      actions: null, render: (nav) => <Schedule onNavigate={nav} />,
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
    knowledge: {
      eyebrow: "Notebook", title: "<em>Knowledge</em>",
      subtitle: "Your question bank, notes and spaced-repetition review.",
      actions: <Button variant="secondary" iconLeft={<I.Plus size={14} />}>New note</Button>,
      render: () => <Knowledge />,
    },
    progress: {
      eyebrow: "Trends", title: "<em>Progress</em>",
      subtitle: "Readiness over time, by track.",
      actions: <Badge tone="success">+6% this week</Badge>, render: () => <Progress />,
    },
    profile: {
      eyebrow: "Account", title: "<em>Profile</em>",
      subtitle: "Your details, target role and preferences.",
      actions: null, render: () => <Profile />,
    },
  };

  const s = SCREENS[active] || SCREENS.dashboard;
  return (
    <>
      <AppShell active={active} onNavigate={nav} onStartOnboarding={() => setOnboarding(true)}
        eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} actions={s.actions}>
        {s.render(nav)}
      </AppShell>
      <Onboarding open={onboarding} onClose={() => setOnboarding(false)}
        onFinish={() => { setOnboarding(false); setActive("plan"); }} />
    </>
  );
}

window.ICApp = App;
