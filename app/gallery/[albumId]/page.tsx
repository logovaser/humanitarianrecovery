import { notFound } from "next/navigation";
import { AlbumView } from "@/components/AlbumView";
import { Header } from "@/components/Header";
import { getAlbumBySlug } from "@/lib/gallery/service";

type AlbumPageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await params;
  const album = await getAlbumBySlug(albumId);

  if (!album) {
    notFound();
  }

  return (
    <main className="flex h-dvh flex-col">
      <Header />
      <div className="mt-20 flex-1 overflow-y-auto scroll-smooth">
        <AlbumView album={album} />
      </div>
    </main>
  );
}
