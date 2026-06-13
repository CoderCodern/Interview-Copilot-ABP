/* JobAnalysis — a parsed job description: extracted requirements in a
   table with per-requirement match status, plus an overall skill-gap
   match score. */
const { Badge, Meter, Button, ReadinessRing, Tag } = window.InterviewCopilotDesignSystem_d59c8c || {};

function JobAnalysis() {
  const I = window.ICIcons;
  const reqs = [
    ["5+ years backend, distributed systems", "Core", "matched"],
    ["Payments / ledger domain experience", "Core", "matched"],
    ["Strong in C# or Java", "Core", "matched"],
    ["Event streaming (Kafka / Kinesis)", "Important", "gap"],
    ["Kubernetes & container orchestration", "Important", "partial"],
    ["gRPC service design", "Nice to have", "partial"],
    ["Mentoring / tech leadership", "Important", "matched"],
  ];
  const statusMap = {
    matched: ["Matched", "success"],
    partial: ["Partial", "warning"],
    gap: ["Gap", "danger"],
  };

  return (
    <div className="two-col">
      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="spread" style={{ marginBottom: "4px" }}>
            <div>
              <div className="serif-h" style={{ fontSize: "18px" }}>Senior Backend Engineer, Payments</div>
              <div className="muted" style={{ fontSize: "12.5px", marginTop: "3px" }}>Stripe · San Francisco / Remote · Full-time</div>
            </div>
            <Badge tone="success"><I.Check size={10} stroke={3} /> Analyzed</Badge>
          </div>
        </div>

        <div className="surface" style={{ overflow: "hidden" }}>
          <div className="panel-head"><h3 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 550 }}>Extracted requirements</h3><span className="hint">7 found</span></div>
          <table className="tbl">
            <thead><tr><th>Requirement</th><th style={{ width: "110px" }}>Priority</th><th style={{ width: "110px" }}>Match</th></tr></thead>
            <tbody>
              {reqs.map(([r, prio, st], i) => (
                <tr key={i}>
                  <td>{r}</td>
                  <td><span className="dim">{prio}</span></td>
                  <td><Badge tone={statusMap[st][1]}>{statusMap[st][0]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "22px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="eyebrow" style={{ alignSelf: "flex-start", marginBottom: "14px" }}>Skill-gap match</div>
          <ReadinessRing value={78} label="Match" caption={<>Strong fit — close <b style={{ color: "var(--text)" }}>2 gaps</b> to reach 90%+</>} />
        </div>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "12px" }}>Gaps to close</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            <Tag tone="gap">Kafka</Tag><Tag tone="gap">Kubernetes</Tag><Tag tone="neutral">gRPC</Tag>
          </div>
          <Button variant="primary" size="sm" fullWidth iconRight={<I.Arrow size={13} />}>Generate prep plan</Button>
        </div>
      </div>
    </div>
  );
}

window.JobAnalysis = JobAnalysis;
