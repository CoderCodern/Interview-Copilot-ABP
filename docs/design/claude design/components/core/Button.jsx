import React from "react";

/**
 * Button — the primary action control.
 * Warm, tactile: primary uses the clay gradient with a top inset
 * highlight; it lifts on hover and presses down on click.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "7px 13px", fontSize: "12.5px", radius: "var(--radius-sm)", gap: "6px" },
    md: { padding: "9px 18px", fontSize: "13.5px", radius: "var(--radius-md)", gap: "8px" },
    lg: { padding: "11px 22px", fontSize: "14.5px", radius: "var(--radius-md)", gap: "9px" },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-semi)",
    fontSize: s.fontSize,
    lineHeight: 1,
    padding: s.padding,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition:
      "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  const variants = {
    primary: {
      background: "linear-gradient(180deg, var(--accent), var(--accent-deep))",
      color: "var(--text-on-accent)",
      boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.2)",
    },
    secondary: {
      background: "var(--surface-raised)",
      color: "var(--text)",
      borderColor: "var(--border-strong)",
      boxShadow: "var(--shadow-xs)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-2)",
      borderColor: "var(--border-strong)",
    },
    subtle: {
      background: "var(--accent-soft)",
      color: "var(--accent-deep)",
      borderColor: "var(--accent-ring)",
    },
    danger: {
      background: "var(--danger)",
      color: "#FBFAF7",
      boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.15)",
    },
  };

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const hoverStyle =
    hover && !disabled
      ? variant === "primary"
        ? { boxShadow: "var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.2)", transform: "translateY(-1px)" }
        : variant === "ghost"
        ? { background: "var(--hover)", color: "var(--text)" }
        : variant === "secondary"
        ? { borderColor: "var(--border-strong)", boxShadow: "var(--shadow-sm)" }
        : { filter: "brightness(0.97)" }
      : {};
  const activeStyle = active && !disabled ? { transform: "translateY(1px) scale(0.99)" } : {};

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...activeStyle, ...style }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
