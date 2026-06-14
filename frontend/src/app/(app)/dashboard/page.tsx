import { Dashboard } from "@/components/app/Dashboard";
import { PageHeader } from "@/components/app/PageHeader";
import { StreakChip } from "@/components/app/StreakChip";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wednesday, June 11"
        title={<>Good morning, <em>Coder</em>.</>}
        subtitle="Four days until your on-site. Today is a deep-work day."
        actions={<StreakChip />}
      />
      <Dashboard />
    </>
  );
}
