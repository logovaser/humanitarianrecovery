import type { GalleryData } from "@/lib/gallery/types";

function picsum(seed: string) {
  return `https://picsum.photos/seed/${seed}/640/420`;
}

function album(
  slug: string,
  titleUk: string,
  titleEn: string,
  coverSeed: string,
  imageSeeds: string[],
  sortOrder: number,
): GalleryData["albums"][number] {
  const now = new Date().toISOString();
  const images = imageSeeds.map((seed, i) => ({
    id: `${slug}-img-${i + 1}`,
    src: picsum(seed),
    sortOrder: i,
  }));

  return {
    id: slug,
    slug,
    titleUk,
    titleEn,
    coverImageId: images[0]?.id ?? null,
    images,
    sortOrder,
    createdAt: now,
    updatedAt: now,
  };
}

export const seedGalleryData: GalleryData = {
  albums: [
    album(
      "events",
      "Події організації",
      "Organization events",
      "hr-events-cover",
      ["hr-events-1", "hr-events-2", "hr-events-3", "hr-events-4", "hr-events-5", "hr-events-6"],
      0,
    ),
    album(
      "demining",
      "Гуманітарне розмінування України",
      "Humanitarian demining of Ukraine",
      "hr-demining-cover",
      [
        "hr-demining-1",
        "hr-demining-2",
        "hr-demining-3",
        "hr-demining-4",
        "hr-demining-5",
        "hr-demining-6",
        "hr-demining-7",
        "hr-demining-8",
        "hr-demining-9",
      ],
      1,
    ),
    album(
      "activity",
      "Діяльність організації, 2022–2025",
      "Organization activity, 2022–2025",
      "hr-activity-cover",
      ["hr-activity-1", "hr-activity-2", "hr-activity-3", "hr-activity-4", "hr-activity-5", "hr-activity-6"],
      2,
    ),
    album(
      "training",
      "Навчання громад",
      "Community training",
      "hr-training-cover",
      ["hr-training-1", "hr-training-2", "hr-training-3", "hr-training-4", "hr-training-5"],
      3,
    ),
    album(
      "field-work",
      "Польова робота",
      "Field operations",
      "hr-field-cover",
      ["hr-field-1", "hr-field-2", "hr-field-3", "hr-field-4", "hr-field-5", "hr-field-6"],
      4,
    ),
    album(
      "partners",
      "Партнери та співпраця",
      "Partners and cooperation",
      "hr-partners-cover",
      ["hr-partners-1", "hr-partners-2", "hr-partners-3", "hr-partners-4"],
      5,
    ),
  ],
};
