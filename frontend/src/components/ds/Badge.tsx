import type { CSSProperties, ReactNode } from "react";

export type BadgeTone = "outline" | "accent" | "success" | "warning" | "danger" | "info";

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
  style?: CSSProperties;
}

/**
 * Badge — a small status pill for state on cards & list rows.
 * tone maps to the warm status palette; "outline" is the quiet default.
 */
export function Badge({ children, tone = "outline", icon = null, style = {} }: BadgeProps) {
  const tones: Record<BadgeTone, CSSProperties> = {
    outline: { color: "var(--text-3)", background: "transparent", border: "1px solid var(--border)" },
    accent: { color: "var(--accent)", background: "var(--accent-softer)", border: "1px solid var(--accent-ring)" },
    success: { color: "var(--success)", background: "var(--success-soft)", border: "1px solid transparent" },
    warning: { color: "var(--warning)", background: "var(--warning-soft)", border: "1px solid transparent" },
    danger: { color: "var(--danger)", background: "var(--danger-soft)", border: "1px solid transparent" },
    info: { color: "var(--info)", background: "var(--info-soft)", border: "1px solid transparent" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-sans)",
        fontSize: "10.5px",
        fontWeight: "var(--weight-bold)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        padding: "3px 9px",
        borderRadius: "var(--radius-pill)",
        ...tones[tone],
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
}
