/* Dashboard — the home screen. Today's focus hero, stat strip,
   study tracks, upcoming sessions and recent notes. */
const { ReadinessRing, Meter, Button, Badge } = window.InterviewCopilotDesignSystem_d59c8c || {};

function Dashboard({ onNavigate }) {
  const I = window.ICIcons;
  const tracks = [
    { icon: I.Layers, badge: ["In focus", "accent"], title: "System Design", desc: "Ledgers, rate limiters, queues. Two exercises left in the payments module.", value: 58, pct: "7 / 12", last: "Last studied today" },
    { icon: I.Activity, badge: ["Steady", "outline"], title: "Coding Drills", desc: "Graphs and dynamic programming this week. Strong run on medium difficulty.", value: 73, pct: "35 / 48", last: "Last studied yesterday" },
    { icon: I.User, badge: ["✓ Strong", "success"], title: "Behavioral", desc: "All STAR stories drafted and rehearsed. One final pass on the leadership set.", value: 92, pct: "22 / 24", last: "Last studied Mon" },
  ];
  const sessions = [
    { d: "10", m: "Jun", now: true, title: "Deep work: payment ledger design", meta: <><span className="live">In progress</span> · 90 min · System Design</> },
    { d: "11", m: "Jun", title: "Mock interview — system design w/ Priya", meta: "4:00 pm · 60 min · recorded for review" },
    { d: "12", m: "Jun", title: "Graph drills + spaced repetition review", meta: "Morning block · 75 min · Coding track" },
    { d: "14", m: "Jun", title: "Final review: STAR stories & questions", meta: "Evening · 45 min · light session" },
  ];
  const notes = [
    { done: true, title: "Idempotency keys — retry semantics", ex: "Client-generated keys, server-side dedup window, partial failure…", meta: "Reviewed today · System Design" },
    { done: false, title: "Double-entry ledger invariants", ex: "Debits = credits per transaction. Never mutate, only append…", meta: "Draft · needs examples · System Design" },
    { done: true, title: "STAR: migrating the billing service", ex: "Situation: 40k req/min legacy system. Task: zero-downtime cutover…", meta: "Rehearsed Mon · Behavioral" },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <span className="hero-tag"><I.Sparkle size={12} /> Today's focus</span>
          <h2>System design: payment ledgers &amp; idempotent retries</h2>
          <p className="lede">You marked consistency trade-offs as shaky on Monday. Today pairs two ledger design exercises with your annotated notes from the Stripe engineering blog.</p>
          <div className="hero-actions">
            <Button variant="primary" iconRight={<I.Arrow size={13} />} onClick={() => onNavigate("mock")}>Resume session</Button>
            <Button variant="ghost" onClick={() => onNavigate("resume")}>Review notes</Button>
          </div>
        </div>
        <div className="hero-right">
          <ReadinessRing value={72} caption={<><b style={{ color: "var(--text)" }}>+6%</b> since last week<br />Strongest: behavioral · Focus: system design</>} />
        </div>
      </section>

      <section className="stats">
        {[
          ["Questions completed", <>142 <small>/ 210</small></>, "+11 this week", ""],
          ["Study time", <>31<small>h</small> 40<small>m</small></>, "+4h 20m this week", ""],
          ["Mock interviews", <>7 <small>/ 10</small></>, "Next: Thu 4:00 pm", ""],
          ["Avg. mock score", <>8.2 <small>/ 10</small></>, "Stable · last 3 sessions", "muted"],
        ].map(([label, value, delta, cls], i) => (
          <div className="stat" key={i}>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
            <div className={"stat-delta " + cls}>{delta}</div>
          </div>
        ))}
      </section>

      <div className="section-head">
        <h3>Study tracks</h3>
        <a onClick={() => onNavigate("plan")}>View all tracks →</a>
      </div>
      <section className="grid-3">
        {tracks.map((t, i) => (
          <div className="surface topic" style={{ padding: "20px" }} key={i}>
            <div className="card-top">
              <div className="card-icon"><t.icon size={17} /></div>
              <Badge tone={t.badge[1]}>{t.badge[0]}</Badge>
            </div>
            <h4>{t.title}</h4>
            <p className="desc">{t.desc}</p>
            <div className="topic-progress">
              <Meter value={t.value} style={{ flex: 1 }} />
              <span className="pct">{t.pct}</span>
            </div>
            <div className="card-foot"><span>{t.last}</span><span style={{ color: "var(--accent)", fontWeight: 550 }}>Continue →</span></div>
          </div>
        ))}
      </section>

      <section className="cols">
        <div className="panel">
          <div className="panel-head"><h3>Upcoming sessions</h3><span className="hint">This week</span></div>
          {sessions.map((s, i) => (
            <div className={"session" + (s.now ? " now" : "")} key={i}>
              <div className="session-date"><b>{s.d}</b><span>{s.m}</span></div>
              <div className="session-body">
                <div className="session-title">{s.title}</div>
                <div className="session-meta">{s.meta}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Recent notes</h3><span className="hint">Notebook</span></div>
          {notes.map((n, i) => (
            <div className="note" key={i}>
              <div className="note-title">
                <span className={"note-check" + (n.done ? "" : " open")}>{n.done && <I.Check size={9} stroke={3} />}</span>
                {n.title}
              </div>
              <div className="note-excerpt">{n.ex}</div>
              <div className="note-meta">{n.meta}</div>
            </div>
          ))}
        </div>
      </section>

      <p className="foot-quote">"Slow is smooth, smooth is fast." — keep the streak, not the pace.</p>
    </>
  );
}

window.Dashboard = Dashboard;
