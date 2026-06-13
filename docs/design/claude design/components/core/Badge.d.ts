import React from "react";

/**
 * A small uppercase status pill for cards and list rows.
 */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: "outline" | "accent" | "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
