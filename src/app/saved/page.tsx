import { AppShell } from "@/components/dashboard/app-shell";
import { JobActions } from "@/components/jobs/job-actions";
import { getRequiredUserId } from "@/lib/access";
import { getSavedJobs } from "@/lib/data";

export default async function SavedJobsPage() {
  const userId = await getRequiredUserId();
  const savedJobs = await getSavedJobs(userId);
  return <AppShell><div className="p-6 sm:p-8"><div className="mb-8"><h1 className="text-3xl font-semibold">Saved Jobs</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Keep promising opportunities ready for your next focused session.</p></div><div className="space-y-4">{savedJobs.length ? savedJobs.map(({ id, job, priority }) => <article key={id} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900"><div><h2 className="font-medium">{job.title}</h2><p className="mt-1 text-sm text-slate-500">Budget: ${job.budgetMin?.toLocaleString() ?? "0"}-${job.budgetMax?.toLocaleString() ?? "0"} · {priority.toLowerCase()} priority</p></div><JobActions jobId={job.id} saved /></article>) : <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700"><p className="font-medium">No saved jobs yet</p><p className="mt-2 text-sm text-slate-500">Save opportunities you are interested in and come back to them later.</p></div>}</div></div></AppShell>;
}
