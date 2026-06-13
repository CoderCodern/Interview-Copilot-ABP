import React from "react";

/**
 * Quiet circular loading indicator in the accent color.
 */
export interface SpinnerProps {
  size?: number;
  stroke?: number;
  style?: React.CSSProperties;
}

export function Spinner(props: SpinnerProps): JSX.Element;
