import React from "react";

/**
 * IconButton — a square, quiet control for a single glyph
 * (close, more, theme toggle). Pass an SVG/icon as children.
 */
export function IconButton({
  children,
  size = "md",
  variant = "ghost",
  label,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const dims = { sm: 28, md: 34, lg: 40 }[size] || 34;
  const [hover, setHover] = React.useState(false);

  const variants = {
    ghost: { background: hover ? "var(--hover)" : "transparent", color: hover ? "var(--text)" : "var(--text-2)", border: "1px solid transparent" },
    outline: { background: hover ? "var(--hover)" : "var(--surface)", color: "var(--text-2)", border: "1px solid var(--border)" },
    soft: { background: "var(--accent-soft)", color: "var(--accent-deep)", border: "1px solid var(--accent-ring)" },
  };

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: dims,
        height: dims,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
