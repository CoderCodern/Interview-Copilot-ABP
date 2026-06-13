import React from "react";

/**
 * Toast — a single transient notification card. tone tints the leading
 * accent rail. Render in a fixed bottom-right stack.
 */
export function Toast({ title, message, tone = "accent", icon = null, onDismiss, style = {} }) {
  const rail = {
    accent: "var(--accent)", success: "var(--success)",
    warning: "var(--warning)", danger: "var(--danger)", info: "var(--info)",
  }[tone] || "var(--accent)";
  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: "12px",
        width: "320px", padding: "14px 16px",
        background: "var(--surface-raised)",
        border: "1px solid var(--border)",
        borderLeft: "3px solid " + rail,
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg), var(--inset-line)",
        ...style,
      }}
    >
      {icon && <span style={{ color: rail, display: "grid", placeItems: "center", marginTop: "1px" }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: "var(--weight-semi)", color: "var(--text)" }}>{title}</div>
        {message && <div style={{ fontFamily: "var(--font-sans)", fontSize: "12.5px", color: "var(--text-2)", marginTop: "2px", lineHeight: 1.45 }}>{message}</div>}
      </div>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-3)", padding: 0, lineHeight: 0, marginTop: "1px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </div>
  );
}
