"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import type { AnalysisResponse } from "@/lib/validators/analysis";

const scoreLabels = [["Technical Skills", "technicalMatch"], ["Experience", "experienceMatch"], ["Project Relevance", "portfolioMatch"], ["Business Fit", "businessFit"]] as const;

export function AnalyzerWorkspace() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showImport, setShowImport] = useState(false);

  async function analyze() {
    if (isAnalyzing) return;
    if (jobDescription.trim().length < 30) { setMessage({ type: "error", text: "Please enter a job description before analyzing." }); return; }
    setIsAnalyzing(true); setMessage(null);
    try {
      const response = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jobDescription }) });
      const payload = (await response.json()) as AnalysisResponse | { error?: string };
      if (!response.ok) throw new Error("error" in payload ? payload.error : undefined);
      setResult(payload as AnalysisResponse); setMessage({ type: "success", text: "Job analyzed successfully." });
    } catch { setMessage({ type: "error", text: "Unable to analyze this job right now. Please try again." }); }
    finally { setIsAnalyzing(false); }
  }

  return <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
    <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <label htmlFor="job-description" className="mb-2 block text-sm font-medium">Job description</label>
      <textarea id="job-description" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} aria-describedby="analysis-message" className="min-h-72 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950" placeholder="Paste the complete job description here..." />
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={analyze} disabled={isAnalyzing} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">{isAnalyzing ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}{isAnalyzing ? "Analyzing..." : "Analyze with AI"}</button>
        <button type="button" onClick={() => setShowImport((current) => !current)} disabled={isAnalyzing} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium dark:border-slate-700">Import job</button>
      </div>
      {showImport ? <p className="mt-3 text-sm text-slate-500">Job URL import is not available because this project has no supported import or parsing backend yet. Paste the description above instead.</p> : null}
      {message ? <p id="analysis-message" role={message.type === "error" ? "alert" : "status"} className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}>{message.text}</p> : null}
    </section>
    {result ? <ResultPanel result={result} /> : <section className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700"><p>Paste a job description to analyze your fit.</p></section>}
  </div>;
}

function ResultPanel({ result }: { result: AnalysisResponse }) {
  return <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500">{result.jobTitle}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><div className="text-4xl font-semibold">{result.matchScore}/100</div><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">{result.recommendation}</span></div><div className="mt-6 space-y-4">{scoreLabels.map(([label, key]) => <div key={key}><div className="mb-1 flex justify-between text-sm text-slate-600 dark:text-slate-300"><span>{label}</span><span>{result[key]}%</span></div><div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-2.5 rounded-full bg-primary" style={{ width: `${result[key]}%` }} /></div></div>)}</div><div className="mt-7 space-y-5 text-sm"><Detail title="Reasoning" items={[result.reasoning]} /><Detail title="Project" items={[`${result.projectType} · ${result.complexity}`, result.experienceRequirements]} /><Detail title="Required technologies" items={result.requiredTechnologies} /><Detail title="Required skills" items={result.requiredSkills} /><Detail title="Responsibilities" items={result.responsibilities} /><Detail title="Must-have requirements" items={result.mustHaveRequirements} /><Detail title="Nice-to-have requirements" items={result.niceToHaveRequirements} /><Detail title="Strengths" items={result.strengths} /><Detail title="Missing skills" items={result.missingSkills} /><Detail title="Potential challenges" items={result.potentialChallenges} /><Detail title="Potential red flags" items={result.redFlags} /><Detail title="Proposal strategy" items={[result.proposalStrategy]} /></div></section>;
}

function Detail({ title, items }: { title: string; items: string[] }) { return <div><h2 className="font-medium">{title}</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">{items.length ? items.map((item) => <li key={item}>{item}</li>) : <li>None identified.</li>}</ul></div>; }