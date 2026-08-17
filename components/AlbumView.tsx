"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { getAlbumTitle } from "@/lib/gallery/locale";
import type { GalleryAlbum } from "@/lib/gallery/types";

const imageAspects = [
  "aspect-3/4",
  "aspect-3/4",
  "aspect-16/10",
  "aspect-3/4",
  "aspect-16/10",
  "aspect-3/4",
  "aspect-16/10",
  "aspect-3/4",
  "aspect-16/10",
] as const;

type AlbumViewProps = {
  album: GalleryAlbum;
};

export function AlbumView({ album }: AlbumViewProps) {
  const { t, locale } = useLanguage();
  const title = getAlbumTitle(album, locale);

  return (
    <div className="bg-white px-8 py-12 sm:px-12 sm:py-16">
      <div className="mx-auto max-w-site">
        <Link
          href="/gallery"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark sm:mb-10"
        >
          ← {t.gallery.backToGallery}
        </Link>

        <h1 className="mb-12 text-center text-3xl font-bold tracking-wide text-ink-strong sm:mb-16 sm:text-4xl">
          {title}
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {album.images.map((image, i) => (
            <div
              key={image.id}
              className={`overflow-hidden rounded-[20px] shadow-[0_6px_20px_rgba(0,0,0,0.1)] ${imageAspects[i % imageAspects.length]}`}
            >
              <Image
                src={image.src}
                alt=""
                width={800}
                height={640}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {album.images.length === 0 ? (
          <p className="text-center text-ink/70">This album has no images yet.</p>
        ) : null}
      </div>
    </div>
  );
}
