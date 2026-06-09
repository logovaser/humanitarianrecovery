"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { reorderTeamMembersAction } from "@/app/admin/team-actions";
import type { TeamMember } from "@/lib/team/types";

type Props = {
  initialMembers: TeamMember[];
};

export function TeamMemberList({ initialMembers }: Props) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [, startTransition] = useTransition();
  const draggingId = useRef<string | null>(null);
  const dragOverId = useRef<string | null>(null);

  function handleDragStart(id: string) {
    draggingId.current = id;
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    dragOverId.current = id;
  }

  function handleDrop() {
    const from = draggingId.current;
    const to = dragOverId.current;
    if (!from || !to || from === to) return;

    const next = [...members];
    const fromIdx = next.findIndex((m) => m.id === from);
    const toIdx = next.findIndex((m) => m.id === to);
    const [item] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, item);

    setMembers(next);
    draggingId.current = null;
    dragOverId.current = null;

    startTransition(async () => {
      await reorderTeamMembersAction(next.map((m) => m.id));
      router.refresh();
    });
  }

  function handleDragEnd() {
    draggingId.current = null;
    dragOverId.current = null;
  }

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.id}
          draggable
          onDragStart={() => handleDragStart(member.id)}
          onDragOver={(e) => handleDragOver(e, member.id)}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          className="flex cursor-default items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-opacity [&[draggable]:active]:opacity-50"
        >
          <div
            className="shrink-0 cursor-grab select-none text-ink/30 hover:text-ink/60 active:cursor-grabbing"
            title="Drag to reorder"
          >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor">
              <circle cx="5" cy="5" r="1.5" />
              <circle cx="11" cy="5" r="1.5" />
              <circle cx="5" cy="10" r="1.5" />
              <circle cx="11" cy="10" r="1.5" />
              <circle cx="5" cy="15" r="1.5" />
              <circle cx="11" cy="15" r="1.5" />
            </svg>
          </div>

          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-surface">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.nameEn}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-b from-brand-deep to-brand-darker" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-bold text-ink-strong">{member.nameEn}</p>
            <p className="truncate text-sm text-ink/60">{member.roleEn}</p>
          </div>

          <Link
            href={`/admin/team/${member.id}`}
            className="shrink-0 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-surface"
          >
            Edit
          </Link>
        </div>
      ))}

      {members.length === 0 ? (
        <p className="text-sm text-ink/70">No team members yet.</p>
      ) : null}
    </div>
  );
}
