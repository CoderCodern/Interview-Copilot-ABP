import { AddJobButton } from "@/components/app/AddJobButton";
import { JobAnalysis } from "@/components/app/JobAnalysis";
import { PageHeader } from "@/components/app/PageHeader";

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Job description"
        title={<>Job &amp; <em>Skill Gap</em></>}
        subtitle="What this role demands, and where you stand against it."
        actions={<AddJobButton />}
      />
      <JobAnalysis />
    </>
  );
}
