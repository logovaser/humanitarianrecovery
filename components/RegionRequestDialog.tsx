"use client";

import { useEffect, useRef } from "react";
import { EducationRequestForm } from "@/components/EducationRequestForm";
import { useLanguage } from "@/components/LanguageProvider";
import type { RegionId } from "@/lib/map/ukraine-regions";

type RegionRequestDialogProps = {
  region: RegionId | null;
  onClose: () => void;
};

const TITLE_ID = "region-request-dialog-title";

export function RegionRequestDialog({ region, onClose }: RegionRequestDialogProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() puts the dialog in the top layer, which is what lets it escape
  // the scroll-snap container's clipping and stacking context without a portal.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, [region]);

  // Unmounting between regions is deliberate: it resets the form's submitted
  // state so a second region does not open on the previous success message.
  if (!region) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the backdrop report the dialog itself as the target.
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby={TITLE_ID}
      className="m-auto w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-2xl backdrop:bg-black/50 sm:w-full"
    >
      <div className="max-h-[85dvh] overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 id={TITLE_ID} className="text-2xl font-bold text-ink-strong sm:text-3xl">
              {t.geography.regions[region]}
            </h2>
            <p className="mt-2 text-ink/70">{t.geography.regionDialogSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="-mr-2 -mt-2 shrink-0 rounded-full p-2 text-2xl leading-none text-ink/50 hover:bg-black/5 hover:text-ink-strong"
          >
            &times;
          </button>
        </div>

        <EducationRequestForm showHeading={false} />
      </div>
    </dialog>
  );
}
