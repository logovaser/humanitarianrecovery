import type { GalleryAlbum } from "@/lib/gallery/types";
import type { Locale } from "@/lib/i18n/types";

export function getAlbumTitle(album: GalleryAlbum, locale: Locale) {
  return locale === "uk" ? album.titleUk : album.titleEn;
}

export function getAlbumDescription(album: GalleryAlbum, locale: Locale) {
  return (locale === "uk" ? album.descriptionUk : album.descriptionEn) ?? "";
}
