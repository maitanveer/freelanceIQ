"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const proposalSchema = z.object({
  title: z.string().trim().min(3).max(120),
  content: z.string().trim().min(30).max(20000),
  jobId: z.string().cuid().optional().or(z.literal("")),
  tone: z.enum(["PROFESSIONAL", "CONVERSATIONAL", "CONFIDENT"]).default("PROFESSIONAL"),
  length: z.enum(["SHORT", "MEDIUM", "LONG"]).default("MEDIUM"),
});

const profileSchema = z.object({
  name: z.string().trim().min(2).max(100),
  professionalTitle: z.string().trim().min(3).max(120),
  overview: z.string().trim().min(30).max(5000),
  hourlyRate: z.coerce.number().int().min(1).max(5000),
  location: z.string().trim().max(120),
});

async function currentUserId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

export async function createProposal(input: unknown) {
  const userId = await currentUserId();
  const parsed = proposalSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, message: parsed.error.issues[0]?.message ?? "Check the proposal details." };
  const jobId = parsed.data.jobId || undefined;
  if (jobId) {
    const job = await prisma.job.findUnique({ where: { id: jobId }, select: { id: true } });
    if (!job) return { ok: false as const, message: "That job is no longer available." };
  }
  const proposal = await prisma.proposal.create({ data: { userId, jobId, title: parsed.data.title, content: parsed.data.content, tone: parsed.data.tone, length: parsed.data.length } });
  revalidatePath("/proposals");
  return { ok: true as const, id: proposal.id };
}

export async function updateProposal(id: string, input: unknown) {
  const userId = await currentUserId();
  const parsed = proposalSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, message: parsed.error.issues[0]?.message ?? "Check the proposal details." };
  const owned = await prisma.proposal.findFirst({ where: { id, userId }, select: { id: true } });
  if (!owned) return { ok: false as const, message: "Proposal not found." };
  await prisma.proposal.update({ where: { id }, data: { title: parsed.data.title, content: parsed.data.content, jobId: parsed.data.jobId || null, tone: parsed.data.tone, length: parsed.data.length } });
  revalidatePath("/proposals");
  revalidatePath(`/proposals/${id}`);
  return { ok: true as const };
}

export async function deleteProposal(id: string) {
  const userId = await currentUserId();
  const deleted = await prisma.proposal.deleteMany({ where: { id, userId } });
  if (!deleted.count) return { ok: false as const, message: "Proposal not found." };
  revalidatePath("/proposals");
  return { ok: true as const };
}

export async function toggleSavedJob(jobId: string) {
  const userId = await currentUserId();
  const job = await prisma.job.findUnique({ where: { id: jobId }, select: { id: true, status: true } });
  if (!job || job.status !== "OPEN") return { ok: false as const, message: "Job not available." };
  const existing = await prisma.savedJob.findUnique({ where: { userId_jobId: { userId, jobId } }, select: { id: true } });
  if (existing) await prisma.savedJob.delete({ where: { id: existing.id } });
  else await prisma.savedJob.create({ data: { userId, jobId } });
  revalidatePath("/jobs");
  revalidatePath("/saved");
  revalidatePath("/dashboard");
  return { ok: true as const, saved: !existing };
}

export async function createApplication(input: { jobId: string; proposalId?: string; expectedValue?: number }) {
  const userId = await currentUserId();
  const parsed = z.object({ jobId: z.string().cuid(), proposalId: z.string().cuid().optional(), expectedValue: z.number().int().positive().max(10000000).optional() }).safeParse(input);
  if (!parsed.success) return { ok: false as const, message: "Invalid application details." };
  const job = await prisma.job.findUnique({ where: { id: parsed.data.jobId, status: "OPEN" }, select: { id: true, clientName: true } });
  if (!job) return { ok: false as const, message: "Job not available." };
  if (parsed.data.proposalId) {
    const proposal = await prisma.proposal.findFirst({ where: { id: parsed.data.proposalId, userId }, select: { id: true } });
    if (!proposal) return { ok: false as const, message: "Proposal not found." };
  }
  try {
    const application = await prisma.application.create({ data: { userId, jobId: job.id, clientName: job.clientName, proposalId: parsed.data.proposalId, expectedValue: parsed.data.expectedValue, appliedAt: new Date(), status: "SUBMITTED" } });
    revalidatePath("/applications");
    revalidatePath("/jobs");
    return { ok: true as const, id: application.id };
  } catch {
    return { ok: false as const, message: "You already have an application for this job." };
  }
}

export async function updateApplicationStatus(id: string, status: "DRAFT" | "SUBMITTED" | "INTERVIEW" | "OFFER" | "WON" | "DECLINED" | "WITHDRAWN") {
  const userId = await currentUserId();
  const updated = await prisma.application.updateMany({ where: { id, userId }, data: { status, appliedAt: status === "SUBMITTED" ? new Date() : undefined } });
  if (!updated.count) return { ok: false as const, message: "Application not found." };
  revalidatePath("/applications");
  revalidatePath(`/applications/${id}`);
  revalidatePath("/dashboard");
  revalidatePath("/analytics");
  return { ok: true as const };
}

export async function deleteApplication(id: string) {
  const userId = await currentUserId();
  const deleted = await prisma.application.deleteMany({ where: { id, userId } });
  if (!deleted.count) return { ok: false as const, message: "Application not found." };
  revalidatePath("/applications");
  return { ok: true as const };
}

export async function updateProfile(input: unknown) {
  const userId = await currentUserId();
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, message: parsed.error.issues[0]?.message ?? "Check your profile details." };
  const completeness = Math.min(100, Math.round(([parsed.data.name, parsed.data.professionalTitle, parsed.data.overview, parsed.data.hourlyRate, parsed.data.location].filter(Boolean).length / 5) * 100));
  await prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { name: parsed.data.name } }),
    prisma.profile.upsert({ where: { userId }, update: { professionalTitle: parsed.data.professionalTitle, overview: parsed.data.overview, hourlyRate: parsed.data.hourlyRate, location: parsed.data.location, profileCompleteness: completeness }, create: { userId, professionalTitle: parsed.data.professionalTitle, overview: parsed.data.overview, hourlyRate: parsed.data.hourlyRate, location: parsed.data.location, profileCompleteness: completeness } }),
  ]);
  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { ok: true as const };
}

export async function updatePreferences(input: { theme?: "SYSTEM" | "LIGHT" | "DARK"; notificationsEnabled?: boolean; defaultAiProvider?: string; defaultModel?: string }) {
  const userId = await currentUserId();
  const parsed = z.object({ theme: z.enum(["SYSTEM", "LIGHT", "DARK"]).optional(), notificationsEnabled: z.boolean().optional(), defaultAiProvider: z.string().max(40).optional(), defaultModel: z.string().max(80).optional() }).safeParse(input);
  if (!parsed.success) return { ok: false as const, message: "Invalid settings." };
  await prisma.userPreference.upsert({ where: { userId }, update: parsed.data, create: { userId, ...parsed.data } });
  revalidatePath("/settings");
  return { ok: true as const };
}