"use client";

import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";
import { AdminIcons } from "./adminIcons";

/* ---------- Background Jobs ---------- */
interface Job {
  ic: string;
  name: string;
  sub: string;
  prog: number;
  state: string;
  tone: string;
  meta: string;
}

const JOBS: Job[] = [
  { ic: "Doc", name: "Resume parse · batch", sub: "Worker · resume-pool", prog: 72, state: "running", tone: "sp-ok", meta: "868 / 1,204" },
  { ic: "Mic", name: "Mock transcript scoring", sub: "Worker · scoring-pool", prog: 44, state: "running", tone: "sp-ok", meta: "27 / 62" },
  { ic: "Briefcase", name: "JD skill-gap recompute", sub: "Scheduled · 02:00 nightly", prog: 0, state: "queued", tone: "sp-neutral", meta: "380 jobs" },
  { ic: "Book", name: "Knowledge re-embed", sub: "Worker · vector-pool", prog: 31, state: "retrying", tone: "sp-warn", meta: "attempt 2 / 3" },
  { ic: "Dollar", name: "Daily cost rollup", sub: "Scheduled · hourly", prog: 100, state: "done", tone: "sp-ok", meta: "completed 04m ago" },
  { ic: "Cloud", name: "Storage lifecycle sweep", sub: "Worker · storage-pool", prog: 0, state: "failed", tone: "sp-down", meta: "S3 timeout · eu-west" },
];

const JOB_KPIS: [string, string, string | number][] = [
  ["Refresh", "Running", 4],
  ["ListChecks", "Queued", 18],
  ["Check", "Done · 24h", "3,902"],
  ["Alert", "Failed · 24h", 2],
];

