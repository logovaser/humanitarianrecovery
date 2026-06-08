import { notFound } from "next/navigation";
import { AlbumView } from "@/components/AlbumView";
import { Header } from "@/components/Header";
import { albumIds, getAlbum } from "@/lib/gallery/albums";

type AlbumPageProps = {
  params: Promise<{ albumId: string }>;
};

export function generateStaticParams() {
  return albumIds.map((albumId) => ({ albumId }));
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await params;
  const album = getAlbum(albumId);

  if (!album) {
    notFound();
  }

  return (
    <main className="flex h-dvh flex-col">
      <Header />
      <div className="mt-20 flex-1 overflow-y-auto scroll-smooth">
        <AlbumView albumId={album.id} imageSeeds={album.imageSeeds} />
      </div>
    </main>
  );
}
