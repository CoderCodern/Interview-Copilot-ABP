import type { ReactNode } from "react";
import { Badge, EmptyState } from "@/components/ds";

export interface PlaceholderProps {
  icon: ReactNode;
  title: string;
  description: string;
}

/**
 * Placeholder — a framed empty state for screens that ship in the full
 * product (Company Research, Plan, Schedule, Progress, Profile).
 */
export function Placeholder({ icon, title, description }: PlaceholderProps) {
  return (
    <div className="surface" style={{ padding: "20px" }}>
      <EmptyState icon={icon} title={title} description={description} action={<Badge tone="outline">In the full product</Badge>} />
    </div>
  );
}
