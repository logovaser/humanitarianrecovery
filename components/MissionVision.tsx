"use client";

import { EyeIcon, HeartIcon, ShieldIcon, TargetIcon } from "@/components/icons";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";

export function MissionVision() {
  const { t } = useLanguage();

  return (
    /* One column on phones: at two columns each cell is under 190px wide, which
       breaks these sentences into ~11-character lines.
       minmax(min-content, 1fr) makes the two rows equal without ever clipping a
       cell whose text runs long. */
    <PageSection
      id="mission-vision"
      className="grid grid-cols-1 p-0 sm:auto-rows-[minmax(min-content,1fr)] sm:grid-cols-2"
    >
      <Column
        title={t.missionVision.mission}
        topClass="bg-brand"
        bottomClass="bg-white"
        circleClass="bg-brand-dark"
        icon={TargetIcon}
        text={t.missionVision.missionText}
      />

      <Column
        title={t.missionVision.vision}
        topClass="bg-brand-dark"
        bottomClass="bg-surface"
        circleClass="bg-brand"
        icon={EyeIcon}
        text={t.missionVision.visionText}
      />

      {/* Second row inverts the first so the four cells read as a checkerboard. */}
      <Column
        title={t.missionVision.coreValue}
        topClass="bg-brand-dark"
        bottomClass="bg-surface"
        circleClass="bg-brand"
        icon={HeartIcon}
        text={t.missionVision.coreValueText}
      />

      <Column
        title={t.missionVision.principles}
        topClass="bg-brand"
        bottomClass="bg-white"
        circleClass="bg-brand-dark"
        icon={ShieldIcon}
        list={t.missionVision.principlesList}
      />

      <SectionFooter showLogo={false} />
    </PageSection>
  );
}

/** Every title band is exactly this tall, so the colour seam lands at the same
 *  height in all four cells. A percentage split cannot do that: it resolves
 *  against each cell's own height, which varies with how long its text is.
 *
 *  The 124px floor is what lets the title stay centred in the whole band: the
 *  circle's upper half reaches 32px up from the seam, and a centred 40px line
 *  still clears that by 10px. Shrink the band and the two start to collide. */
const TITLE_BAND_H = "h-[clamp(124px,15vh,168px)]";

const BODY_CLS =
  "max-w-[330px] text-center text-base leading-snug text-ink sm:text-xl sm:leading-snug";

function Column({
  title,
  topClass,
  bottomClass,
  circleClass,
  icon: Icon,
  text,
  list,
}: {
  title: string;
  topClass: string;
  bottomClass: string;
  circleClass: string;
  /** The component, not an element: the circle owns the icon's size. */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text?: string;
  list?: readonly string[];
}) {
  return (
    <div className="flex flex-col">
      <div className={`flex ${TITLE_BAND_H} shrink-0 items-center justify-center px-4 ${topClass}`}>
        <h3 className="text-center text-2xl font-bold text-white sm:text-4xl">{title}</h3>
      </div>

      {/* pt-14 clears the circle's lower half with 24px to spare at sm. */}
      <div
        className={`relative flex flex-1 items-center justify-center px-5 pb-10 pt-14 sm:px-10 ${bottomClass}`}
      >
        {/* Anchored to the top of this band rather than to a percentage of the
            column, so it sits on the seam whatever the cell height turns out. */}
        <div
          className={`absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-16 sm:w-16 ${circleClass}`}
        >
          <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
        </div>

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
    </div>
  );
}
