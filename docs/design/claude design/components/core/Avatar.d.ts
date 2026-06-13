import React from "react";

/**
 * Initials on a warm clay ground, or an image.
 */
export interface AvatarProps {
  name?: string;
  src?: string | null;
  size?: number;
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
