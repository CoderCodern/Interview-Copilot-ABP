/* Knowledge — the question bank & notebook. A searchable bank of
   practice questions with confidence tracking and spaced-repetition,
   plus saved notes. A new surface in the product. */
const { Badge, Tag, Button, Tabs, Input, IconButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

function Conf({ n }) {
  return <span className="conf">{[0, 1, 2].map((i) => <i key={i} className={i < n ? "on" : ""} />)}</span>;
}

function Knowledge() {
  const I = window.ICIcons;
  const [tab, setTab] = React.useState("bank");
  const [q, setQ] = React.useState("");
  const cats = ["All", "System design", "Coding", "Behavioral", "Payments"];
  const [cat, setCat] = React.useState("All");
  const questions = [
    { q: "Design a payments ledger that stays correct under retries", c: "System design", conf: 2, meta: "Reviewed today · double-entry, idempotency" },
    { q: "How do idempotency keys prevent double-charges?", c: "Payments", conf: 3, meta: "Strong · client keys, dedup window" },
    { q: "Walk through a STAR story about a difficult migration", c: "Behavioral", conf: 3, meta: "Rehearsed · billing service cutover" },
    { q: "Implement an LRU cache with O(1) operations", c: "Coding", conf: 2, meta: "Due for review · hashmap + DLL" },
    { q: "Design a rate limiter for a public API", c: "System design", conf: 1, meta: "Shaky · token bucket vs. sliding window" },
    { q: "Explain exactly-once vs. at-least-once delivery", c: "System design", conf: 1, meta: "Gap · tied to Kafka prep" },
    { q: "Tell me about a time you disagreed with your manager", c: "Behavioral", conf: 2, meta: "Drafted · needs a tighter result" },
  ];
  const notes = [
    { t: "Idempotency keys — retry semantics", ex: "Client-generated keys, server-side dedup window, partial-failure handling…", m: "System design · edited today", done: true },
    { t: "Double-entry ledger invariants", ex: "Debits = credits per transaction. Never mutate, only append…", m: "Payments · draft", done: false },
    { t: "STAR: migrating the billing service", ex: "Situation: 40k req/min legacy. Task: zero-downtime cutover…", m: "Behavioral · rehearsed", done: true },
  ];
  const filtered = questions.filter((x) => (cat === "All" || x.c === cat) && x.q.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="two-col">
      <div className="stack">
        <div className="surface" style={{ padding: "18px 22px" }}>
          <Tabs value={tab} onChange={setTab} items={[
            { id: "bank", label: "Question bank", count: questions.length },
            { id: "notes", label: "Notes", count: notes.length },
            { id: "cards", label: "Flashcards" },
          ]} />
          {tab === "bank" && (
            <div style={{ paddingTop: "18px" }}>
              <div className="spread" style={{ gap: "12px", marginBottom: "14px" }}>
                <Input icon={<I.Search size={14} />} placeholder="Search questions…" value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1 }} />
                <Button variant="secondary" size="sm" iconLeft={<I.Plus size={13} />}>Add</Button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "6px" }}>
                {cats.map((c) => (
                  <button key={c} onClick={() => setCat(c)} className="pill" style={cat === c ? { background: "var(--accent-soft)", borderColor: "var(--accent-ring)", color: "var(--accent-deep)" } : {}}>{c}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {tab === "bank" && (
          <div className="surface" style={{ overflow: "hidden" }}>
            {filtered.map((x, i) => (
              <div className="kn-row" key={i}>
                <div className="kn-mark"><I.Book size={14} /></div>
                <div>
                  <div className="kn-q">{x.q}</div>
                  <div className="kn-sub">{x.meta}</div>
                </div>
                <div className="row" style={{ gap: "12px" }}>
                  <span className="dim" style={{ fontSize: "11px" }}>{x.c}</span>
                  <Conf n={x.conf} />
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div style={{ padding: "32px", textAlign: "center" }} className="dim">No questions match.</div>}
          </div>
        )}

        {tab === "notes" && (
          <div className="surface" style={{ overflow: "hidden" }}>
            {notes.map((n, i) => (
              <div className="note" key={i} style={{ padding: "16px 20px" }}>
                <div className="note-title"><span className={"note-check" + (n.done ? "" : " open")}>{n.done && <I.Check size={9} stroke={3} />}</span>{n.t}</div>
                <div className="note-excerpt">{n.ex}</div>
                <div className="note-meta">{n.m}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "cards" && (
          <div className="surface" style={{ padding: "40px 24px", textAlign: "center" }}>
            <div className="dz-ico" style={{ margin: "0 auto 14px" }}><I.Layers size={22} /></div>
            <div className="serif-h" style={{ fontSize: "18px", marginBottom: "6px" }}>5 cards due for review</div>
            <p className="muted" style={{ fontSize: "13px", maxWidth: "34ch", margin: "0 auto 16px", lineHeight: 1.55 }}>Spaced-repetition flips your shaky questions back up at the right moment.</p>
            <Button variant="primary" size="sm" iconRight={<I.Arrow size={13} />}>Start review</Button>
          </div>
        )}
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="eyebrow" style={{ marginBottom: "14px" }}>Review status</div>
          <div className="grid-2" style={{ gap: "10px" }}>
            {[["Strong", 12, "var(--success)"], ["Steady", 9, "var(--accent)"], ["Shaky", 5, "var(--warning)"], ["Gaps", 3, "var(--danger)"]].map(([k, v, c]) => (
              <div key={k} style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px 14px" }}>
                <div className="serif-num" style={{ fontSize: "22px", color: c }}>{v}</div>
                <div className="dim" style={{ fontSize: "11.5px", marginTop: "1px" }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="row" style={{ gap: "10px", marginBottom: "10px" }}>
            <span style={{ color: "var(--accent)" }}><I.Clock size={16} /></span>
            <span style={{ fontWeight: 600, fontSize: "13.5px" }}>Due today</span>
          </div>
          <ul className="dash-list">
            {["Rate limiter design — token bucket", "Exactly-once delivery semantics", "LRU cache implementation"].map((s, i) => (
              <li key={i}><span className="b"><I.Bookmark size={12} /></span>{s}</li>
            ))}
          </ul>
          <Button variant="subtle" size="sm" fullWidth style={{ marginTop: "16px" }} iconLeft={<I.Sparkle size={13} />}>Quiz me on these</Button>
        </div>
      </div>
    </div>
  );
}

window.Knowledge = Knowledge;
