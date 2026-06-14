"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";
import { AdminIcons } from "./adminIcons";

interface Model {
  logo: string;
  k: string;
  name: string;
  vendor: string;
  primary?: boolean;
  status: [string, string];
  share: number;
  specs: [string, string, string][];
  tasks: string;
}

const MODELS: Model[] = [
  {
    logo: "claude", k: "C", name: "Claude Sonnet 4.5", vendor: "Anthropic", primary: true,
    status: ["Operational", "sp-ok"], share: 64,
    specs: [
      ["Status", "Healthy", "Gauge"],
      ["Input / 1M", "$3.00", "Dollar"],
      ["Output / 1M", "$15.00", "Dollar"],
      ["Context window", "200K", "Layers"],
      ["Vision", "Supported", "Vision"],
      ["p95 latency", "1.6s", "Zap"],
    ],
    tasks: "Resume · JD · Mock · Coaching · Plan",
  },
  {
    logo: "openai", k: "G", name: "GPT-5 Vision", vendor: "OpenAI",
    status: ["Operational", "sp-ok"], share: 21,
    specs: [
      ["Status", "Healthy", "Gauge"],
      ["Input / 1M", "$2.50", "Dollar"],
      ["Output / 1M", "$10.00", "Dollar"],
      ["Context window", "128K", "Layers"],
      ["Vision", "Supported", "Vision"],
      ["p95 latency", "2.0s", "Zap"],
    ],
    tasks: "Image OCR · Document vision",
  },
  {
    logo: "gemini", k: "G", name: "Gemini 2.5 Pro", vendor: "Google",
    status: ["Elevated latency", "sp-warn"], share: 15,
    specs: [
      ["Status", "Degraded", "Gauge"],
      ["Input / 1M", "$1.25", "Dollar"],
      ["Output / 1M", "$5.00", "Dollar"],
      ["Context window", "1M", "Layers"],
      ["Vision", "Supported", "Vision"],
      ["p95 latency", "4.1s", "Zap"],
    ],
    tasks: "Long-context research · Fallback",
  },
];

const MATRIX: (string | boolean)[][] = [
  ["Capability", "Claude Sonnet 4.5", "GPT-5 Vision", "Gemini 2.5 Pro"],
  ["Streaming", true, true, true],
  ["Tool / function calling", true, true, true],
  ["Vision & OCR", true, true, true],
  ["JSON mode", true, true, true],
  ["Prompt caching", true, false, true],
  ["1M context", false, false, true],
];

export function AdminModels() {
  const router = useRouter();

  return (
    <>
      <div className="model-grid section-gap">
        {MODELS.map((m) => (
          <div className={"model-card" + (m.primary ? " primary" : "")} key={m.name}>
            <div className="model-head">
              <div className={"model-logo " + m.logo}>{m.k}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="model-name">{m.name}</div>
                <div className="model-vendor">{m.vendor}</div>
                <div style={{ marginTop: 9 }}>
                  {m.primary ? (
                    <span className="status-pill sp-info">
                      <Icons.Star size={11} /> Default model
                    </span>
                  ) : (
                    <span className="status-pill sp-neutral">Fallback</span>
                  )}
                </div>
              </div>
            </div>
            <div className="model-spec">
              {m.specs.map(([k, v, ic]) => {
                const Ic = AdminIcons[ic] ?? AdminIcons.Dollar;
                const isStatus = k === "Status";
                return (
                  <div className="model-spec-row" key={k}>
                    <span className="k">
                      <Ic size={13} /> {k}
                    </span>
                    {isStatus ? (
                      <span className={"status-pill " + m.status[1]} style={{ padding: "3px 9px" }}>
                        <span className={"stat-dot " + (m.status[1] === "sp-ok" ? "sd-ok" : "sd-warn")} /> {v}
                      </span>
                    ) : (
                      <span className="v">{v}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="model-usebar">
              <div className="usebar-label">
                <span>Traffic share · today</span>
                <b>{m.share}%</b>
              </div>
              <div className="usebar-track">
                <div className="usebar-fill" style={{ width: m.share + "%" }} />
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 11, lineHeight: 1.5 }}>{m.tasks}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="acard">
        <div className="acard-head">
          <h3>Capability matrix</h3>
          <Button variant="ghost" size="sm" iconRight={<AdminIcons.Route size={13} />} onClick={() => router.push("/admin/routing")}>
            Configure routing
          </Button>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              {(MATRIX[0] as string[]).map((h, i) => (
                <th key={i} style={i === 0 ? {} : { textAlign: "center" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX.slice(1).map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={ci === 0 ? { fontWeight: 550 } : { textAlign: "center" }}>
                    {typeof cell === "boolean" ? (
                      cell ? (
                        <span className="note-check" style={{ display: "inline-grid", margin: "0 auto" }}>
                          <Icons.Check size={9} stroke={3} />
                        </span>
                      ) : (
                        <span style={{ color: "var(--text-3)" }}>—</span>
                      )
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
