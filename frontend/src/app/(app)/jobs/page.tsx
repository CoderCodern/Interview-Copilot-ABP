import { JobAnalysis } from "@/components/app/JobAnalysis";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Job description"
        title={<>Job &amp; <em>Skill Gap</em></>}
        subtitle="What this role demands, and where you stand against it."
        actions={
          <Button variant="secondary" iconLeft={<Icons.Plus size={14} />}>
            Add job
          </Button>
        }
      />
      <JobAnalysis />
    </>
  );
}
