import { PageHeader } from "@/components/app/PageHeader";
import { Placeholder } from "@/components/app/Placeholder";
import { Icons } from "@/components/icons";

export default function ProgressPage() {
  return (
    <>
      <PageHeader eyebrow="Trends" title={<><em>Progress</em></>} subtitle="Readiness over time, by track." />
      <Placeholder
        icon={<Icons.Chart size={22} />}
        title="Progress"
        description="Readiness trends, study-time charts and per-track breakdowns live here."
      />
    </>
  );
}
