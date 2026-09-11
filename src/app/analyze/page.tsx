import { getRequiredUserId } from "@/lib/access";
import { AnalyzerWorkspace } from "@/components/analyze/analyzer-workspace";

export default async function AnalyzePage() {
  await getRequiredUserId();
  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">AI Job Analyzer</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Paste a job description and review match quality before you apply.</p>
      </div>

      <AnalyzerWorkspace />
    </main>
  );
}