export function AdminJobs() {
  return (
    <>
      <section className="kpi-row">
        {JOB_KPIS.map(([ic, l, v]) => {
          const Ic = AdminIcons[ic];
          return (
            <div className="kpi" key={l}>
              <div className="kpi-top">
                <div className="kpi-ic">
                  <Ic size={17} />
                </div>
              </div>
              <div className="kpi-label">{l}</div>
              <div className="kpi-value">{v}</div>
            </div>
          );
        })}
      </section>
      <div className="acard">
        <div className="acard-head">
          <h3>Job queue</h3>
          <Button variant="ghost" size="sm" iconLeft={<AdminIcons.Refresh size={13} />}>
            Refresh
          </Button>
        </div>
        {JOBS.map((j) => {
          const Ic = AdminIcons[j.ic] ?? AdminIcons.Refresh;
          return (
            <div className="lrow" key={j.name} style={{ gap: 16 }}>
              <div className="lrow-ic">
                <Ic size={16} />
              </div>
              <div className="lrow-main">
                <div className="lrow-title">{j.name}</div>
                <div className="lrow-sub">{j.sub}</div>
              </div>
              <div style={{ width: 150 }}>
                <div className="bar-cell">
                  <div className="track">
                    <div
                      className="fill"
                      style={{ width: j.prog + "%", background: j.tone === "sp-down" ? "var(--danger)" : j.tone === "sp-warn" ? "var(--warning)" : "var(--accent)" }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 5, textAlign: "right" }}>{j.meta}</div>
              </div>
              <span className={"status-pill " + j.tone} style={{ minWidth: 76, justifyContent: "center" }}>
                {j.state}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------- System Health ---------- */
type HealthState = "ok" | "warn" | "down";
const TONE: Record<HealthState, [string, string, string, string]> = {
  ok: ["sd-ok", "sp-ok", "var(--success)", "var(--success-soft)"],
  warn: ["sd-warn", "sp-warn", "var(--warning)", "var(--warning-soft)"],
  down: ["sd-down", "sp-down", "var(--danger)", "var(--danger-soft)"],
};

const SERVICES: [string, string, HealthState, string, string][] = [
  ["API Gateway", "Operational", "ok", "Server", "99.99%"],
  ["Auth service", "Operational", "ok", "Lock", "99.98%"],
  ["Resume parser", "Operational", "ok", "Doc", "99.95%"],
  ["AI orchestrator", "Operational", "ok", "Cpu", "99.97%"],
  ["Vector store", "Degraded", "warn", "Database", "99.40%"],
  ["Object storage", "Operational", "ok", "Cloud", "99.99%"],
];

const LATENCY = [1.4, 1.6, 1.5, 1.8, 1.7, 2.0, 1.9, 2.4, 2.1, 1.8, 1.7, 1.8];
const INFRA: [string, string, string][] = [
  ["Cpu", "CPU", "38%"],
  ["Database", "Memory", "61%"],
  ["Cloud", "Storage", "44%"],
  ["Activity", "Throughput", "2.4k rps"],
];

export function AdminHealth() {
  return (
    <>
      <div className="grid-12 section-gap">
        <div className="acard">
          <div className="acard-head">
            <h3>Service status</h3>
            <span className="status-pill sp-ok">
              <span className="stat-dot sd-ok" /> 5 of 6 healthy
            </span>
          </div>
          <div className="acard-body health-grid">
            {SERVICES.map(([name, label, st, ic, up]) => {
              const Ic = AdminIcons[ic] ?? AdminIcons.Server;
              const t = TONE[st];
              return (
                <div className="health-tile" key={name}>
                  <div className="ht-ic" style={{ background: t[3], color: t[2] }}>
                    <Ic size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="ht-name">{name}</div>
                    <div className="ht-val">{up} uptime · 90d</div>
                  </div>
                  <span className={"status-pill " + t[1]} style={{ padding: "3px 9px" }}>
                    <span className={"stat-dot " + t[0]} /> {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="acard">
          <div className="acard-head">
            <h3>Latency · p95</h3>
            <span className="hint">Last 12h</span>
          </div>
          <div className="acard-body">
            <div className="bars" style={{ height: 150 }}>
              {LATENCY.map((v, i) => (
                <div className="col" key={i}>
                  <div className="bstack" style={{ height: (v / 2.6) * 100 + "%", maxWidth: 22 }}>
                    <div className="bseg a" style={{ height: "100%", background: v >= 2.2 ? "var(--warning)" : "var(--accent)" }} />
                  </div>
                  <span className="x">{i + 1}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: "var(--text-2)" }}>
              <span>p50 · 0.9s</span>
              <span>p95 · 1.8s</span>
              <span>p99 · 3.1s</span>
            </div>
          </div>
        </div>
      </div>
      <div className="acard">
        <div className="acard-head">
          <h3>Infrastructure</h3>
          <span className="hint">Live</span>
        </div>
        <div className="acard-body health-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {INFRA.map(([ic, l, v]) => {
            const Ic = AdminIcons[ic];
            return (
              <div className="health-tile" key={l} style={{ flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
                <div className="ht-ic" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                  <Ic size={18} />
                </div>
                <div>
                  <div className="ht-name" style={{ fontSize: 11.5, color: "var(--text-3)" }}>
                    {l}
                  </div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, marginTop: 2 }}>{v}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------- Audit Logs ---------- */
// [avatar, actor, action, target, time, icon]
const LOGS: string[][] = [
  ["DS", "Dana Okonkwo", "published prompt", "Mock interviewer v21", "2m ago", "Edit"],
  ["LP", "Lena Park", "changed routing", "Company Research → Gemini 2.5 Pro", "18m ago", "Route"],
  ["SY", "System", "scaled worker pool", "scoring-pool 4 → 6 instances", "41m ago", "Server"],
  ["DS", "Dana Okonkwo", "suspended user", "bea@growth.io · ToS review", "1h ago", "Lock"],
  ["MV", "Marco Vidal", "rotated API key", "OpenAI provider key", "3h ago", "Key"],
  ["LP", "Lena Park", "updated plan limits", "Pro · 2M → 2.5M tokens / cycle", "5h ago", "Star"],
];

export function AdminAudit() {
  return (
    <div className="acard">
      <div className="acard-head">
        <h3>Audit trail</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="admin-search" style={{ minWidth: 200 }}>
            <Icons.Search size={15} />
            <input placeholder="Search events" />
          </div>
          <Button variant="ghost" size="sm" iconLeft={<Icons.Download size={13} />}>
            Export
          </Button>
        </div>
      </div>
      {LOGS.map((l, i) => {
        const Ic = AdminIcons[l[5]] ?? AdminIcons.History;
        return (
          <div className="lrow" key={i}>
            <span className={"av " + (l[1] === "System" ? "slate" : "")}>{l[0]}</span>
            <div className="lrow-main">
              <div className="lrow-title" style={{ fontWeight: 500 }}>
                <b style={{ fontWeight: 650 }}>{l[1]}</b> <span style={{ color: "var(--text-2)" }}>{l[2]}</span>
              </div>
              <div className="lrow-sub mono" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                {l[3]}
              </div>
            </div>
            <div className="route-task-ic" style={{ width: 30, height: 30 }}>
              <Ic size={15} />
            </div>
            <span className="lrow-meta">{l[4]}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Calm placeholder for un-built destinations ---------- */
export function AdminPlaceholder({ label, icon }: { label: string; icon: string }) {
  const Ic = AdminIcons[icon] ?? AdminIcons.Grid;
  return (
    <div className="acard" style={{ padding: "64px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div className="kpi-ic" style={{ width: 52, height: 52, borderRadius: 14, marginBottom: 14 }}>
        <Ic size={24} />
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>{label}</div>
      <p style={{ fontSize: 13.5, color: "var(--text-2)", maxWidth: "44ch", lineHeight: 1.6, margin: "2px 0 20px" }}>
        This surface follows the same warm-editorial system — tables, KPI tiles and status pills you&apos;ve seen across
        the console. Wire it to <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12.5 }}>/api/admin</span> to bring
        it to life.
      </p>
      <span className="status-pill sp-neutral">Designed · pending data</span>
    </div>
  );
}
