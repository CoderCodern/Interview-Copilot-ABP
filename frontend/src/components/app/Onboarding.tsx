"use client";

import { useEffect, useState } from "react";
import { Badge, Button, Dialog, Input, Spinner, Tag, Textarea } from "@/components/ds";
import { Icons } from "@/components/icons";

export interface OnboardingProps {
  open: boolean;
  onClose: () => void;
  onFinish: () => void;
}

const STEPS = ["Resume", "Job description", "Prep plan"];

const EXTRACTED = [".NET / C#", "PostgreSQL", "Distributed systems", "Ledgers", "Idempotency", "+8 more"];

const PLAN_COVERS = [
  "Daily system-design blocks (your focus area)",
  "Targeted Kafka & Kubernetes gap-closing",
  "3 recorded mock interviews",
  "STAR-story rehearsal & spaced review",
];

/**
 * Onboarding — the first-run flow: upload resume → add a job description
 * → generate the prep plan. A 3-step guided dialog with a stepper.
 */
export function Onboarding({ open, onClose, onFinish }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [resumeUp, setResumeUp] = useState(false);
  const [jd, setJd] = useState("");
  const [parsing, setParsing] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(0);
      setResumeUp(false);
      setJd("");
      setParsing(false);
      setGenerating(false);
    }
  }, [open]);

  const uploadResume = () => {
    setParsing(true);
    setTimeout(() => {
      setParsing(false);
      setResumeUp(true);
    }, 1300);
  };
  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const finish = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      onFinish();
    }, 1500);
  };

  const stepper = (
    <div className="ob-stepper">
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "contents" }}>
          <div className="ob-step">
            <div className={"ob-dot " + (i < step ? "done" : i === step ? "active" : "")}>
              {i < step ? <Icons.Check size={12} stroke={3} /> : i + 1}
            </div>
            <span className={"ob-label" + (i === step ? " active" : "")}>{s}</span>
          </div>
          {i < STEPS.length - 1 && <div className={"ob-line" + (i < step ? " done" : "")} />}
        </div>
      ))}
    </div>
  );

  const footer = (
    <div className="spread" style={{ width: "100%" }}>
      <Button variant="ghost" size="sm" onClick={step === 0 ? onClose : back}>
        {step === 0 ? "Skip for now" : "Back"}
      </Button>
      {step < 2 ? (
        <Button
          variant="primary"
          size="sm"
          iconRight={<Icons.Arrow size={13} />}
          disabled={(step === 0 && !resumeUp) || (step === 1 && jd.trim().length < 12)}
          onClick={next}
        >
          Continue
        </Button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          iconRight={generating ? undefined : <Icons.Arrow size={13} />}
          disabled={generating}
          onClick={finish}
        >
          {generating ? "Generating…" : "Generate plan"}
        </Button>
      )}
    </div>
  );

  return (
    <Dialog open={open} onClose={onClose} width={560} footer={footer}>
      <div style={{ marginBottom: "20px" }}>
        <div className="eyebrow" style={{ marginBottom: "10px" }}>
          Set up your prep
        </div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "18px" }}>
          {step === 0 && (
            <>
              Start with your <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>resume</em>.
            </>
          )}
          {step === 1 && (
            <>
              Add the <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>role</em> you&apos;re chasing.
            </>
          )}
          {step === 2 && (
            <>
              Your plan is <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>ready</em> to build.
            </>
          )}
        </h3>
        {stepper}
      </div>

      <div style={{ minHeight: "180px" }}>
        {step === 0 &&
          (parsing ? (
            <div className="dropzone" style={{ pointerEvents: "none" }}>
              <div className="row" style={{ justifyContent: "center", gap: "10px" }}>
                <Spinner size={18} />
                <span className="muted" style={{ fontSize: "13px" }}>
                  Reading your resume — extracting skills &amp; experience…
                </span>
              </div>
            </div>
          ) : resumeUp ? (
            <>
              <div className="file-pill" style={{ marginBottom: "14px" }}>
                <div className="card-icon" style={{ width: 34, height: 34 }}>
                  <Icons.Doc size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "13px" }}>Coder_Codern_Resume_v3.pdf</div>
                  <div className="dim" style={{ fontSize: "11.5px" }}>
                    Parsed · 12 skills · 3 roles extracted
                  </div>
                </div>
                <Badge tone="success">
                  <Icons.Check size={9} stroke={3} /> Done
                </Badge>
              </div>
              <div className="dim" style={{ fontSize: "12px", marginBottom: "8px" }}>
                We pulled out:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {EXTRACTED.map((s, i) => (
                  <Tag key={s} tone={i === EXTRACTED.length - 1 ? "neutral" : "accent"}>
                    {s}
                  </Tag>
                ))}
              </div>
            </>
          ) : (
            <div className="dropzone" onClick={uploadResume}>
              <div className="dz-ico">
                <Icons.Upload size={22} />
              </div>
              <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Upload your resume</div>
              <div className="dim" style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
                PDF or DOCX · we&apos;ll extract your skills, experience
                <br />
                and build a career profile
              </div>
            </div>
          ))}

        {step === 1 && (
          <>
            <div className="grid-2" style={{ gap: "12px", marginBottom: "12px" }}>
              <Input label="Company" placeholder="Stripe" />
              <Input label="Role title" placeholder="Senior Backend Engineer" />
            </div>
            <Textarea
              label="Paste the job description"
              rows={5}
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full JD — we'll extract requirements and match them against your resume."
            />
            <div className="dim" style={{ fontSize: "11.5px", marginTop: "8px" }}>
              {jd.trim().length < 12 ? "Paste at least a few lines to analyze." : "Looks good — we'll find the skill gaps next."}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="stack" style={{ gap: "12px" }}>
            <div className="file-pill">
              <div className="card-icon" style={{ width: 34, height: 34 }}>
                <Icons.Target size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "13px" }}>14-day plan toward Jun 15</div>
                <div className="dim" style={{ fontSize: "11.5px" }}>
                  weighted to your 2 biggest gaps
                </div>
              </div>
              <Badge tone="accent">Ready</Badge>
            </div>
            <div className="surface" style={{ padding: "14px 16px", boxShadow: "none" }}>
              <div className="dim" style={{ fontSize: "12px", marginBottom: "10px" }}>
                Your plan will cover:
              </div>
              <ul className="dash-list">
                {PLAN_COVERS.map((s) => (
                  <li key={s}>
                    <span className="b">
                      <Icons.Check size={12} stroke={3} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
