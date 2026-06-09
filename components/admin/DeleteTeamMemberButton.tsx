"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteTeamMemberAction } from "@/app/admin/team-actions";

type Props = {
  memberId: string;
};

export function DeleteTeamMemberButton({ memberId }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this team member? This cannot be undone.")) return;
    setError(null);
    startTransition(async () => {
      try {
        await deleteTeamMemberAction(memberId);
        router.push("/admin/team");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
      >
        {isPending ? "Deleting..." : "Delete member"}
      </button>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
