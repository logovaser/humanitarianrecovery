import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { PartnersData } from "@/lib/partners/types";

const dataFile = path.join(process.cwd(), "data", "partners.json");

export async function readPartnersData(): Promise<PartnersData> {
  try {
    const raw = await readFile(dataFile, "utf-8");
    return JSON.parse(raw) as PartnersData;
  } catch {
    return { partners: [] };
  }
}

export async function writePartnersData(data: PartnersData) {
  await writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
}
