"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AlbumLightbox } from "@/components/AlbumLightbox";
import { useLanguage } from "@/components/LanguageProvider";
import { getAlbumDescription, getAlbumTitle } from "@/lib/gallery/locale";
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
  const description = getAlbumDescription(album, locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white px-8 py-12 sm:px-12 sm:py-16">
      <div className="mx-auto max-w-site">
        <Link
          href="/gallery"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark sm:mb-10"
        >
          ← {t.gallery.backToGallery}
        </Link>

        <h1
          className={`text-center text-3xl font-bold tracking-wide text-ink-strong sm:text-4xl ${description ? "mb-6" : "mb-12 sm:mb-16"}`}
        >
          {title}
        </h1>

        {description ? (
          <p className="mb-12 whitespace-pre-line text-left text-sm text-ink sm:mb-16 sm:text-base">
            {description}
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {album.images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${t.gallery.openImage} ${i + 1}`}
              className={`group cursor-zoom-in overflow-hidden rounded-[20px] shadow-[0_6px_20px_rgba(0,0,0,0.1)] ${imageAspects[i % imageAspects.length]}`}
            >
              <Image
                src={image.src}
                alt=""
                width={800}
                height={640}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>

        {album.images.length === 0 ? (
          <p className="text-center text-ink/70">{t.gallery.noImagesInAlbum}</p>
        ) : null}
      </div>

      <AlbumLightbox
        images={album.images}
        index={openIndex}
        title={title}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
}
