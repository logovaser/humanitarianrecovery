"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createTeamMemberAction, updateTeamMemberAction } from "@/app/admin/team-actions";
import type { TeamMember } from "@/lib/team/types";

type Props = {
  member?: TeamMember;
};

export function TeamMemberForm({ member }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        if (member) {
          await updateTeamMemberAction(member.id, formData);
          router.refresh();
        } else {
          const created = await createTeamMemberAction(formData);
          router.push(`/admin/team/${created.id}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  const inputCls =
    "w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-brand text-sm";
  const textareaCls =
    "w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-brand text-sm font-mono min-h-[110px] resize-y";

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold">Name (English)</span>
          <input
            name="nameEn"
            required
            defaultValue={member?.nameEn ?? ""}
            className={inputCls}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-semibold">Name (Ukrainian)</span>
          <input
            name="nameUk"
            required
            defaultValue={member?.nameUk ?? ""}
            className={inputCls}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold">Role (English)</span>
          <input
            name="roleEn"
            required
            defaultValue={member?.roleEn ?? ""}
            className={inputCls}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-semibold">Role (Ukrainian)</span>
          <input
            name="roleUk"
            required
            defaultValue={member?.roleUk ?? ""}
            className={inputCls}
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold">Bio points (English)</span>
        <span className="block text-xs text-ink/60">One point per line</span>
        <textarea
          name="pointsEn"
          defaultValue={member?.pointsEn.join("\n") ?? ""}
          className={textareaCls}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold">Bio points (Ukrainian)</span>
        <span className="block text-xs text-ink/60">One point per line</span>
        <textarea
          name="pointsUk"
          defaultValue={member?.pointsUk.join("\n") ?? ""}
          className={textareaCls}
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {isPending ? "Saving..." : member ? "Save changes" : "Create member"}
      </button>
    </form>
  );
}
