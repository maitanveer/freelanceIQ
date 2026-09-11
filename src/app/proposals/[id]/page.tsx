import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/dashboard/app-shell";
import { getRequiredUserId } from "@/lib/access";
import { getProposal } from "@/lib/data";
import { ProposalEditor } from "@/components/proposals/proposal-editor";

export default async function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getRequiredUserId();
  const { id } = await params;
  const proposal = await getProposal(userId, id);
  if (!proposal) notFound();
  return <AppShell><main className="p-6 sm:p-8"><Link href="/proposals" className="text-sm text-primary">Back to proposals</Link><div className="mt-6 max-w-3xl rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-semibold">{proposal.title ?? "Untitled proposal"}</h1><p className="mt-2 text-sm text-slate-500">{proposal.job?.title ?? "No job attached"}</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">{proposal.applications.length ? "Submitted" : "Draft"}</span></div><p className="mt-8 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">{proposal.content}</p><ProposalEditor id={proposal.id} title={proposal.title ?? ""} content={proposal.content} jobId={proposal.jobId} /><p className="mt-8 text-xs text-slate-500">Updated {proposal.updatedAt.toLocaleString()}</p></div></main></AppShell>;
}