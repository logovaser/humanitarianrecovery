import { AdminShell } from "@/components/admin/AdminShell";
import { AlbumForm } from "@/components/admin/AlbumForm";

export default function NewAlbumPage() {
  return (
    <AdminShell title="New album">
      <AlbumForm />
    </AdminShell>
  );
}
