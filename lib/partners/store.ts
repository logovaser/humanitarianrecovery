import { readJsonFromR2, writeJsonToR2 } from "@/lib/gallery/r2";
import type { PartnersData } from "@/lib/partners/types";

const KEY = "data/partners.json";

export async function readPartnersData(): Promise<PartnersData> {
  return readJsonFromR2<PartnersData>(KEY, { partners: [] });
}

export async function writePartnersData(data: PartnersData): Promise<void> {
  await writeJsonToR2(KEY, data);
}
