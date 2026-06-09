"use client";

import Image from "next/image";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";
import geographyImage from "@/images/ukraine-map-dark.svg";

export function Geography() {
  const { t } = useLanguage();

  return (
    <PageSection id="geography" bg="from-brand to-brand">
      <Image
        src={geographyImage.src}
        alt=""
        aria-hidden
        width={510}
        height={366}
        className="pointer-events-none absolute bottom-[20%] right-[10%] max-w-[860px] w-[70%] select-none"
      />
      <div className="relative mx-auto min-h-[440px] max-w-[1024px] px-8 py-16 sm:px-12 sm:py-20">
        <h2 className="text-4xl font-bold text-white sm:text-[52px]">{t.geography.title}</h2>
        <p className="mt-10 max-w-[430px] text-2xl leading-snug text-white sm:mt-14 sm:text-[32px]">
          {t.geography.text}
        </p>
      </div>
      <SectionFooter variant="green" />
    </PageSection>
  );
}
