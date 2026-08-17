"use client";

import Image from "next/image";
import { useState } from "react";
import { AreaInfoDialog, type AreaId } from "@/components/AreaInfoDialog";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";
import areasImage from "@/images/image11.jpeg";

export function AreasOfWork() {
  const { t } = useLanguage();
  const [openArea, setOpenArea] = useState<AreaId | null>(null);

  /* id, not the label, keys the glossary: the Ukrainian tags read ІНРМ and НТО
     rather than EORE and NTS. A null id is a tag with nothing to explain. */
  const rows: { id: AreaId | null; tag: string | null; text: string }[] = [
    { id: "eore", tag: t.areasOfWork.tags.eore, text: t.areasOfWork.eore },
    { id: "nts", tag: t.areasOfWork.tags.nts, text: t.areasOfWork.nts },
    {
      id: null,
      tag: t.areasOfWork.tags.humanitarianAssistance,
      text: t.areasOfWork.humanitarianAssistance,
    },
    { id: null, tag: null, text: t.areasOfWork.communityTraining },
    { id: "mva", tag: t.areasOfWork.tags.mva, text: t.areasOfWork.mva },
  ];

  return (
    <PageSection id="areas" bg="from-white to-white" className="flex flex-col">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mx-auto grid grid-cols-1 items-center gap-12 px-8 py-14 sm:px-12 md:grid-cols-[1fr_1fr]">
          <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-[26px] shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
            <div className="bg-brand px-6 py-5">
              <h2 className="text-2xl font-bold text-white sm:text-[26px]">
                {t.areasOfWork.title}
              </h2>
            </div>
            <Image
              src={areasImage.src}
              alt={t.areasOfWork.imageAlt}
              width={335}
              height={362}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-4">
            {rows.map((row) => (
              <div
                key={row.text}
                className="flex items-center gap-4 rounded-full bg-white px-2.5 py-2.5 shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
              >
                {row.id ? (
                  <button
                    type="button"
                    onClick={() => setOpenArea(row.id)}
                    aria-label={`${row.tag}: ${t.areasOfWork.glossary[row.id].term}`}
                    className="cursor-pointer whitespace-nowrap rounded-full bg-brand px-5 py-2.5 font-bold text-white transition-colors hover:bg-brand-dark focus-visible:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                  >
                    {row.tag}
                  </button>
                ) : row.tag ? (
                  <span className="whitespace-nowrap rounded-full bg-brand px-5 py-2.5 font-bold text-white">
                    {row.tag}
                  </span>
                ) : null}
                <span className={`text-[15px] text-ink sm:text-base ${row.tag ? "" : "px-4 py-1"}`}>
                  {row.text}
                </span>
              </div>
            ))}

            <p className="pl-2 pt-1 text-xs text-ink/60">{t.areasOfWork.glossaryHint}</p>
          </div>
        </div>
      </div>

      <SectionFooter />

      <AreaInfoDialog area={openArea} onClose={() => setOpenArea(null)} />
    </PageSection>
  );
}
