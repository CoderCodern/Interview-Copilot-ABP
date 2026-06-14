/* Progress — readiness trend over time, study-time chart, per-track
   breakdown and mock-score history. Data-forward, CSS-drawn charts. */
const { Badge, Meter, ReadinessRing, Button } = window.InterviewCopilotDesignSystem_d59c8c || {};

function Progress() {
  const I = window.ICIcons;
  const week = [["Jun 3", 35], ["4", 60], ["5", 45], ["6", 80], ["7", 25], ["8", 70], ["Today", 95]];
  const maxMin = 100;
  const tracks = [
    ["System design", 58, "+12%", "var(--accent)"],
    ["Coding drills", 73, "+5%", "var(--info)"],
    ["Behavioral", 92, "+2%", "var(--success)"],
    ["Streaming & infra", 41, "+18%", "var(--warning)"],
  ];
  const mocks = [
    ["Mock 7 · System design", "8.4", "Jun 8", "up"],
    ["Mock 6 · Behavioral", "8.1", "Jun 5", "up"],
    ["Mock 5 · Coding", "7.6", "Jun 2", "flat"],
    ["Mock 4 · System design", "7.2", "May 29", "up"],
  ];

  return (
    <div className="stack">
      <div className="two-col">
        <div className="surface" style={{ padding: "22px" }}>
          <div className="spread" style={{ marginBottom: "18px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 550 }}>Study time</h3>
            <div className="seg"><button data-on="true">7 days</button><button data-on="false">14 days</button></div>
          </div>
          <div className="bars">
            {week.map(([d, v], i) => (
              <div className="bar-col" key={i}>
                <div className="bar" style={{ height: (v / maxMin * 100) + "%", background: i === week.length - 1 ? "linear-gradient(180deg, var(--accent), var(--accent-deep))" : undefined, opacity: i === week.length - 1 ? 1 : 0.85 }} />
                <span className="bar-label">{d}</span>
              </div>
            ))}
          </div>
          <div className="divider" style={{ margin: "16px 0 12px" }} />
          <div className="spread">
            <span className="dim" style={{ fontSize: "12px" }}>Avg. 54 min/day · best streak 12 days</span>
            <span className="stat-delta">+4h 20m this week</span>
          </div>
        </div>
        <div className="surface" style={{ padding: "22px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="eyebrow" style={{ alignSelf: "flex-start", marginBottom: "10px" }}>Overall readiness</div>
          <ReadinessRing value={72} caption={<><b style={{ color: "var(--text)" }}>+6%</b> since last week</>} />
          <Badge tone="success" style={{ marginTop: "14px" }}><I.TrendUp size={11} /> Trending up</Badge>
        </div>
      </div>

      <div className="two-col">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="spread" style={{ marginBottom: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 550 }}>Readiness by track</h3>
            <span className="hint dim" style={{ fontSize: "11.5px" }}>vs. last week</span>
          </div>
          {tracks.map(([k, v, delta, c], i) => (
            <div className="track-row" key={i}>
              <span style={{ fontSize: "13px", fontWeight: 550 }}>{k}</span>
              <div style={{ height: 8, borderRadius: 99, background: "var(--track)", overflow: "hidden" }}>
                <div style={{ width: v + "%", height: "100%", borderRadius: 99, background: c }} />
              </div>
              <span className="row" style={{ gap: "8px", justifyContent: "flex-end" }}>
                <b className="serif-num" style={{ fontSize: "15px" }}>{v}%</b>
                <span className="stat-delta" style={{ fontSize: "11px" }}>{delta}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="spread" style={{ marginBottom: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 550 }}>Mock scores</h3>
            <Badge tone="accent">Avg 8.2 / 10</Badge>
          </div>
          {mocks.map(([t, s, d, dir], i) => (
            <div className="spread" key={i} style={{ padding: "12px 0", borderBottom: i < mocks.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 550 }}>{t}</div>
                <div className="dim" style={{ fontSize: "11.5px", marginTop: "1px" }}>{d}</div>
              </div>
              <div className="row" style={{ gap: "8px" }}>
                <b className="serif-num" style={{ fontSize: "17px", color: "var(--accent)" }}>{s}</b>
                <span style={{ color: dir === "up" ? "var(--success)" : "var(--text-3)" }}>{dir === "up" ? <I.TrendUp size={14} /> : <I.Activity size={14} />}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="surface" style={{ padding: "20px 22px" }}>
        <div className="row" style={{ gap: "10px", alignItems: "flex-start" }}>
          <span style={{ color: "var(--accent)", marginTop: "1px" }}><I.Bulb size={17} /></span>
          <div>
            <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "3px" }}>Copilot read on your trajectory</div>
            <p className="muted" style={{ fontSize: "13px", lineHeight: 1.55 }}>
              Behavioral is locked. System design climbed 12% this week but still trails your target — the streaming gap is the lever. Two more ledger mocks should clear 85% before Saturday.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Progress = Progress;
