import React from "react";

/**
 * Pill toggle for theme & settings. Clay track when on.
 * onChange receives the next boolean state.
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
