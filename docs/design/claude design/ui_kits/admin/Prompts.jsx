/* Prompt Management — GitHub × Notion × Claude. Prompt list, a
   versioned editor with draft/published state, rollback rail, test panel. */
const { Button: PButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

function AdminPrompts() {
  const I = window.ICIcons;

  const prompts = [
    { id: "resume", name: "Resume analyzer", meta: "v12 · published", status: "ok" },
    { id: "jd", name: "JD skill-gap", meta: "v8 · published", status: "ok" },
    { id: "mock", name: "Mock interviewer", meta: "v21 · draft", status: "draft" },
    { id: "coach", name: "Answer coach", meta: "v6 · published", status: "ok" },
    { id: "research", name: "Company brief", meta: "v4 · published", status: "ok" },
    { id: "kbgen", name: "Question generator", meta: "v9 · published", status: "ok" },
  ];

  const [sel, setSel] = React.useState("mock");
  const [tab, setTab] = React.useState("editor");
  const cur = prompts.find((p) => p.id === sel);

  const versions = [
    { v: "v21", note: "Tighten scoring rubric to 1–10 with anchors", time: "Draft · edited 12m ago by Dana", cur: true, draft: true },
    { v: "v20", note: "Add follow-up probing for vague answers", time: "Published · 3 days ago by Dana", cur: false },
    { v: "v19", note: "Reduce verbosity in feedback summary", time: "Published · 1 week ago by Mateo", cur: false },
    { v: "v18", note: "Initial STAR-aware behavioral mode", time: "Published · 2 weeks ago by Dana", cur: false },
  ];

  return (
    <div className="prompt-layout">
      <div className="prompt-list">
        <div className="acard-head" style={{ padding: "14px 16px" }}>
          <h3 style={{ fontSize: 15 }}>Prompts</h3>
          <span className="icon-btn-bare" style={{ width: 28, height: 28 }}><I.Plus size={15} /></span>
        </div>
        {prompts.map((p) => (
          <div key={p.id} className={"prompt-list-item" + (p.id === sel ? " active" : "")} onClick={() => setSel(p.id)}>
            <div className="prompt-li-name">
              {p.name}
              {p.status === "draft" && <span className="status-pill sp-warn" style={{ padding: "2px 8px", fontSize: 10.5 }}>Draft</span>}
            </div>
            <div className="prompt-li-meta">{p.meta}</div>
          </div>
        ))}
      </div>

      <div className="editor-card">
        <div className="editor-head">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600 }}>{cur.name}</h3>
              {cur.status === "draft"
                ? <span className="status-pill sp-warn">Unpublished draft</span>
                : <span className="status-pill sp-ok"><span className="stat-dot sd-ok" /> Published</span>}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>Used by Mock Interview · routes to Claude Sonnet 4.5</div>
          </div>
          <div className="editor-tabs">
            {["editor", "test", "diff"].map((t) => (
              <span key={t} className={"editor-tab" + (t === tab ? " active" : "")} onClick={() => setTab(t)}>
                {t === "editor" ? "Editor" : t === "test" ? "Test" : "Diff"}
              </span>
            ))}
          </div>
        </div>

        {tab === "editor" && (
          <>
            <div className="code-area">
              <span className="tok-com"># System · Mock interviewer (v21 draft)</span>{"\n\n"}
              <span className="tok-sys">You are</span> a senior interviewer for the role of <span className="tok-var">{"{{role}}"}</span> at{" "}
              <span className="tok-var">{"{{company}}"}</span>. Conduct a focused, realistic interview.{"\n\n"}
              <span className="tok-sys">Context</span>{"\n"}
              · Candidate resume summary: <span className="tok-var">{"{{resume_summary}}"}</span>{"\n"}
              · Target competencies: <span className="tok-var">{"{{skill_gaps}}"}</span>{"\n\n"}
              <span className="tok-sys">Rules</span>{"\n"}
              1. Ask one question at a time. Probe vague answers once.{"\n"}
              2. Score each answer 1–10 against the rubric anchors.{"\n"}
              3. Keep feedback concise — two strengths, one fix.{"\n\n"}
              <span className="tok-sys">Output</span> JSON: <span className="tok-var">{"{ question, score, rationale, follow_up }"}</span>
            </div>
            <div className="acard-foot">
              <div style={{ display: "flex", gap: 8 }}>
                <PButton variant="ghost" size="sm" iconLeft={<I.History size={13} />}>Rollback to v20</PButton>
                <PButton variant="ghost" size="sm">Save draft</PButton>
              </div>
              <PButton variant="primary" size="sm" iconRight={<I.Arrow size={13} />}>Publish v21</PButton>
            </div>
          </>
        )}

        {tab === "test" && (
          <div className="acard-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 12, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 }}>Sample input</div>
            <div className="code-area" style={{ minHeight: 0, padding: "14px 16px", borderRadius: 10, border: "1px solid var(--border)" }}>
              role = "Senior Backend Engineer"{"\n"}company = "Stripe"{"\n"}skill_gaps = ["idempotency", "ledger design"]
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <PButton variant="primary" size="sm" iconLeft={<I.Play size={12} />}>Run test</PButton>
              <PButton variant="ghost" size="sm">Compare v20 ↔ v21</PButton>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600, marginTop: 4 }}>Model output</div>
            <div className="msg ai" style={{ maxWidth: "100%" }}>
              <div className="msg-avatar"><span style={{ fontStyle: "italic" }}>ic</span></div>
              <div className="msg-bubble">
                <div className="label">Claude Sonnet 4.5 · 1.4s · 612 tokens</div>
                "Let's start with idempotency. You're processing a payment retry — how do you guarantee the charge happens exactly once?" <br /><br />
                <span style={{ color: "var(--text-3)" }}>score: pending · rubric: ledger-design/idempotency</span>
              </div>
            </div>
          </div>
        )}

        {tab === "diff" && (
          <div className="version-rail">
            {versions.map((v, i) => (
              <div className="version-item" key={v.v}>
                <div className={"version-node" + (v.cur ? " cur" : "")}>
                  <span className="ring" />
                  {i < versions.length - 1 && <span className="line" />}
                </div>
                <div className="version-meta">
                  <div className="version-v">
                    {v.v}
                    {v.draft
                      ? <span className="status-pill sp-warn" style={{ padding: "2px 8px", fontSize: 10.5 }}>Draft</span>
                      : <span className="status-pill sp-ok" style={{ padding: "2px 8px", fontSize: 10.5 }}>Published</span>}
                  </div>
                  <div className="version-note">{v.note}</div>
                  <div className="version-time">{v.time}</div>
                </div>
                {!v.cur && <PButton variant="ghost" size="sm" iconLeft={<I.History size={12} />}>Restore</PButton>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

window.AdminPrompts = AdminPrompts;
