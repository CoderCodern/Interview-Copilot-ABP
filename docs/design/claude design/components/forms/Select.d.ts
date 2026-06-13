import React from "react";

/**
 * Styled native dropdown with a custom chevron. Pass <option> children.
 */
export interface SelectProps {
  label?: string;
  hint?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
