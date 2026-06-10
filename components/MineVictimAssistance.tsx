"use client";

import Image from "next/image";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";
import mvaImage from "@/images/image12.jpeg";

export function MineVictimAssistance() {
  const { t } = useLanguage();

  const items = [
    t.mva.items.psychosocial,
    t.mva.items.referral,
    t.mva.items.reintegration,
    t.mva.items.livelihood,
  ];

  return (
    <PageSection id="mva" bg="from-white to-white">
      <div className="flex h-full flex-col justify-center">
      <div className="mx-auto grid grid-cols-1 items-center gap-12 px-8 py-14 sm:px-12 md:grid-cols-2">
        <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-[26px] shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
          <div className="bg-brand px-6 py-5">
            <h2 className="whitespace-nowrap text-2xl font-bold text-white sm:text-[26px]">{t.mva.title}</h2>
          </div>
          <Image
            src={mvaImage.src}
            alt={t.mva.imageAlt}
            width={335}
            height={362}
            className="h-full w-full object-cover translate-z-1.5"
          />
        </div>

        <div>
          <h3 className="mb-7 text-2xl font-bold text-ink-strong sm:text-[26px]">
            {t.mva.subtitle}
          </h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item}
                className="rounded-full bg-white px-7 py-4 text-[15px] text-ink shadow-[0_6px_18px_rgba(0,0,0,0.08)] sm:text-base"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      <SectionFooter />
    </PageSection>
  );
}
