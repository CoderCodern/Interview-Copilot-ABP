import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "subtle" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * The primary action control. Warm clay gradient for primary;
 * quiet secondary/ghost for supporting actions.
 *
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x180"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual emphasis. @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  /** Icon node placed before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node placed after the label. */
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
