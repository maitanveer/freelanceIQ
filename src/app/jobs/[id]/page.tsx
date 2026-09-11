import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/dashboard/app-shell";
import { JobActions } from "@/components/jobs/job-actions";
import { JobPursuitForm } from "@/components/jobs/job-pursuit-form";
import { getRequiredUserId } from "@/lib/access";
import { getJob } from "@/lib/data";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getRequiredUserId();
  const { id } = await params;
  const job = await getJob(userId, id);
  if (!job) notFound();
  return <AppShell><main className="p-6 sm:p-8"><Link href="/jobs" className="text-sm text-primary">Back to jobs</Link><article className="mt-6 max-w-4xl rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="text-2xl font-semibold">{job.title}</h1><p className="mt-2 text-sm text-slate-500">{job.clientName ?? "Private client"} · {job.remote ? "Remote" : job.location ?? "Location flexible"}</p></div><JobActions jobId={job.id} saved={Boolean(job.savedJobs.length)} /></div><div className="mt-8 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">{job.description}</div><div className="mt-8 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill.id} className="rounded-full border border-slate-200 px-3 py-1 text-xs dark:border-slate-700">{skill.name}</span>)}</div><JobPursuitForm jobId={job.id} jobTitle={job.title} /></article></main></AppShell>;
}
