"use client";

import Image from "next/image";
import { PageSection } from "@/components/PageSection";
import { useLanguage } from "@/components/LanguageProvider";
import heroBg from "@/images/hero-bg.jpg";
import hrLogo from "@/images/HR logo 2.svg";

export function Hero() {
  const { t } = useLanguage();

  return (
    <PageSection id="hero" bgImage={heroBg.src}>
      <div className="absolute left-1/2 -top-10 z-0 -translate-x-1/2 flex flex-col items-center">
        <div
          className="rounded-[48px] bg-white/15 backdrop-blur-[10px] px-6 pb-10 pt-20"
          aria-hidden="true"
        >
          <Image
            src={hrLogo.src}
            alt={t.common.heroLogoAlt}
            className="w-[400px]"
            draggable={false}
            width={240}
            height={80}
            priority
          />
        </div>

        <h1 className="mt-16 text-center max-w-3xl font-semibold  text-white text-5xl">
          {t.hero.line1}
        </h1>
        <h1 className="text-center max-w-3xl font-semibold  text-white text-5xl">{t.hero.line2}</h1>
      </div>
    </PageSection>
  );
}
