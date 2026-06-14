import { PageHeader } from "@/components/app/PageHeader";
import { Placeholder } from "@/components/app/Placeholder";
import { Icons } from "@/components/icons";

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title={<>Company <em>Research</em></>}
        subtitle="Culture, interview style and recent news."
      />
      <Placeholder
        icon={<Icons.Building size={22} />}
        title="Company research"
        description="Deep-dives on culture, hiring process and interview style assemble here once a company is added."
      />
    </>
  );
}
