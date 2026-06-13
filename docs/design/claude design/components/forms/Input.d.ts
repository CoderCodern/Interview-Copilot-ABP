import React from "react";

/**
 * Single-line text field with optional label, icon, hint and error.
 *
 * @startingPoint section="Forms" subtitle="Inputs, selects, toggles" viewport="700x300"
 */
export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
