import type { CSSProperties, ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  style?: CSSProperties;
}

/**
 * EmptyState — calm, editorial blank slate. A serif headline, a line
 * of guidance, an optional action. Used before the first resume / JD /
 * plan exists.
 */
export function EmptyState({ icon = null, title, description, action = null, style = {} }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "48px 32px",
        gap: "6px",
        maxWidth: "420px",
        margin: "0 auto",
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "var(--radius-lg)",
            display: "grid",
            placeItems: "center",
            marginBottom: "8px",
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-ring)",
            color: "var(--accent)",
          }}
        >
          {icon}
        </div>
      )}
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "19px",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--text)",
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13.5px",
            lineHeight: 1.55,
            color: "var(--text-2)",
            margin: "2px 0 10px",
            maxWidth: "40ch",
          }}
        >
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
