"use client";

import Image from "next/image";
import { CrosshairIcon } from "@/components/icons";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";
import aboutImage from "@/images/image10.png";

export function About() {
  const { t } = useLanguage();

  const focusRows = [
    { tag: t.about.tags.eore, text: t.about.eore },
    { tag: t.about.tags.nts, text: t.about.nts },
    { tag: t.about.tags.mva, text: t.about.mva },
  ];

  return (
    <PageSection id="about" bg="from-surface to-surface">
      <header className="grid grid-cols-1 md:grid-cols-2">
        <div className="rounded-br-[55px] bg-brand px-8 py-8 sm:px-12 md:py-12">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[42px]">
            {t.about.title}
          </h2>
        </div>
        <div className="flex items-center px-8 py-6 sm:px-12">
          <p className="text-lg leading-snug text-ink sm:text-xl">
            {t.about.subtitle}
            <br />
            {t.about.subtitleLine2}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1024px] grid-cols-1 items-center gap-10 px-8 py-12 sm:px-12 md:grid-cols-2">
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full bg-brand py-2 pl-2 pr-6 text-white shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark">
              <CrosshairIcon className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">{t.about.focusAreas}</span>
          </div>

          <div className="space-y-4">
            {focusRows.map((row) => (
              <div
                key={row.tag}
                className="flex items-center gap-4 rounded-[30px] bg-white p-2.5 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
              >
                <span className="min-w-[88px] rounded-[20px] bg-brand px-4 py-2.5 text-center font-bold text-white">
                  {row.tag}
                </span>
                <span className="text-[15px] text-ink sm:text-base">{row.text}</span>
              </div>
            ))}
            <div className="rounded-[30px] bg-white px-6 py-4 text-[15px] text-ink shadow-[0_6px_18px_rgba(0,0,0,0.06)] sm:text-base">
              {t.about.communityTraining}
            </div>
          </div>
        </div>

        <Image
          src={aboutImage.src}
          alt={t.about.imageAlt}
          width={482}
          height={322}
          className="rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
        />
      </div>

      <SectionFooter />
    </PageSection>
  );
}
