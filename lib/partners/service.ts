import { randomUUID } from "crypto";
import { deleteFromR2, isR2Url } from "@/lib/gallery/r2";
import { readPartnersData, writePartnersData } from "@/lib/partners/store";
import type { Partner } from "@/lib/partners/types";

export async function getPartners(): Promise<Partner[]> {
  const data = await readPartnersData();
  return [...data.partners].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function addPartner(name: string, logo: string): Promise<Partner> {
  const data = await readPartnersData();
  const partner: Partner = {
    id: randomUUID(),
    name,
    logo,
    sortOrder: data.partners.length,
  };
  data.partners.push(partner);
  await writePartnersData(data);
  return partner;
}

export async function deletePartner(id: string) {
  const data = await readPartnersData();
  const partner = data.partners.find((p) => p.id === id);
  if (!partner) throw new Error("Partner not found");

  if (isR2Url(partner.logo)) {
    await deleteFromR2(partner.logo);
  }

  data.partners = data.partners
    .filter((p) => p.id !== id)
    .map((p, i) => ({ ...p, sortOrder: i }));
  await writePartnersData(data);
}
