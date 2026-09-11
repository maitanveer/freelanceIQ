import { AppShell } from "@/components/dashboard/app-shell";
import { ApplicationActions } from "@/components/applications/application-actions";
import { getRequiredUserId } from "@/lib/access";
import { getApplications } from "@/lib/data";

export default async function ApplicationsPage() {
  const userId = await getRequiredUserId();
  const applications = await getApplications(userId);
  const interviews = applications.filter((application) => application.status === "INTERVIEW").length;
  const responseRate = applications.length ? Math.round((applications.filter((application) => application.status !== "DRAFT").length / applications.length) * 100) : 0;
  return <AppShell><div className="p-6 sm:p-8"><div className="mb-8"><h1 className="text-3xl font-semibold">Applications</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Track every opportunity from first draft to close.</p></div><div className="grid gap-4 md:grid-cols-3">{[["Active", applications.filter((application) => !["DECLINED", "WITHDRAWN"].includes(application.status)).toString()], ["Interviews", interviews.toString()], ["Response rate", `${responseRate}%`]].map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>)}</div><div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">{applications.length ? applications.map((application) => <div key={application.id} className="flex flex-col gap-3 border-b border-slate-200 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"><div><p className="font-medium">{application.job.title}</p><p className="mt-1 text-sm text-slate-500">{application.appliedAt ? `Applied ${application.appliedAt.toLocaleDateString()}` : "Draft application"}</p></div><ApplicationActions id={application.id} status={application.status} /></div>) : <div className="p-10 text-center"><p className="font-medium">No applications yet</p><p className="mt-2 text-sm text-slate-500">Applications you create will appear here.</p></div>}</div></div></AppShell>;
}
