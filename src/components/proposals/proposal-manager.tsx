"use client";

import Link from "next/link";
import { useState } from "react";
import { createProposal, deleteProposal } from "@/lib/workspace-actions";

type Proposal = { id: string; title: string | null; content: string; updatedAt: Date; job: { id: string; title: string } | null };

export function ProposalManager({ proposals }: { proposals: Proposal[] }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const result = await createProposal({ title: form.get("title"), content: form.get("content"), jobId: form.get("jobId"), tone: "PROFESSIONAL", length: "MEDIUM" });
    setBusy(false);
    if (!result.ok) { setMessage(result.message); return; }
    setMessage("Proposal created successfully.");
    setOpen(false);
    window.location.reload();
  }

  async function remove(id: string) {
    if (busy || !window.confirm("Delete this proposal? This action cannot be undone.")) return;
    setBusy(true);
    const result = await deleteProposal(id);
    setBusy(false);
    setMessage(result.ok ? "Proposal deleted successfully." : result.message);
    if (result.ok) window.location.reload();
  }

  return <>
    <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{open ? "Close" : "New proposal"}</button>
    {message ? <p className="mt-4 text-sm text-emerald-600" role="status">{message}</p> : null}
    {open ? <form onSubmit={submit} className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div><label className="mb-1 block text-sm font-medium" htmlFor="proposal-title">Title</label><input id="proposal-title" name="title" required minLength={3} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div><div><label className="mb-1 block text-sm font-medium" htmlFor="proposal-content">Cover letter</label><textarea id="proposal-content" name="content" required minLength={30} className="min-h-36 w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div><button type="submit" disabled={busy} className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{busy ? "Creating..." : "Create proposal"}</button></form> : null}
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">{proposals.length ? proposals.map((proposal) => <div key={proposal.id} className="flex flex-col gap-3 border-b border-slate-200 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"><div><Link href={`/proposals/${proposal.id}`} className="font-medium hover:text-primary">{proposal.title ?? "Untitled proposal"}</Link><p className="mt-1 text-sm text-slate-500">{proposal.job?.title ?? "No job attached"} · Updated {proposal.updatedAt.toLocaleDateString()}</p></div><div className="flex gap-2"><Link href={`/proposals/${proposal.id}`} className="rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">Open</Link><button type="button" onClick={() => remove(proposal.id)} disabled={busy} className="rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-600 disabled:opacity-60">Delete</button></div></div>) : <div className="p-8 text-center"><p className="font-medium">No proposals yet</p><p className="mt-2 text-sm text-slate-500">Create your first proposal to start tracking freelance opportunities.</p></div>}</div>
  </>;
}
