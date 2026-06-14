/* Schedule — the week view of planned study blocks and mock sessions.
   A time-grid calendar with warm, typed event blocks, plus a summary
   strip and an "up next" rail. */
const { Badge, Button, IconButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

function Schedule({ onNavigate }) {
  const I = window.ICIcons;
  const days = [["Mon", "9"], ["Tue", "10"], ["Wed", "11"], ["Thu", "12"], ["Fri", "13"], ["Sat", "14"], ["Sun", "15"]];
  const todayCol = 2;
  const times = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM"];
  // events keyed by "day-row"
  const ev = {
    "0-0": { c: "study", t: "Rate limiters", s: "90m" },
    "1-1": { c: "study", t: "Graph drills", s: "75m" },
    "2-0": { c: "study", t: "Ledger deep work", s: "90m" },
    "2-4": { c: "review", t: "Notes review", s: "30m" },
    "3-3": { c: "mock", t: "Mock · Priya", s: "60m" },
    "4-1": { c: "study", t: "Kafka basics", s: "45m" },
    "4-4": { c: "study", t: "k8s primer", s: "60m" },
    "5-2": { c: "study", t: "STAR refine", s: "40m" },
    "6-0": { c: "review", t: "Final review", s: "45m" },
    "6-3": { c: "rest", t: "Rest", s: "" },
  };
  const labels = { study: "Study block", mock: "Mock interview", review: "Review", rest: "Rest" };

  return (
    <div className="stack">
      <div className="stats" style={{ marginBottom: "4px" }}>
        {[["Planned this week", "9h 15m", "6 study · 1 mock", ""], ["Completed", "3h 40m", "+1h vs. last week", ""], ["Next session", "Thu 3:00", "Mock · system design", ""], ["Days to on-site", "4", "Target · Jun 15", "muted"]].map(([l, v, d, c], i) => (
          <div className="stat" key={i}>
            <div className="stat-label">{l}</div>
            <div className="stat-value">{v}</div>
            <div className={"stat-delta " + c}>{d}</div>
          </div>
        ))}
      </div>

      <div className="spread">
        <div className="row" style={{ gap: "12px" }}>
          <IconButton label="Previous week" variant="outline" size="sm"><I.ChevronRight size={15} style={{ transform: "rotate(180deg)" }} /></IconButton>
          <span className="serif-h" style={{ fontSize: "16px" }}>Jun 9 – 15, 2026</span>
          <IconButton label="Next week" variant="outline" size="sm"><I.ChevronRight size={15} /></IconButton>
        </div>
        <Button variant="secondary" size="sm" iconLeft={<I.Plus size={13} />}>Add block</Button>
      </div>

      <div className="cal">
        <div className="cal-grid">
          <div className="cal-head" style={{ borderRight: "1px solid var(--border)" }}></div>
          {days.map(([w, d], i) => (
            <div className={"cal-head" + (i === todayCol ? " today" : "")} key={i}>{w}<b>{d}</b></div>
          ))}
          {times.map((time, r) => (
            <React.Fragment key={r}>
              <div className="cal-time">{time}</div>
              {days.map((_, c) => {
                const e = ev[c + "-" + r];
                return (
                  <div className="cal-cell" key={c} style={i_today(c, todayCol)}>
                    {e && (
                      <div className={"evt " + e.c} title={labels[e.c]}>
                        <b>{e.t}</b>{e.s}
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: "4px" }}>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "12px" }}>Up next</div>
          <div className="row" style={{ gap: "13px", padding: "10px 0" }}>
            <div className="session-date" style={{ background: "var(--info-soft)" }}><b>12</b><span>Jun</span></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13.5px", fontWeight: 550 }}>Mock interview — system design</div>
              <div className="dim" style={{ fontSize: "12px", marginTop: "1px" }}>Thu 3:00 pm · 60 min · with Priya · recorded</div>
            </div>
            <Button variant="primary" size="sm" onClick={() => onNavigate && onNavigate("mock")}>Join</Button>
          </div>
        </div>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="spread" style={{ marginBottom: "12px" }}>
            <div style={{ fontWeight: 600, fontSize: "13.5px" }}>Legend</div>
            <span className="dim" style={{ fontSize: "11.5px" }}>drag blocks to reschedule</span>
          </div>
          <div className="legend">
            <span><i style={{ background: "var(--accent)" }} />Study block</span>
            <span><i style={{ background: "var(--info)" }} />Mock interview</span>
            <span><i style={{ background: "var(--success)" }} />Review</span>
            <span><i style={{ background: "var(--track)" }} />Rest</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function i_today(c, t) { return c === t ? { background: "var(--accent-softer)" } : {}; }

window.Schedule = Schedule;
