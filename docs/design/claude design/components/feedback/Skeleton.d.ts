import React from "react";

/**
 * Shimmering placeholder block for loading states.
 */
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  style?: React.CSSProperties;
}

export function Skeleton(props: SkeletonProps): JSX.Element;
