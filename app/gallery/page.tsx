import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";

export default function GalleryPage() {
  return (
    <main className="flex h-dvh flex-col">
      <Header />
      <div className="mt-20 flex-1 overflow-y-auto scroll-smooth">
        <Gallery />
      </div>
    </main>
  );
}
