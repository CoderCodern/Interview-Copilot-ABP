import { PageHeader } from "@/components/app/PageHeader";
import { Schedule } from "@/components/app/Schedule";

export default function SchedulePage() {
  return (
    <>
      <PageHeader eyebrow="This week" title={<><em>Schedule</em></>} subtitle="Your planned study blocks and mock sessions." />
      <Schedule />
    </>
  );
}
