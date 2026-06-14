/* Overview — the admin home. Operational health hero, KPI row,
   live AI traffic, cost split, model status, queue + incidents. */
const { Button, Badge } = window.InterviewCopilotDesignSystem_d59c8c || {};

function AdminOverview({ onNavigate }) {
  const I = window.ICIcons;

  const kpis = [
    { ic: "Activity", label: "AI requests · today", value: <>48.2<small>k</small></>, delta: "+12.4%", dir: "up", spark: [5,6,5,7,8,7,9,8,10,11,10,12] },
    { ic: "Dollar", label: "AI spend · today", value: <><small>$</small>312</>, delta: "+6.1%", dir: "up", spark: [6,5,7,6,8,7,8,9,8,10,9,11] },
    { ic: "Users", label: "Active users · 24h", value: <>3,914</>, delta: "+248", dir: "up", spark: [4,5,5,6,6,7,7,6,8,8,9,9] },
    { ic: "Gauge", label: "p95 latency", value: <>1.8<small>s</small></>, delta: "−0.3s", dir: "up", spark: [9,8,9,7,8,6,7,6,5,6,5,5] },
  ];

  const models = [
    { logo: "claude", k: "C", name: "Claude Sonnet 4.5", share: 64, status: "ok", note: "Primary · 5 tasks" },
    { logo: "openai", k: "G", name: "GPT-5 Vision", share: 21, status: "ok", note: "OCR · vision" },
    { logo: "gemini", k: "G", name: "Gemini 2.5 Pro", share: 15, status: "warn", note: "Elevated latency" },
  ];

  const queue = [
    { ic: "Doc", title: "Resume parse · batch", sub: "1,204 documents", meta: "running", tone: "sp-ok" },
    { ic: "Briefcase", title: "JD skill-gap recompute", sub: "Nightly · 380 jobs", meta: "queued", tone: "sp-neutral" },
    { ic: "Mic", title: "Mock transcript scoring", sub: "62 sessions", meta: "running", tone: "sp-ok" },
    { ic: "Book", title: "Knowledge re-embed", sub: "Vector refresh", meta: "retry 2/3", tone: "sp-warn" },
  ];

  const incidents = [
    { dot: "sd-warn", title: "Gemini 2.5 Pro latency above SLO", meta: "p95 4.1s · 18 min ago", tag: "Investigating", tone: "sp-warn" },
    { dot: "sd-ok", title: "Storage failover completed", meta: "eu-west bucket · 2h ago", tag: "Resolved", tone: "sp-ok" },
    { dot: "sd-down", title: "OpenAI rate-limit spike", meta: "429s on OCR route · 5h ago", tag: "Resolved", tone: "sp-ok" },
  ];

  return (
    <>
      <section className="hero" style={{ marginBottom: 24 }}>
        <div className="hero-left">
          <span className="hero-tag"><I.Sparkle size={12} /> Platform status</span>
          <h2>All systems are <em>operating normally</em></h2>
          <p className="lede">Six background workers are healthy, AI spend is tracking 4% under the daily budget, and one provider needs a look — Gemini latency has drifted above target.</p>
          <div className="hero-actions">
            <Button variant="primary" iconRight={<I.Arrow size={13} />} onClick={() => onNavigate("health")}>Open system health</Button>
            <Button variant="ghost" onClick={() => onNavigate("ai-cost")}>Cost breakdown</Button>
          </div>
        </div>
        <div className="hero-right" style={{ alignItems: "stretch", justifyContent: "flex-start", padding: 22, gap: 14 }}>
          <div className="usebar-label" style={{ marginBottom: 2 }}><span style={{ fontWeight: 600, color: "var(--text-2)" }}>Daily AI budget</span><span>$312 / $360</span></div>
          <div className="usebar-track" style={{ height: 9 }}><div className="usebar-fill" style={{ width: "86%" }} /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
            {models.map((m) => (
              <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={"badge-logo route-mini " + m.logo}>{m.k}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
                </div>
                <span className={"stat-dot " + ("sd-" + (m.status === "ok" ? "ok" : "warn"))} />
                <span style={{ fontSize: 11.5, color: "var(--text-2)", fontVariantNumeric: "tabular-nums", minWidth: 30, textAlign: "right" }}>{m.share}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kpi-row">
        {kpis.map((k) => {
          const Ic = I[k.ic];
          const mx = Math.max(...k.spark);
          return (
            <div className="kpi" key={k.label}>
              <div className="kpi-top">
                <div className="kpi-ic"><Ic size={17} /></div>
                <span className={"kpi-delta " + k.dir}><I.TrendUp size={12} /> {k.delta}</span>
              </div>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value">{k.value}</div>
              <div className="spark">
                {k.spark.map((v, i) => <i key={i} className={v >= mx - 1 ? "hi" : ""} style={{ height: (v / mx * 100) + "%" }} />)}
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid-12 section-gap">
        <div className="acard">
          <div className="acard-head">
            <h3>AI request volume</h3>
            <div className="legend">
              <span><i style={{ background: "var(--accent)" }} /> Chat &amp; coaching</span>
              <span><i style={{ background: "color-mix(in srgb, var(--accent) 55%, var(--surface))" }} /> Analysis</span>
              <span><i style={{ background: "var(--info)", opacity: 0.7 }} /> Vision / OCR</span>
            </div>
          </div>
          <div className="acard-body">
            <div className="bars">
              {[[34,22,8],[40,26,10],[30,20,7],[46,30,12],[52,28,14],[38,24,9],[44,32,11],[58,30,16],[50,34,13],[62,30,18],[56,36,15],[68,34,20]].map((s, i) => {
                const total = s[0] + s[1] + s[2]; const h = total;
                return (
                  <div className="col" key={i}>
                    <div className="stack" style={{ height: (h / 122 * 100) + "%" }}>
                      <div className="seg c" style={{ height: (s[2] / total * 100) + "%" }} />
                      <div className="seg b" style={{ height: (s[1] / total * 100) + "%" }} />
                      <div className="seg a" style={{ height: (s[0] / total * 100) + "%" }} />
                    </div>
                    <span className="x">{["00","02","04","06","08","10","12","14","16","18","20","22"][i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="acard">
          <div className="acard-head"><h3>Background jobs</h3><a className="hint" style={{ cursor: "pointer", color: "var(--text-2)" }} onClick={() => onNavigate("jobs")}>View all →</a></div>
          {queue.map((q) => {
            const Ic = I[q.ic];
            return (
              <div className="lrow" key={q.title}>
                <div className="lrow-ic"><Ic size={16} /></div>
                <div className="lrow-main">
                  <div className="lrow-title">{q.title}</div>
                  <div className="lrow-sub">{q.sub}</div>
                </div>
                <span className={"status-pill " + q.tone}>{q.meta}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2">
        <div className="acard">
          <div className="acard-head"><h3>Recent incidents</h3><span className="hint">Last 24 hours</span></div>
          {incidents.map((it) => (
            <div className="lrow" key={it.title}>
              <span className={"stat-dot " + it.dot} style={{ marginLeft: 4, marginRight: 4 }} />
              <div className="lrow-main">
                <div className="lrow-title">{it.title}</div>
                <div className="lrow-sub">{it.meta}</div>
              </div>
              <span className={"status-pill " + it.tone}>{it.tag}</span>
            </div>
          ))}
        </div>

        <div className="acard">
          <div className="acard-head"><h3>Today's spend by surface</h3><span className="hint">$312 total</span></div>
          <div className="acard-body" style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {[
              ["AI Assistant (chat)", 128, 41],
              ["Mock interview scoring", 74, 24],
              ["Resume & JD analysis", 61, 20],
              ["Company research", 31, 10],
              ["Vision / OCR", 18, 5],
            ].map(([name, dollars, pct]) => (
              <div key={name} className="bar-cell" style={{ gap: 12 }}>
                <span style={{ fontSize: 12.5, color: "var(--text)", minWidth: 168 }}>{name}</span>
                <div className="track"><div className="fill" style={{ width: pct + "%" }} /></div>
                <span className="n" style={{ minWidth: 44, fontWeight: 600 }}>${dollars}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="foot-quote">"Slow is smooth, smooth is fast." — keep the platform calm and observable.</p>
    </>
  );
}

window.AdminOverview = AdminOverview;
