import Image from "next/image";
import { PageSection } from "@/components/PageSection";

export function Hero() {
  return (
    <PageSection id="hero" bg="from-brand-dark to-brand-dark" className="flex items-center justify-center p-0">
      <Image
        src="/images/hero.png"
        alt="Humanitarian Recovery — Ukrainian National Mine Action Operator"
        width={1024}
        height={576}
        priority
        sizes="100vw"
        className="mx-auto block h-auto w-full max-w-[1600px]"
      />
    </PageSection>
  );
}
