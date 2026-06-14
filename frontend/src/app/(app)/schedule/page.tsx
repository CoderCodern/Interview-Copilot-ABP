import { PageHeader } from "@/components/app/PageHeader";
import { Placeholder } from "@/components/app/Placeholder";
import { Icons } from "@/components/icons";

export default function SchedulePage() {
  return (
    <>
      <PageHeader eyebrow="This week" title={<><em>Schedule</em></>} subtitle="Your planned study blocks and mock sessions." />
      <Placeholder
        icon={<Icons.Calendar size={22} />}
        title="Schedule"
        description="Planned sessions and mock interviews show on a weekly calendar."
      />
    </>
  );
}
