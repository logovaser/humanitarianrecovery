import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";

export function Partners() {
  return (
    <PageSection id="partners" bg="from-brand to-brand" className="flex flex-col justify-center overflow-hidden p-0">
      <div className="relative mx-auto max-w-[1024px] px-8 py-16 sm:px-12 sm:py-20">
        <h2 className="static mb-8 text-5xl font-bold text-white sm:absolute sm:left-12 sm:top-1/2 sm:mb-0 sm:z-10 sm:-translate-y-1/2 sm:text-6xl">
          Partners
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-24 rounded-[22px] bg-[#2c9c60] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-28 ${
                i === 4 || i === 5 ? "sm:invisible" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <SectionFooter variant="green" />
    </PageSection>
  );
}
