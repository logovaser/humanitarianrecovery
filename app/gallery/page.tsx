import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { getAlbums } from "@/lib/gallery/service";

export default async function GalleryPage() {
  const albums = await getAlbums();

  return (
    <main className="flex h-dvh flex-col">
      <Header />
      <div className="mt-[var(--header-height)] flex flex-1 flex-col overflow-y-auto scroll-smooth">
        <div className="flex-1">
          <Gallery albums={albums} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
