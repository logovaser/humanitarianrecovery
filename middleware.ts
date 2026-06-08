import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAllowedAdminEmail } from "@/lib/auth/admin";

function isAuthenticatedAdmin(session: { user?: { email?: string | null } | null } | null) {
  return Boolean(session?.user?.email && isAllowedAdminEmail(session.user.email));
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isAdmin = isAuthenticatedAdmin(req.auth);

  if (isLoginPage) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/albums", req.url));
    }
    return NextResponse.next();
  }

  if (!isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
