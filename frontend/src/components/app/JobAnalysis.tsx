"use client";

import { Badge, Button, ReadinessRing, Tag, type BadgeTone } from "@/components/ds";
import { Icons } from "@/components/icons";

type MatchStatus = "matched" | "partial" | "gap";

interface Requirement {
  text: string;
  priority: string;
  status: MatchStatus;
}

const REQUIREMENTS: Requirement[] = [
  { text: "5+ years backend, distributed systems", priority: "Core", status: "matched" },
  { text: "Payments / ledger domain experience", priority: "Core", status: "matched" },
  { text: "Strong in C# or Java", priority: "Core", status: "matched" },
  { text: "Event streaming (Kafka / Kinesis)", priority: "Important", status: "gap" },
  { text: "Kubernetes & container orchestration", priority: "Important", status: "partial" },
  { text: "gRPC service design", priority: "Nice to have", status: "partial" },
  { text: "Mentoring / tech leadership", priority: "Important", status: "matched" },
];

const STATUS_MAP: Record<MatchStatus, { label: string; tone: BadgeTone }> = {
  matched: { label: "Matched", tone: "success" },
  partial: { label: "Partial", tone: "warning" },
  gap: { label: "Gap", tone: "danger" },
};

export function JobAnalysis() {
  return (
    <div className="two-col">
      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="spread" style={{ marginBottom: "4px" }}>
            <div>
              <div className="serif-h" style={{ fontSize: "18px" }}>
                Senior Backend Engineer, Payments
              </div>
              <div className="muted" style={{ fontSize: "12.5px", marginTop: "3px" }}>
                Stripe · San Francisco / Remote · Full-time
              </div>
            </div>
            <Badge tone="success">
              <Icons.Check size={10} stroke={3} /> Analyzed
            </Badge>
          </div>
        </div>

        <div className="surface" style={{ overflow: "hidden" }}>
          <div className="panel-head">
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 550 }}>
              Extracted requirements
            </h3>
            <span className="hint">7 found</span>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Requirement</th>
                <th style={{ width: "110px" }}>Priority</th>
                <th style={{ width: "110px" }}>Match</th>
              </tr>
            </thead>
            <tbody>
              {REQUIREMENTS.map((r) => (
                <tr key={r.text}>
                  <td>{r.text}</td>
                  <td>
                    <span className="dim">{r.priority}</span>
                  </td>
                  <td>
                    <Badge tone={STATUS_MAP[r.status].tone}>{STATUS_MAP[r.status].label}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "22px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="eyebrow" style={{ alignSelf: "flex-start", marginBottom: "14px" }}>
            Skill-gap match
          </div>
          <ReadinessRing
            value={78}
            label="Match"
            caption={
              <>
                Strong fit — close <b style={{ color: "var(--text)" }}>2 gaps</b> to reach 90%+
              </>
            }
          />
        </div>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "12px" }}>Gaps to close</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            <Tag tone="gap">Kafka</Tag>
            <Tag tone="gap">Kubernetes</Tag>
            <Tag tone="neutral">gRPC</Tag>
          </div>
          <Button variant="primary" size="sm" fullWidth iconRight={<Icons.Arrow size={13} />}>
            Generate prep plan
          </Button>
        </div>
      </div>
    </div>
  );
}
