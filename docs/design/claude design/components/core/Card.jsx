import React from "react";

/**
 * Card — the foundational raised surface. Optional hover-lift for
 * interactive cards. Composes everything: stat tiles, topic cards,
 * panels. Pads by default; set padded={false} for list panels.
 */
export function Card({ children, interactive = false, padded = true, as = "div", style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  return (
    <Tag
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: hover ? "var(--surface-raised)" : "var(--surface)",
        border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border)"),
        borderRadius: "var(--radius-xl)",
        boxShadow: hover ? "var(--shadow-md), var(--inset-line)" : "var(--shadow-sm), var(--inset-line)",
        padding: padded ? "var(--space-5)" : 0,
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
