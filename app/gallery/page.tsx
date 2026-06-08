import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { getAlbums } from "@/lib/gallery/service";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await getAlbums();

  return (
    <main className="flex h-dvh flex-col">
      <Header />
      <div className="mt-20 flex-1 overflow-y-auto scroll-smooth">
        <Gallery albums={albums} />
      </div>
    </main>
  );
}
