import { AdminShell } from "@/components/admin/AdminShell";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <AdminShell title="Add team member">
      <TeamMemberForm />
    </AdminShell>
  );
}
