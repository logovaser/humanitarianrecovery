import Image from "next/image";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";

export function Geography() {
  return (
    <PageSection id="geography" bg="from-brand to-brand">
      <Image
        src="/images/geo.png"
        alt=""
        aria-hidden
        width={510}
        height={366}
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 22%), linear-gradient(to bottom, transparent, #000 20%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to right, transparent, #000 22%), linear-gradient(to bottom, transparent, #000 20%)",
          maskComposite: "intersect",
        }}
        className="pointer-events-none absolute bottom-10 right-0 hidden w-[58%] max-w-[660px] select-none md:block"
      />
      <div className="relative mx-auto min-h-[440px] max-w-[1024px] px-8 py-16 sm:px-12 sm:py-20">
        <h2 className="text-4xl font-bold text-white sm:text-[52px]">Geography of Work</h2>
        <p className="mt-10 max-w-[430px] text-2xl leading-snug text-white sm:mt-14 sm:text-[32px]">
          Humanitarian Recovery operates across multiple regions of Ukraine.
        </p>
      </div>
      <SectionFooter variant="green" />
    </PageSection>
  );
}
