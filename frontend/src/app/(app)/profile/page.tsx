import { PageHeader } from "@/components/app/PageHeader";
import { Profile } from "@/components/app/Profile";

export default function ProfilePage() {
  return (
    <>
      <PageHeader eyebrow="Account" title={<><em>Profile</em></>} subtitle="Your details, target role and preferences." />
      <Profile />
    </>
  );
}
