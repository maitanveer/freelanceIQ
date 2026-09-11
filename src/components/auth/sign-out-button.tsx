"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignOut() {
    setIsSubmitting(true);
    await signOut({ callbackUrl: "/login" });
  }

  return <button type="button" aria-label="Sign out" aria-busy={isSubmitting} disabled={isSubmitting} onClick={handleSignOut} className="rounded-md p-2 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-slate-800">{isSubmitting ? <span className="block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /> : <LogOut className="h-4 w-4" />}</button>;
}
