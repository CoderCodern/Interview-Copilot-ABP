import { Knowledge } from "@/components/app/Knowledge";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";

export default function KnowledgePage() {
  return (
    <>
      <PageHeader
        eyebrow="Notebook"
        title={<><em>Knowledge</em></>}
        subtitle="Your question bank, notes and spaced-repetition review."
        actions={
          <Button variant="secondary" iconLeft={<Icons.Plus size={14} />}>
            New note
          </Button>
        }
      />
      <Knowledge />
    </>
  );
}
