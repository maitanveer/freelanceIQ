"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your credentials and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", { email: parsed.data.email.toLowerCase(), password: parsed.data.password, redirect: false });
      if (!result || result.error) {
        setError("Invalid email or password. Please check your credentials and try again.");
        setIsSubmitting(false);
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Unable to sign in. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input id="login-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 outline-none ring-0 focus:border-primary dark:border-slate-700 dark:bg-slate-950" placeholder="tanveer@example.com" required />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 outline-none ring-0 focus:border-primary dark:border-slate-700 dark:bg-slate-950" placeholder="Enter your password" required />
        </div>
        {error ? <p className="text-sm text-rose-600" role="alert">{error}</p> : null}
        <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /> : null}
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="mt-6 flex items-center justify-between text-sm"><Link href="/forgot-password" className="text-primary">Forgot password?</Link><Link href="/register" className="text-primary">Create account</Link></div>
    </>
  );
}
