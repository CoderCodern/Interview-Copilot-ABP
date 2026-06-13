import React from "react";

/**
 * Avatar — initials on a warm clay ground, or an image.
 * Serif initials echo the brand mark.
 */
export function Avatar({ name = "", src = null, size = 36, style = {} }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        background: src ? "var(--surface)" : "linear-gradient(160deg, var(--accent), var(--accent-deep))",
        color: "var(--text-on-accent)",
        fontFamily: "var(--font-serif)",
        fontWeight: 500,
        fontSize: size * 0.4,
        boxShadow: "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.2)",
        ...style,
      }}
    >
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </div>
  );
}
