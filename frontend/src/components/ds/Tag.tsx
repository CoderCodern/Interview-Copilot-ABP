import type { CSSProperties, ReactNode } from "react";

export type TagTone = "neutral" | "accent" | "matched" | "gap";

export interface TagProps {
  children: ReactNode;
  tone?: TagTone;
  removable?: boolean;
  onRemove?: () => void;
  style?: CSSProperties;
}

/**
 * Tag — a soft, mixed-case chip for skills, categories, filters.
 * Lower-key than Badge: not uppercase, optional removable affordance.
 */
export function Tag({ children, tone = "neutral", removable = false, onRemove, style = {} }: TagProps) {
  const tones: Record<TagTone, CSSProperties> = {
    neutral: { color: "var(--text-2)", background: "var(--surface)", border: "1px solid var(--border)" },
    accent: { color: "var(--accent-deep)", background: "var(--accent-soft)", border: "1px solid var(--accent-ring)" },
    matched: { color: "var(--success)", background: "var(--success-soft)", border: "1px solid transparent" },
    gap: { color: "var(--danger)", background: "var(--danger-soft)", border: "1px solid transparent" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
        fontWeight: "var(--weight-medium)",
        padding: "4px 10px",
        borderRadius: "var(--radius-pill)",
        ...tones[tone],
        ...style,
      }}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 0,
            display: "grid",
            placeItems: "center",
            color: "currentColor",
            opacity: 0.6,
            lineHeight: 0,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </span>
  );
}
