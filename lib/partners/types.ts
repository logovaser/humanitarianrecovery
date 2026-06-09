export type Partner = {
  id: string;
  name: string;
  logo: string;
  sortOrder: number;
};

export type PartnersData = {
  partners: Partner[];
};
