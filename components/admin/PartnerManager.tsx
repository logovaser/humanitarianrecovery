"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  deletePartnerAction,
  updatePartnerAction,
  uploadPartnerAction,
} from "@/app/admin/partners-actions";
import type { Partner } from "@/lib/partners/types";

type Props = {
  partners: Partner[];
};

const inputCls =
  "w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand";

export function PartnerManager({ partners }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleAdd(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await uploadPartnerAction(formData);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    });
  }

  function handleUpdate(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await updatePartnerAction(formData);
        setEditingId(null);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Update failed");
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this partner?")) return;
    setError(null);
    startTransition(async () => {
      try {
        await deletePartnerAction(id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed");
      }
    });
  }

  return (
    <div className="space-y-8">
      <form action={handleAdd} className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Add partner</h2>
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Partner name (optional)"
            className={inputCls}
          />
          <textarea
            name="description"
            rows={3}
            placeholder="Description (optional)"
            className={`${inputCls} resize-none`}
          />
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className="block w-full text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {isPending ? "Uploading…" : "Add partner"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {partners.map((partner) => {
          const editing = editingId === partner.id;

          return (
            <div
              key={partner.id}
              /* A card is roughly 200px wide, too cramped for a form, so the one
                 being edited takes the full row. */
              className={`overflow-hidden rounded-2xl bg-white shadow-sm ${
                editing ? "col-span-full" : ""
              }`}
            >
              <div className={`relative bg-surface ${editing ? "h-40" : "aspect-video"}`}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-3"
                  sizes="200px"
                />
              </div>

              {editing ? (
                <form action={handleUpdate} className="space-y-3 p-3">
                  <input type="hidden" name="id" value={partner.id} />
                  <input
                    type="text"
                    name="name"
                    defaultValue={partner.name}
                    placeholder="Partner name (optional)"
                    className={inputCls}
                  />
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={partner.description}
                    placeholder="Description (optional)"
                    className={`${inputCls} resize-none`}
                  />
                  <label className="block space-y-1">
                    <span className="text-xs text-ink/70">Replace logo (optional)</span>
                    <input
                      type="file"
                      name="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="block w-full text-sm"
                    />
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
                    >
                      {isPending ? "Saving…" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      disabled={isPending}
                      className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold text-ink hover:bg-black/5 disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-3">
                  {partner.name && (
                    <p className="mb-1 truncate text-xs font-semibold text-ink-strong">
                      {partner.name}
                    </p>
                  )}
                  {partner.description && (
                    <p className="mb-2 whitespace-pre-line text-xs leading-snug text-ink/70">
                      {partner.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setError(null);
                        setEditingId(partner.id);
                      }}
                      disabled={isPending}
                      className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-ink hover:bg-black/5 disabled:opacity-60"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(partner.id)}
                      disabled={isPending}
                      className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {partners.length === 0 && (
        <p className="text-sm text-ink/70">No partners yet. Add the first one above.</p>
      )}
    </div>
  );
}
