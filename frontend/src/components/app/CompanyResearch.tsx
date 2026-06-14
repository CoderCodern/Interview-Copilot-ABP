import type { ReactNode } from "react";
import { Avatar, Badge, Button, Tag } from "@/components/ds";
import { Icons, type IconProps } from "@/components/icons";

interface Fact {
  icon: (p: IconProps) => ReactNode;
  k: string;
  v: string;
}

const FACTS: Fact[] = [
  { icon: Icons.Building, k: "Industry", v: "Payments infrastructure · developer platform" },
  { icon: Icons.Users, k: "Size", v: "~8,000 employees · founded 2010" },
  { icon: Icons.Globe, k: "Locations", v: "SF HQ · remote-friendly (US / EU)" },
  { icon: Icons.Compass, k: "Values", v: "Users first · rigor · low ego · move with urgency" },
];

interface Stage {
  t: string;
  d: string;
  active: boolean;
  done: boolean;
}

const STAGES: Stage[] = [
  { active: true, t: "Recruiter screen", d: "30 min · background, motivation, comp expectations", done: true },
  { active: true, t: "Technical phone screen", d: "60 min · one coding problem, live, CoderPad", done: true },
  { active: true, t: "On-site loop — you are here", d: "4 rounds · system design, coding, debugging, behavioral", done: false },
  { active: false, t: "Team match & offer", d: "Hiring manager + bar raiser sign-off", done: false },
];

const NEWS: [string, string][] = [
  ["Stripe ships new ledger primitives for platforms", "Engineering blog · 3 days ago"],
  ["Reliability report: 99.9999% API uptime in Q1", "Newsroom · 2 weeks ago"],
  ["Expands money-movement products in the EU", "Press · last month"],
];

const PROBES = [
  "Correctness under retries & partial failure",
  "Operational ownership — on-call, metrics, rollbacks",
  "Clear written communication & trade-off reasoning",
  "Working backwards from the user / developer",
];

export function CompanyResearch() {
  return (
    <div className="two-col">
      <div className="stack">
        <div className="surface" style={{ padding: "22px" }}>
          <div className="spread" style={{ marginBottom: "18px" }}>
            <div className="row" style={{ gap: "14px" }}>
              <Avatar name="Stripe" size={44} />
              <div>
                <div className="serif-h" style={{ fontSize: "19px" }}>
                  Stripe
                </div>
                <div className="muted" style={{ fontSize: "12.5px", marginTop: "2px" }}>
                  stripe.com · Financial infrastructure for the internet
                </div>
              </div>
            </div>
            <Badge tone="accent">Target company</Badge>
          </div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "15.5px", lineHeight: 1.5, color: "var(--text)" }}>
            Engineering culture is writing-heavy and rigor-first. Expect deep dives on correctness, idempotency and
            operational maturity — they care less about trivia, more about how you reason under failure.
          </p>
          <div style={{ marginTop: "18px" }}>
            {FACTS.map((f) => (
              <div className="fact" key={f.k}>
                <div className="fact-ico">
                  <f.icon size={16} />
                </div>
                <div>
                  <div className="fact-k">{f.k}</div>
                  <div className="fact-v">{f.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="eyebrow-row">
            <span className="eyebrow" style={{ margin: 0 }}>
              Interview process
            </span>
            <Badge tone="info">Stage 3 of 4</Badge>
          </div>
          {STAGES.map((s, i) => (
            <div className={"stage" + (s.active ? " active" : "")} key={s.t}>
              <div className="stage-num">{s.done ? <Icons.Check size={13} stroke={3} /> : i + 1}</div>
              <div style={{ paddingTop: "3px" }}>
                <div className="row" style={{ gap: "8px" }}>
                  <span style={{ fontWeight: 600, fontSize: "13.5px" }}>{s.t}</span>
                  {i === 2 && <Badge tone="accent">Now</Badge>}
                </div>
                <div className="dim" style={{ fontSize: "12.5px", marginTop: "2px", lineHeight: 1.5 }}>
                  {s.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            What they&apos;ll probe
          </div>
          <ul className="dash-list">
            {PROBES.map((s) => (
              <li key={s}>
                <span className="b">
                  <Icons.Arrow size={13} />
                </span>
                {s}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
            <Tag tone="accent">System design</Tag>
            <Tag tone="accent">Idempotency</Tag>
            <Tag tone="neutral">On-call</Tag>
            <Tag tone="neutral">Writing</Tag>
          </div>
        </div>

        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="spread" style={{ marginBottom: "8px" }}>
            <div style={{ fontWeight: 600, fontSize: "13.5px" }}>Recent news</div>
            <span className="hint dim" style={{ fontSize: "11px" }}>
              auto-updated
            </span>
          </div>
          {NEWS.map(([t, m]) => (
            <div className="news" key={t}>
              <div className="news-t">{t}</div>
              <div className="news-m">{m}</div>
            </div>
          ))}
          <Button variant="ghost" size="sm" fullWidth style={{ marginTop: "14px" }} iconRight={<Icons.Arrow size={13} />}>
            Open research digest
          </Button>
        </div>
      </div>
    </div>
  );
}
