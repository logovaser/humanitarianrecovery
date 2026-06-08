"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteAlbumAction } from "@/app/admin/actions";

type DeleteAlbumButtonProps = {
  albumId: string;
};

export function DeleteAlbumButton({ albumId }: DeleteAlbumButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm("Delete this album and all its images?")) return;
        startTransition(async () => {
          await deleteAlbumAction(albumId);
          router.push("/admin/albums");
          router.refresh();
        });
      }}
      className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {isPending ? "Deleting..." : "Delete album"}
    </button>
  );
}
