"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deletePartnerAction, uploadPartnerAction } from "@/app/admin/partners-actions";
import type { Partner } from "@/lib/partners/types";

type Props = {
  partners: Partner[];
};

export function PartnerManager({ partners }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
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
        {partners.map((partner) => (
          <div key={partner.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative aspect-video bg-surface">
              <Image src={partner.logo} alt={partner.name} fill className="object-contain p-3" sizes="200px" />
            </div>
            <div className="p-3">
              {partner.name && (
                <p className="mb-2 truncate text-xs font-semibold text-ink-strong">{partner.name}</p>
              )}
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
        ))}
      </div>

      {partners.length === 0 && (
        <p className="text-sm text-ink/70">No partners yet. Add the first one above.</p>
      )}
    </div>
  );
}
