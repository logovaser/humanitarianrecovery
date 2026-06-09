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
import { getTeamMembers } from "@/lib/team/service";

export default async function Home() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="h-dvh max-h-dvh flex flex-col">
      <Header />
      <div className="flex-1 mt-20 snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth">
        <Hero />
        <About />
        <MissionVision />
        <AreasOfWork />
        <MineVictimAssistance />
        <Geography />
        <Team members={teamMembers} />
        <Partners />
        <Contacts />
      </div>
    </main>
  );
}
