import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { TeamMemberList } from "@/components/admin/TeamMemberList";
import { getTeamMembers } from "@/lib/team/service";

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <AdminShell title="Team members">
      <div className="mb-6">
        <Link
          href="/admin/team/new"
          className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
        >
          Add member
        </Link>
      </div>

      <TeamMemberList initialMembers={members} />
    </AdminShell>
  );
}
