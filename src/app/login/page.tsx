import { LoginForm } from "@/components/auth/login-form";
import { BrandLogo } from "@/components/brand/brand-logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 text-center">
          <BrandLogo className="mx-auto h-16 w-64 rounded-lg" priority />
          <h1 className="mt-4 text-2xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Sign in to continue your freelance workflow.</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
