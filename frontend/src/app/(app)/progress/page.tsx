import { PageHeader } from "@/components/app/PageHeader";
import { Progress } from "@/components/app/Progress";
import { Badge } from "@/components/ds";

export default function ProgressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trends"
        title={<><em>Progress</em></>}
        subtitle="Readiness over time, by track."
        actions={<Badge tone="success">+6% this week</Badge>}
      />
      <Progress />
    </>
  );
}
