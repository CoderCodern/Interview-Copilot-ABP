"use client";

import { Icons } from "@/components/icons";
import { AdminIcons } from "./adminIcons";

const SPLIT: [string, number, string][] = [
  ["Claude Sonnet 4.5", 196, "var(--accent)"],
  ["GPT-5 Vision", 58, "var(--info)"],
  ["Gemini 2.5 Pro", 34, "var(--success)"],
  ["Claude Haiku 4", 24, "var(--accent-deep)"],
];

const DAYS = [210, 248, 232, 276, 261, 198, 240, 288, 270, 312, 298, 324, 306, 312];

const KPIS: { ic: string; label: string; value: string; d: string; dir: "up" | "down" | "flat" }[] = [
  { ic: "Dollar", label: "Spend · this month", value: "$8,420", d: "+9.2%", dir: "up" },
  { ic: "TrendUp", label: "Projected month-end", value: "$12.1k", d: "vs $11.5k budget", dir: "down" },
  { ic: "Activity", label: "Cost / 1k requests", value: "$6.48", d: "−4.1%", dir: "up" },
  { ic: "Users", label: "Cost / active user", value: "$0.31", d: "stable", dir: "flat" },
];

const DRIVERS: [string, number, number][] = [
  ["AI Assistant (chat)", 2840, 100],
  ["Mock interview scoring", 2110, 74],
  ["Resume & JD analysis", 1680, 59],
  ["Company research", 980, 35],
  ["Knowledge embeddings", 540, 19],
  ["Vision / OCR", 270, 10],
];

export function AdminCost() {
  const total = SPLIT.reduce((a, b) => a + b[1], 0);
  let acc = 0;
  const segs = SPLIT.map(([name, val, color]) => {
    const start = acc / total;
    acc += val;
    const end = acc / total;
    return { name, val, color, start, end };
  });
  const C = 2 * Math.PI * 52;
  const mx = Math.max(...DAYS);

  return (
    <>
      <section className="kpi-row">
        {KPIS.map((k) => {
          const Ic = AdminIcons[k.ic];
          return (
            <div className="kpi" key={k.label}>
              <div className="kpi-top">
                <div className="kpi-ic">
                  <Ic size={17} />
                </div>
                <span className={"kpi-delta " + k.dir}>
                  {k.dir === "up" ? (
                    <Icons.TrendUp size={12} />
                  ) : k.dir === "down" ? (
                    <Icons.TrendUp size={12} style={{ transform: "scaleY(-1)" }} />
                  ) : null}{" "}
                  {k.d}
                </span>
              </div>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value">{k.value}</div>
            </div>
          );
        })}
      </section>

      <div className="grid-12 section-gap">
        <div className="acard">
          <div className="acard-head">
            <h3>Daily spend</h3>
            <span className="hint">Last 14 days · USD</span>
          </div>
          <div className="acard-body">
            <div className="bars" style={{ height: 170 }}>
              {DAYS.map((v, i) => (
                <div className="col" key={i}>
                  <div className="bstack" style={{ height: (v / mx) * 100 + "%", maxWidth: 22 }}>
                    <div className="bseg a" style={{ height: "100%" }} />
                  </div>
                  <span className="x">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="acard">
          <div className="acard-head">
            <h3>Spend by model</h3>
            <span className="hint">${total} / day</span>
          </div>
          <div className="acard-body">
            <div className="donut-wrap">
              <svg className="donut" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--track)" strokeWidth="14" />
                {segs.map((s) => (
                  <circle
                    key={s.name}
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="14"
                    strokeDasharray={`${(s.end - s.start) * C} ${C}`}
                    strokeDashoffset={`${-s.start * C}`}
                    transform="rotate(-90 60 60)"
                    strokeLinecap="butt"
                  />
                ))}
                <text x="60" y="56" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="22" fontWeight="500" fill="var(--text)">
                  ${total}
                </text>
                <text x="60" y="72" textAnchor="middle" fontSize="9" fill="var(--text-3)" letterSpacing="0.5">
                  PER DAY
                </text>
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
        <div className="acard-head">
          <h3>Top cost drivers</h3>
          <span className="hint">By task surface</span>
        </div>
        <div className="acard-body" style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {DRIVERS.map(([name, dollars, pct]) => (
            <div key={name} className="bar-cell" style={{ gap: 12 }}>
              <span style={{ fontSize: 12.5, minWidth: 190 }}>{name}</span>
              <div className="track">
                <div className="fill" style={{ width: pct + "%" }} />
              </div>
              <span className="n" style={{ minWidth: 56, fontWeight: 600 }}>
                ${dollars.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
