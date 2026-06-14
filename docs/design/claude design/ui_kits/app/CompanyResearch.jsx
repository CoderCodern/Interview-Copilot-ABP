/* CompanyResearch — culture, interview style, process stages and
   recent news for the target company. Grounds the candidate in who
   they're meeting and how the loop runs. */
const { Badge, Tag, Button, Avatar, IconButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

function CompanyResearch() {
  const I = window.ICIcons;
  const facts = [
    [I.Building, "Industry", "Payments infrastructure · developer platform"],
    [I.Users, "Size", "~8,000 employees · founded 2010"],
    [I.Globe, "Locations", "SF HQ · remote-friendly (US / EU)"],
    [I.Compass, "Values", "Users first · rigor · low ego · move with urgency"],
  ];
  const stages = [
    { active: true, t: "Recruiter screen", d: "30 min · background, motivation, comp expectations", done: true },
    { active: true, t: "Technical phone screen", d: "60 min · one coding problem, live, CoderPad", done: true },
    { active: true, t: "On-site loop — you are here", d: "4 rounds · system design, coding, debugging, behavioral", done: false },
    { active: false, t: "Team match & offer", d: "Hiring manager + bar raiser sign-off", done: false },
  ];
  const news = [
    ["Stripe ships new ledger primitives for platforms", "Engineering blog · 3 days ago"],
    ["Reliability report: 99.9999% API uptime in Q1", "Newsroom · 2 weeks ago"],
    ["Expands money-movement products in the EU", "Press · last month"],
  ];

  return (
    <div className="two-col">
      <div className="stack">
        <div className="surface" style={{ padding: "22px" }}>
          <div className="spread" style={{ marginBottom: "18px" }}>
            <div className="row" style={{ gap: "14px" }}>
              <Avatar name="Stripe" size={44} />
              <div>
                <div className="serif-h" style={{ fontSize: "19px" }}>Stripe</div>
                <div className="muted" style={{ fontSize: "12.5px", marginTop: "2px" }}>stripe.com · Financial infrastructure for the internet</div>
              </div>
            </div>
            <Badge tone="accent">Target company</Badge>
          </div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "15.5px", lineHeight: 1.5, color: "var(--text)" }}>
            Engineering culture is writing-heavy and rigor-first. Expect deep dives on correctness, idempotency and operational maturity — they care less about trivia, more about how you reason under failure.
          </p>
          <div style={{ marginTop: "18px" }}>
            {facts.map(([Ico, k, v], i) => (
              <div className="fact" key={i}>
                <div className="fact-ico"><Ico size={16} /></div>
                <div>
                  <div className="fact-k">{k}</div>
                  <div className="fact-v">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="eyebrow-row"><span className="eyebrow" style={{ margin: 0 }}>Interview process</span><Badge tone="info">Stage 3 of 4</Badge></div>
          {stages.map((s, i) => (
            <div className={"stage" + (s.active ? " active" : "")} key={i}>
              <div className="stage-num">{s.done ? <I.Check size={13} stroke={3} /> : i + 1}</div>
              <div style={{ paddingTop: "3px" }}>
                <div className="row" style={{ gap: "8px" }}>
                  <span style={{ fontWeight: 600, fontSize: "13.5px" }}>{s.t}</span>
                  {i === 2 && <Badge tone="accent">Now</Badge>}
                </div>
                <div className="dim" style={{ fontSize: "12.5px", marginTop: "2px", lineHeight: 1.5 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>What they'll probe</div>
          <ul className="dash-list">
            {["Correctness under retries & partial failure", "Operational ownership — on-call, metrics, rollbacks", "Clear written communication & trade-off reasoning", "Working backwards from the user / developer"].map((s, i) => (
              <li key={i}><span className="b"><I.Arrow size={13} /></span>{s}</li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
            <Tag tone="accent">System design</Tag><Tag tone="accent">Idempotency</Tag><Tag tone="neutral">On-call</Tag><Tag tone="neutral">Writing</Tag>
          </div>
        </div>

        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="spread" style={{ marginBottom: "8px" }}>
            <div style={{ fontWeight: 600, fontSize: "13.5px" }}>Recent news</div>
            <span className="hint dim" style={{ fontSize: "11px" }}>auto-updated</span>
          </div>
          {news.map(([t, m], i) => (
            <div className="news" key={i}>
              <div className="news-t">{t}</div>
              <div className="news-m">{m}</div>
            </div>
          ))}
          <Button variant="ghost" size="sm" fullWidth style={{ marginTop: "14px" }} iconRight={<I.Arrow size={13} />}>Open research digest</Button>
        </div>
      </div>
    </div>
  );
}

window.CompanyResearch = CompanyResearch;
