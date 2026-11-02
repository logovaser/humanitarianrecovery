"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { GalleryImage } from "@/lib/gallery/types";

type AlbumLightboxProps = {
  images: GalleryImage[];
  index: number | null;
  title: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 50;

export function AlbumLightbox({
  images,
  index,
  title,
  onIndexChange,
  onClose,
}: AlbumLightboxProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  // showModal() puts the dialog in the top layer, so it covers the header and
  // the scroll container without a portal.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && index !== null && !dialog.open) dialog.showModal();
  }, [index]);

  if (index === null) return null;

  // The album can lose images while the viewer is open (a refresh after an
  // admin deletes one), so the index can point past the end.
  const image = images[index];
  if (!image) return null;

  const count = images.length;
  // Closing through the dialog fires its close event, which calls onClose, and
  // lets the browser return focus to the thumbnail that opened the viewer.
  const close = () => dialogRef.current?.close();
  const showPrevious = () => onIndexChange((index - 1 + count) % count);
  const showNext = () => onIndexChange((index + 1) % count);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the backdrop area report the dialog itself as the target.
        if (event.target === dialogRef.current) close();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const deltaX = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (deltaX > SWIPE_THRESHOLD) showPrevious();
        if (deltaX < -SWIPE_THRESHOLD) showNext();
      }}
      aria-label={title}
      className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-black/90 p-0 backdrop:bg-black/50"
    >
      <div className="pointer-events-none flex h-full w-full items-center justify-center px-4 py-16 sm:px-20">
        <Image
          key={image.id}
          src={image.src}
          alt={`${title} (${index + 1}/${count})`}
          width={1920}
          height={1280}
          sizes="100vw"
          className="pointer-events-auto max-h-full w-auto max-w-full rounded-lg object-contain"
        />
      </div>

      <p className="absolute left-4 top-4 text-sm font-semibold text-white/80 sm:left-6 sm:top-6">
        {index + 1} / {count}
      </p>

      <button
        type="button"
        onClick={close}
        aria-label={t.common.close}
        className="absolute right-2 top-2 rounded-full p-3 text-3xl leading-none text-white/80 hover:bg-white/10 hover:text-white sm:right-4 sm:top-4"
      >
        &times;
      </button>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label={t.gallery.previousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-3xl leading-none text-white/80 hover:bg-white/10 hover:text-white sm:left-4"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label={t.gallery.nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-3xl leading-none text-white/80 hover:bg-white/10 hover:text-white sm:right-4"
          >
            &#8250;
          </button>
        </>
      ) : null}
    </dialog>
  );
}
