"use server";

import { revalidatePath } from "next/cache";
import { uploadToR2 } from "@/lib/gallery/r2";
import { requireAdminSession } from "@/lib/auth/session";
import { addPartner, deletePartner } from "@/lib/partners/service";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function uploadPartnerAction(formData: FormData) {
  await requireAdminSession();

  const file = formData.get("file");
  const name = formData.get("name")?.toString().trim() ?? "";
  if (!(file instanceof File) || file.size === 0) throw new Error("No file selected");
  if (!allowedTypes.has(file.type)) throw new Error("Only JPEG, PNG, or WebP allowed");
  if (file.size > 5 * 1024 * 1024) throw new Error("File must be under 5 MB");

  const ext = file.type.split("/")[1]!.replace("jpeg", "jpg");
  const buffer = Buffer.from(await file.arrayBuffer());
  const src = await uploadToR2(buffer, file.type, ext, "partners");

  const partner = await addPartner(name, src);
  revalidatePath("/");
  revalidatePath("/admin/partners");
  return partner;
}

export async function deletePartnerAction(id: string) {
  await requireAdminSession();
  await deletePartner(id);
  revalidatePath("/");
  revalidatePath("/admin/partners");
}
