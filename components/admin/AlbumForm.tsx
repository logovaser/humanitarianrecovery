"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAlbumAction, updateAlbumAction } from "@/app/admin/actions";
import type { GalleryAlbum } from "@/lib/gallery/types";

type AlbumFormProps = {
  album?: GalleryAlbum;
};

export function AlbumForm({ album }: AlbumFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        if (album) {
          await updateAlbumAction(album.id, formData);
          router.refresh();
        } else {
          const created = await createAlbumAction(formData);
          router.push(`/admin/albums/${created.id}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <label className="block space-y-1">
        <span className="text-sm font-semibold">Title (Ukrainian)</span>
        <input
          name="titleUk"
          required
          defaultValue={album?.titleUk ?? ""}
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-semibold">Title (English)</span>
        <input
          name="titleEn"
          required
          defaultValue={album?.titleEn ?? ""}
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-semibold">URL slug</span>
        <input
          name="slug"
          defaultValue={album?.slug ?? ""}
          placeholder="auto-generated from English title"
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-brand"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {isPending ? "Saving..." : album ? "Save changes" : "Create album"}
      </button>
    </form>
  );
}
