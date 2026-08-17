"use client";

import Image from "next/image";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";
import areasImage from "@/images/image11.jpeg";

export function AreasOfWork() {
  const { t } = useLanguage();

  const rows: { tag: string | null; text: string }[] = [
    { tag: t.areasOfWork.tags.eore, text: t.areasOfWork.eore },
    { tag: t.areasOfWork.tags.nts, text: t.areasOfWork.nts },
    {
      tag: t.areasOfWork.tags.humanitarianAssistance,
      text: t.areasOfWork.humanitarianAssistance,
    },
    { tag: null, text: t.areasOfWork.communityTraining },
    { tag: t.areasOfWork.tags.mva, text: t.areasOfWork.mva },
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
                {row.tag ? (
                  <span className="whitespace-nowrap rounded-full bg-brand px-5 py-2.5 font-bold text-white">
                    {row.tag}
                  </span>
                ) : null}
                <span className={`text-[15px] text-ink sm:text-base ${row.tag ? "" : "px-4 py-1"}`}>
                  {row.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionFooter />
    </PageSection>
  );
}
