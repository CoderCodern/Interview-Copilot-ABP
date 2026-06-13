import React from "react";

/**
 * A soft mixed-case chip for skills, categories and filters.
 */
export interface TagProps {
  children?: React.ReactNode;
  tone?: "neutral" | "accent" | "matched" | "gap";
  removable?: boolean;
  onRemove?: () => void;
  style?: React.CSSProperties;
}

export function Tag(props: TagProps): JSX.Element;
