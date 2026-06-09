import { readJsonFromR2, writeJsonToR2 } from "@/lib/gallery/r2";
import type { GalleryData } from "@/lib/gallery/types";

const KEY = "data/gallery.json";

export async function readGalleryData(): Promise<GalleryData> {
  return readJsonFromR2<GalleryData>(KEY, { albums: [] });
}

export async function writeGalleryData(data: GalleryData): Promise<void> {
  await writeJsonToR2(KEY, data);
}
