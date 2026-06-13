import React from "react";

/**
 * A single transient notification card with a tinted accent rail.
 */
export interface ToastProps {
  title: string;
  message?: string;
  tone?: "accent" | "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

export function Toast(props: ToastProps): JSX.Element;
