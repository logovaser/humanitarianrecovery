"use client";

import { useState } from "react";
import { PageSection } from "@/components/PageSection";
import { RegionRequestDialog } from "@/components/RegionRequestDialog";
import { SectionFooter } from "@/components/SectionFooter";
import { UkraineMap } from "@/components/UkraineMap";
import { useLanguage } from "@/components/LanguageProvider";
import type { RegionId } from "@/lib/map/ukraine-regions";

export function Geography() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<RegionId | null>(null);

  return (
    <PageSection id="geography" bg="from-brand to-brand" className="flex flex-col">
      {/* The map used to sit under the copy as an absolutely positioned
          background. Now that regions are clickable it needs its own column,
          otherwise the text block swallows every click behind it. */}
      <div className="mx-auto flex flex-1 w-full max-w-[1620px] flex-col gap-6 px-8 pb-16 pt-16 sm:px-12 sm:pt-20 lg:flex-row lg:items-center lg:gap-12">
        <div className="shrink-0 lg:w-[35%]">
          <h2 className="text-4xl font-bold text-white sm:text-[52px]">{t.geography.title}</h2>
          <p className="mt-6 max-w-[430px] text-lg leading-snug text-white sm:mt-10 sm:text-xl">
            {t.geography.text}
          </p>
          <p className="mt-6 text-sm text-white/70">{t.geography.hint}</p>
        </div>

        <UkraineMap
          onSelect={setSelected}
          className="min-h-0 w-full flex-1 self-center lg:h-full lg:max-h-[85%]"
        />
      </div>

      <SectionFooter variant="green" />

      <RegionRequestDialog region={selected} onClose={() => setSelected(null)} />
    </PageSection>
  );
}
