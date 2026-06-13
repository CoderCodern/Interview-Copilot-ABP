import React from "react";

/**
 * Switch — the pill toggle used for theme & settings. Clay track when on.
 */
export function Switch({ checked = false, onChange, label, disabled = false, id, style = {} }) {
  const inputId = id || "sw-" + Math.random().toString(36).slice(2, 8);
  return (
    <label htmlFor={inputId} style={{ display: "inline-flex", alignItems: "center", gap: "12px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--text-2)" }}>{label}</span>}
      <span
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: "34px", height: "19px", flexShrink: 0,
          borderRadius: "var(--radius-pill)",
          position: "relative",
          background: checked ? "var(--accent)" : "var(--track)",
          border: "1px solid " + (checked ? "var(--accent)" : "var(--border-strong)"),
          transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
        }}
      >
        <span
          style={{
            position: "absolute", top: "1.5px", left: "2px",
            width: "13px", height: "13px", borderRadius: "50%",
            background: "var(--surface-raised)",
            boxShadow: "0 1px 2px rgba(var(--shadow-color), 0.25)",
            transform: checked ? "translateX(14px)" : "translateX(0)",
            transition: "transform var(--dur-base) var(--ease-out)",
          }}
        />
      </span>
      <input id={inputId} type="checkbox" checked={checked} onChange={(e) => onChange && onChange(e.target.checked)} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
    </label>
  );
}
