"use server";

import { revalidatePath } from "next/cache";
import { uploadToR2 } from "@/lib/gallery/r2";
import { requireAdminSession } from "@/lib/auth/session";
import { addPartner, deletePartner, updatePartner } from "@/lib/partners/service";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

async function uploadLogo(file: File): Promise<string> {
  if (!allowedTypes.has(file.type)) throw new Error("Only JPEG, PNG, or WebP allowed");
  if (file.size > 5 * 1024 * 1024) throw new Error("File must be under 5 MB");

  const ext = file.type.split("/")[1]!.replace("jpeg", "jpg");
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadToR2(buffer, file.type, ext, "partners");
}

function revalidatePartners() {
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

export async function uploadPartnerAction(formData: FormData) {
  await requireAdminSession();

  const file = formData.get("file");
  const name = formData.get("name")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";
  if (!(file instanceof File) || file.size === 0) throw new Error("No file selected");

  const logo = await uploadLogo(file);

  const partner = await addPartner({ name, description, logo });
  revalidatePartners();
  return partner;
}

export async function updatePartnerAction(formData: FormData) {
  await requireAdminSession();

  const id = formData.get("id")?.toString() ?? "";
  if (!id) throw new Error("Missing partner id");

  const fields: { name: string; description: string; logo?: string } = {
    name: formData.get("name")?.toString().trim() ?? "",
    description: formData.get("description")?.toString().trim() ?? "",
  };

  // The file input is optional here: an empty one means keep the current logo.
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    fields.logo = await uploadLogo(file);
  }

  const partner = await updatePartner(id, fields);
  revalidatePartners();
  return partner;
}

export async function deletePartnerAction(id: string) {
  await requireAdminSession();
  await deletePartner(id);
  revalidatePartners();
}
