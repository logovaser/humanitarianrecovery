import Image from "next/image";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAlbums } from "@/lib/gallery/service";
import { getCoverSrc } from "@/lib/gallery/utils";

export default async function AdminAlbumsPage() {
  const albums = await getAlbums();

  return (
    <AdminShell title="Gallery albums">
      <div className="mb-6">
        <Link
          href="/admin/albums/new"
          className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
        >
          New album
        </Link>
      </div>

      <div className="space-y-4">
        {albums.map((album) => {
          const cover = getCoverSrc(album);
          return (
            <div
              key={album.id}
              className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-full overflow-hidden rounded-xl bg-surface sm:w-40">
                {cover ? (
                  <Image src={cover} alt="" fill className="object-cover" sizes="160px" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-ink/50">No cover</div>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold text-ink-strong">{album.titleEn}</h2>
                <p className="text-sm text-ink/70">{album.titleUk}</p>
                <p className="mt-1 text-xs text-ink/50">
                  /gallery/{album.slug} · {album.images.length} images
                </p>
              </div>

              <Link
                href={`/admin/albums/${album.id}`}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-surface"
              >
                Edit
              </Link>
            </div>
          );
        })}

        {albums.length === 0 ? (
          <p className="text-sm text-ink/70">No albums yet. Create your first album.</p>
        ) : null}
      </div>
    </AdminShell>
  );
}
