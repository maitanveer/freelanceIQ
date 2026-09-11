import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { OllamaProvider } from "@/lib/ai/ollama";
import { prisma } from "@/lib/db";
import { analysisRequestSchema } from "@/lib/validators/analysis";

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const input = analysisRequestSchema.safeParse(body);
  if (!input.success) return NextResponse.json({ error: input.error.issues[0]?.message ?? "Invalid job description." }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { profile: true, skills: true, portfolio: true } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const profile = [user.profile?.professionalTitle, user.profile?.overview, user.profile?.primaryCategory].filter(Boolean).join("\n");
    const portfolio = user.portfolio.map((project) => `${project.title}: ${project.description}. Technologies: ${project.technologies.join(", ")}. Role: ${project.role ?? "Not specified"}`).join("\n");
    const result = await new OllamaProvider().analyzeJob({ userProfile: profile || "No profile overview is available.", skills: user.skills.map((skill) => skill.name), experience: user.profile?.experienceLevel ?? "No experience level is available.", portfolio, jobDescription: input.data.jobDescription });
    const analysis = await prisma.$transaction(async (transaction) => {
      const job = await transaction.job.create({ data: { title: result.jobTitle, description: input.data.jobDescription, requirements: result.mustHaveRequirements, questions: [], status: "ARCHIVED", skills: { create: result.requiredTechnologies.map((name) => ({ name })) } } });
      return transaction.jobAnalysis.create({ data: { userId, jobId: job.id, matchScore: result.matchScore, technicalMatch: result.technicalMatch, experienceMatch: result.experienceMatch, portfolioMatch: result.portfolioMatch, recommendation: result.recommendation, matchedSkills: result.strengths, missingSkills: result.missingSkills, risks: [...result.redFlags, ...result.potentialChallenges], reasoning: result.reasoning, proposalStrategy: result.proposalStrategy } });
    });
    return NextResponse.json({ ...result, analysisId: analysis.id });
  } catch (error) {
    const providerUrl = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
    const providerHost = (() => { try { return new URL(providerUrl).host; } catch { return "invalid-url"; } })();
    const cause = error instanceof Error && error.cause instanceof Error ? error.cause.message : "none";
    console.error("Job analysis failed", { providerHost, modelConfigured: Boolean(process.env.OLLAMA_MODEL), baseUrlConfigured: Boolean(process.env.OLLAMA_BASE_URL), error: error instanceof Error ? error.message : "Unknown error", cause });
    return NextResponse.json({ error: "AI analysis is temporarily unavailable. Please try again later." }, { status: 503 });
  }
}