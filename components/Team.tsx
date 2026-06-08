"use client";

import Image from "next/image";
import { useState } from "react";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";

type Member = {
  tab: string;
  name: string;
  role: string;
  photo?: string;
  points: string[];
};

const members: Member[] = [
  {
    tab: "Head of Organization",
    name: "Kateryna Anikina",
    role: "Founder & Head",
    points: [
      "Lawyer, advocate, humanitarian project manager",
      "Experience: EORE, NTS, certification processes",
      "Strong legal & operational background",
      "Multiyear humanitarian field experience",
    ],
  },
  {
    tab: "Project Manager",
    name: "Ulyana Symonenko",
    role: "Project Manager / Grant Writer",
    points: [
      "Humanitarian project coordination (EORE/CPP)",
      "Grant writing, donor communication, budgeting",
      "BCM & Change Management expert",
      "Cross-functional team leadership",
    ],
  },
  {
    tab: "Operations Manager",
    name: "Oleksandr Bilotil",
    role: "Operations Manager",
    photo: "/images/ops.png",
    points: [
      "30+ years in civil protection & emergency operations",
      "Senior roles in SESU, training centers, demining projects",
      "Expert in certification, land release, operational setup",
      "Retired Colonel, combat veteran",
    ],
  },
  {
    tab: "QA Manager",
    name: "Dmytro Filippov",
    role: "Quality Assurance Manager",
    points: [
      "IMAS Level 1 EOD, NTS, TS, Clearance specialist",
      "Quality management & internal audits",
      "Former SESU EOD team leader",
      "War veteran, senior lieutenant (ret.)",
    ],
  },
];

export function Team() {
  const [active, setActive] = useState(0);
  const member = members[active];

  return (
    <PageSection id="team" bg="from-white to-white" className="flex flex-col overflow-hidden p-0">
      <div className="flex flex-col gap-5 bg-brand px-8 py-6 sm:px-12 lg:flex-row lg:items-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:mr-4">Team</h2>
        <div className="flex flex-wrap gap-2.5">
          {members.map((m, i) => (
            <button
              key={m.tab}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:text-[15px] ${
                i === active
                  ? "bg-white text-brand shadow-sm"
                  : "bg-white/15 text-white/85 hover:bg-white/25"
              }`}
            >
              {m.tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1024px] grid-cols-1 gap-10 px-8 py-12 sm:px-12 md:grid-cols-[0.36fr_0.64fr] md:items-center">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[260px] overflow-hidden rounded-[28px] shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                width={260}
                height={300}
                className="aspect-square h-full w-full object-cover"
              />
            ) : (
              <div className="aspect-square w-full bg-gradient-to-b from-brand-deep to-brand-darker" />
            )}
          </div>
          <h3 className="mt-6 text-xl font-bold text-ink-strong">{member.name}</h3>
          <p className="mt-1 text-ink">{member.role}</p>
        </div>

        <ul className="space-y-5 md:pl-6">
          {member.points.map((p) => (
            <li key={p} className="flex gap-3 text-lg leading-snug text-ink sm:text-xl">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <SectionFooter />
    </PageSection>
  );
}
