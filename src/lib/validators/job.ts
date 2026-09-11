import { z } from "zod";

export const importJobSchema = z.object({
  title: z.string().min(5, "Job title is required."),
  description: z.string().min(30, "Description is too short."),
  skills: z.array(z.string()).default([]),
  budget: z.number().positive().optional(),
  type: z.enum(["fixed", "hourly", "retainer"]).optional(),
  category: z.string().optional(),
  clientName: z.string().optional(),
  location: z.string().optional(),
  remote: z.boolean().default(false),
});

export const jobFilterSchema = z.object({
  category: z.string().optional(),
  experienceLevel: z.string().optional(),
  budget: z.string().optional(),
  type: z.string().optional(),
  remoteOnly: z.boolean().optional(),
});
