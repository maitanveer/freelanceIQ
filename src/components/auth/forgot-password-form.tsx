"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

const emailSchema = z.string().trim().email("Enter a valid email address.");

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setIsSubmitting(false);
    setMessage("Password reset email delivery is not configured yet. Please contact support to reset your password.");
  }

  return <><form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}><div><label htmlFor="forgot-email" className="mb-2 block text-sm font-medium">Email</label><input id="forgot-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950" placeholder="tanveer@example.com" required /></div>{error ? <p className="text-sm text-rose-600" role="alert">{error}</p> : null}{message ? <p className="text-sm text-amber-600" role="status">{message}</p> : null}<button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /> : null}{isSubmitting ? "Sending..." : "Send reset link"}</button></form><div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300"><Link href="/login" className="text-primary">Back to sign in</Link></div></>;
}
