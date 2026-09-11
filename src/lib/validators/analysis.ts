import { z } from "zod";

export const analysisRequestSchema = z.object({
  jobDescription: z.string().trim().min(30, "Please enter a fuller job description.").max(30000, "Job description is too long."),
});

export const analysisResponseSchema = z.object({
  jobTitle: z.string().min(1),
  requiredTechnologies: z.array(z.string()).max(50),
  requiredSkills: z.array(z.string()).max(50),
  experienceRequirements: z.string(),
  responsibilities: z.array(z.string()).max(20),
  mustHaveRequirements: z.array(z.string()).max(20),
  niceToHaveRequirements: z.array(z.string()).max(20),
  projectType: z.string(),
  complexity: z.string(),
  potentialChallenges: z.array(z.string()).max(20),
  redFlags: z.array(z.string()).max(20),
  strengths: z.array(z.string()).max(20),
  missingSkills: z.array(z.string()).max(50),
  matchScore: z.number().int().min(0).max(100),
  technicalMatch: z.number().int().min(0).max(100),
  experienceMatch: z.number().int().min(0).max(100),
  portfolioMatch: z.number().int().min(0).max(100),
  businessFit: z.number().int().min(0).max(100),
  recommendation: z.enum(["APPLY", "CONSIDER", "PASS"]),
  reasoning: z.string().min(1),
  proposalStrategy: z.string().min(1),
});

export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;