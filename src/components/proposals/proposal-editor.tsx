"use client";

import { useState } from "react";
import { updateProposal } from "@/lib/workspace-actions";

export function ProposalEditor({ id, title, content, jobId }: { id: string; title: string; content: string; jobId: string | null }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const result = await updateProposal(id, { title: form.get("title"), content: form.get("content"), jobId: jobId ?? "", tone: "PROFESSIONAL", length: "MEDIUM" });
    setBusy(false);
    setMessage(result.ok ? "Proposal updated successfully." : result.message);
    if (result.ok) setOpen(false);
  }
  return <div className="mt-6"><button type="button" onClick={() => setOpen((value) => !value)} className="rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">{open ? "Close editor" : "Edit proposal"}</button>{open ? <form onSubmit={submit} className="mt-4 grid gap-4"><input name="title" defaultValue={title} required minLength={3} className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /><textarea name="content" defaultValue={content} required minLength={30} className="min-h-40 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /><button type="submit" disabled={busy} className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{busy ? "Saving..." : "Save changes"}</button></form> : null}{message ? <p className="mt-3 text-sm text-emerald-600" role="status">{message}</p> : null}</div>;
}
