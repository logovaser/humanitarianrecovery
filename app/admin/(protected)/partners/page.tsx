import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { PartnerManager } from "@/components/admin/PartnerManager";
import { getPartners } from "@/lib/partners/service";

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <AdminShell title="Partners">
      <PartnerManager partners={partners} />
    </AdminShell>
  );
}
