import { Chat } from "@/components/app/Chat";
import { PageHeader } from "@/components/app/PageHeader";
import { Badge } from "@/components/ds";

export default function MockPage() {
  return (
    <>
      <PageHeader
        eyebrow="Practice"
        title={<>Mock <em>Interview</em></>}
        subtitle="A live, recorded session. Answer aloud or in text — feedback follows."
        actions={<Badge tone="accent">60 min · System Design</Badge>}
      />
      <Chat mode="mock" />
    </>
  );
}
