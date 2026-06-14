"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";
import { AdminIcons } from "./adminIcons";

interface RouteModel {
  k: string;
  logo: string;
  name: string;
  meta: string;
}

const ROUTE_MODELS: Record<string, RouteModel> = {
  "claude-sonnet": { k: "C", logo: "claude", name: "Claude Sonnet 4.5", meta: "$3 / $15" },
  "claude-haiku": { k: "C", logo: "claude", name: "Claude Haiku 4", meta: "$0.80 / $4" },
  "gpt5-vision": { k: "G", logo: "openai", name: "GPT-5 Vision", meta: "$2.50 / $10" },
  "gpt5-mini": { k: "G", logo: "openai", name: "GPT-5 Mini", meta: "$0.40 / $1.60" },
  "gemini-pro": { k: "G", logo: "gemini", name: "Gemini 2.5 Pro", meta: "$1.25 / $5" },
};

interface Route {
  id: string;
  ic: string;
  task: string;
  sub: string;
  model: string;
}

const INITIAL: Route[] = [
  { id: "resume", ic: "Doc", task: "Resume Analysis", sub: "Skill & experience extraction", model: "claude-sonnet" },
  { id: "jd", ic: "Briefcase", task: "JD Analysis", sub: "Requirement & skill-gap mapping", model: "claude-sonnet" },
  { id: "ocr", ic: "Vision", task: "Image OCR", sub: "Scanned resume / document vision", model: "gpt5-vision" },
  { id: "mock", ic: "Mic", task: "Mock Interview", sub: "Live coaching & transcript scoring", model: "claude-sonnet" },
  { id: "research", ic: "Building", task: "Company Research", sub: "Long-context briefing synthesis", model: "gemini-pro" },
  { id: "chat", ic: "Chat", task: "AI Assistant", sub: "General chat & follow-ups", model: "claude-sonnet" },
  { id: "kb", ic: "Book", task: "Knowledge Base", sub: "Question generation & embeddings", model: "claude-haiku" },
];

const FALLBACKS: [string, string, string][] = [
  ["On timeout (> 8s)", "Retry once, then Haiku", "Refresh"],
  ["On rate limit (429)", "Failover to Gemini Pro", "Shuffle"],
  ["On provider outage", "Queue & alert operator", "Alert"],
];

export function AdminRouting() {
  const [routes, setRoutes] = useState<Route[]>(INITIAL);
  const [open, setOpen] = useState<string | null>(null);

  const assign = (rowId: string, modelKey: string) => {
    setRoutes((r) => r.map((x) => (x.id === rowId ? { ...x, model: modelKey } : x)));
    setOpen(null);
  };

  useEffect(() => {
    const close = () => setOpen(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div className="grid-12" style={{ alignItems: "start" }}>
      <div className="acard">
        <div className="acard-head">
          <h3>Task → model routing</h3>
          <span className="hint">7 tasks mapped</span>
        </div>
        <div className="route-map">
          {routes.map((r) => {
            const Ic = AdminIcons[r.ic] ?? AdminIcons.Doc;
            const m = ROUTE_MODELS[r.model];
            return (
              <div className="route-row" key={r.id}>
                <div className="route-task">
                  <span className="route-grip">
                    <AdminIcons.Drag size={16} />
                  </span>
                  <div className="route-task-ic">
                    <Ic size={16} />
                  </div>
                  <div>
                    <div className="route-task-name">{r.task}</div>
                    <div className="route-task-sub">{r.sub}</div>
                  </div>
                </div>
                <div className="route-arrow">
                  <Icons.Arrow size={17} />
                </div>
                <div style={{ position: "relative" }}>
                  <div
                    className="route-target"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(open === r.id ? null : r.id);
                    }}
                  >
                    <span className={"badge-logo " + m.logo}>{m.k}</span>
                    <span className="route-target-name">{m.name}</span>
                    <span className="route-target-meta">{m.meta}</span>
                    <Icons.ChevronRight size={14} style={{ transform: "rotate(90deg)", color: "var(--text-3)" }} />
                  </div>
                  {open === r.id && (
                    <div className="route-menu" onClick={(e) => e.stopPropagation()}>
                      {Object.entries(ROUTE_MODELS).map(([key, mm]) => (
                        <div
                          key={key}
                          className={"route-menu-item" + (key === r.model ? " sel" : "")}
                          onClick={() => assign(r.id, key)}
                        >
                          <span className={"badge-logo " + mm.logo}>{mm.k}</span>
                          <span style={{ flex: 1, fontWeight: 550 }}>{mm.name}</span>
                          <span style={{ fontSize: 11, color: "var(--text-3)" }}>{mm.meta}</span>
                          {key === r.model && <Icons.Check size={13} stroke={2.6} style={{ color: "var(--accent)" }} />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="acard-foot">
          <span className="hint">Changes apply on next request · no deploy needed</span>
          <Button variant="primary" size="sm" iconRight={<Icons.Check size={13} stroke={2.6} />}>
            Save routing
          </Button>
        </div>
      </div>

      <div className="stack" style={{ gap: 16 }}>
        <div className="acard">
          <div className="acard-head mb-0" style={{ borderBottom: "none", paddingBottom: 0 }}>
            <h3>Available models</h3>
          </div>
          <div className="acard-body">
            <div className="route-palette">
              {Object.values(ROUTE_MODELS).map((m) => (
                <div className="route-chip" key={m.name}>
                  <span className={"badge-logo " + m.logo}>{m.k}</span>
                  {m.name}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 16, lineHeight: 1.6 }}>
              Routing is evaluated per request. Cheaper models handle high-volume, low-stakes tasks; Sonnet carries
              reasoning-heavy flows.
            </p>
          </div>
        </div>

        <div className="acard">
          <div className="acard-head">
            <h3>Fallback policy</h3>
          </div>
          <div className="acard-body" style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {FALLBACKS.map(([k, v, ic]) => {
              const Ic = AdminIcons[ic] ?? AdminIcons.Refresh;
              return (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="route-task-ic" style={{ width: 30, height: 30 }}>
                    <Ic size={15} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{k}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-2)", marginTop: 1 }}>{v}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
