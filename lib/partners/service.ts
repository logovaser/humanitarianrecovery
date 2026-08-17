import { randomUUID } from "crypto";
import { deleteFromR2, isR2Url } from "@/lib/gallery/r2";
import { readPartnersData, writePartnersData } from "@/lib/partners/store";
import type { Partner } from "@/lib/partners/types";

export async function getPartners(): Promise<Partner[]> {
  const data = await readPartnersData();
  return [...data.partners]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((partner) => ({ ...partner, description: partner.description ?? "" }));
}

export async function addPartner(input: {
  name: string;
  description: string;
  logo: string;
}): Promise<Partner> {
  const data = await readPartnersData();
  const partner: Partner = {
    id: randomUUID(),
    name: input.name,
    description: input.description,
    logo: input.logo,
    sortOrder: data.partners.length,
  };
  data.partners.push(partner);
  await writePartnersData(data);
  return partner;
}

export async function updatePartner(
  id: string,
  fields: { name?: string; description?: string; logo?: string },
): Promise<Partner> {
  const data = await readPartnersData();
  const idx = data.partners.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Partner not found");

  const previousLogo = data.partners[idx].logo;
  data.partners[idx] = { ...data.partners[idx], ...fields };
  await writePartnersData(data);

  // Only after the record is safely written, so a failed write cannot leave the
  // stored logo pointing at an object we already deleted. A failure here just
  // orphans a file.
  if (fields.logo && fields.logo !== previousLogo && isR2Url(previousLogo)) {
    await deleteFromR2(previousLogo);
  }

  return { ...data.partners[idx], description: data.partners[idx].description ?? "" };
}

export async function deletePartner(id: string) {
  const data = await readPartnersData();
  const partner = data.partners.find((p) => p.id === id);
  if (!partner) throw new Error("Partner not found");

  if (isR2Url(partner.logo)) {
    await deleteFromR2(partner.logo);
  }

  data.partners = data.partners.filter((p) => p.id !== id).map((p, i) => ({ ...p, sortOrder: i }));
  await writePartnersData(data);
}
