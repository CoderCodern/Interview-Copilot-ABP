import { PageHeader } from "@/components/app/PageHeader";
import { ResumeAnalysis } from "@/components/app/ResumeAnalysis";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title={<>Resume <em>Analysis</em></>}
        subtitle="Skills, experience and a career profile, extracted from your latest upload."
        actions={
          <Button variant="secondary" iconLeft={<Icons.Upload size={14} />}>
            Upload version
          </Button>
        }
      />
      <ResumeAnalysis />
    </>
  );
}
