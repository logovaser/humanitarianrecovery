export type Partner = {
  id: string;
  name: string;
  description: string;
  logo: string;
  sortOrder: number;
};

/** The shape actually sitting in R2. Records written before `description`
 *  existed do not have the field, so reads have to tolerate it being absent. */
export type StoredPartner = Omit<Partner, "description"> & { description?: string };

export type PartnersData = {
  partners: StoredPartner[];
};
