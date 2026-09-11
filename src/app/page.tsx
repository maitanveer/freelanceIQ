import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";

const metrics = [
  { label: "Jobs analyzed", value: "48" },
  { label: "Saved jobs", value: "17" },
  { label: "Applications", value: "23" },
  { label: "Interview rate", value: "26%" },
];

const trust = ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Ollama", "Recharts"];

const featureList = [
  "AI job fit scoring",
  "Skills gap detection",
  "Proposal generation",
  "Application CRM",
  "Analytics and forecasting",
];

const steps = [
  { title: "Import or add jobs", description: "Drop in a job description or import a CSV/JSON list." },
  { title: "Analyze fit", description: "Review match score, risks, and missing requirements." },
  { title: "Draft smarter proposals", description: "Use your profile and portfolio to generate tailored outreach." },
  { title: "Track outcomes", description: "Monitor interview rate, win rate, and pipeline efficiency." },
];

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <header className="border-b border-border/80 bg-white/70 backdrop-blur-sm dark:bg-slate-950/70">
        <div className="container-shell flex items-center justify-between py-4">
          <Link href="/" aria-label="FreelanceIQ home">
            <BrandLogo className="h-12 w-52 rounded-lg sm:h-14 sm:w-60" priority />
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex dark:text-slate-300">
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#about">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Analyze a Job
            </Link>
          </div>
        </div>
      </header>

      <section className="container-shell grid gap-12 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            AI-powered freelancer workflow
          </div>
          <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Find better jobs. Apply smarter. Win more work.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            FreelanceIQ analyzes freelance opportunities, scores your fit, identifies client requirements,
            and helps you create personalized proposals using AI.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-95"
            >
              Analyze a Job
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Browse Jobs
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300">
            {metrics.map((item) => (
              <div key={item.label}>
                <div className="text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</div>
                <div>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Pipeline overview</p>
                <h2 className="mt-1 text-xl font-semibold">Q3 opportunities</h2>
              </div>
              <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
                +18.4%
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "Next.js SaaS Developer", score: 92, status: "Strong match" },
                { title: "AI Chatbot Developer", score: 88, status: "High priority" },
                { title: "WordPress WooCommerce", score: 74, status: "Review" },
              ].map((job) => (
                <div key={job.title} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{job.title}</p>
                      <p className="text-xs text-slate-500">Client • 4.9 rating</p>
                    </div>
                    <div className="rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white">{job.score}%</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{job.status}</span>
                    <span>$2,500</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-slate-50 py-6 dark:bg-slate-900/60">
        <div className="container-shell flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-slate-500 dark:text-slate-300">
          <span className="mr-3 uppercase tracking-[0.12em] text-slate-400">Built for</span>
          {trust.map((item) => (
            <div key={item} className="rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="container-shell py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Problem</p>
          <h2 className="section-title mt-4">Freelancers lose time on low-fit jobs.</h2>
          <p className="muted-copy mt-4">
            Most job boards are noisy. Clients ask for broad skill sets, budgets are unclear, and the real fit signal is buried under vague descriptions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {featureList.map((feature, index) => (
            <div key={feature} className="rounded-2xl border border-slate-200 bg-card p-5 shadow-soft dark:border-slate-800">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                0{index + 1}
              </div>
              <h3 className="text-lg font-semibold">{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-t border-border bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">How it works</p>
            <h2 className="section-title mt-4">From job discovery to winning work.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">AI job analysis</p>
            <h2 className="section-title mt-4">Understand the real opportunity before you apply.</h2>
            <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
              <li>• Match score based on technical fit, portfolio relevance, and client quality.</li>
              <li>• Skills gap analysis and realistic recommendations.</li>
              <li>• Risk flags such as vague scope, weak client history, or unrealistic timelines.</li>
              <li>• Proposal strategy tailored to your profile and portfolio.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-card p-6 shadow-soft dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Job fit</p>
                <p className="mt-2 text-2xl font-semibold">Analyze a job to see your fit</p>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
                Excellent Match
              </div>
            </div>
                <div className="mt-8 space-y-4">
              {[
                ["Technical Skills", "95%"],
                ["Experience", "88%"],
                ["Project Relevance", "94%"],
                ["Business Fit", "91%"],
                ].map(([label]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{label}</span>
                    <span>-</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" style={{ width: "0%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-border bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="container-shell text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Simple pricing</p>
          <h2 className="section-title mt-4">Built around real freelance workflows.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Starter", "$0", "For freelancers exploring the workflow"],
              ["Pro", "$29", "For active job hunters and proposal builders"],
              ["Scale", "$79", "For agencies and multi-client pipelines"],
            ].map(([name, price, description]) => (
              <div key={name} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <p className="text-lg font-semibold">{name}</p>
                <div className="mt-3 text-4xl font-semibold">{price}<span className="text-base text-slate-500">/mo</span></div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="container-shell py-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-10 text-white dark:border-slate-700">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Ready to build smarter</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">Turn freelance opportunity data into a sharper pipeline.</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-md bg-white px-5 py-3 text-sm font-medium text-slate-900">
              Start analyzing jobs
            </Link>
            <Link href="/login" className="rounded-md border border-slate-400 px-5 py-3 text-sm font-medium text-white">
              View login flow
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
