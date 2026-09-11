import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required."),
  professionalTitle: z.string().min(3, "Professional title is required."),
  overview: z.string().min(30, "Add a stronger overview."),
  hourlyRate: z.number().min(1).max(5000).optional(),
  experienceLevel: z.enum(["Junior", "Mid", "Senior", "Lead"]).optional(),
  location: z.string().optional(),
  availability: z.string().optional(),
  primaryCategory: z.string().optional(),
});

export const portfolioProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  technologies: z.array(z.string()).min(1),
  projectUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  role: z.string().optional(),
  skillsDemonstrated: z.array(z.string()).default([]),
});
