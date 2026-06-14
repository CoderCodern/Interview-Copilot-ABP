import { Chat } from "@/components/app/Chat";
import { PageHeader } from "@/components/app/PageHeader";

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        eyebrow="Assistant"
        title={<>AI <em>Assistant</em></>}
        subtitle="Grounded in your resume, target role and notes."
      />
      <Chat mode="assistant" />
    </>
  );
}
