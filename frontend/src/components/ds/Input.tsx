"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";

export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

/**
 * Input — single-line text field with optional label, leading icon,
 * hint and error. Calm by default; clay focus ring on focus.
 */
export function Input({
  label,
  hint,
  error,
  icon = null,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  style = {},
}: InputProps) {
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
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: "12px",
              display: "grid",
              placeItems: "center",
              color: "var(--text-3)",
              pointerEvents: "none",
            }}
          >
            {icon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            fontFamily: "var(--font-sans)",
            fontSize: "13.5px",
            color: "var(--text)",
            background: disabled ? "var(--surface-sunken)" : "var(--surface-raised)",
            border: "1px solid " + borderColor,
            borderRadius: "var(--radius-md)",
            padding: icon ? "9px 13px 9px 36px" : "9px 13px",
            outline: "none",
            boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-xs)",
            transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
          }}
        />
      </div>
      {(hint || error) && (
        <span
          style={{ fontFamily: "var(--font-sans)", fontSize: "11.5px", color: error ? "var(--danger)" : "var(--text-3)" }}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}
