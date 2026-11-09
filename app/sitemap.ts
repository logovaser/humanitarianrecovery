import type { MetadataRoute } from "next";
import { getCachedAlbums } from "@/lib/gallery/service";
import { SITE_URL } from "@/lib/site";

// Rebuilt hourly so albums added in the admin appear without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const albums = await getCachedAlbums();

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/gallery`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/education-request`, changeFrequency: "yearly", priority: 0.5 },
    ...albums.map((album) => ({
      url: `${SITE_URL}/gallery/${album.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
