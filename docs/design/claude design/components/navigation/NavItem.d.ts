import React from "react";

/**
 * A sidebar navigation row with active state, icon and optional count.
 */
export interface NavItemProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  active?: boolean;
  count?: number | string | null;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function NavItem(props: NavItemProps): JSX.Element;
