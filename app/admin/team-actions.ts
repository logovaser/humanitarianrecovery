"use server";

import { revalidatePath } from "next/cache";
import { uploadToR2WithPrefix } from "@/lib/gallery/r2";
import { requireAdminSession } from "@/lib/auth/session";
import {
  createTeamMember,
  deleteTeamMember,
  removeTeamMemberPhoto,
  reorderTeamMembers,
  setTeamMemberPhoto,
  updateTeamMember,
} from "@/lib/team/service";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function parsePoints(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export async function createTeamMemberAction(formData: FormData) {
  await requireAdminSession();

  const nameEn = (formData.get("nameEn") as string).trim();
  const nameUk = (formData.get("nameUk") as string).trim();
  const roleEn = (formData.get("roleEn") as string).trim();
  const roleUk = (formData.get("roleUk") as string).trim();

  if (!nameEn || !nameUk || !roleEn || !roleUk) {
    throw new Error("Name and role are required in both languages");
  }

  const member = await createTeamMember({
    nameEn,
    nameUk,
    roleEn,
    roleUk,
    pointsEn: parsePoints(formData.get("pointsEn") as string),
    pointsUk: parsePoints(formData.get("pointsUk") as string),
  });

  revalidatePath("/");
  revalidatePath("/admin/team");
  return member;
}

export async function updateTeamMemberAction(id: string, formData: FormData) {
  await requireAdminSession();

  const nameEn = (formData.get("nameEn") as string).trim();
  const nameUk = (formData.get("nameUk") as string).trim();
  const roleEn = (formData.get("roleEn") as string).trim();
  const roleUk = (formData.get("roleUk") as string).trim();

  if (!nameEn || !nameUk || !roleEn || !roleUk) {
    throw new Error("Name and role are required in both languages");
  }

  await updateTeamMember(id, {
    nameEn,
    nameUk,
    roleEn,
    roleUk,
    pointsEn: parsePoints(formData.get("pointsEn") as string),
    pointsUk: parsePoints(formData.get("pointsUk") as string),
  });

  revalidatePath("/");
  revalidatePath("/admin/team");
}

export async function deleteTeamMemberAction(id: string) {
  await requireAdminSession();
  await deleteTeamMember(id);
  revalidatePath("/");
  revalidatePath("/admin/team");
}

export async function uploadTeamPhotoAction(memberId: string, formData: FormData) {
  await requireAdminSession();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) throw new Error("No file selected");
  if (!allowedTypes.has(file.type)) throw new Error("Only JPEG, PNG, or WebP allowed");
  if (file.size > 10 * 1024 * 1024) throw new Error("File must be under 10 MB");

  const ext = file.type.split("/")[1]!.replace("jpeg", "jpg");
  const buffer = Buffer.from(await file.arrayBuffer());
  const src = await uploadToR2WithPrefix(buffer, file.type, ext, `team/${memberId}`);

  await setTeamMemberPhoto(memberId, src);
  revalidatePath("/");
  revalidatePath("/admin/team");
}

export async function removeTeamPhotoAction(memberId: string) {
  await requireAdminSession();
  await removeTeamMemberPhoto(memberId);
  revalidatePath("/");
  revalidatePath("/admin/team");
}

export async function reorderTeamMembersAction(ids: string[]) {
  await requireAdminSession();
  await reorderTeamMembers(ids);
  revalidatePath("/");
  revalidatePath("/admin/team");
}
