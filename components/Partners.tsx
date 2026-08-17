"use client";

import { useState } from "react";
import Image from "next/image";
import { PageSection } from "@/components/PageSection";
import { PartnerDialog } from "@/components/PartnerDialog";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";
import type { Partner } from "@/lib/partners/types";

const SLOT_COUNT = 12;

/** The heading is absolutely positioned over these two slots on sm and up,
 *  which is why they are hidden there. A partner placed in one would disappear
 *  on desktop, so they stay empty and the logos flow around them. */
const RESERVED_SLOTS = new Set([4, 5]);

type PartnersProps = {
  partners: Partner[];
};

export function Partners({ partners }: PartnersProps) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Partner | null>(null);

  const queue = [...partners];
  const slots = Array.from({ length: SLOT_COUNT }, (_, i) =>
    RESERVED_SLOTS.has(i) ? null : (queue.shift() ?? null),
  );

  return (
    <PageSection id="partners" bg="from-brand to-brand" className="flex flex-col">
      {/* flex-1 + justify-center sits the block in the middle of the section
          instead of at the top. safe centring falls back to top-aligned once
          the content outgrows a short viewport, rather than clipping the first
          row off-screen. */}
      <div className="relative mx-auto flex flex-1 w-full max-w-site flex-col justify-center-safe px-8 py-16 sm:px-12 sm:py-20">
        <h2 className="static mb-8 text-5xl font-bold text-white sm:absolute sm:left-12 sm:top-1/2 sm:z-10 sm:mb-0 sm:-translate-y-1/2 sm:text-6xl">
          {t.partners.title}
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {slots.map((partner, i) => {
            const base = `relative h-24 overflow-hidden rounded-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-28 ${
              RESERVED_SLOTS.has(i) ? "sm:invisible" : ""
            }`;

            // Empty slots stay inert divs. Making them buttons, or animating
            // them, would advertise spacing as something you can click.
            if (!partner) {
              return <div key={`slot-${i}`} className={`${base} bg-[#2c9c60]`} />;
            }

            return (
              <button
                key={partner.id}
                type="button"
                onClick={() => setSelected(partner)}
                aria-label={partner.name || t.partners.partnerLabel}
                className={`${base} cursor-pointer bg-white transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.04] focus-visible:z-10 focus-visible:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100`}
              >
                {/* The button carries the accessible name, so the logo is
                    decorative here and must not be announced twice. */}
                <Image
                  src={partner.logo}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 280px, 45vw"
                  className="object-contain p-4"
                />
              </button>
            );
          })}
        </div>
      </div>

      <SectionFooter variant="green" />

      <PartnerDialog partner={selected} onClose={() => setSelected(null)} />
    </PageSection>
  );
}
