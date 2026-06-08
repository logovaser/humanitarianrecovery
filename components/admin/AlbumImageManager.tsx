"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  deleteAlbumImageAction,
  setAlbumCoverAction,
  uploadAlbumImageAction,
} from "@/app/admin/actions";
import type { GalleryAlbum } from "@/lib/gallery/types";

type AlbumImageManagerProps = {
  album: GalleryAlbum;
};

export function AlbumImageManager({ album }: AlbumImageManagerProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleUpload(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await uploadAlbumImageAction(album.id, formData);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    });
  }

  function handleDelete(imageId: string) {
    if (!confirm("Delete this image?")) return;
    setError(null);
    startTransition(async () => {
      try {
        await deleteAlbumImageAction(album.id, imageId);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed");
      }
    });
  }

  function handleSetCover(imageId: string) {
    setError(null);
    startTransition(async () => {
      try {
        await setAlbumCoverAction(album.id, imageId);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not set cover");
      }
    });
  }

  return (
    <div className="space-y-6">
      <form action={handleUpload} className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Add image</h2>
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required
          className="block w-full text-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {isPending ? "Uploading..." : "Upload image"}
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {album.images.map((image) => {
          const isCover = album.coverImageId === image.id;
          return (
            <div key={image.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative aspect-16/10">
                <Image src={image.src} alt="" fill className="object-cover" sizes="320px" />
                {isCover ? (
                  <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                    Cover
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2 p-3">
                {!isCover ? (
                  <button
                    type="button"
                    onClick={() => handleSetCover(image.id)}
                    disabled={isPending}
                    className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold hover:bg-surface"
                  >
                    Set as cover
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => handleDelete(image.id)}
                  disabled={isPending}
                  className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {album.images.length === 0 ? (
        <p className="text-sm text-ink/70">No images yet. Upload the first image above.</p>
      ) : null}
    </div>
  );
}
