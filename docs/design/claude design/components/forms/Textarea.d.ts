import React from "react";

/**
 * Multi-line text field for JD paste, notes and STAR answers.
 */
export interface TextareaProps {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Textarea(props: TextareaProps): JSX.Element;
