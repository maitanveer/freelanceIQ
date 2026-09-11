import type { AIProvider, JobAnalysisResult, ProposalDraft } from "./provider";
import { analysisResponseSchema } from "@/lib/validators/analysis";
import { jobAnalysisPrompt } from "./prompts";

export class OllamaProvider implements AIProvider {
  private readonly baseUrl: string;
  private readonly model: string;

  constructor(baseUrl = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434", model = process.env.OLLAMA_MODEL ?? "llama3.1") {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.model = model;
  }

  async analyzeJob(input: Parameters<AIProvider["analyzeJob"]>[0]): Promise<JobAnalysisResult> {
    const prompt = jobAnalysisPrompt
      .replace("{{userProfile}}", input.userProfile)
      .replace("{{skills}}", input.skills.join(", ") || "No skills listed")
      .replace("{{experience}}", input.experience || "No experience level listed")
      .replace("{{portfolio}}", input.portfolio || "No portfolio projects listed")
      .replace("{{jobDescription}}", input.jobDescription);
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: this.model, stream: false, format: "json", messages: [{ role: "user", content: prompt }] }),
      signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) throw new Error(`Ollama request failed with status ${response.status}`);
    const payload = (await response.json()) as { message?: { content?: string } };
    const content = payload.message?.content;
    if (!content) throw new Error("Ollama returned an empty response");
    const parsed = analysisResponseSchema.parse(JSON.parse(content.replace(/^```json\s*|\s*```$/g, "")));
    return { ...parsed, matchedSkills: parsed.strengths, risks: [...parsed.redFlags, ...parsed.potentialChallenges] };
  }

  async generateProposal() {
    return {
      opening: "Hi, I reviewed your requirements and I believe my full-stack SaaS experience aligns well with this project.",
      understanding:
        "Your project stands out because it needs a clear product mindset, solid frontend architecture, and a reliable backend foundation.",
      experience:
        "I have built product-driven web apps and dashboards with Next.js, TypeScript, PostgreSQL, and API integrations that prioritize maintainability and performance.",
      approach:
        "I would start by mapping the product requirements, define the application architecture, and iterate quickly through the core workflows before broadening into polish and QA.",
      portfolioReference:
        "A good reference is my SaaS platform work where I designed and delivered a user-facing product with operational dashboards and data-driven workflows.",
      callToAction:
        "I would be glad to discuss the scope, timeline, and technical approach in more detail.",
      fullText:
        "Hi, I reviewed your requirements and I believe my full-stack SaaS experience aligns well with this project. Your project stands out because it needs a clear product mindset, solid frontend architecture, and a reliable backend foundation. I have built product-driven web apps and dashboards with Next.js, TypeScript, PostgreSQL, and API integrations that prioritize maintainability and performance. I would start by mapping the product requirements, define the application architecture, and iterate quickly through the core workflows before broadening into polish and QA. A good reference is my SaaS platform work where I designed and delivered a user-facing product with operational dashboards and data-driven workflows. I would be glad to discuss the scope, timeline, and technical approach in more detail.",
    } satisfies ProposalDraft;
  }

  async generateInsights() {
    return [
      "Your strongest selling point is your experience building full-stack SaaS applications with Next.js and PostgreSQL.",
      "Clients requesting AI integrations currently align best with your profile and portfolio.",
      "Your proposals perform best when they reference a specific product project and clear technical outcomes.",
    ];
  }
}
