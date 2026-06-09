"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { removeTeamPhotoAction, uploadTeamPhotoAction } from "@/app/admin/team-actions";

type Props = {
  memberId: string;
  hasPhoto: boolean;
};

export function TeamMemberPhotoManager({ memberId, hasPhoto }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleUpload(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await uploadTeamPhotoAction(memberId, formData);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    });
  }

  function handleRemove() {
    setError(null);
    startTransition(async () => {
      try {
        await removeTeamPhotoAction(memberId);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Remove failed");
      }
    });
  }

  return (
    <div className="space-y-3">
      <form action={handleUpload} className="flex flex-wrap items-center gap-3">
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className="block text-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {isPending ? "Uploading..." : "Upload photo"}
        </button>
      </form>
      {hasPhoto ? (
        <button
          type="button"
          onClick={handleRemove}
          disabled={isPending}
          className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
        >
          Remove photo
        </button>
      ) : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
