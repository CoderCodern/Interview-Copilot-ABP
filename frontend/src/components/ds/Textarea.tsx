"use client";

import { useId, useState, type CSSProperties } from "react";

export interface TextareaProps {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  style?: CSSProperties;
}

/**
 * Textarea — multi-line field. Used for JD paste, notes, STAR answers.
 */
export function Textarea({
  label,
  hint,
  error,
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  style = {},
}: TextareaProps) {
  const [focus, setFocus] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const borderColor = error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border-strong)";
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
      <textarea
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          fontFamily: "var(--font-sans)",
          fontSize: "13.5px",
          lineHeight: 1.55,
          color: "var(--text)",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-raised)",
          border: "1px solid " + borderColor,
          borderRadius: "var(--radius-md)",
          padding: "11px 13px",
          outline: "none",
          resize: "vertical",
          boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-xs)",
          transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
        }}
      />
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11.5px", color: error ? "var(--danger)" : "var(--text-3)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
