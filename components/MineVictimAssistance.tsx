import Image from "next/image";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";

const items = [
  "psychosocial assistance",
  "referral to medical & legal services",
  "community reintegration",
  "livelihood support",
];

export function MineVictimAssistance() {
  return (
    <PageSection id="mva" bg="from-white to-white" className="flex flex-col justify-center overflow-hidden p-0">
      <div className="mx-auto grid max-w-[1024px] grid-cols-1 items-center gap-12 px-8 py-14 sm:px-12 md:grid-cols-2">
        <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[26px] shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
          <div className="bg-brand px-6 py-5">
            <h2 className="text-2xl font-bold text-white sm:text-[26px]">Mine Victim Assistance</h2>
          </div>
          <Image
            src="/images/mva.png"
            alt="A rescue worker comforting an injured civilian"
            width={335}
            height={362}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h3 className="mb-7 text-2xl font-bold text-ink-strong sm:text-[26px]">
            Support for mine victims includes:
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

      <SectionFooter />
    </PageSection>
  );
}
