"use client";

import Link from "next/link";
import { useState } from "react";
import { toggleSavedJob } from "@/lib/workspace-actions";

export function JobActions({ jobId, saved }: { jobId: string; saved: boolean }) {
  const [isSaved, setIsSaved] = useState(saved);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function toggle() {
    if (busy) return;
    setBusy(true);
    const result = await toggleSavedJob(jobId);
    setBusy(false);
    if (!result.ok) setMessage(result.message);
    else { setIsSaved(result.saved); setMessage(result.saved ? "Saved" : "Removed"); }
  }
  return <div className="flex flex-wrap items-center gap-2"><Link href={`/jobs/${jobId}`} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium dark:border-slate-700">View job</Link><Link href={`/analyze?jobId=${jobId}`} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium dark:border-slate-700">Analyze</Link><button type="button" onClick={toggle} disabled={busy} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium dark:border-slate-700 disabled:opacity-60">{busy ? "Saving..." : isSaved ? "Saved" : "Save"}</button>{message ? <span className="text-xs text-slate-500" role="status">{message}</span> : null}</div>;
}
