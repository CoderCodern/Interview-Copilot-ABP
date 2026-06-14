"use client";

import { useId, type CSSProperties } from "react";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
}

/**
 * Checkbox — square check with a clay fill when on. Pairs a label.
 */
export function Checkbox({ checked = false, onChange, label, disabled = false, id, style = {} }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label
      htmlFor={inputId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        position: "relative",
        ...style,
      }}
    >
      <span
        style={{
          width: "18px",
          height: "18px",
          flexShrink: 0,
          borderRadius: "var(--radius-xs)",
          display: "grid",
          placeItems: "center",
          background: checked ? "var(--accent)" : "var(--surface-raised)",
          border: "1px solid " + (checked ? "var(--accent)" : "var(--border-strong)"),
          boxShadow: checked ? "none" : "var(--shadow-xs)",
          transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
        }}
      >
        {checked && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text-on-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "var(--text)" }}>{label}</span>}
    </label>
  );
}
