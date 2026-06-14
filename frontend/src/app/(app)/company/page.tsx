import { CompanyResearch } from "@/components/app/CompanyResearch";
import { PageHeader } from "@/components/app/PageHeader";
import { Badge } from "@/components/ds";

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title={<>Company <em>Research</em></>}
        subtitle="Who you're meeting, how the loop runs, and what they'll probe."
        actions={<Badge tone="accent">Stripe</Badge>}
      />
      <CompanyResearch />
    </>
  );
}
