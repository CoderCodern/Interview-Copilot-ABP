/* AI Usage — operational table (user, model, tokens, cost, latency)
   with summary tiles and a filter bar. Readable, calm, data-forward. */
const { Button: UButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

function AdminAIUsage() {
  const I = window.ICIcons;
  const [range, setRange] = React.useState("24h");

  const tiles = [
    { ic: "Activity", label: "Requests", value: "48,210", sub: "across 5 task types" },
    { ic: "Zap", label: "Tokens", value: "182.4M", sub: "in 41.6M · out 140.8M" },
    { ic: "Dollar", label: "Spend", value: "$312.40", sub: "avg $0.0065 / req" },
    { ic: "Gauge", label: "p95 latency", value: "1.8s", sub: "p50 0.9s" },
  ];

  const rows = [
    ["AK", "amelia.k", "claude", "Claude Sonnet 4.5", "Mock Interview", "14,820", "$0.42", "1.6s", "sp-ok", "200"],
    ["RT", "raj.t", "openai", "GPT-5 Vision", "Image OCR", "3,210", "$0.06", "2.1s", "sp-ok", "200"],
    ["DS", "dana.s", "claude", "Claude Sonnet 4.5", "Resume Analysis", "8,940", "$0.19", "1.2s", "sp-ok", "200"],
    ["MV", "marco.v", "gemini", "Gemini 2.5 Pro", "Company Research", "42,100", "$0.31", "4.3s", "sp-warn", "200"],
    ["LP", "lena.p", "claude", "Claude Haiku 4", "Knowledge Base", "6,050", "$0.03", "0.7s", "sp-ok", "200"],
    ["TN", "theo.n", "openai", "GPT-5 Mini", "AI Assistant", "1,820", "$0.01", "0.6s", "sp-ok", "200"],
    ["SY", "sora.y", "claude", "Claude Sonnet 4.5", "JD Analysis", "9,330", "$0.21", "1.4s", "sp-ok", "200"],
    ["BW", "bea.w", "gemini", "Gemini 2.5 Pro", "Company Research", "0", "$0.00", "—", "sp-down", "429"],
  ];
  const avColor = { claude: "", openai: "slate", gemini: "green" };

  return (
    <>
      <section className="kpi-row">
        {tiles.map((t) => {
          const Ic = I[t.ic];
          return (
            <div className="kpi" key={t.label}>
              <div className="kpi-top"><div className="kpi-ic"><Ic size={17} /></div></div>
              <div className="kpi-label">{t.label}</div>
              <div className="kpi-value">{t.value}</div>
              <div className="kpi-delta flat">{t.sub}</div>
            </div>
          );
        })}
      </section>

      <div className="acard">
        <div className="acard-head" style={{ flexWrap: "wrap", gap: 12 }}>
          <h3>Request log</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="seg-ctl">
              {["1h", "24h", "7d", "30d"].map((r) => (
                <button key={r} className={r === range ? "on" : ""} onClick={() => setRange(r)}>{r}</button>
              ))}
            </div>
            <span className="icon-btn-bare" style={{ width: 34, height: 34 }}><I.Filter size={15} /></span>
            <UButton variant="ghost" size="sm" iconLeft={<I.Download size={13} />}>Export</UButton>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>User</th><th>Model</th><th>Task</th>
              <th style={{ textAlign: "right" }}>Tokens</th>
              <th style={{ textAlign: "right" }}>Cost</th>
              <th style={{ textAlign: "right" }}>Latency</th>
              <th style={{ textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  <div className="cell-2">
                    <span className={"av " + avColor[r[2]]}>{r[0]}</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>{r[1]}</span>
                  </div>
                </td>
                <td>
                  <div className="cell-2">
                    <span className={"badge-logo route-mini " + r[2]} style={{ width: 20, height: 20, fontSize: 10 }}>{r[3][0]}</span>
                    <span style={{ fontSize: 12.5 }}>{r[3]}</span>
                  </div>
                </td>
                <td style={{ color: "var(--text-2)" }}>{r[4]}</td>
                <td className="num" style={{ textAlign: "right" }}>{r[5]}</td>
                <td className="num" style={{ textAlign: "right", fontWeight: 600 }}>{r[6]}</td>
                <td className="num" style={{ textAlign: "right" }}>{r[7]}</td>
                <td style={{ textAlign: "center" }}>
                  <span className={"status-pill " + r[8]} style={{ padding: "3px 9px" }}>{r[9]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="acard-foot">
          <span className="hint">Showing 8 of 48,210 requests</span>
          <div style={{ display: "flex", gap: 6 }}>
            <span className="icon-btn-bare" style={{ width: 30, height: 30 }}><I.ChevronRight size={15} style={{ transform: "rotate(180deg)" }} /></span>
            <span className="icon-btn-bare" style={{ width: 30, height: 30 }}><I.ChevronRight size={15} /></span>
          </div>
        </div>
      </div>
    </>
  );
}
window.AdminAIUsage = AdminAIUsage;


/* AI Cost Analytics — trend bars, model split donut, top consumers. */
function AdminCost() {
  const I = window.ICIcons;
  const split = [
    ["Claude Sonnet 4.5", 196, "var(--accent)"],
    ["GPT-5 Vision", 58, "var(--info)"],
    ["Gemini 2.5 Pro", 34, "var(--success)"],
    ["Claude Haiku 4", 24, "var(--accent-deep)"],
  ];
  const total = split.reduce((a, b) => a + b[1], 0);
  let acc = 0;
  const segs = split.map(([name, val, color]) => {
    const start = acc / total; acc += val; const end = acc / total;
    return { name, val, color, start, end };
  });
  const C = 2 * Math.PI * 52;

  const days = [210, 248, 232, 276, 261, 198, 240, 288, 270, 312, 298, 324, 306, 312];

  return (
    <>
      <section className="kpi-row">
        {[
          { ic: "Dollar", label: "Spend · this month", value: "$8,420", d: "+9.2%", dir: "up" },
          { ic: "TrendUp", label: "Projected month-end", value: "$12.1k", d: "vs $11.5k budget", dir: "down" },
          { ic: "Activity", label: "Cost / 1k requests", value: "$6.48", d: "−4.1%", dir: "up" },
          { ic: "Users", label: "Cost / active user", value: "$0.31", d: "stable", dir: "flat" },
        ].map((k) => {
          const Ic = I[k.ic];
          return (
            <div className="kpi" key={k.label}>
              <div className="kpi-top"><div className="kpi-ic"><Ic size={17} /></div>
                <span className={"kpi-delta " + k.dir}>{k.dir === "up" ? <I.TrendUp size={12} /> : k.dir === "down" ? <I.TrendUp size={12} style={{ transform: "scaleY(-1)" }} /> : null} {k.d}</span>
              </div>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value">{k.value}</div>
            </div>
          );
        })}
      </section>

      <div className="grid-12 section-gap">
        <div className="acard">
          <div className="acard-head"><h3>Daily spend</h3><span className="hint">Last 14 days · USD</span></div>
          <div className="acard-body">
            <div className="bars" style={{ height: 170 }}>
              {days.map((v, i) => {
                const mx = Math.max(...days);
                return (
                  <div className="col" key={i}>
                    <div className="stack" style={{ height: (v / mx * 100) + "%", maxWidth: 22 }}>
                      <div className="seg a" style={{ height: "100%" }} />
                    </div>
                    <span className="x">{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="acard">
          <div className="acard-head"><h3>Spend by model</h3><span className="hint">${total} / day</span></div>
          <div className="acard-body">
            <div className="donut-wrap">
              <svg className="donut" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--track)" strokeWidth="14" />
                {segs.map((s) => (
                  <circle key={s.name} cx="60" cy="60" r="52" fill="none" stroke={s.color} strokeWidth="14"
                    strokeDasharray={`${(s.end - s.start) * C} ${C}`}
                    strokeDashoffset={`${-s.start * C}`}
                    transform="rotate(-90 60 60)" strokeLinecap="butt" />
                ))}
                <text x="60" y="56" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="22" fontWeight="500" fill="var(--text)">${total}</text>
                <text x="60" y="72" textAnchor="middle" fontSize="9" fill="var(--text-3)" letterSpacing="0.5">PER DAY</text>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
                {segs.map((s) => (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <i style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12.5 }}>{s.name}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>${s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="acard">
        <div className="acard-head"><h3>Top cost drivers</h3><span className="hint">By task surface</span></div>
        <div className="acard-body" style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {[
            ["AI Assistant (chat)", 2840, 100],
            ["Mock interview scoring", 2110, 74],
            ["Resume & JD analysis", 1680, 59],
            ["Company research", 980, 35],
            ["Knowledge embeddings", 540, 19],
            ["Vision / OCR", 270, 10],
          ].map(([name, dollars, pct]) => (
            <div key={name} className="bar-cell" style={{ gap: 12 }}>
              <span style={{ fontSize: 12.5, minWidth: 190 }}>{name}</span>
              <div className="track"><div className="fill" style={{ width: pct + "%" }} /></div>
              <span className="n" style={{ minWidth: 56, fontWeight: 600 }}>${dollars.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
window.AdminCost = AdminCost;
