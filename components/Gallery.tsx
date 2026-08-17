"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { getAlbumTitle } from "@/lib/gallery/locale";
import { getCoverSrc } from "@/lib/gallery/utils";
import type { GalleryAlbum } from "@/lib/gallery/types";

type GalleryProps = {
  albums: GalleryAlbum[];
};

export function Gallery({ albums }: GalleryProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="bg-white px-8 py-12 sm:px-12 sm:py-16">
      <div className="mx-auto max-w-site">
        <h1 className="mb-12 text-center text-4xl font-bold tracking-wide text-ink-strong sm:mb-16 sm:text-5xl">
          {t.gallery.title}
        </h1>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
          {albums.map((album) => {
            const cover = getCoverSrc(album);
            const title = getAlbumTitle(album, locale);

            return (
              <figure key={album.id} className="flex flex-col items-center">
                <Link
                  href={`/gallery/${album.slug}`}
                  className="group w-full overflow-hidden rounded-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)]"
                >
                  {cover ? (
                    <Image
                      src={cover}
                      alt={title}
                      width={640}
                      height={420}
                      className="aspect-16/10 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex aspect-16/10 w-full items-center justify-center bg-surface text-sm text-ink/50">
                      No images
                    </div>
                  )}
                </Link>
                <figcaption className="mt-4 text-center text-base text-ink sm:text-lg">
                  <Link href={`/gallery/${album.slug}`} className="hover:text-brand">
                    {title}
                  </Link>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {albums.length === 0 ? (
          <p className="text-center text-ink/70">No albums available yet.</p>
        ) : null}
      </div>
    </div>
  );
}
