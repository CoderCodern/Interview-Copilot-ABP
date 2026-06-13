import React from "react";

/**
 * Centered modal on a warm scrim. Controlled via `open` + `onClose`.
 */
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}

export function Dialog(props: DialogProps): JSX.Element | null;
