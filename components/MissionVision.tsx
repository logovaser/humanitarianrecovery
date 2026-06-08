import { EyeIcon, TargetIcon } from "@/components/icons";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";

export function MissionVision() {
  return (
    <PageSection id="mission-vision" className="grid grid-cols-2 p-0">
      <Column
        title="Mission"
        topClass="bg-brand"
        bottomClass="bg-white"
        circleClass="bg-brand-dark"
        icon={<TargetIcon className="h-9 w-9 text-white" />}
      >
        To protect civilians and support communities affected by explosive threats.
      </Column>

      <Column
        title="Vision"
        topClass="bg-brand-dark"
        bottomClass="bg-surface"
        circleClass="bg-brand"
        icon={<EyeIcon className="h-9 w-9 text-white" />}
      >
        A safe, resilient, and sustainably recovering Ukraine.
      </Column>

      <SectionFooter showLogo={false} />
    </PageSection>
  );
}

function Column({
  title,
  topClass,
  bottomClass,
  circleClass,
  icon,
  children,
}: {
  title: string;
  topClass: string;
  bottomClass: string;
  circleClass: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col">
      <div className={`flex basis-[46%] items-start justify-center pt-10 sm:pt-14 ${topClass}`}>
        <h3 className="text-3xl font-bold text-white sm:text-5xl">{title}</h3>
      </div>
      <div className={`flex basis-[54%] items-center justify-center px-5 sm:px-10 ${bottomClass}`}>
        <p className="max-w-[330px] text-center text-lg leading-snug text-ink sm:text-[26px] sm:leading-snug">
          {children}
        </p>
      </div>
      <div
        className={`absolute left-1/2 top-[46%] flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-[88px] sm:w-[88px] ${circleClass}`}
      >
        {icon}
      </div>
    </div>
  );
}
