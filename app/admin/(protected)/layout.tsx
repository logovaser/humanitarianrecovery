import { requireAdminPage } from "@/lib/auth/session";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdminPage();
  return children;
}
