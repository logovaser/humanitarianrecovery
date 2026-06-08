import { LoginForm } from "@/components/admin/LoginForm";
import { hasAdminConfig } from "@/auth";

export default function AdminLoginPage() {
  const configured = hasAdminConfig();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface px-6 py-12">
      {configured ? (
        <LoginForm />
      ) : (
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-xl font-bold text-ink-strong">Admin not configured</h1>
          <p className="mt-3 text-sm text-ink/70">
            Set <code className="text-xs">AUTH_SECRET</code>,{" "}
            <code className="text-xs">ADMIN_EMAIL</code> or{" "}
            <code className="text-xs">ADMIN_EMAILS</code>, and{" "}
            <code className="text-xs">ADMIN_PASSWORD</code> in your environment. See{" "}
            <code className="text-xs">.env.example</code>.
          </p>
        </div>
      )}
    </div>
  );
}
