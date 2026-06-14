"use client";

import { Fragment, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { Button, IconButton } from "@/components/ds";
import { Icons } from "@/components/icons";

type EventKind = "study" | "mock" | "review" | "rest";

interface CalEvent {
  c: EventKind;
  t: string;
  s: string;
}

const DAYS: [string, string][] = [
  ["Mon", "9"],
  ["Tue", "10"],
  ["Wed", "11"],
  ["Thu", "12"],
  ["Fri", "13"],
  ["Sat", "14"],
  ["Sun", "15"],
];
const TODAY_COL = 2;
const TIMES = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM"];

const EVENTS: Record<string, CalEvent> = {
  "0-0": { c: "study", t: "Rate limiters", s: "90m" },
  "1-1": { c: "study", t: "Graph drills", s: "75m" },
  "2-0": { c: "study", t: "Ledger deep work", s: "90m" },
  "2-4": { c: "review", t: "Notes review", s: "30m" },
  "3-3": { c: "mock", t: "Mock · Priya", s: "60m" },
  "4-1": { c: "study", t: "Kafka basics", s: "45m" },
  "4-4": { c: "study", t: "k8s primer", s: "60m" },
  "5-2": { c: "study", t: "STAR refine", s: "40m" },
  "6-0": { c: "review", t: "Final review", s: "45m" },
  "6-3": { c: "rest", t: "Rest", s: "" },
};

const LABELS: Record<EventKind, string> = {
  study: "Study block",
  mock: "Mock interview",
  review: "Review",
  rest: "Rest",
};

const STATS: [string, string, string, string][] = [
  ["Planned this week", "9h 15m", "6 study · 1 mock", ""],
  ["Completed", "3h 40m", "+1h vs. last week", ""],
  ["Next session", "Thu 3:00", "Mock · system design", ""],
  ["Days to on-site", "4", "Target · Jun 15", "muted"],
];

const todayBg = (col: number): CSSProperties => (col === TODAY_COL ? { background: "var(--accent-softer)" } : {});

export function Schedule() {
  const router = useRouter();

  return (
    <div className="stack">
      <div className="stats" style={{ marginBottom: "4px" }}>
        {STATS.map(([l, v, d, c]) => (
          <div className="stat" key={l}>
            <div className="stat-label">{l}</div>
            <div className="stat-value">{v}</div>
            <div className={"stat-delta " + c}>{d}</div>
          </div>
        ))}
      </div>

      <div className="spread">
        <div className="row" style={{ gap: "12px" }}>
          <IconButton label="Previous week" variant="outline" size="sm">
            <Icons.ChevronRight size={15} style={{ transform: "rotate(180deg)" }} />
          </IconButton>
          <span className="serif-h" style={{ fontSize: "16px" }}>
            Jun 9 – 15, 2026
          </span>
          <IconButton label="Next week" variant="outline" size="sm">
            <Icons.ChevronRight size={15} />
          </IconButton>
        </div>
        <Button variant="secondary" size="sm" iconLeft={<Icons.Plus size={13} />}>
          Add block
        </Button>
      </div>

      <div className="cal">
        <div className="cal-grid">
          <div className="cal-head" style={{ borderRight: "1px solid var(--border)" }} />
          {DAYS.map(([w, d], i) => (
            <div className={"cal-head" + (i === TODAY_COL ? " today" : "")} key={w}>
              {w}
              <b>{d}</b>
            </div>
          ))}
          {TIMES.map((time, r) => (
            <Fragment key={time}>
              <div className="cal-time">{time}</div>
              {DAYS.map((_, c) => {
                const e = EVENTS[c + "-" + r];
                return (
                  <div className="cal-cell" key={c} style={todayBg(c)}>
                    {e && (
                      <div className={"evt " + e.c} title={LABELS[e.c]}>
                        <b>{e.t}</b>
                        {e.s}
                      </div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: "4px" }}>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "12px" }}>Up next</div>
          <div className="row" style={{ gap: "13px", padding: "10px 0" }}>
            <div className="session-date" style={{ background: "var(--info-soft)" }}>
              <b>12</b>
              <span>Jun</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13.5px", fontWeight: 550 }}>Mock interview — system design</div>
              <div className="dim" style={{ fontSize: "12px", marginTop: "1px" }}>
                Thu 3:00 pm · 60 min · with Priya · recorded
              </div>
            </div>
            <Button variant="primary" size="sm" onClick={() => router.push("/mock")}>
              Join
            </Button>
          </div>
        </div>
        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="spread" style={{ marginBottom: "12px" }}>
            <div style={{ fontWeight: 600, fontSize: "13.5px" }}>Legend</div>
            <span className="dim" style={{ fontSize: "11.5px" }}>
              drag blocks to reschedule
            </span>
          </div>
          <div className="legend">
            <span>
              <i style={{ background: "var(--accent)" }} />
              Study block
            </span>
            <span>
              <i style={{ background: "var(--info)" }} />
              Mock interview
            </span>
            <span>
              <i style={{ background: "var(--success)" }} />
              Review
            </span>
            <span>
              <i style={{ background: "var(--track)" }} />
              Rest
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
