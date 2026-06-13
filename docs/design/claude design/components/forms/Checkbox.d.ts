import React from "react";

/**
 * Square checkbox with a clay fill when on, plus an optional label.
 */
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
