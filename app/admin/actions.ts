"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/session";
import {
  addImageToAlbum,
  createAlbum,
  deleteAlbum,
  deleteImageFromAlbum,
  getAlbumById,
  setAlbumCover,
  updateAlbum,
} from "@/lib/gallery/service";
import type { GalleryImage } from "@/lib/gallery/types";
import { saveGalleryUpload } from "@/lib/gallery/upload";

function revalidateGallery(slug?: string) {
  revalidatePath("/gallery");
  if (slug) {
    revalidatePath(`/gallery/${slug}`);
  }
  revalidatePath("/admin/albums");
}

export async function createAlbumAction(formData: FormData) {
  await requireAdminSession();

  const titleUk = formData.get("titleUk")?.toString() ?? "";
  const titleEn = formData.get("titleEn")?.toString() ?? "";
  const descriptionUk = formData.get("descriptionUk")?.toString() ?? "";
  const descriptionEn = formData.get("descriptionEn")?.toString() ?? "";
  const slug = formData.get("slug")?.toString();

  const album = await createAlbum({ titleUk, titleEn, descriptionUk, descriptionEn, slug });
  revalidateGallery(album.slug);
  return album;
}

export async function updateAlbumAction(albumId: string, formData: FormData) {
  await requireAdminSession();

  const titleUk = formData.get("titleUk")?.toString() ?? "";
  const titleEn = formData.get("titleEn")?.toString() ?? "";
  const descriptionUk = formData.get("descriptionUk")?.toString() ?? "";
  const descriptionEn = formData.get("descriptionEn")?.toString() ?? "";
  const slug = formData.get("slug")?.toString();

  const album = await updateAlbum(albumId, {
    titleUk,
    titleEn,
    descriptionUk,
    descriptionEn,
    slug,
  });
  revalidateGallery(album.slug);
  return album;
}

export async function deleteAlbumAction(albumId: string) {
  await requireAdminSession();
  await deleteAlbum(albumId);
  revalidateGallery();
}

type UploadAlbumImageResult = { image: GalleryImage } | { error: string };

// Returns the error in place of throwing it: production builds replace thrown
// Server Action messages with a generic one, and the admin needs the reason.
export async function uploadAlbumImageAction(
  albumId: string,
  formData: FormData,
): Promise<UploadAlbumImageResult> {
  await requireAdminSession();

  try {
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { error: "No image selected" };
    }

    const album = await getAlbumById(albumId);
    if (!album) return { error: "Album not found" };

    const src = await saveGalleryUpload(file, album.slug);
    const image = await addImageToAlbum(albumId, src);
    revalidateGallery();
    return { image };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed" };
  }
}

export async function deleteAlbumImageAction(albumId: string, imageId: string) {
  await requireAdminSession();
  await deleteImageFromAlbum(albumId, imageId);
  revalidateGallery();
}

export async function setAlbumCoverAction(albumId: string, imageId: string) {
  await requireAdminSession();
  await setAlbumCover(albumId, imageId);
  revalidateGallery();
}
