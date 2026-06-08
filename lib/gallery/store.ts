import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { seedGalleryData } from "@/lib/gallery/seed";
import type { GalleryData } from "@/lib/gallery/types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "gallery.json");

async function ensureDataFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dataFile, "utf-8");
  } catch {
    await writeFile(dataFile, JSON.stringify(seedGalleryData, null, 2), "utf-8");
  }
}

export async function readGalleryData(): Promise<GalleryData> {
  await ensureDataFile();
  const raw = await readFile(dataFile, "utf-8");
  return JSON.parse(raw) as GalleryData;
}

export async function writeGalleryData(data: GalleryData) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
}
