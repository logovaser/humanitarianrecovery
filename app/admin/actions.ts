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
  const slug = formData.get("slug")?.toString();

  const album = await createAlbum({ titleUk, titleEn, slug });
  revalidateGallery(album.slug);
  return album;
}

export async function updateAlbumAction(albumId: string, formData: FormData) {
  await requireAdminSession();

  const titleUk = formData.get("titleUk")?.toString() ?? "";
  const titleEn = formData.get("titleEn")?.toString() ?? "";
  const slug = formData.get("slug")?.toString();

  const album = await updateAlbum(albumId, { titleUk, titleEn, slug });
  revalidateGallery(album.slug);
  return album;
}

export async function deleteAlbumAction(albumId: string) {
  await requireAdminSession();
  await deleteAlbum(albumId);
  revalidateGallery();
}

export async function uploadAlbumImageAction(albumId: string, formData: FormData) {
  await requireAdminSession();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No image selected");
  }

  const album = await getAlbumById(albumId);
  if (!album) throw new Error("Album not found");

  const src = await saveGalleryUpload(file, album.slug);
  const image = await addImageToAlbum(albumId, src);
  revalidateGallery();
  return image;
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
