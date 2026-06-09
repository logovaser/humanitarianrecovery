import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isAllowedAdminEmail, verifyAdminPassword } from "@/lib/auth/admin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
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
  return Boolean(process.env.ADMIN_EMAILS && process.env.ADMIN_PASSWORD);
}
