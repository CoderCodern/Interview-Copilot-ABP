import type { CSSProperties } from "react";

export interface SpinnerProps {
  size?: number;
  stroke?: number;
  style?: CSSProperties;
}

/**
 * Spinner — quiet circular loading indicator in the accent color.
 */
export function Spinner({ size = 18, stroke = 2.2, style = {} }: SpinnerProps) {
  return (
    <>
      <style>{`@keyframes ic-spin{to{transform:rotate(360deg)}}`}</style>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ animation: "ic-spin 0.7s linear infinite", ...style }}
      >
        <circle cx="12" cy="12" r="9" stroke="var(--track)" strokeWidth={stroke} />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="var(--accent)" strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    </>
  );
}
