"use client";

import { registerUser } from "@/lib/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
    const result = await registerUser(form);
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setMessage("Account created successfully. Redirecting you to sign in...");
    window.setTimeout(() => router.push("/login"), 800);
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
        <div><label htmlFor="register-name" className="mb-2 block text-sm font-medium">Full name</label><input id="register-name" name="name" type="text" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950" placeholder="Tanveer Ahmed" required /></div>
        <div><label htmlFor="register-email" className="mb-2 block text-sm font-medium">Email</label><input id="register-email" name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950" placeholder="tanveer@example.com" required /></div>
        <div><label htmlFor="register-password" className="mb-2 block text-sm font-medium">Password</label><input id="register-password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={(event) => updateField("password", event.target.value)} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950" placeholder="At least 8 characters" required minLength={8} /></div>
        {error ? <p className="text-sm text-rose-600" role="alert">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-600" role="status">{message}</p> : null}
        <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /> : null}{isSubmitting ? "Creating account..." : "Create account"}</button>
      </form>
      <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">Already have an account? <Link href="/login" className="text-primary">Sign in</Link></div>
    </>
  );
}
