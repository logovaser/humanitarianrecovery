"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import type { Partner } from "@/lib/partners/types";

type PartnerDialogProps = {
  partner: Partner | null;
  onClose: () => void;
};

const TITLE_ID = "partner-dialog-title";

export function PartnerDialog({ partner, onClose }: PartnerDialogProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() puts the dialog in the top layer, so it escapes the scroll-snap
  // container's clipping and stacking context without needing a portal.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, [partner]);

  if (!partner) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the backdrop report the dialog itself as the target.
        if (event.target === dialogRef.current) onClose();
      }}
      // A partner name is optional in the admin, so the dialog falls back to a
      // generic label rather than shipping an unnamed modal.
      {...(partner.name
        ? { "aria-labelledby": TITLE_ID }
        : { "aria-label": t.partners.partnerLabel })}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border-0 bg-white p-0 shadow-2xl backdrop:bg-black/50 sm:w-full"
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

        <div className="relative mx-auto h-24 w-full max-w-[220px]">
          <Image src={partner.logo} alt="" fill sizes="220px" className="object-contain" />
        </div>

        {partner.name ? (
          <h3
            id={TITLE_ID}
            className="mt-6 text-center text-xl font-bold text-ink-strong sm:text-2xl"
          >
            {partner.name}
          </h3>
        ) : null}

        {partner.description ? (
          <p className="mt-3 whitespace-pre-line text-center text-sm leading-relaxed text-ink/75">
            {partner.description}
          </p>
        ) : null}
      </div>
    </dialog>
  );
}
