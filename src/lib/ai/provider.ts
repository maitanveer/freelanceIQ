export type ProposalTone = "professional" | "friendly" | "technical" | "consultative";
export type ProposalLength = "short" | "medium" | "detailed";

export type JobAnalysisResult = {
  jobTitle: string;
  requiredTechnologies: string[];
  requiredSkills: string[];
  experienceRequirements: string;
  responsibilities: string[];
  mustHaveRequirements: string[];
  niceToHaveRequirements: string[];
  projectType: string;
  complexity: string;
  potentialChallenges: string[];
  redFlags: string[];
  strengths: string[];
  matchScore: number;
  technicalMatch: number;
  experienceMatch: number;
  portfolioMatch: number;
  businessFit: number;
  recommendation: "APPLY" | "CONSIDER" | "PASS";
  matchedSkills: string[];
  missingSkills: string[];
  risks: string[];
  reasoning: string;
  proposalStrategy: string;
};

export type ProposalDraft = {
  opening: string;
  understanding: string;
  experience: string;
  approach: string;
  portfolioReference: string;
  callToAction: string;
  fullText: string;
};

export interface AIProvider {
  analyzeJob(input: {
    userProfile: string;
    skills: string[];
    experience: string;
    portfolio: string;
    jobDescription: string;
  }): Promise<JobAnalysisResult>;

  generateProposal(input: {
    jobDescription: string;
    selectedPortfolio: string[];
    tone: ProposalTone;
    length: ProposalLength;
    userProfile: string;
  }): Promise<ProposalDraft>;

  generateInsights(input: {
    jobs: string[];
    applications: string[];
    profile: string;
  }): Promise<string[]>;
}
