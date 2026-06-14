"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Badge, Button, Meter, ReadinessRing, type BadgeTone } from "@/components/ds";
import { Icons, type IconProps } from "@/components/icons";

interface Track {
  icon: (p: IconProps) => ReactNode;
  badge: { label: string; tone: BadgeTone };
  title: string;
  desc: string;
  value: number;
  pct: string;
  last: string;
}

interface Session {
  d: string;
  m: string;
  now?: boolean;
  title: string;
  meta: ReactNode;
}

interface Note {
  done: boolean;
  title: string;
  excerpt: string;
  meta: string;
}

const TRACKS: Track[] = [
  {
    icon: Icons.Layers,
    badge: { label: "In focus", tone: "accent" },
    title: "System Design",
    desc: "Ledgers, rate limiters, queues. Two exercises left in the payments module.",
    value: 58,
    pct: "7 / 12",
    last: "Last studied today",
  },
  {
    icon: Icons.Activity,
    badge: { label: "Steady", tone: "outline" },
    title: "Coding Drills",
    desc: "Graphs and dynamic programming this week. Strong run on medium difficulty.",
    value: 73,
    pct: "35 / 48",
    last: "Last studied yesterday",
  },
  {
    icon: Icons.User,
    badge: { label: "✓ Strong", tone: "success" },
    title: "Behavioral",
    desc: "All STAR stories drafted and rehearsed. One final pass on the leadership set.",
    value: 92,
    pct: "22 / 24",
    last: "Last studied Mon",
  },
];

const SESSIONS: Session[] = [
  {
    d: "10",
    m: "Jun",
    now: true,
    title: "Deep work: payment ledger design",
    meta: (
      <>
        <span className="live">In progress</span> · 90 min · System Design
      </>
    ),
  },
  { d: "11", m: "Jun", title: "Mock interview — system design w/ Priya", meta: "4:00 pm · 60 min · recorded for review" },
  { d: "12", m: "Jun", title: "Graph drills + spaced repetition review", meta: "Morning block · 75 min · Coding track" },
  { d: "14", m: "Jun", title: "Final review: STAR stories & questions", meta: "Evening · 45 min · light session" },
];

const NOTES: Note[] = [
  {
    done: true,
    title: "Idempotency keys — retry semantics",
    excerpt: "Client-generated keys, server-side dedup window, partial failure…",
    meta: "Reviewed today · System Design",
  },
  {
    done: false,
    title: "Double-entry ledger invariants",
    excerpt: "Debits = credits per transaction. Never mutate, only append…",
    meta: "Draft · needs examples · System Design",
  },
  {
    done: true,
    title: "STAR: migrating the billing service",
    excerpt: "Situation: 40k req/min legacy system. Task: zero-downtime cutover…",
    meta: "Rehearsed Mon · Behavioral",
  },
];

interface Stat {
  label: string;
  value: ReactNode;
  delta: string;
  muted?: boolean;
}

const STATS: Stat[] = [
  { label: "Questions completed", value: <>142 <small>/ 210</small></>, delta: "+11 this week" },
  { label: "Study time", value: <>31<small>h</small> 40<small>m</small></>, delta: "+4h 20m this week" },
  { label: "Mock interviews", value: <>7 <small>/ 10</small></>, delta: "Next: Thu 4:00 pm" },
  { label: "Avg. mock score", value: <>8.2 <small>/ 10</small></>, delta: "Stable · last 3 sessions", muted: true },
];

export function Dashboard() {
  const router = useRouter();

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <span className="hero-tag">
            <Icons.Sparkle size={12} /> Today&apos;s focus
          </span>
          <h2>System design: payment ledgers &amp; idempotent retries</h2>
          <p className="lede">
            You marked consistency trade-offs as shaky on Monday. Today pairs two ledger design exercises with your
            annotated notes from the Stripe engineering blog.
          </p>
          <div className="hero-actions">
            <Button variant="primary" iconRight={<Icons.Arrow size={13} />} onClick={() => router.push("/mock")}>
              Resume session
            </Button>
            <Button variant="ghost" onClick={() => router.push("/resume")}>
              Review notes
            </Button>
          </div>
        </div>
        <div className="hero-right">
          <ReadinessRing
            value={72}
            caption={
              <>
                <b style={{ color: "var(--text)" }}>+6%</b> since last week
                <br />
                Strongest: behavioral · Focus: system design
              </>
            }
          />
        </div>
      </section>

      <section className="stats">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={"stat-delta " + (stat.muted ? "muted" : "")}>{stat.delta}</div>
          </div>
        ))}
      </section>

      <div className="section-head">
        <h3>Study tracks</h3>
        <a onClick={() => router.push("/plan")}>View all tracks →</a>
      </div>
      <section className="grid-3">
        {TRACKS.map((t) => (
          <div className="surface topic" style={{ padding: "20px" }} key={t.title}>
            <div className="card-top">
              <div className="card-icon">
                <t.icon size={17} />
              </div>
              <Badge tone={t.badge.tone}>{t.badge.label}</Badge>
            </div>
            <h4>{t.title}</h4>
            <p className="desc">{t.desc}</p>
            <div className="topic-progress">
              <Meter value={t.value} style={{ flex: 1 }} />
              <span className="pct">{t.pct}</span>
            </div>
            <div className="card-foot">
              <span>{t.last}</span>
              <span style={{ color: "var(--accent)", fontWeight: 550 }}>Continue →</span>
            </div>
          </div>
        ))}
      </section>

      <section className="cols">
        <div className="panel">
          <div className="panel-head">
            <h3>Upcoming sessions</h3>
            <span className="hint">This week</span>
          </div>
          {SESSIONS.map((s) => (
            <div className={"session" + (s.now ? " now" : "")} key={s.title}>
              <div className="session-date">
                <b>{s.d}</b>
                <span>{s.m}</span>
              </div>
              <div className="session-body">
                <div className="session-title">{s.title}</div>
                <div className="session-meta">{s.meta}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-head">
            <h3>Recent notes</h3>
            <span className="hint">Notebook</span>
          </div>
          {NOTES.map((n) => (
            <div className="note" key={n.title}>
              <div className="note-title">
                <span className={"note-check" + (n.done ? "" : " open")}>
                  {n.done && <Icons.Check size={9} stroke={3} />}
                </span>
                {n.title}
              </div>
              <div className="note-excerpt">{n.excerpt}</div>
              <div className="note-meta">{n.meta}</div>
            </div>
          ))}
        </div>
      </section>

      <p className="foot-quote">&quot;Slow is smooth, smooth is fast.&quot; — keep the streak, not the pace.</p>
    </>
  );
}
