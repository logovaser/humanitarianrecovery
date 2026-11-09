import { About } from "@/components/About";
import { AreasOfWork } from "@/components/AreasOfWork";
import { Contacts } from "@/components/Contacts";
import { Geography } from "@/components/Geography";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MineVictimAssistance } from "@/components/MineVictimAssistance";
import { MissionVision } from "@/components/MissionVision";
import { Partners } from "@/components/Partners";
import { Team } from "@/components/Team";
import { getPartners } from "@/lib/partners/service";
import { getTeamMembers } from "@/lib/team/service";

export default async function Home() {
  // Both read from R2; no reason to wait on one before starting the other.
  const [teamMembers, partners] = await Promise.all([getTeamMembers(), getPartners()]);

  return (
    <main className="h-dvh max-h-dvh flex flex-col">
      <Header />
      <div
        data-scroll-container
        className="mt-[var(--header-height)] flex-1 snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth"
      >
        <Hero />
        <About />
        <MissionVision />
        <AreasOfWork />
        <MineVictimAssistance />
        <Geography />
        <Team members={teamMembers} />
        <Partners partners={partners} />
        <Contacts />
      </div>
    </main>
  );
}
