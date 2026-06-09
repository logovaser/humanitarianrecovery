import { randomUUID } from "crypto";
import { unlink } from "fs/promises";
import path from "path";
import { deleteFromR2, isR2Url } from "@/lib/gallery/r2";
import { readGalleryData, writeGalleryData } from "@/lib/gallery/store";
import type { AlbumInput, GalleryAlbum, GalleryImage } from "@/lib/gallery/types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function sortAlbums(albums: GalleryAlbum[]) {
  return [...albums].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.titleEn.localeCompare(b.titleEn),
  );
}

function sortImages(images: GalleryImage[]) {
  return [...images].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAlbums() {
  const data = await readGalleryData();
  return sortAlbums(data.albums);
}

export async function getAlbumBySlug(slug: string) {
  const data = await readGalleryData();
  const album = data.albums.find((item) => item.slug === slug);
  if (!album) return undefined;
  return { ...album, images: sortImages(album.images) };
}

export async function getAlbumById(id: string) {
  const data = await readGalleryData();
  const album = data.albums.find((item) => item.id === id);
  if (!album) return undefined;
  return { ...album, images: sortImages(album.images) };
}

export async function createAlbum(input: AlbumInput) {
  const data = await readGalleryData();
  const slug = slugify(input.slug || input.titleEn);
  if (!slug) throw new Error("Invalid album slug");

  if (data.albums.some((album) => album.slug === slug)) {
    throw new Error("An album with this slug already exists");
  }

  const now = new Date().toISOString();
  const album: GalleryAlbum = {
    id: randomUUID(),
    slug,
    titleUk: input.titleUk.trim(),
    titleEn: input.titleEn.trim(),
    coverImageId: null,
    images: [],
    sortOrder: data.albums.length,
    createdAt: now,
    updatedAt: now,
  };

  data.albums.push(album);
  await writeGalleryData(data);
  return album;
}

export async function updateAlbum(id: string, input: AlbumInput) {
  const data = await readGalleryData();
  const index = data.albums.findIndex((album) => album.id === id);
  if (index === -1) throw new Error("Album not found");

  const slug = slugify(input.slug || input.titleEn);
  if (!slug) throw new Error("Invalid album slug");

  if (data.albums.some((album) => album.slug === slug && album.id !== id)) {
    throw new Error("An album with this slug already exists");
  }

  const album = data.albums[index];
  data.albums[index] = {
    ...album,
    slug,
    titleUk: input.titleUk.trim(),
    titleEn: input.titleEn.trim(),
    updatedAt: new Date().toISOString(),
  };

  await writeGalleryData(data);
  return data.albums[index];
}

async function deleteUpload(src: string) {
  if (isR2Url(src)) {
    await deleteFromR2(src);
  } else if (src.startsWith("/uploads/gallery/")) {
    const filePath = path.join(process.cwd(), "public", src);
    try {
      await unlink(filePath);
    } catch {
      // File may already be removed.
    }
  }
}

export async function deleteAlbum(id: string) {
  const data = await readGalleryData();
  const album = data.albums.find((item) => item.id === id);
  if (!album) throw new Error("Album not found");

  for (const image of album.images) {
    await deleteUpload(image.src);
  }

  data.albums = data.albums.filter((item) => item.id !== id);
  await writeGalleryData(data);
}

export async function addImageToAlbum(albumId: string, src: string) {
  const data = await readGalleryData();
  const album = data.albums.find((item) => item.id === albumId);
  if (!album) throw new Error("Album not found");

  const image: GalleryImage = {
    id: randomUUID(),
    src,
    sortOrder: album.images.length,
  };

  album.images.push(image);
  if (!album.coverImageId) {
    album.coverImageId = image.id;
  }
  album.updatedAt = new Date().toISOString();

  await writeGalleryData(data);
  return image;
}

export async function deleteImageFromAlbum(albumId: string, imageId: string) {
  const data = await readGalleryData();
  const album = data.albums.find((item) => item.id === albumId);
  if (!album) throw new Error("Album not found");

  const image = album.images.find((item) => item.id === imageId);
  if (!image) throw new Error("Image not found");

  await deleteUpload(image.src);
  album.images = album.images
    .filter((item) => item.id !== imageId)
    .map((item, index) => ({ ...item, sortOrder: index }));

  if (album.coverImageId === imageId) {
    album.coverImageId = album.images[0]?.id ?? null;
  }
  album.updatedAt = new Date().toISOString();

  await writeGalleryData(data);
}

export async function setAlbumCover(albumId: string, imageId: string) {
  const data = await readGalleryData();
  const album = data.albums.find((item) => item.id === albumId);
  if (!album) throw new Error("Album not found");
  if (!album.images.some((image) => image.id === imageId)) {
    throw new Error("Image not found in album");
  }

  album.coverImageId = imageId;
  album.updatedAt = new Date().toISOString();
  await writeGalleryData(data);
}
