"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  deleteAlbumImageAction,
  setAlbumCoverAction,
  uploadAlbumImageAction,
} from "@/app/admin/actions";
import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_IMAGE_TYPES_ERROR,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_MB,
} from "@/lib/gallery/limits";
import type { GalleryAlbum } from "@/lib/gallery/types";

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type AlbumImageManagerProps = {
  album: GalleryAlbum;
};

export function AlbumImageManager({ album }: AlbumImageManagerProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    setError(null);
    const images = Array.from(list).filter((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    if (images.length < list.length) {
      setError(ACCEPTED_IMAGE_TYPES_ERROR);
    }
    setFiles((current) => [...current, ...images]);
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
  }

  function handleUpload() {
    setError(null);
    const tooLarge = files.filter((file) => file.size > MAX_UPLOAD_BYTES);
    const toUpload = files.filter((file) => file.size <= MAX_UPLOAD_BYTES);
    const errors = tooLarge.map(
      (file) => `${file.name}: image must be smaller than ${MAX_UPLOAD_MB} MB`,
    );

    if (toUpload.length === 0) {
      setError(errors.join("\n") || "No image selected");
      return;
    }

    startTransition(async () => {
      // Files that fail stay in the list so the admin can retry or remove them.
      const remaining = [...tooLarge];
      // Upload one file per request: each request stays under the body size
      // limit, and gallery.json is read and written by one action at a time.
      for (const [index, file] of toUpload.entries()) {
        setProgress({ done: index, total: toUpload.length });
        const fileData = new FormData();
        fileData.append("file", file);
        try {
          const result = await uploadAlbumImageAction(album.id, fileData);
          if ("error" in result) {
            errors.push(`${file.name}: ${result.error}`);
            remaining.push(file);
          }
        } catch {
          // Network failures and session expiry still throw.
          errors.push(`${file.name}: Upload failed`);
          remaining.push(file);
        }
      }
      setProgress(null);
      setFiles(remaining);
      if (errors.length > 0) setError(errors.join("\n"));
      router.refresh();
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
        <h2 className="mb-4 text-lg font-bold">Add images</h2>

        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            // dragleave also fires when the pointer moves onto the icon or text inside the zone.
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsDragging(false);
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            addFiles(event.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            isDragging
              ? "border-brand bg-brand/5"
              : "border-black/15 hover:border-brand hover:bg-surface"
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="mb-3 h-10 w-10 text-brand"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
            />
          </svg>
          <span className="text-sm font-semibold text-ink-strong">
            Click to choose images or drag them here
          </span>
          <span className="mt-1 text-xs text-ink/60">
            JPEG, PNG, WebP or GIF, up to {MAX_UPLOAD_MB} MB each
          </span>
          <input
            type="file"
            multiple
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            onChange={(event) => {
              addFiles(event.target.files);
              // Clear the input so choosing the same file again still fires onChange.
              event.target.value = "";
            }}
            className="sr-only"
          />
        </label>

        {files.length > 0 ? (
          <ul className="mt-4 divide-y divide-black/5 rounded-xl border border-black/10">
            {files.map((file, index) => {
              const isTooLarge = file.size > MAX_UPLOAD_BYTES;
              return (
                <li
                  key={`${file.name}-${file.lastModified}-${index}`}
                  className="flex items-center justify-between gap-3 px-4 py-2 text-sm"
                >
                  <span className="min-w-0 truncate">{file.name}</span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className={isTooLarge ? "font-semibold text-red-600" : "text-ink/60"}>
                      {isTooLarge ? `Too large (${formatSize(file.size)})` : formatSize(file.size)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      disabled={isPending}
                      aria-label={`Remove ${file.name}`}
                      className="rounded-full px-2 text-lg leading-none text-ink/50 hover:bg-black/5 hover:text-ink-strong"
                    >
                      &times;
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}

        <button
          type="submit"
          disabled={isPending || files.length === 0}
          className="mt-4 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {progress
            ? `Uploading ${progress.done + 1} of ${progress.total}...`
            : isPending
              ? "Uploading..."
              : files.length > 0
                ? `Upload ${files.length} ${files.length === 1 ? "image" : "images"}`
                : "Upload images"}
        </button>
      </form>

      {error ? <p className="whitespace-pre-line text-sm text-red-600">{error}</p> : null}

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
