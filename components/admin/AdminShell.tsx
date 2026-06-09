import Link from "next/link";
import { signOut } from "@/auth";

type AdminShellProps = {
  title: string;
  children: React.ReactNode;
};

export function AdminShell({ title, children }: AdminShellProps) {
  return (
    <div className="min-h-dvh bg-surface text-ink">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin/albums" className="text-lg font-bold text-brand">
              HR Admin
            </Link>
            <nav className="flex gap-5 text-sm font-semibold">
              <Link href="/admin/albums" className="text-ink hover:text-brand">
                Gallery
              </Link>
              <Link href="/admin/team" className="text-ink hover:text-brand">
                Team
              </Link>
              <Link href="/admin/partners" className="text-ink hover:text-brand">
                Partners
              </Link>
            </nav>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-surface"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-bold text-ink-strong">{title}</h1>
        {children}
      </main>
    </div>
  );
}
