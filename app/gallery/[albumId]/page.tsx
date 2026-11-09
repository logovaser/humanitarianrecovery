import { notFound } from "next/navigation";
import { AlbumView } from "@/components/AlbumView";
import { Footer } from "@/components/Footer";
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
      <div className="mt-[var(--header-height)] flex flex-1 flex-col overflow-y-auto scroll-smooth">
        <div className="flex-1">
          <AlbumView album={album} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
