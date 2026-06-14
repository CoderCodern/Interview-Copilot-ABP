"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Button, Meter, ReadinessRing } from "@/components/ds";
import { Icons, type IconProps } from "@/components/icons";

function useTypewriter(text: string, speed = 34, startDelay = 650) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, speed, startDelay]);
  return { out, done };
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"mk-nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-logo">
        <div className="nav-mark">
          i<span>c</span>
        </div>
        Interview Copilot
      </div>
      <div className="nav-links">
        <a href="#workflow">Workflow</a>
        <a href="#proof">Why it works</a>
        <a href="#pricing">Pricing</a>
      </div>
      <div className="nav-cta">
        <Link href="/login" style={{ fontSize: "14px", color: "var(--text-2)" }}>
          Sign in
        </Link>
        <Link href="/login">
          <Button variant="primary" size="sm" iconRight={<Icons.Arrow size={13} />}>
            Start preparing
          </Button>
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  const { out, done } = useTypewriter(
    "Glad you're here. Let's turn nerves into a plan — what role are you preparing for?"
  );
  const [showPills, setShowPills] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowPills(true), 450);
    return () => clearTimeout(t);
  }, []);

  const pills: { icon: (p: IconProps) => ReactNode; label: string; solid?: boolean }[] = [
    { icon: Icons.Doc, label: "Analyze my resume", solid: true },
    { icon: Icons.Briefcase, label: "Paste a job description" },
    { icon: Icons.Mic, label: "Run a mock interview" },
    { icon: Icons.Building, label: "Research a company" },
  ];

  return (
    <header className="hero-mk hero-grain">
      <div className="hero-inner">
        <div>
          <span className="hero-eyebrow">
            <Icons.Sparkle size={13} /> Your AI career companion
          </span>
          <h1 className="hero-h1">
            Prepare for something <em>important</em>.
          </h1>
          <p className="hero-intro">Hey there — I&apos;m your Copilot.</p>
          <p className="hero-type">
            {out}
            {!done && <span className="cursor" />}
          </p>
          <div className={"hero-pills" + (showPills ? " show" : "")}>
            {pills.map((p) => (
              <Link key={p.label} href="/login" className={"hpill" + (p.solid ? " solid" : "")}>
                <p.icon size={15} /> {p.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hero-card">
          <div className="ring-line">
            <ReadinessRing value={72} size={104} stroke={8} />
            <div>
              <h4>Interview readiness</h4>
              <div className="sub">Stripe · Senior Backend · 4 days out</div>
              <div style={{ marginTop: "10px", fontSize: "12.5px", color: "var(--accent)", fontWeight: 600 }}>
                +6% this week
              </div>
            </div>
          </div>
          <div className="mini-track">
            <div className="lab">
              <span>Behavioral</span>
              <span>92%</span>
            </div>
            <Meter value={92} tone="success" />
          </div>
          <div className="mini-track">
            <div className="lab">
              <span>Coding drills</span>
              <span>73%</span>
            </div>
            <Meter value={73} />
          </div>
          <div className="mini-track">
            <div className="lab">
              <span>System design</span>
              <span>58%</span>
            </div>
            <Meter value={58} tone="warning" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Workflow() {
  const steps: { n: string; icon: (p: IconProps) => ReactNode; t: string; p: string }[] = [
    { n: "01", icon: Icons.Doc, t: "Resume intelligence", p: "Upload once. We extract your skills, experience and a sharp career profile — then keep it aligned to each role." },
    { n: "02", icon: Icons.Briefcase, t: "Job & company fit", p: "Paste a job description for structured requirements, a skill-gap match score, and research on the company's interview style." },
    { n: "03", icon: Icons.Target, t: "A plan to your date", p: "A day-by-day preparation plan across behavioral, coding and system design — paced to your target date." },
    { n: "04", icon: Icons.Mic, t: "AI mock interviews", p: "Practice live with a role-specific interviewer, then get rubric-based feedback and a readiness reading." },
    { n: "05", icon: Icons.Chat, t: "Always-on assistant", p: "An assistant grounded in your resume and notes — draft STAR stories, explain concepts, or get quizzed." },
    { n: "06", icon: Icons.Chart, t: "Visible progress", p: "Watch readiness climb, track study time, and walk in knowing you prepared for something that matters." },
  ];
  return (
    <section className="section" id="workflow">
      <div className="section-eyebrow">The workflow</div>
      <h2 className="section-title">One calm place, from first draft to final round.</h2>
      <p className="section-lede">
        Interview Copilot brings resume intelligence, company research, job analysis, coaching and mock interviews into
        a single, unhurried workflow.
      </p>
      <div className="flow">
        {steps.map((s) => (
          <div className="flow-card" key={s.n}>
            <div className="flow-icon">
              <s.icon size={20} />
            </div>
            <div className="flow-num">{s.n}</div>
            <h3>{s.t}</h3>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Band() {
  return (
    <div className="band" id="proof">
      <div className="band-inner">
        <div className="band-quote">
          &quot;I am preparing for something important — and this tool is <span>helping me succeed.</span>&quot;
        </div>
        <div className="band-by">THE FEELING WE DESIGN FOR</div>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <>
      <section className="cta" id="pricing">
        <h2>Walk in ready.</h2>
        <p>Start free. Bring a resume and a job description — we&apos;ll take it from there.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/login">
            <Button variant="primary" size="lg" iconRight={<Icons.Arrow size={14} />}>
              Start preparing free
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="lg">
              Book a demo
            </Button>
          </Link>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div className="nav-logo" style={{ fontSize: "16px" }}>
            <div className="nav-mark" style={{ width: 26, height: 26, fontSize: 13 }}>
              i<span>c</span>
            </div>
            Interview Copilot
          </div>
          <div className="footer-links">
            <a href="#">Product</a>
            <a href="#">Pricing</a>
            <a href="#">Privacy</a>
            <a href="#">Careers</a>
          </div>
          <div>© 2026 Interview Copilot</div>
        </div>
      </footer>
    </>
  );
}

export function Landing() {
  return (
    <>
      <Nav />
      <Hero />
      <Workflow />
      <Band />
      <CTA />
    </>
  );
}
