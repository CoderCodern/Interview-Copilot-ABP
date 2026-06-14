"use client";

import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";
import { useOnboarding } from "./OnboardingProvider";

export function AddJobButton() {
  const { openOnboarding } = useOnboarding();
  return (
    <Button variant="secondary" iconLeft={<Icons.Plus size={14} />} onClick={openOnboarding}>
      Add job
    </Button>
  );
}
