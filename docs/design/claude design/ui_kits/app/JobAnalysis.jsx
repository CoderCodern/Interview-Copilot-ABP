/* JobAnalysis — the JD → skill-gap flow (the product's core analysis).
   A parsed job description with three switchable analysis views:
   · Match map   — requirement cards with resume evidence + match bars
   · Requirements — the compact priority/match table
   · Coverage    — skill-area coverage bars, grouped by competency
   The right rail (score ring, gaps, generate-plan CTA) is constant. */
const { Badge, Meter, Button, ReadinessRing, Tag, IconButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

const JD_REQS = [
  { name: "5+ years backend, distributed systems", prio: "Core", st: "matched", score: 95, ev: "8 yrs across Ledgerline & Northwind Pay" },
  { name: "Payments / ledger domain experience", prio: "Core", st: "matched", score: 92, ev: "Built a double-entry ledger at Northwind Pay" },
  { name: "Strong in C# / .NET or Java", prio: "Core", st: "matched", score: 90, ev: ".NET / C# primary stack for 6 years" },
  { name: "Event streaming (Kafka / Kinesis)", prio: "Important", st: "gap", score: 28, ev: "No production Kafka; event pipelines at Cobalt" },
  { name: "Kubernetes & container orchestration", prio: "Important", st: "partial", score: 54, ev: "Docker in CI; limited k8s in production" },
  { name: "gRPC service design", prio: "Nice to have", st: "partial", score: 48, ev: "REST-first; some gRPC prototyping" },
  { name: "Mentoring / tech leadership", prio: "Important", st: "matched", score: 88, ev: "Led the billing-migration team of 5" },
];
const JD_COVERAGE = [
  ["Backend & systems", 94, "matched"],
  ["Payments domain", 91, "matched"],
  ["Languages · .NET/C#", 90, "matched"],
  ["Leadership & mentoring", 88, "matched"],
  ["Infra & orchestration", 52, "partial"],
  ["Streaming & messaging", 34, "gap"],
];
const ST_MAP = {
  matched: ["Matched", "success"],
  partial: ["Partial", "warning"],
  gap: ["Gap", "danger"],
};
const fillFor = (st) => st === "matched" ? "var(--success)" : st === "partial" ? "var(--warning)" : "var(--danger)";

function JobAnalysis({ onNavigate, initialView }) {
  const I = window.ICIcons;
  const [view, setView] = React.useState(initialView || "map");

  const Aside = (
    <div className="stack">
      <div className="surface" style={{ padding: "22px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="eyebrow" style={{ alignSelf: "flex-start", marginBottom: "14px" }}>Skill-gap match</div>
        <ReadinessRing value={78} label="Match" caption={<>Strong fit — close <b style={{ color: "var(--text)" }}>2 gaps</b> to reach 90%+</>} />
        <div className="grid-2" style={{ width: "100%", marginTop: "20px", gap: "10px" }}>
          {[["Matched", 4, "var(--success)"], ["Partial", 2, "var(--warning)"], ["Gaps", 1, "var(--danger)"], ["Weighted", "78%", "var(--accent)"]].map(([k, v, c]) => (
            <div key={k} style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 12px" }}>
              <div className="serif-num" style={{ fontSize: "20px", color: c }}>{v}</div>
              <div className="dim" style={{ fontSize: "11px", marginTop: "1px" }}>{k}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="surface" style={{ padding: "18px 22px" }}>
        <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "12px" }}>Gaps to close</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
          <Tag tone="gap">Kafka</Tag><Tag tone="gap">Kubernetes</Tag><Tag tone="neutral">gRPC</Tag>
        </div>
        <p className="dim" style={{ fontSize: "12px", lineHeight: 1.55, marginBottom: "16px" }}>
          A 14-day plan can lift streaming and orchestration to a confident pass before your on-site.
        </p>
        <Button variant="primary" size="sm" fullWidth iconRight={<I.Arrow size={13} />} onClick={() => onNavigate && onNavigate("plan")}>Generate prep plan</Button>
        <Button variant="ghost" size="sm" fullWidth style={{ marginTop: "8px" }} iconLeft={<I.Sparkle size={13} />} onClick={() => onNavigate && onNavigate("assistant")}>Ask the Copilot to explain</Button>
      </div>
    </div>
  );

  return (
    <>
      {/* JD source header */}
      <div className="surface" style={{ padding: "18px 22px", marginBottom: "16px" }}>
        <div className="spread">
          <div className="row" style={{ gap: "14px" }}>
            <div className="card-icon" style={{ width: 42, height: 42 }}><I.Briefcase size={19} /></div>
            <div>
              <div className="serif-h" style={{ fontSize: "18px" }}>Senior Backend Engineer, Payments</div>
              <div className="muted" style={{ fontSize: "12.5px", marginTop: "2px" }}>Stripe · San Francisco / Remote · Full-time · pasted 2 days ago</div>
            </div>
          </div>
          <div className="row" style={{ gap: "10px" }}>
            <Badge tone="success"><I.Check size={10} stroke={3} /> Analyzed</Badge>
            <IconButton label="View job description" variant="outline" size="sm"><I.Doc size={15} /></IconButton>
            <IconButton label="Re-analyze" variant="outline" size="sm"><I.Sparkle size={15} /></IconButton>
          </div>
        </div>
      </div>

      {/* View switcher */}
      <div className="spread" style={{ marginBottom: "16px" }}>
        <div className="seg">
          <button data-on={view === "map"} onClick={() => setView("map")}><I.Layers size={14} /> Match map</button>
          <button data-on={view === "table"} onClick={() => setView("table")}><I.Doc size={14} /> Requirements</button>
          <button data-on={view === "coverage"} onClick={() => setView("coverage")}><I.Chart size={14} /> Coverage</button>
        </div>
        <span className="dim" style={{ fontSize: "12px" }}>7 requirements extracted · matched against resume v3</span>
      </div>

      <div className="two-col">
        <div className="stack">
          {view === "map" && (
            <div className="surface" style={{ overflow: "hidden" }}>
              <div className="panel-head"><h3 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 550 }}>Requirement match map</h3><span className="hint">resume evidence per line</span></div>
              {JD_REQS.map((r, i) => (
                <div className="req-card" key={i}>
                  <div>
                    <div className="row" style={{ gap: "9px" }}>
                      <span className={"match-dot " + r.st} />
                      <span className="req-name">{r.name}</span>
                      <span className="dim" style={{ fontSize: "11px" }}>· {r.prio}</span>
                    </div>
                    <div className="req-evidence">{r.ev}</div>
                  </div>
                  <div className="req-score">
                    <Meter value={r.score} tone={r.st === "matched" ? "success" : r.st === "partial" ? "warning" : "danger"} className="req-bar" style={{ width: "86px" }} />
                    <Badge tone={ST_MAP[r.st][1]}>{ST_MAP[r.st][0]}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "table" && (
            <div className="surface" style={{ overflow: "hidden" }}>
              <div className="panel-head"><h3 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 550 }}>Extracted requirements</h3><span className="hint">7 found</span></div>
              <table className="tbl">
                <thead><tr><th>Requirement</th><th style={{ width: "120px" }}>Priority</th><th style={{ width: "100px" }}>Match</th></tr></thead>
                <tbody>
                  {JD_REQS.map((r, i) => (
                    <tr key={i}>
                      <td>{r.name}</td>
                      <td><span className="dim">{r.prio}</span></td>
                      <td><Badge tone={ST_MAP[r.st][1]}>{ST_MAP[r.st][0]}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "coverage" && (
            <div className="surface" style={{ padding: "20px 22px" }}>
              <div className="spread" style={{ marginBottom: "18px" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 550 }}>Coverage by competency</h3>
                <span className="hint dim" style={{ fontSize: "11.5px" }}>weighted by JD emphasis</span>
              </div>
              {JD_COVERAGE.map(([label, pct, st], i) => (
                <div className="cov-row" key={i}>
                  <span className="cov-label">{label}</span>
                  <div className="cov-track"><div className="cov-fill" style={{ width: pct + "%", background: fillFor(st) }} /></div>
                  <span className="cov-pct" style={{ color: fillFor(st) }}>{pct}%</span>
                </div>
              ))}
              <div className="divider" style={{ margin: "16px 0" }} />
              <div className="row" style={{ gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", marginTop: "1px" }}><I.Bulb size={16} /></span>
                <p className="muted" style={{ fontSize: "12.5px", lineHeight: 1.55 }}>
                  Two competencies sit below the 60% bar Stripe weights heavily — <b style={{ color: "var(--text)" }}>streaming</b> and <b style={{ color: "var(--text)" }}>orchestration</b>. Everything else is interview-ready.
                </p>
              </div>
            </div>
          )}
        </div>
        {Aside}
      </div>
    </>
  );
}

window.JobAnalysis = JobAnalysis;
