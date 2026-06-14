"use client";

import { useState } from "react";
import { Badge, Button, Meter, Tabs, Tag, type TagTone } from "@/components/ds";
import { Icons } from "@/components/icons";

const SKILLS: { label: string; tone: TagTone }[] = [
  { label: ".NET / C#", tone: "matched" },
  { label: "PostgreSQL", tone: "matched" },
  { label: "Distributed systems", tone: "matched" },
  { label: "REST APIs", tone: "matched" },
  { label: "Event-driven", tone: "matched" },
  { label: "Domain-driven design", tone: "accent" },
  { label: "Kafka", tone: "gap" },
  { label: "Kubernetes", tone: "gap" },
  { label: "gRPC", tone: "neutral" },
  { label: "Redis", tone: "neutral" },
  { label: "CI/CD", tone: "neutral" },
  { label: "xUnit", tone: "neutral" },
];

const EXPERIENCE = [
  {
    role: "Senior Backend Engineer",
    co: "Ledgerline",
    time: "2022 — Present",
    note: "Led billing platform migration; 40k req/min zero-downtime cutover.",
  },
  {
    role: "Backend Engineer",
    co: "Northwind Pay",
    time: "2019 — 2022",
    note: "Built idempotent payments API and double-entry ledger service.",
  },
  {
    role: "Software Engineer",
    co: "Cobalt Systems",
    time: "2017 — 2019",
    note: "Internal tooling, event pipelines, observability.",
  },
];

const STRENGTHS: { label: string; value: number }[] = [
  { label: "Profile strength", value: 84 },
  { label: "Role alignment", value: 76 },
  { label: "Keyword coverage", value: 68 },
];

const IMPROVEMENTS = [
  "Add a metric to the Cobalt Systems role",
  "Surface Kafka/streaming exposure if any",
  "Tighten the summary to 2 lines",
];

export function ResumeAnalysis() {
  const [tab, setTab] = useState("skills");

  return (
    <div className="two-col">
      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="spread" style={{ marginBottom: "16px" }}>
            <div className="row">
              <div className="card-icon" style={{ width: 40, height: 40 }}>
                <Icons.Doc size={19} />
              </div>
              <div>
                <div className="serif-h" style={{ fontSize: "17px" }}>
                  Coder_Codern_Resume_v3.pdf
                </div>
                <div className="dim" style={{ fontSize: "12px", marginTop: "2px" }}>
                  Uploaded 2 days ago · version 3 · 2 pages
                </div>
              </div>
            </div>
            <Badge tone="success">
              <Icons.Check size={10} stroke={3} /> Parsed
            </Badge>
          </div>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { id: "skills", label: "Skills", count: 12 },
              { id: "experience", label: "Experience", count: 3 },
              { id: "education", label: "Education" },
            ]}
          />
          <div style={{ paddingTop: "20px" }}>
            {tab === "skills" && (
              <>
                <div className="dim" style={{ fontSize: "12px", marginBottom: "12px" }}>
                  Extracted and matched against your target role · Senior Backend Engineer
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {SKILLS.map((s) => (
                    <Tag key={s.label} tone={s.tone}>
                      {s.label}
                    </Tag>
                  ))}
                </div>
              </>
            )}
            {tab === "experience" && (
              <div className="stack" style={{ gap: "2px" }}>
                {EXPERIENCE.map((e, i) => (
                  <div
                    key={e.co}
                    style={{
                      display: "flex",
                      gap: "16px",
                      padding: "14px 0",
                      borderBottom: i < EXPERIENCE.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div style={{ width: 3, borderRadius: 3, background: "var(--accent)", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "14px" }}>{e.role}</div>
                      <div className="muted" style={{ fontSize: "12.5px", marginTop: "1px" }}>
                        {e.co} · {e.time}
                      </div>
                      <div className="dim" style={{ fontSize: "12.5px", marginTop: "6px", lineHeight: 1.5 }}>
                        {e.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "education" && (
              <div className="row" style={{ gap: "14px", padding: "6px 0" }}>
                <div className="card-icon" style={{ width: 40, height: 40 }}>
                  <Icons.Building size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>B.Sc. Computer Science</div>
                  <div className="muted" style={{ fontSize: "12.5px", marginTop: "2px" }}>
                    State University · 2013 — 2017
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="eyebrow" style={{ marginBottom: "8px" }}>
            Career profile
          </div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "16px", lineHeight: 1.45, color: "var(--text)" }}>
            A payments-focused backend engineer with deep experience in ledgers, idempotency and zero-downtime
            migrations.
          </p>
          <div style={{ marginTop: "18px" }}>
            {STRENGTHS.map((s) => (
              <div key={s.label} style={{ marginBottom: "12px" }}>
                <div className="spread" style={{ marginBottom: "6px" }}>
                  <span style={{ fontSize: "12.5px", color: "var(--text-2)" }}>{s.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)" }}>{s.value}%</span>
                </div>
                <Meter value={s.value} />
              </div>
            ))}
          </div>
        </div>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="row" style={{ gap: "10px", marginBottom: "10px" }}>
            <Icons.Sparkle size={16} />
            <span style={{ fontWeight: 600, fontSize: "13.5px" }}>Suggested improvements</span>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {IMPROVEMENTS.map((s) => (
              <li
                key={s}
                className="row"
                style={{ gap: "10px", alignItems: "flex-start", fontSize: "12.5px", color: "var(--text-2)" }}
              >
                <span style={{ color: "var(--accent)", marginTop: "2px" }}>
                  <Icons.Arrow size={13} />
                </span>
                {s}
              </li>
            ))}
          </ul>
          <Button variant="subtle" size="sm" style={{ marginTop: "16px" }} iconLeft={<Icons.Sparkle size={13} />}>
            Rewrite with AI
          </Button>
        </div>
      </div>
    </div>
  );
}
