export type TeamMember = {
  id: string;
  nameEn: string;
  nameUk: string;
  roleEn: string;
  roleUk: string;
  pointsEn: string[];
  pointsUk: string[];
  photo: string | null;
  sortOrder: number;
};

export type TeamData = {
  members: TeamMember[];
};
