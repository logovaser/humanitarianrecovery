"use client";

import { EyeIcon, HeartIcon, ShieldIcon, TargetIcon } from "@/components/icons";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";

export function MissionVision() {
  const { t } = useLanguage();

  return (
    /* One column on phones: at two columns each cell is under 190px wide, which
       breaks these sentences into ~11-character lines. */
    <PageSection id="mission-vision" className="grid grid-cols-1 p-0 sm:grid-cols-2">
      <Column
        title={t.missionVision.mission}
        topClass="bg-brand"
        bottomClass="bg-white"
        circleClass="bg-brand-dark"
        icon={<TargetIcon className="h-9 w-9 text-white" />}
        text={t.missionVision.missionText}
      />

      <Column
        title={t.missionVision.vision}
        topClass="bg-brand-dark"
        bottomClass="bg-surface"
        circleClass="bg-brand"
        icon={<EyeIcon className="h-9 w-9 text-white" />}
        text={t.missionVision.visionText}
      />

      {/* Second row inverts the first so the four cells read as a checkerboard. */}
      <Column
        title={t.missionVision.coreValue}
        topClass="bg-brand-dark"
        bottomClass="bg-surface"
        circleClass="bg-brand"
        icon={<HeartIcon className="h-9 w-9 text-white" />}
        text={t.missionVision.coreValueText}
      />

      <Column
        title={t.missionVision.principles}
        topClass="bg-brand"
        bottomClass="bg-white"
        circleClass="bg-brand-dark"
        icon={<ShieldIcon className="h-9 w-9 text-white" />}
        list={t.missionVision.principlesList}
      />

      <SectionFooter showLogo={false} />
    </PageSection>
  );
}

const BODY_CLS =
  "max-w-[330px] text-center text-base leading-snug text-ink sm:text-xl sm:leading-snug";

function Column({
  title,
  topClass,
  bottomClass,
  circleClass,
  icon,
  text,
  list,
}: {
  title: string;
  topClass: string;
  bottomClass: string;
  circleClass: string;
  icon: React.ReactNode;
  text?: string;
  list?: readonly string[];
}) {
  return (
    <div className="relative flex h-full flex-col">
      <div className={`flex basis-[46%] items-center justify-center px-4 py-8 ${topClass}`}>
        <h3 className="text-center text-2xl font-bold text-white sm:text-4xl">{title}</h3>
      </div>
      <div
        className={`flex basis-[54%] items-center justify-center px-5 py-8 sm:px-10 ${bottomClass}`}
      >
        {list ? (
          <ul className={`${BODY_CLS} space-y-3`}>
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className={BODY_CLS}>{text}</p>
        )}
      </div>
      <div
        className={`absolute left-1/2 top-[46%] flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-[88px] sm:w-[88px] ${circleClass}`}
      >
        {icon}
      </div>
    </div>
  );
}
