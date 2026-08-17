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
      <div className="absolute left-1/2 -top-12 z-0 -translate-x-1/2 flex flex-col items-center">
        <div
          className="rounded-[48px] bg-white/15 backdrop-blur-[10px] px-6 pb-10 pt-20"
          aria-hidden="true"
        >
          <Image
            src={hrLogo.src}
            alt={t.common.heroLogoAlt}
            /* h-auto lets the height follow the width. Without it the height
               attribute stays as a presentational hint and the logo renders
               400x80 instead of its true 3.07:1. */
            /* min() rather than a fixed 400px: with the 24px padding either
               side, 400 overran every phone width up to 414px. */
            className="h-auto w-[min(400px,72vw)]"
            draggable={false}
            width={491}
            height={160}
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
