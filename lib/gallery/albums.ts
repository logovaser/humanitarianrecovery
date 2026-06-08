export const albumIds = [
  "events",
  "demining",
  "activity",
  "training",
  "fieldWork",
  "partners",
] as const;

export type AlbumId = (typeof albumIds)[number];

type Album = {
  id: AlbumId;
  coverSeed: string;
  imageSeeds: string[];
};

export const albums: Album[] = [
  {
    id: "events",
    coverSeed: "hr-events-cover",
    imageSeeds: ["hr-events-1", "hr-events-2", "hr-events-3", "hr-events-4", "hr-events-5", "hr-events-6"],
  },
  {
    id: "demining",
    coverSeed: "hr-demining-cover",
    imageSeeds: [
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
  },
  {
    id: "activity",
    coverSeed: "hr-activity-cover",
    imageSeeds: [
      "hr-activity-1",
      "hr-activity-2",
      "hr-activity-3",
      "hr-activity-4",
      "hr-activity-5",
      "hr-activity-6",
    ],
  },
  {
    id: "training",
    coverSeed: "hr-training-cover",
    imageSeeds: ["hr-training-1", "hr-training-2", "hr-training-3", "hr-training-4", "hr-training-5"],
  },
  {
    id: "fieldWork",
    coverSeed: "hr-field-cover",
    imageSeeds: ["hr-field-1", "hr-field-2", "hr-field-3", "hr-field-4", "hr-field-5", "hr-field-6"],
  },
  {
    id: "partners",
    coverSeed: "hr-partners-cover",
    imageSeeds: ["hr-partners-1", "hr-partners-2", "hr-partners-3", "hr-partners-4"],
  },
];

export function getAlbum(id: string): Album | undefined {
  return albums.find((album) => album.id === id);
}

export function picsumUrl(seed: string, width = 640, height = 420) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
