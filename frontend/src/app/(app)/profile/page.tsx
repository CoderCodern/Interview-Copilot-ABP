import { PageHeader } from "@/components/app/PageHeader";
import { Placeholder } from "@/components/app/Placeholder";
import { Icons } from "@/components/icons";

export default function ProfilePage() {
  return (
    <>
      <PageHeader eyebrow="Account" title={<><em>Profile</em></>} subtitle="Your details, target role and preferences." />
      <Placeholder
        icon={<Icons.User size={22} />}
        title="User profile"
        description="Display name, timezone, target role and connected accounts."
      />
    </>
  );
}
