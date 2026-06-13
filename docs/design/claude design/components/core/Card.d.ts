import React from "react";

/**
 * The foundational raised surface. Set interactive for hover-lift;
 * set padded={false} for list/panel cards that manage their own rows.
 */
export interface CardProps {
  children?: React.ReactNode;
  interactive?: boolean;
  padded?: boolean;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
