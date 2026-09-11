import { getRequiredUserId } from "@/lib/access";
import { getProfile } from "@/lib/data";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const userId = await getRequiredUserId();
  const user = await getProfile(userId);
  if (!user) return null;
  const profile = user.profile;
  return <main className="p-6 sm:p-8"><div className="mb-6"><h1 className="text-3xl font-semibold">Freelancer profile</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Profile completeness: {profile?.profileCompleteness ?? 0}%</p></div><div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]"><ProfileForm initial={{ name: user.name ?? "", professionalTitle: profile?.professionalTitle ?? "", overview: profile?.overview ?? "", hourlyRate: profile?.hourlyRate ?? 0, location: profile?.location ?? "" }} /><aside className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-semibold">Skills</h2><div className="mt-4 flex flex-wrap gap-2">{user.skills.length ? user.skills.map((skill) => <span key={skill.id} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium dark:border-slate-700 dark:bg-slate-950">{skill.name}</span>) : <p className="text-sm text-slate-500">Add skills to improve match quality.</p>}</div><h2 className="mt-8 font-semibold">Portfolio</h2><div className="mt-4 space-y-3">{user.portfolio.length ? user.portfolio.map((project) => <div key={project.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700"><p className="font-medium">{project.title}</p><p className="mt-1 text-sm text-slate-500">{project.description}</p></div>) : <p className="text-sm text-slate-500">Add portfolio projects to strengthen your profile.</p>}</div></aside></div></main>;
}
