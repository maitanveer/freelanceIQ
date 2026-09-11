"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/workspace-actions";

export function ProfileForm({ initial }: { initial: { name: string; professionalTitle: string; overview: string; hourlyRate: number; location: string } }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setMessage("");
    const data = new FormData(event.currentTarget);
    const result = await updateProfile({ name: data.get("name"), professionalTitle: data.get("professionalTitle"), overview: data.get("overview"), hourlyRate: data.get("hourlyRate"), location: data.get("location") });
    setBusy(false); setMessage(result.ok ? "Profile updated successfully." : result.message);
  }
  return <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div className="grid gap-5 md:grid-cols-2"><div><label className="mb-2 block text-sm font-medium" htmlFor="profile-name">Name</label><input id="profile-name" name="name" defaultValue={initial.name} required className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div><div><label className="mb-2 block text-sm font-medium" htmlFor="profile-title">Professional title</label><input id="profile-title" name="professionalTitle" defaultValue={initial.professionalTitle} required className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div><div className="md:col-span-2"><label className="mb-2 block text-sm font-medium" htmlFor="profile-overview">Overview</label><textarea id="profile-overview" name="overview" defaultValue={initial.overview} required minLength={30} className="min-h-28 w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div><div><label className="mb-2 block text-sm font-medium" htmlFor="profile-rate">Hourly rate</label><input id="profile-rate" name="hourlyRate" type="number" min="1" max="5000" defaultValue={initial.hourlyRate || ""} required className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div><div><label className="mb-2 block text-sm font-medium" htmlFor="profile-location">Location</label><input id="profile-location" name="location" defaultValue={initial.location} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div></div><div className="mt-6 flex items-center gap-4"><button type="submit" disabled={busy} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{busy ? "Saving..." : "Save profile"}</button>{message ? <span role="status" className="text-sm text-emerald-600">{message}</span> : null}</div></form>;
}
