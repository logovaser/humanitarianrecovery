"use client";

import Image from "next/image";
import { useState } from "react";
import { PageSection } from "@/components/PageSection";
import { SectionFooter } from "@/components/SectionFooter";
import { useLanguage } from "@/components/LanguageProvider";
import type { TeamMember } from "@/lib/team/types";

type TeamProps = {
  members: TeamMember[];
};

export function Team({ members }: TeamProps) {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState(0);

  if (members.length === 0) return null;

  const member = members[active];
  const name = locale === "uk" ? member.nameUk : member.nameEn;
  const role = locale === "uk" ? member.roleUk : member.roleEn;
  const points = locale === "uk" ? member.pointsUk : member.pointsEn;

  return (
    <PageSection id="team" bg="from-white to-white" className="flex flex-col overflow-hidden p-0">
      <div className="flex flex-col gap-5 bg-brand px-8 py-6 sm:px-12 lg:flex-row lg:items-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:mr-4">{t.team.title}</h2>
        <div className="flex flex-wrap gap-2.5">
          {members.map((m, i) => {
            const tabName = locale === "uk" ? m.roleUk : m.roleEn;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:text-[15px] ${
                  i === active
                    ? "bg-white text-brand shadow-sm"
                    : "bg-white/15 text-white/85 hover:bg-white/25"
                }`}
              >
                {tabName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto grid max-w-site flex-1 grid-cols-1 gap-10 px-8 py-12 sm:px-12 md:grid-cols-[0.36fr_0.64fr] md:items-center">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[260px] overflow-hidden rounded-[28px] shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={name}
                width={260}
                height={300}
                className="aspect-square h-full w-full object-cover"
              />
            ) : (
              <div className="aspect-square w-full bg-gradient-to-b from-brand-deep to-brand-darker" />
            )}
          </div>
          <h3 className="mt-6 text-xl font-bold text-ink-strong">{name}</h3>
          <p className="mt-1 text-ink">{role}</p>
        </div>

        <ul className="space-y-5 md:pl-6">
          {points.map((p, idx) => (
            <li key={idx} className="flex gap-3 text-lg leading-snug text-ink sm:text-xl">
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
