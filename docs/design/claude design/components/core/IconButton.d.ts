import React from "react";

/**
 * A square control holding a single icon glyph.
 */
export interface IconButtonProps {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "soft";
  /** Accessible label (required — there's no visible text). */
  label: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
