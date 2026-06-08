"use client";

import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleCredentials(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      window.location.href = "/admin/albums";
    });
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-ink-strong">Admin sign in</h1>
        <p className="text-sm text-ink/70">Manage gallery albums and images</p>
      </div>

      <form action={handleCredentials} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-brand"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-semibold">Password</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-brand"
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
