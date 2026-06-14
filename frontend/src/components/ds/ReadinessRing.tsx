"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

export interface ReadinessRingProps {
  value?: number;
  size?: number;
  stroke?: number;
  label?: string;
  caption?: ReactNode;
  style?: CSSProperties;
}

/**
 * ReadinessRing — the signature circular progress used for the
 * candidate's readiness score. Animates the stroke on mount.
 */
export function ReadinessRing({
  value = 0,
  size = 130,
  stroke = 9,
  label = "Readiness",
  caption = null,
  style = {},
}: ReadinessRingProps) {
  const r = (size - stroke) / 2 - 2;
  const C = 2 * Math.PI * r;
  const [offset, setOffset] = useState(C);
  useEffect(() => {
    const t = setTimeout(() => setOffset(C * (1 - Math.max(0, Math.min(100, value)) / 100)), 150);
    return () => clearTimeout(t);
  }, [value, C]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", ...style }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s var(--ease-out)" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <b
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: size * 0.23,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            {value}%
          </b>
          <span
            style={{
              fontSize: "10.5px",
              color: "var(--text-3)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginTop: "1px",
            }}
          >
            {label}
          </span>
        </div>
      </div>
      {caption && <div style={{ fontSize: "12.5px", color: "var(--text-2)", textAlign: "center" }}>{caption}</div>}
    </div>
  );
}
