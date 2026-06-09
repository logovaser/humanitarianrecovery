import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { GalleryData } from "@/lib/gallery/types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "gallery.json");

export async function readGalleryData(): Promise<GalleryData> {
  try {
    const raw = await readFile(dataFile, "utf-8");
    return JSON.parse(raw) as GalleryData;
  } catch {
    return { albums: [] };
  }
}

export async function writeGalleryData(data: GalleryData) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
}
