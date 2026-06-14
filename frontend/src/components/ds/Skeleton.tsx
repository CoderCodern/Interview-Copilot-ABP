import type { CSSProperties } from "react";

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  style?: CSSProperties;
}

/**
 * Skeleton — shimmering placeholder block for loading states while
 * AI work (parsing, analysis, generation) is in flight.
 */
export function Skeleton({ width = "100%", height = 14, radius = "var(--radius-sm)", style = {} }: SkeletonProps) {
  return (
    <>
      <style>{`@keyframes ic-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
      <div
        style={{
          width,
          height,
          borderRadius: radius,
          background: "linear-gradient(90deg, var(--track) 25%, var(--hover) 37%, var(--track) 63%)",
          backgroundSize: "200% 100%",
          animation: "ic-shimmer 1.4s var(--ease-soft) infinite",
          ...style,
        }}
      />
    </>
  );
}
