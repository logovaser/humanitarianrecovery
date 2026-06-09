import { deleteFromR2, isR2Url } from "@/lib/gallery/r2";
import { readTeamData, writeTeamData } from "@/lib/team/store";
import type { TeamMember } from "@/lib/team/types";

export async function getTeamMembers(): Promise<TeamMember[]> {
  const data = await readTeamData();
  return [...data.members].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const data = await readTeamData();
  return data.members.find((m) => m.id === id) ?? null;
}

export async function createTeamMember(
  fields: Omit<TeamMember, "id" | "photo" | "sortOrder">,
): Promise<TeamMember> {
  const { randomUUID } = await import("crypto");
  const data = await readTeamData();
  const maxOrder = data.members.reduce((m, r) => Math.max(m, r.sortOrder), -1);
  const member: TeamMember = {
    id: randomUUID(),
    photo: null,
    sortOrder: maxOrder + 1,
    ...fields,
  };
  data.members.push(member);
  await writeTeamData(data);
  return member;
}

export async function updateTeamMember(
  id: string,
  fields: Partial<Omit<TeamMember, "id" | "photo">>,
): Promise<TeamMember> {
  const data = await readTeamData();
  const idx = data.members.findIndex((m) => m.id === id);
  if (idx === -1) throw new Error("Member not found");
  data.members[idx] = { ...data.members[idx], ...fields };
  await writeTeamData(data);
  return data.members[idx];
}

export async function deleteTeamMember(id: string): Promise<void> {
  const data = await readTeamData();
  const member = data.members.find((m) => m.id === id);
  if (!member) throw new Error("Member not found");
  if (member.photo && isR2Url(member.photo)) {
    await deleteFromR2(member.photo);
  }
  data.members = data.members.filter((m) => m.id !== id);
  await writeTeamData(data);
}

export async function setTeamMemberPhoto(id: string, src: string): Promise<void> {
  const data = await readTeamData();
  const idx = data.members.findIndex((m) => m.id === id);
  if (idx === -1) throw new Error("Member not found");
  const old = data.members[idx].photo;
  if (old && isR2Url(old)) await deleteFromR2(old);
  data.members[idx].photo = src;
  await writeTeamData(data);
}

export async function reorderTeamMembers(ids: string[]): Promise<void> {
  const data = await readTeamData();
  ids.forEach((id, index) => {
    const m = data.members.find((x) => x.id === id);
    if (m) m.sortOrder = index;
  });
  await writeTeamData(data);
}

export async function removeTeamMemberPhoto(id: string): Promise<void> {
  const data = await readTeamData();
  const idx = data.members.findIndex((m) => m.id === id);
  if (idx === -1) throw new Error("Member not found");
  const old = data.members[idx].photo;
  if (old && isR2Url(old)) await deleteFromR2(old);
  data.members[idx].photo = null;
  await writeTeamData(data);
}
