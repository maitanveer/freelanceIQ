import "server-only";

import { prisma } from "@/lib/db";

export async function requireUser(userId: string | undefined) {
  if (!userId) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function getJobs(userId: string) {
  await requireUser(userId);
  return prisma.job.findMany({ where: { status: "OPEN" }, include: { skills: true, savedJobs: { where: { userId }, select: { id: true } }, analyses: { where: { userId }, select: { matchScore: true } } }, orderBy: { postedAt: "desc" } });
}

export async function getSavedJobs(userId: string) {
  await requireUser(userId);
  return prisma.savedJob.findMany({ where: { userId }, include: { job: { include: { skills: true, analyses: { where: { userId }, select: { matchScore: true } } } } }, orderBy: [{ priority: "desc" }, { createdAt: "desc" }] });
}

export async function getApplications(userId: string) {
  await requireUser(userId);
  return prisma.application.findMany({ where: { userId }, include: { job: true, notes: { orderBy: { createdAt: "desc" } } }, orderBy: { updatedAt: "desc" } });
}

export async function getProposals(userId: string) {
  await requireUser(userId);
  return prisma.proposal.findMany({ where: { userId }, include: { job: { select: { id: true, title: true } } }, orderBy: { updatedAt: "desc" } });
}

export async function getProposal(userId: string, id: string) {
  await requireUser(userId);
  return prisma.proposal.findFirst({ where: { id, userId }, include: { job: true, applications: true } });
}

export async function getApplication(userId: string, id: string) {
  await requireUser(userId);
  return prisma.application.findFirst({ where: { id, userId }, include: { job: { include: { skills: true } }, proposal: true, notes: { orderBy: { createdAt: "desc" } } } });
}

export async function getJob(userId: string, id: string) {
  await requireUser(userId);
  return prisma.job.findFirst({ where: { id, status: "OPEN" }, include: { skills: true, savedJobs: { where: { userId }, select: { id: true } }, analyses: { where: { userId }, orderBy: { createdAt: "desc" }, take: 1 } } });
}

export async function getDashboardData(userId: string) {
  await requireUser(userId);
  const [analyzed, saved, applications, interviews, recentJobs, recommendedJobs] = await Promise.all([
    prisma.jobAnalysis.count({ where: { userId } }),
    prisma.savedJob.count({ where: { userId } }),
    prisma.application.count({ where: { userId } }),
    prisma.application.count({ where: { userId, status: "INTERVIEW" } }),
    prisma.application.findMany({ where: { userId }, include: { job: true }, orderBy: { updatedAt: "desc" }, take: 3 }),
    prisma.job.findMany({ where: { status: "OPEN" }, include: { analyses: { where: { userId }, select: { matchScore: true } } }, orderBy: { createdAt: "desc" }, take: 3 }),
  ]);
  return { analyzed, saved, applications, interviews, recentJobs, recommendedJobs };
}

export async function getAnalyticsData(userId: string) {
  await requireUser(userId);
  const [applications, interviews, analyses, successfulProposals] = await Promise.all([
    prisma.application.count({ where: { userId } }),
    prisma.application.count({ where: { userId, status: { in: ["INTERVIEW", "OFFER", "WON"] } } }),
    prisma.jobAnalysis.aggregate({ where: { userId }, _avg: { matchScore: true } }),
    prisma.application.count({ where: { userId, status: { in: ["INTERVIEW", "OFFER", "WON"] } } }),
  ]);
  const statusCounts = await prisma.application.groupBy({ where: { userId }, by: ["status"], _count: { _all: true } });
  return { applications, interviews, averageMatch: Math.round(analyses._avg.matchScore ?? 0), proposalSuccess: applications ? Math.round((successfulProposals / applications) * 100) : 0, statusCounts: statusCounts.map((item) => ({ status: item.status, count: item._count._all })) };
}

export async function getProfile(userId: string) {
  await requireUser(userId);
  return prisma.user.findUnique({ where: { id: userId }, include: { profile: true, skills: { orderBy: { matchScore: "desc" } }, portfolio: { orderBy: { createdAt: "desc" } } } });
}

export async function getPreferences(userId: string) {
  await requireUser(userId);
  return prisma.userPreference.findUnique({ where: { userId } });
}
