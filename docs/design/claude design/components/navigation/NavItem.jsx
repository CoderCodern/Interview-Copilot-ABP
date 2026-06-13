import React from "react";

/**
 * NavItem — a sidebar row. Active state raises the surface, shows a
 * clay edge marker, and tints the icon. Optional trailing count.
 */
export function NavItem({ icon = null, children, active = false, count = null, onClick, style = {} }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "11px",
        padding: "8px 12px", borderRadius: "var(--radius-sm)",
        position: "relative", cursor: "pointer", userSelect: "none",
        fontFamily: "var(--font-sans)", fontSize: "13.5px",
        fontWeight: active ? "var(--weight-semi)" : "var(--weight-book)",
        color: active || hover ? "var(--text)" : "var(--text-2)",
        background: active ? "var(--surface-raised)" : hover ? "var(--hover)" : "transparent",
        border: "1px solid " + (active ? "var(--border)" : "transparent"),
        boxShadow: active ? "var(--shadow-xs)" : "none",
        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
        ...style,
      }}
    >
      {active && (
        <span style={{ position: "absolute", left: "-17px", top: "7px", bottom: "7px", width: "3px", borderRadius: "0 3px 3px 0", background: "var(--accent)" }} />
      )}
      {icon && (
        <span style={{ display: "grid", placeItems: "center", color: active ? "var(--accent)" : "currentColor", opacity: active || hover ? 1 : 0.8, flexShrink: 0 }}>{icon}</span>
      )}
      <span style={{ flex: 1 }}>{children}</span>
      {count != null && (
        <span
          style={{
            fontSize: "11px", fontWeight: 500,
            color: active ? "var(--accent)" : "var(--text-3)",
            background: active ? "var(--accent-soft)" : "var(--accent-softer)",
            border: "1px solid " + (active ? "transparent" : "var(--border)"),
            padding: "1px 7px", borderRadius: "var(--radius-pill)",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
