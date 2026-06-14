"use client";

import { useState } from "react";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";
import { AdminIcons } from "./adminIcons";

const TILES: { ic: string; label: string; value: string; sub: string }[] = [
  { ic: "Activity", label: "Requests", value: "48,210", sub: "across 5 task types" },
  { ic: "Zap", label: "Tokens", value: "182.4M", sub: "in 41.6M · out 140.8M" },
  { ic: "Dollar", label: "Spend", value: "$312.40", sub: "avg $0.0065 / req" },
  { ic: "Gauge", label: "p95 latency", value: "1.8s", sub: "p50 0.9s" },
];

// [avatar, user, logo, model, task, tokens, cost, latency, statusTone, statusCode]
const ROWS: string[][] = [
  ["AK", "amelia.k", "claude", "Claude Sonnet 4.5", "Mock Interview", "14,820", "$0.42", "1.6s", "sp-ok", "200"],
  ["RT", "raj.t", "openai", "GPT-5 Vision", "Image OCR", "3,210", "$0.06", "2.1s", "sp-ok", "200"],
  ["DS", "dana.s", "claude", "Claude Sonnet 4.5", "Resume Analysis", "8,940", "$0.19", "1.2s", "sp-ok", "200"],
  ["MV", "marco.v", "gemini", "Gemini 2.5 Pro", "Company Research", "42,100", "$0.31", "4.3s", "sp-warn", "200"],
  ["LP", "lena.p", "claude", "Claude Haiku 4", "Knowledge Base", "6,050", "$0.03", "0.7s", "sp-ok", "200"],
  ["TN", "theo.n", "openai", "GPT-5 Mini", "AI Assistant", "1,820", "$0.01", "0.6s", "sp-ok", "200"],
  ["SY", "sora.y", "claude", "Claude Sonnet 4.5", "JD Analysis", "9,330", "$0.21", "1.4s", "sp-ok", "200"],
  ["BW", "bea.w", "gemini", "Gemini 2.5 Pro", "Company Research", "0", "$0.00", "—", "sp-down", "429"],
];

const AV_COLOR: Record<string, string> = { claude: "", openai: "slate", gemini: "green" };

export function AdminAIUsage() {
  const [range, setRange] = useState("24h");

  return (
    <>
      <section className="kpi-row">
        {TILES.map((t) => {
          const Ic = AdminIcons[t.ic];
          return (
            <div className="kpi" key={t.label}>
              <div className="kpi-top">
                <div className="kpi-ic">
                  <Ic size={17} />
                </div>
              </div>
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
                <button key={r} className={r === range ? "on" : ""} onClick={() => setRange(r)}>
                  {r}
                </button>
              ))}
            </div>
            <span className="icon-btn-bare" style={{ width: 34, height: 34 }}>
              <Icons.Filter size={15} />
            </span>
            <Button variant="ghost" size="sm" iconLeft={<Icons.Download size={13} />}>
              Export
            </Button>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>User</th>
              <th>Model</th>
              <th>Task</th>
              <th style={{ textAlign: "right" }}>Tokens</th>
              <th style={{ textAlign: "right" }}>Cost</th>
              <th style={{ textAlign: "right" }}>Latency</th>
              <th style={{ textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={i}>
                <td>
                  <div className="cell-2">
                    <span className={"av " + AV_COLOR[r[2]]}>{r[0]}</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>
                      {r[1]}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="cell-2">
                    <span className={"badge-logo route-mini " + r[2]} style={{ width: 20, height: 20, fontSize: 10 }}>
                      {r[3][0]}
                    </span>
                    <span style={{ fontSize: 12.5 }}>{r[3]}</span>
                  </div>
                </td>
                <td style={{ color: "var(--text-2)" }}>{r[4]}</td>
                <td className="num" style={{ textAlign: "right" }}>
                  {r[5]}
                </td>
                <td className="num" style={{ textAlign: "right", fontWeight: 600 }}>
                  {r[6]}
                </td>
                <td className="num" style={{ textAlign: "right" }}>
                  {r[7]}
                </td>
                <td style={{ textAlign: "center" }}>
                  <span className={"status-pill " + r[8]} style={{ padding: "3px 9px" }}>
                    {r[9]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="acard-foot">
          <span className="hint">Showing 8 of 48,210 requests</span>
          <div style={{ display: "flex", gap: 6 }}>
            <span className="icon-btn-bare" style={{ width: 30, height: 30 }}>
              <Icons.ChevronRight size={15} style={{ transform: "rotate(180deg)" }} />
            </span>
            <span className="icon-btn-bare" style={{ width: 30, height: 30 }}>
              <Icons.ChevronRight size={15} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
