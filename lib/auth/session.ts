import { auth } from "@/auth";
import { isAllowedAdminEmail } from "@/lib/auth/admin";

export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user?.email || !isAllowedAdminEmail(session.user.email)) {
    throw new Error("Unauthorized");
  }
  return session;
}
