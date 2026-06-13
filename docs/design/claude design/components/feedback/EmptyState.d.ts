import React from "react";

/**
 * Calm editorial blank slate — serif headline, guidance, optional action.
 */
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
