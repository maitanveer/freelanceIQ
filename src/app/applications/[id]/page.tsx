import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/dashboard/app-shell";
import { ApplicationActions } from "@/components/applications/application-actions";
import { getRequiredUserId } from "@/lib/access";
import { getApplication } from "@/lib/data";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getRequiredUserId();
  const { id } = await params;
  const application = await getApplication(userId, id);
  if (!application) notFound();
  return <AppShell><main className="p-6 sm:p-8"><Link href="/applications" className="text-sm text-primary">Back to applications</Link><article className="mt-6 max-w-4xl rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-semibold">{application.job.title}</h1><p className="mt-2 text-sm text-slate-500">{application.clientName ?? "Private client"}</p></div><ApplicationActions id={application.id} status={application.status} /></div><div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm"><div><p className="text-slate-500">Status</p><p className="mt-1 font-medium">{application.status}</p></div><div><p className="text-slate-500">Expected value</p><p className="mt-1 font-medium">{application.expectedValue ? `$${application.expectedValue.toLocaleString()}` : "Not specified"}</p></div><div><p className="text-slate-500">Applied</p><p className="mt-1 font-medium">{application.appliedAt?.toLocaleDateString() ?? "Not submitted"}</p></div></div>{application.proposal ? <div className="mt-8"><h2 className="font-semibold">Proposal</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">{application.proposal.content}</p></div> : null}<div className="mt-8"><h2 className="font-semibold">Job description</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">{application.job.description}</p></div></article></main></AppShell>;
}
