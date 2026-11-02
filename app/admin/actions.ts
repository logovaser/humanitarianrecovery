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

function revalidateGallery(...slugs: string[]) {
  revalidatePath("/gallery");
  for (const slug of new Set(slugs)) {
    revalidatePath(`/gallery/${slug}`);
  }
  revalidatePath("/admin/albums");
}

async function getAlbumSlug(albumId: string) {
  const album = await getAlbumById(albumId);
  return album ? [album.slug] : [];
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

  // A slug change moves the page, so refresh the old URL as well as the new one.
  const previousSlugs = await getAlbumSlug(albumId);
  const album = await updateAlbum(albumId, {
    titleUk,
    titleEn,
    descriptionUk,
    descriptionEn,
    slug,
  });
  revalidateGallery(album.slug, ...previousSlugs);
  return album;
}

export async function deleteAlbumAction(albumId: string) {
  await requireAdminSession();
  const slugs = await getAlbumSlug(albumId);
  await deleteAlbum(albumId);
  revalidateGallery(...slugs);
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
    revalidateGallery(album.slug);
    return { image };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed" };
  }
}

export async function deleteAlbumImageAction(albumId: string, imageId: string) {
  await requireAdminSession();
  await deleteImageFromAlbum(albumId, imageId);
  revalidateGallery(...(await getAlbumSlug(albumId)));
}

export async function setAlbumCoverAction(albumId: string, imageId: string) {
  await requireAdminSession();
  await setAlbumCover(albumId, imageId);
  revalidateGallery(...(await getAlbumSlug(albumId)));
}
