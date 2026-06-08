import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAllowedAdminEmail } from "@/lib/auth/admin";

export async function requireAdminPage() {
  const session = await auth();

  if (!session?.user?.email || !isAllowedAdminEmail(session.user.email)) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireAdminSession() {
  const session = await auth();

  if (!session?.user?.email || !isAllowedAdminEmail(session.user.email)) {
    throw new Error("Unauthorized");
  }

  return session;
}
