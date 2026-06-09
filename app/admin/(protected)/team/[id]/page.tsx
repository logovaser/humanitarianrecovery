import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { DeleteTeamMemberButton } from "@/components/admin/DeleteTeamMemberButton";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { TeamMemberPhotoManager } from "@/components/admin/TeamMemberPhotoManager";
import { getTeamMemberById } from "@/lib/team/service";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTeamMemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <AdminShell title="Edit team member">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link href="/admin/team" className="text-sm font-semibold text-brand hover:text-brand-dark">
          ← Back to team
        </Link>
        <DeleteTeamMemberButton memberId={member.id} />
      </div>

      <div className="space-y-10">
        <TeamMemberForm member={member} />

        <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-ink-strong">Photo</h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-surface">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.nameEn}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-b from-brand-deep to-brand-darker" />
              )}
            </div>
            <TeamMemberPhotoManager memberId={member.id} hasPhoto={!!member.photo} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
