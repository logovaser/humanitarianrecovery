import type { GalleryAlbum } from "@/lib/gallery/types";

export function getCoverSrc(album: GalleryAlbum) {
  const cover = album.images.find((image) => image.id === album.coverImageId);
  return cover?.src ?? album.images[0]?.src ?? null;
}
