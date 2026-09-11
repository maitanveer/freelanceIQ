import { BrandLogo } from "@/components/brand/brand-logo";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <BrandLogo className="h-12 w-48 rounded-md" priority />
        <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-hidden="true" /> Loading...</span>
      </div>
    </main>
  );
}
