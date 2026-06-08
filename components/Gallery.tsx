"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { albums, picsumUrl } from "@/lib/gallery/albums";

export function Gallery() {
  const { t } = useLanguage();

  return (
    <div className="bg-white px-8 py-12 sm:px-12 sm:py-16">
      <div className="mx-auto max-w-[1024px]">
        <h1 className="mb-12 text-center text-4xl font-bold tracking-wide text-ink-strong sm:mb-16 sm:text-5xl">
          {t.gallery.title}
        </h1>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
          {albums.map((album) => (
            <figure key={album.id} className="flex flex-col items-center">
              <Link
                href={`/gallery/${album.id}`}
                className="group w-full overflow-hidden rounded-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)]"
              >
                <Image
                  src={picsumUrl(album.coverSeed)}
                  alt={t.gallery.items[album.id]}
                  width={640}
                  height={420}
                  className="aspect-16/10 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <figcaption className="mt-4 text-center text-base text-ink sm:text-lg">
                <Link href={`/gallery/${album.id}`} className="hover:text-brand">
                  {t.gallery.items[album.id]}
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
