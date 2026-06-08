import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AlbumForm } from "@/components/admin/AlbumForm";
import { AlbumImageManager } from "@/components/admin/AlbumImageManager";
import { DeleteAlbumButton } from "@/components/admin/DeleteAlbumButton";
import { getAlbumById } from "@/lib/gallery/service";

type EditAlbumPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAlbumPage({ params }: EditAlbumPageProps) {
  const { id } = await params;
  const album = await getAlbumById(id);

  if (!album) {
    notFound();
  }

  return (
    <AdminShell title="Edit album">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/albums"
          className="text-sm font-semibold text-brand hover:text-brand-dark"
        >
          ← Back to albums
        </Link>
        <Link
          href={`/gallery/${album.slug}`}
          className="text-sm font-semibold text-ink/70 hover:text-brand"
          target="_blank"
        >
          View on site
        </Link>
        <DeleteAlbumButton albumId={album.id} />
      </div>

      <div className="space-y-10">
        <AlbumForm album={album} />
        <AlbumImageManager album={album} />
      </div>
    </AdminShell>
  );
}
