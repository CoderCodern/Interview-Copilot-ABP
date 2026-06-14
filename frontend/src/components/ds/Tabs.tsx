import type { CSSProperties } from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items?: TabItem[];
  value: string;
  onChange?: (id: string) => void;
  style?: CSSProperties;
}

/**
 * Tabs — underline-style segmented navigation. Controlled via `value`.
 * The active tab shows a clay underline.
 */
export function Tabs({ items = [], value, onChange, style = {} }: TabsProps) {
  return (
    <div style={{ display: "flex", gap: "4px", borderBottom: "1px solid var(--border)", ...style }}>
      {items.map((it) => {
        const active = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onChange?.(it.id)}
            style={{
              position: "relative",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "13.5px",
              fontWeight: active ? "var(--weight-semi)" : "var(--weight-book)",
              color: active ? "var(--text)" : "var(--text-2)",
              padding: "10px 14px",
              marginBottom: "-1px",
              borderBottom: "2px solid " + (active ? "var(--accent)" : "transparent"),
              transition: "color var(--dur-fast) var(--ease-out)",
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            {it.label}
            {it.count != null && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: active ? "var(--accent)" : "var(--text-3)",
                  background: "var(--accent-softer)",
                  border: "1px solid var(--border)",
                  padding: "0 6px",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                {it.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
