export type GalleryImage = {
  id: string;
  src: string;
  sortOrder: number;
};

export type GalleryAlbum = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn: string;
  coverImageId: string | null;
  images: GalleryImage[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type GalleryData = {
  albums: GalleryAlbum[];
};

export type AlbumInput = {
  titleUk: string;
  titleEn: string;
  slug?: string;
};
