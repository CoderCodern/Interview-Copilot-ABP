import React from "react";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  count?: number | string;
}

/**
 * Underline-style segmented tabs. Controlled via `value` + `onChange`.
 */
export interface TabsProps {
  items: TabItem[];
  value?: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
