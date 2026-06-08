import { About } from "@/components/About";
import { AreasOfWork } from "@/components/AreasOfWork";
import { Contacts } from "@/components/Contacts";
import { Geography } from "@/components/Geography";
import { Hero } from "@/components/Hero";
import { MineVictimAssistance } from "@/components/MineVictimAssistance";
import { MissionVision } from "@/components/MissionVision";
import { Partners } from "@/components/Partners";
import { Team } from "@/components/Team";

export default function Home() {
  return (
    <main className="h-dvh snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth">
      <Hero />
      <About />
      <MissionVision />
      <AreasOfWork />
      <MineVictimAssistance />
      <Geography />
      <Team />
      <Partners />
      <Contacts />
    </main>
  );
}
