import React from "react";

/**
 * The signature circular readiness gauge. Animates its stroke on mount.
 *
 * @startingPoint section="Feedback" subtitle="Readiness ring, meters, empty & loading states" viewport="700x340"
 */
export interface ReadinessRingProps {
  /** 0–100 */
  value?: number;
  size?: number;
  stroke?: number;
  label?: string;
  caption?: React.ReactNode;
  style?: React.CSSProperties;
}

export function ReadinessRing(props: ReadinessRingProps): JSX.Element;
