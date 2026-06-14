"use client";

import { useState, type CSSProperties, type ElementType, type ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  interactive?: boolean;
  padded?: boolean;
  as?: ElementType;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * Card — the foundational raised surface. Optional hover-lift for
 * interactive cards. Pads by default; set padded={false} for list panels.
 */
export function Card({ children, interactive = false, padded = true, as, style = {}, onClick }: CardProps) {
  const [hover, setHover] = useState(false);
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      onClick={onClick}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: hover ? "var(--surface-raised)" : "var(--surface)",
        border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border)"),
        borderRadius: "var(--radius-xl)",
        boxShadow: hover ? "var(--shadow-md), var(--inset-line)" : "var(--shadow-sm), var(--inset-line)",
        padding: padded ? "var(--space-5)" : 0,
        transform: hover ? "translateY(-3px)" : "none",
        transition:
          "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
