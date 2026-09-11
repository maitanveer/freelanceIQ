"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteApplication, updateApplicationStatus } from "@/lib/workspace-actions";

const statuses = ["DRAFT", "SUBMITTED", "INTERVIEW", "OFFER", "WON", "DECLINED", "WITHDRAWN"] as const;

export function ApplicationActions({ id, status }: { id: string; status: typeof statuses[number] }) {
  const [busy, setBusy] = useState(false);
  async function change(next: typeof statuses[number]) {
    if (busy || next === status) return;
    setBusy(true);
    await updateApplicationStatus(id, next);
    setBusy(false);
    window.location.reload();
  }
  async function remove() {
    if (busy || !window.confirm("Delete this application? This action cannot be undone.")) return;
    setBusy(true);
    await deleteApplication(id);
    setBusy(false);
    window.location.reload();
  }
  return <div className="flex flex-wrap items-center gap-2"><Link href={`/applications/${id}`} className="rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">Open</Link><select aria-label="Update application status" disabled={busy} value={status} onChange={(event) => change(event.target.value as typeof statuses[number])} className="rounded-md border border-slate-200 bg-white px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">{statuses.map((value) => <option key={value}>{value}</option>)}</select><button type="button" onClick={remove} disabled={busy} className="rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-600 disabled:opacity-60">{busy ? "Updating..." : "Delete"}</button></div>;
}
