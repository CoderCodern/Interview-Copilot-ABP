/* ResumeAnalysis — parsed resume: extracted skills, experience,
   and a career profile summary with a strength readout. */
const { Tag, Badge, Meter, Button, Tabs, Avatar } = window.InterviewCopilotDesignSystem_d59c8c || {};

function ResumeAnalysis() {
  const I = window.ICIcons;
  const [tab, setTab] = React.useState("skills");
  const skills = [
    [".NET / C#", "matched"], ["PostgreSQL", "matched"], ["Distributed systems", "matched"],
    ["REST APIs", "matched"], ["Event-driven", "matched"], ["Domain-driven design", "accent"],
    ["Kafka", "gap"], ["Kubernetes", "gap"], ["gRPC", "neutral"], ["Redis", "neutral"],
    ["CI/CD", "neutral"], ["xUnit", "neutral"],
  ];
  const experience = [
    { role: "Senior Backend Engineer", co: "Ledgerline", time: "2022 — Present", note: "Led billing platform migration; 40k req/min zero-downtime cutover." },
    { role: "Backend Engineer", co: "Northwind Pay", time: "2019 — 2022", note: "Built idempotent payments API and double-entry ledger service." },
    { role: "Software Engineer", co: "Cobalt Systems", time: "2017 — 2019", note: "Internal tooling, event pipelines, observability." },
  ];

  return (
    <div className="two-col">
      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="spread" style={{ marginBottom: "16px" }}>
            <div className="row">
              <div className="card-icon" style={{ width: 40, height: 40 }}><I.Doc size={19} /></div>
              <div>
                <div className="serif-h" style={{ fontSize: "17px" }}>Coder_Codern_Resume_v3.pdf</div>
                <div className="dim" style={{ fontSize: "12px", marginTop: "2px" }}>Uploaded 2 days ago · version 3 · 2 pages</div>
              </div>
            </div>
            <Badge tone="success"><I.Check size={10} stroke={3} /> Parsed</Badge>
          </div>
          <Tabs value={tab} onChange={setTab} items={[
            { id: "skills", label: "Skills", count: 12 },
            { id: "experience", label: "Experience", count: 3 },
            { id: "education", label: "Education" },
          ]} />
          <div style={{ paddingTop: "20px" }}>
            {tab === "skills" && (
              <>
                <div className="dim" style={{ fontSize: "12px", marginBottom: "12px" }}>Extracted and matched against your target role · Senior Backend Engineer</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skills.map(([s, tone], i) => <Tag key={i} tone={tone}>{s}</Tag>)}
                </div>
              </>
            )}
            {tab === "experience" && (
              <div className="stack" style={{ gap: "2px" }}>
                {experience.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 3, borderRadius: 3, background: "var(--accent)", flexShrink: 0 }} />
                    <div>
                      <div className="spread"><div style={{ fontWeight: 600, fontSize: "14px" }}>{e.role}</div></div>
                      <div className="muted" style={{ fontSize: "12.5px", marginTop: "1px" }}>{e.co} · {e.time}</div>
                      <div className="dim" style={{ fontSize: "12.5px", marginTop: "6px", lineHeight: 1.5 }}>{e.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "education" && (
              <div className="row" style={{ gap: "14px", padding: "6px 0" }}>
                <div className="card-icon" style={{ width: 40, height: 40 }}><I.Building size={18} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>B.Sc. Computer Science</div>
                  <div className="muted" style={{ fontSize: "12.5px", marginTop: "2px" }}>State University · 2013 — 2017</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="eyebrow" style={{ marginBottom: "8px" }}>Career profile</div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "16px", lineHeight: 1.45, color: "var(--text)" }}>
            A payments-focused backend engineer with deep experience in ledgers, idempotency and zero-downtime migrations.
          </p>
          <div style={{ marginTop: "18px" }}>
            {[["Profile strength", 84], ["Role alignment", 76], ["Keyword coverage", 68]].map(([l, v]) => (
              <div key={l} style={{ marginBottom: "12px" }}>
                <div className="spread" style={{ marginBottom: "6px" }}>
                  <span style={{ fontSize: "12.5px", color: "var(--text-2)" }}>{l}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)" }}>{v}%</span>
                </div>
                <Meter value={v} />
              </div>
            ))}
          </div>
        </div>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="row" style={{ gap: "10px", marginBottom: "10px" }}>
            <I.Sparkle size={16} />
            <span style={{ fontWeight: 600, fontSize: "13.5px" }}>Suggested improvements</span>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Add a metric to the Cobalt Systems role", "Surface Kafka/streaming exposure if any", "Tighten the summary to 2 lines"].map((s, i) => (
              <li key={i} className="row" style={{ gap: "10px", alignItems: "flex-start", fontSize: "12.5px", color: "var(--text-2)" }}>
                <span style={{ color: "var(--accent)", marginTop: "2px" }}><I.Arrow size={13} /></span>{s}
              </li>
            ))}
          </ul>
          <Button variant="subtle" size="sm" style={{ marginTop: "16px" }} iconLeft={<I.Sparkle size={13} />}>Rewrite with AI</Button>
        </div>
      </div>
    </div>
  );
}

window.ResumeAnalysis = ResumeAnalysis;
