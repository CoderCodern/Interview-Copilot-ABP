import type { CSSProperties } from "react";

export type MeterTone = "accent" | "success" | "warning" | "danger";

export interface MeterProps {
  value?: number;
  max?: number;
  height?: number;
  tone?: MeterTone;
  style?: CSSProperties;
}

/**
 * Meter — the slim progress bar used everywhere (plans, tracks,
 * skill match). Clay gradient fill on a warm track.
 */
export function Meter({ value = 0, max = 100, height = 5, tone = "accent", style = {} }: MeterProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fills: Record<MeterTone, string> = {
    accent: "linear-gradient(90deg, var(--accent), var(--accent-deep))",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
  };
  return (
    <div style={{ height, borderRadius: "var(--radius-pill)", background: "var(--track)", overflow: "hidden", ...style }}>
      <div
        style={{
          width: pct + "%",
          height: "100%",
          borderRadius: "var(--radius-pill)",
          background: fills[tone],
          transition: "width 0.6s var(--ease-out)",
        }}
      />
    </div>
  );
}
