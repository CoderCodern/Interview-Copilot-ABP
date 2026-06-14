/* PrepPlan — the day-by-day preparation plan generated from a job
   description + target date. Timeline of dated study blocks on the
   left; plan summary, readiness and track allocation on the right. */
const { Badge, Meter, Button, ReadinessRing, Tag } = window.InterviewCopilotDesignSystem_d59c8c || {};

function PrepPlan({ onNavigate }) {
  const I = window.ICIcons;
  const days = [
    { d: "9", w: "Wed", state: "today", label: "Today", tasks: [
      { t: "System design: payment ledgers & idempotent retries", m: "90 min · deep work", done: false },
      { t: "Review annotated Stripe engineering notes", m: "30 min", done: false },
    ]},
    { d: "10", w: "Thu", state: "", tasks: [
      { t: "Mock interview — system design with Priya", m: "4:00 pm · 60 min · recorded", done: false },
      { t: "Kafka fundamentals — close the streaming gap", m: "45 min", done: false },
    ]},
    { d: "11", w: "Fri", state: "", tasks: [
      { t: "Graph drills + spaced-repetition review", m: "75 min · coding", done: false },
    ]},
    { d: "12", w: "Sat", state: "", tasks: [
      { t: "Kubernetes orchestration primer", m: "60 min", done: false },
      { t: "Behavioral: refine 2 STAR stories", m: "40 min", done: false },
    ]},
    { d: "8", w: "Tue", state: "done", label: "Yesterday", tasks: [
      { t: "Rate limiters & queue design exercise", m: "Completed · 88% self-score", done: true },
    ]},
  ];
  const alloc = [
    ["System design", 40, "var(--accent)"],
    ["Coding drills", 30, "var(--info)"],
    ["Behavioral", 18, "var(--success)"],
    ["Company & gaps", 12, "var(--warning)"],
  ];

  return (
    <div className="plan-grid">
      <div className="stack">
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="spread">
            <div className="row" style={{ gap: "12px" }}>
              <div className="card-icon" style={{ width: 40, height: 40 }}><I.Target size={19} /></div>
              <div>
                <div className="serif-h" style={{ fontSize: "17px" }}>Stripe on-site — 14-day plan</div>
                <div className="muted" style={{ fontSize: "12.5px", marginTop: "2px" }}>Target: Jun 15 · Day 9 of 14 · on track</div>
              </div>
            </div>
            <Badge tone="success"><I.Check size={10} stroke={3} /> On track</Badge>
          </div>
          <div className="row" style={{ gap: "12px", marginTop: "16px" }}>
            <Meter value={64} style={{ flex: 1 }} />
            <span className="dim" style={{ fontSize: "12px", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>64%</span>
          </div>
        </div>

        <div className="surface" style={{ padding: "22px" }}>
          <div className="spread" style={{ marginBottom: "18px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 550 }}>This week</h3>
            <div className="seg"><button data-on="true">Timeline</button><button data-on="false" onClick={() => onNavigate && onNavigate("schedule")}>Calendar</button></div>
          </div>
          {days.map((day, i) => (
            <div className="day-row" key={i}>
              <div className="day-tag">
                <div className={"day-node " + day.state}>{day.state === "done" ? <I.Check size={13} stroke={3} /> : day.d}</div>
                <div className="day-date">{day.label || day.w}</div>
              </div>
              <div className="day-body">
                {day.tasks.map((t, j) => (
                  <div className="task" key={j}>
                    <span className={"task-check" + (t.done ? " done" : "")}>{t.done && <I.Check size={10} stroke={3} />}</span>
                    <div style={{ flex: 1 }}>
                      <div className={"task-title" + (t.done ? " done" : "")}>{t.t}</div>
                      <div className="task-meta">{t.m}</div>
                    </div>
                    {!t.done && i === 0 && j === 0 && <Button variant="subtle" size="sm" onClick={() => onNavigate && onNavigate("mock")} iconRight={<I.Arrow size={12} />}>Start</Button>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "22px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="eyebrow" style={{ alignSelf: "flex-start", marginBottom: "14px" }}>Projected readiness</div>
          <ReadinessRing value={72} caption={<>On pace for <b style={{ color: "var(--text)" }}>88%</b> by Jun 15</>} />
        </div>
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "14px" }}>Time allocation</div>
          {alloc.map(([k, v, c]) => (
            <div key={k} style={{ marginBottom: "12px" }}>
              <div className="spread" style={{ marginBottom: "6px" }}>
                <span style={{ fontSize: "12.5px", color: "var(--text-2)" }}>{k}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-2)" }}>{v}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: "var(--track)", overflow: "hidden" }}>
                <div style={{ width: v + "%", height: "100%", borderRadius: 99, background: c }} />
              </div>
            </div>
          ))}
          <div className="divider" style={{ margin: "14px 0" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            <Tag tone="accent">Weighted to your gaps</Tag>
          </div>
          <Button variant="secondary" size="sm" fullWidth iconLeft={<I.Sparkle size={13} />}>Regenerate plan</Button>
        </div>
      </div>
    </div>
  );
}

window.PrepPlan = PrepPlan;
