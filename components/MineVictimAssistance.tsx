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

  const stats = [
    t.mva.stats.killed,
    t.mva.stats.injured,
    t.mva.stats.children,
    t.mva.stats.contaminated,
  ];

  return (
    <PageSection id="mva" bg="from-white to-white" className="flex flex-col">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-site grid grid-cols-1 items-center gap-12 px-8 py-14 sm:px-12 md:grid-cols-2">
          {/* No mx-auto: the card sits at the left edge of its column so it
              lines up with the stat tiles below, which start at the same
              container padding. */}
          <div className="w-full max-w-[460px] overflow-hidden rounded-[26px] shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
            <div className="bg-brand px-6 py-5">
              <h2 className="whitespace-nowrap text-2xl font-bold text-white sm:text-[26px]">
                {t.mva.title}
              </h2>
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

        {/* A handful of headline numbers, so stat tiles rather than a chart.
            The source line is not optional: these are casualty figures, and a
            reader has to be able to check them and see how current they are. */}
        <div className="mx-auto w-full max-w-site px-8 pb-14 sm:px-12">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-brand-dark">
            {t.mva.statsTitle}
          </h3>

          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse rounded-2xl bg-white px-5 py-4 shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
              >
                <dt className="mt-1.5 text-xs leading-snug text-ink/70 sm:text-sm">{stat.label}</dt>
                <dd className="text-3xl font-bold text-brand-dark sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-3 text-[11px] leading-snug text-ink/50">{t.mva.statsSource}</p>
        </div>
      </div>

      <SectionFooter />
    </PageSection>
  );
}
