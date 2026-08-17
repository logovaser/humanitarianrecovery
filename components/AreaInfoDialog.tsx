"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";

/** Only the jargon acronyms are explained. "Humanitarian Assistance" reads on
 *  its own, so it stays a plain label rather than a button that opens a
 *  dialog restating its own name. */
export type AreaId = "eore" | "nts" | "mva";

type AreaInfoDialogProps = {
  area: AreaId | null;
  onClose: () => void;
};

const TITLE_ID = "area-info-dialog-title";

export function AreaInfoDialog({ area, onClose }: AreaInfoDialogProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() renders in the top layer, so the dialog escapes the scroll-snap
  // container's clipping and stacking context without a portal.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, [area]);

  if (!area) return null;

  const entry = t.areasOfWork.glossary[area];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the backdrop report the dialog itself as the target.
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby={TITLE_ID}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border-0 bg-white p-0 shadow-2xl backdrop:bg-black/50 sm:w-full"
    >
      <div className="relative max-h-[85dvh] overflow-y-auto px-6 py-8 sm:px-8">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.common.close}
          className="absolute right-3 top-3 rounded-full p-2 text-2xl leading-none text-ink/50 hover:bg-black/5 hover:text-ink-strong"
        >
          &times;
        </button>

        <span className="inline-block rounded-full bg-brand px-4 py-1.5 text-sm font-bold text-white">
          {t.areasOfWork.tags[area]}
        </span>

        <h3 id={TITLE_ID} className="mt-4 text-xl font-bold text-ink-strong sm:text-2xl">
          {entry.term}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-ink/80 sm:text-base">{entry.text}</p>
      </div>
    </dialog>
  );
}
