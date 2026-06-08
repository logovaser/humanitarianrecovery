"use client";

import Image from "next/image";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";

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
    <PageSection id="areas" bg="from-white to-white">
      <div className="mx-auto grid max-w-[1024px] grid-cols-1 items-center gap-12 px-8 py-14 sm:px-12 md:grid-cols-[0.82fr_1.18fr]">
        <div className="relative mx-auto w-full max-w-[330px]">
          <div className="relative z-10 rounded-[44px] bg-brand px-7 py-9 shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
            <h2 className="text-4xl font-bold leading-tight text-white">{t.areasOfWork.title}</h2>
          </div>
          <div className="-mt-5 overflow-hidden rounded-[26px] shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
            <Image
              src="/images/areas.png"
              alt={t.areasOfWork.imageAlt}
              width={298}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
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

      <SectionFooter />
    </PageSection>
  );
}
