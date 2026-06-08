import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getAdminEmails, isAllowedAdminEmail, verifyAdminPassword } from "@/lib/auth/admin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString() ?? "";

        if (!email || !password || !isAllowedAdminEmail(email)) {
          return null;
        }

        if (!verifyAdminPassword(password)) {
          return null;
        }

        return { id: email, email, name: email };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        return isAllowedAdminEmail(user.email);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  trustHost: true,
});

export function hasAdminConfig() {
  const emails = getAdminEmails();
  const hasPassword = Boolean(process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH);
  const hasGoogle = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  return emails.length > 0 && (hasPassword || hasGoogle);
}
