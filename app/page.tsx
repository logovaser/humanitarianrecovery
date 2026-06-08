import { About } from "@/components/About";
import { AreasOfWork } from "@/components/AreasOfWork";
import { Contacts } from "@/components/Contacts";
import { Geography } from "@/components/Geography";
import { Hero } from "@/components/Hero";
import { MineVictimAssistance } from "@/components/MineVictimAssistance";
import { MissionVision } from "@/components/MissionVision";
import { Partners } from "@/components/Partners";
import { Team } from "@/components/Team";
import Link from "next/link";
import Image from "next/image";
import hrLogo from "@/images/HR logo 2.svg";

export default function Home() {
  return (
    <main className="h-dvh flex flex-col">
      <div className="fixed top-0 left-0 w-full px-8 h-20 bg-brand z-30 flex items-center justify-between text-white font-bold shadow-2xl">
        <Image src={hrLogo.src} alt="Logo" width={164} height={64} />

        <div className="flex items-center">
          <Link href="/" className="p-4">
            Gallery
          </Link>
          <Link href="/" className="p-4">
            Education Request
          </Link>
          <Link href="/" className="p-4">
            Events
          </Link>
        </div>
      </div>
      <div className="flex-1 mt-20 snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth">
        <Hero />
        <About />
        <MissionVision />
        <AreasOfWork />
        <MineVictimAssistance />
        <Geography />
        <Team />
        <Partners />
        <Contacts />
      </div>
    </main>
  );
}
