import { PageHeader } from "@/components/app/PageHeader";
import { PrepPlan } from "@/components/app/PrepPlan";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan"
        title={<>Preparation <em>Plan</em></>}
        subtitle="A day-by-day plan toward your target date, weighted to your gaps."
        actions={
          <Button variant="secondary" iconLeft={<Icons.Sparkle size={14} />}>
            Regenerate
          </Button>
        }
      />
      <PrepPlan />
    </>
  );
}
