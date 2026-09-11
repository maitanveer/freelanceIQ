"use client";

import { useState } from "react";
import { createApplication, createProposal } from "@/lib/workspace-actions";

export function JobPursuitForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const proposal = await createProposal({ title: `${jobTitle} proposal`, content: form.get("content"), jobId, tone: "PROFESSIONAL", length: "MEDIUM" });
    if (!proposal.ok) { setBusy(false); setMessage(proposal.message); return; }
    const application = await createApplication({ jobId, proposalId: proposal.id });
    setBusy(false);
    setMessage(application.ok ? "Proposal created and application submitted." : application.message);
    if (application.ok) setOpen(false);
  }
  return <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700"><button type="button" onClick={() => setOpen((value) => !value)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{open ? "Close" : "Create proposal and apply"}</button>{open ? <form onSubmit={submit} className="mt-4 max-w-2xl"><label htmlFor="job-cover-letter" className="mb-2 block text-sm font-medium">Cover letter</label><textarea id="job-cover-letter" name="content" required minLength={30} className="min-h-36 w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Explain how you would help with this project..." /><button type="submit" disabled={busy} className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{busy ? "Submitting..." : "Submit application"}</button></form> : null}{message ? <p className="mt-3 text-sm text-emerald-600" role="status">{message}</p> : null}</div>;
}
