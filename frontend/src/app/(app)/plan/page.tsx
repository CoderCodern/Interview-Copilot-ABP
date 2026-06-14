import { PageHeader } from "@/components/app/PageHeader";
import { Placeholder } from "@/components/app/Placeholder";
import { Icons } from "@/components/icons";

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan"
        title={<>Preparation <em>Plan</em></>}
        subtitle="A day-by-day plan toward your target date."
      />
      <Placeholder
        icon={<Icons.Target size={22} />}
        title="Preparation plan"
        description="Generate a plan from a job description and target date to see scheduled tracks here."
      />
    </>
  );
}
