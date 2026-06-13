import React from "react";

/**
 * Slim progress bar with a clay gradient fill on a warm track.
 */
export interface MeterProps {
  value?: number;
  max?: number;
  height?: number;
  tone?: "accent" | "success" | "warning" | "danger";
  style?: React.CSSProperties;
}

export function Meter(props: MeterProps): JSX.Element;
