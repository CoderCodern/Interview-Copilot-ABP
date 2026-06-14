"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";

export interface SelectProps {
  label?: string;
  hint?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
}

/**
 * Select — styled native dropdown with a custom chevron, matching the
 * Input look. Keeps native a11y/keyboard behavior.
 */
export function Select({ label, hint, id, value, defaultValue, onChange, children, disabled = false, style = {} }: SelectProps) {
  const [focus, setFocus] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontFamily: "var(--font-sans)", fontSize: "12.5px", fontWeight: "var(--weight-semi)", color: "var(--text)" }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <select
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            appearance: "none",
            WebkitAppearance: "none",
            fontFamily: "var(--font-sans)",
            fontSize: "13.5px",
            color: "var(--text)",
            background: disabled ? "var(--surface-sunken)" : "var(--surface-raised)",
            border: "1px solid " + (focus ? "var(--accent)" : "var(--border-strong)"),
            borderRadius: "var(--radius-md)",
            padding: "9px 36px 9px 13px",
            outline: "none",
            cursor: "pointer",
            boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-xs)",
            transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
          }}
        >
          {children}
        </select>
        <span
          style={{ position: "absolute", right: "12px", pointerEvents: "none", color: "var(--text-3)", display: "grid", placeItems: "center" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
      {hint && <span style={{ fontFamily: "var(--font-sans)", fontSize: "11.5px", color: "var(--text-3)" }}>{hint}</span>}
    </div>
  );
}
