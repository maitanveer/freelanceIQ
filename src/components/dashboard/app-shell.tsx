import Link from "next/link";
import type { Route } from "next";
import { Bell, LayoutGrid, Briefcase, Sparkles, FileText, FolderOpen, BarChart3, Settings, User } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getRequiredUserId } from "@/lib/access";
import { auth } from "@/lib/auth";
import { BrandLogo } from "@/components/brand/brand-logo";

const navItems: Array<{ label: string; href: Route; icon: typeof LayoutGrid }> = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "AI Analyzer", href: "/analyze", icon: Sparkles },
  { label: "Proposals", href: "/proposals", icon: FileText },
  { label: "Applications", href: "/applications", icon: FolderOpen },
  { label: "Saved Jobs", href: "/saved", icon: Bell },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

const workspaceItems: Array<{ label: string; href: Route; icon: typeof LayoutGrid }> = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  await getRequiredUserId();
  const session = await auth();
  const displayName = session?.user?.name ?? "Freelancer";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
          <Link href="/dashboard" className="block px-2" aria-label="FreelanceIQ dashboard">
            <BrandLogo className="h-16 w-full max-w-[228px] rounded-lg" priority />
          </Link>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <p className="px-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Workspace</p>
            <div className="mt-3 space-y-2">
              {workspaceItems.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
              TA
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-medium">{displayName}</div>
              <div className="truncate text-xs text-slate-500">Full-Stack Developer</div>
            </div>
            <SignOutButton />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <div className="flex flex-1 items-center gap-3">
                <Link href="/dashboard" className="lg:hidden" aria-label="FreelanceIQ dashboard">
                  <BrandLogo className="h-10 w-40 rounded-md" />
                </Link>
                <Link href="/jobs" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300">Browse jobs</Link>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/settings" className="rounded-md border border-slate-200 p-2 dark:border-slate-700" aria-label="Settings"><Settings className="h-4 w-4" /></Link>
                <Link href="/profile" className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5 dark:border-slate-700">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                    TA
                  </div>
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
