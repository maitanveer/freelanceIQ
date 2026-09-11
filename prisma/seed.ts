import { PrismaClient, ApplicationStatus, ExperienceLevel, JobType, NotificationType, ProposalLength, ProposalTone, SavedJobPriority, SavedJobStatus, Theme } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

const jobs = [
  { title: "AI-Powered Customer Support Assistant", clientName: "Northstar Labs", category: "AI products", description: "Build a support workspace with a searchable knowledge base, human handoff, and clear analytics.", requirements: ["Next.js", "TypeScript", "PostgreSQL", "Retrieval workflows"], questions: ["Share a relevant product workflow", "How would you measure answer quality?"], budgetMin: 500, budgetMax: 1000, type: JobType.FIXED, experienceLevel: ExperienceLevel.MID, remote: true, clientRating: 4.9, postedAt: new Date("2026-09-06"), sourceUrl: "https://demo.freelanceiq.app/jobs/northstar-support", skills: ["Next.js", "TypeScript", "PostgreSQL", "RAG"] },
  { title: "Next.js SaaS Dashboard", clientName: "Pioneer Studio", category: "SaaS dashboards", description: "Build a focused operations dashboard with reusable components, accessible tables, and reliable data loading.", requirements: ["React", "Next.js", "Prisma", "Tailwind CSS"], questions: ["How do you approach dashboard information architecture?"], budgetMin: 1500, budgetMax: 3000, type: JobType.FIXED, experienceLevel: ExperienceLevel.SENIOR, remote: true, clientRating: 4.8, postedAt: new Date("2026-09-04"), sourceUrl: "https://demo.freelanceiq.app/jobs/pioneer-dashboard", skills: ["React", "TypeScript", "Next.js", "PostgreSQL"] },
  { title: "Headless Commerce Platform", clientName: "Everroom", category: "E-commerce", description: "Modernize a commerce experience with a fast storefront, catalog tooling, and dependable order management.", requirements: ["Next.js", "Commerce APIs", "PostgreSQL"], questions: ["Describe a commerce integration you have shipped."], budgetMin: 2000, budgetMax: 4000, type: JobType.HOURLY, experienceLevel: ExperienceLevel.SENIOR, remote: true, clientRating: 4.7, postedAt: new Date("2026-09-02"), sourceUrl: "https://demo.freelanceiq.app/jobs/everroom-commerce", skills: ["Next.js", "TypeScript", "E-commerce", "APIs"] },
  { title: "Developer Experience Platform", clientName: "Morrow Systems", category: "Developer tools", description: "Create an internal platform that helps engineering teams discover services, owners, and deployment health.", requirements: ["React", "Node.js", "PostgreSQL", "Design systems"], questions: ["What makes an internal tool pleasant to use?"], budgetMin: 3000, budgetMax: 5000, type: JobType.FIXED, experienceLevel: ExperienceLevel.EXPERT, remote: true, clientRating: 4.9, postedAt: new Date("2026-08-28"), sourceUrl: "https://demo.freelanceiq.app/jobs/morrow-platform", skills: ["React", "Node.js", "PostgreSQL", "UX"] },
] as const;

async function main() {
  const passwordHash = await hashPassword("password123");
  const user = await prisma.user.upsert({ where: { email: "tanveer@freelanceiq.app" }, update: { name: "Tanveer Ahmed", passwordHash }, create: { email: "tanveer@freelanceiq.app", name: "Tanveer Ahmed", passwordHash } });
  const profileData = { professionalTitle: "Full-Stack Developer", overview: "I build product-focused SaaS products using Next.js, TypeScript, PostgreSQL, and practical product workflows.", hourlyRate: 65, experienceLevel: ExperienceLevel.SENIOR, location: "Remote", availability: "Available for new projects", primaryCategory: "Full-Stack Development", profileCompleteness: 86 };
  await prisma.profile.upsert({ where: { userId: user.id }, update: profileData, create: { userId: user.id, ...profileData } });
  await prisma.userPreference.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id, theme: Theme.SYSTEM, defaultProposalTone: ProposalTone.PROFESSIONAL, defaultProposalLength: ProposalLength.MEDIUM } });
  await prisma.skill.createMany({ data: ["Next.js", "TypeScript", "React", "PostgreSQL", "AI Integration", "WordPress"].map((name, index) => ({ userId: user.id, name, category: ["Frontend", "Language", "Frontend", "Database", "Product", "CMS"][index], demand: index < 5 ? "High" : "Medium", matchScore: 74 + index * 4 })), skipDuplicates: true });
  await prisma.portfolioProject.createMany({ data: [{ userId: user.id, title: "Smart Grocery Platform", description: "A multi-vendor storefront and fulfillment platform.", technologies: ["Next.js", "TypeScript", "PostgreSQL"], role: "Lead Full-Stack Engineer", skillsUsed: ["Next.js", "TypeScript", "PostgreSQL"] }, { userId: user.id, title: "Medical Billing Workspace", description: "A workflow platform for operations and billing managers.", technologies: ["Next.js", "Prisma", "Authentication"], role: "Frontend and API Engineer", skillsUsed: ["Next.js", "Prisma", "PostgreSQL"] }], skipDuplicates: true });

  for (const jobData of jobs) {
    const { skills, ...data } = jobData;
    const writableData = { ...data, requirements: [...data.requirements], questions: [...data.questions] };
    const job = await prisma.job.upsert({ where: { sourceUrl: data.sourceUrl }, update: writableData, create: writableData });
    await prisma.jobSkill.createMany({ data: skills.map((name) => ({ jobId: job.id, name })), skipDuplicates: true });
  }
  const seededJobs = await prisma.job.findMany({ where: { sourceUrl: { startsWith: "https://demo.freelanceiq.app" } }, orderBy: { postedAt: "desc" } });
  const [firstJob, secondJob, thirdJob] = seededJobs;
  if (!firstJob || !secondJob || !thirdJob) throw new Error("Seed jobs were not created");

  await prisma.savedJob.upsert({ where: { userId_jobId: { userId: user.id, jobId: firstJob.id } }, update: { priority: SavedJobPriority.HIGH, status: SavedJobStatus.REVIEWING }, create: { userId: user.id, jobId: firstJob.id, priority: SavedJobPriority.HIGH, status: SavedJobStatus.REVIEWING } });
  await prisma.savedJob.upsert({ where: { userId_jobId: { userId: user.id, jobId: secondJob.id } }, update: {}, create: { userId: user.id, jobId: secondJob.id, priority: SavedJobPriority.MEDIUM } });
  await prisma.jobAnalysis.upsert({ where: { userId_jobId: { userId: user.id, jobId: firstJob.id } }, update: {}, create: { userId: user.id, jobId: firstJob.id, matchScore: 92, technicalMatch: 94, experienceMatch: 90, portfolioMatch: 91, recommendation: "Strong match", matchedSkills: ["Next.js", "TypeScript", "PostgreSQL"], missingSkills: ["RAG"], risks: ["Fixed budget is compact"], reasoning: "The product workflow aligns closely with recent SaaS and database work.", proposalStrategy: "Lead with product delivery and data modeling experience." } });
  const proposal = await prisma.proposal.upsert({ where: { id: "demo-proposal-1" }, update: {}, create: { id: "demo-proposal-1", userId: user.id, jobId: firstJob.id, title: "Support workspace proposal", content: "I can help turn this support workflow into a focused, reliable product.", tone: ProposalTone.PROFESSIONAL, length: ProposalLength.MEDIUM, qualityScore: 88 } });
  const application = await prisma.application.upsert({ where: { userId_jobId: { userId: user.id, jobId: firstJob.id } }, update: { proposalId: proposal.id, status: ApplicationStatus.INTERVIEW, interviewAt: new Date("2026-09-12"), expectedValue: 850 }, create: { userId: user.id, jobId: firstJob.id, clientName: firstJob.clientName, proposalId: proposal.id, status: ApplicationStatus.INTERVIEW, appliedAt: new Date("2026-09-04"), interviewAt: new Date("2026-09-12"), expectedValue: 850 } });
  await prisma.applicationNote.deleteMany({ where: { applicationId: application.id } });
  await prisma.applicationNote.create({ data: { applicationId: application.id, content: "Prepare a short walkthrough of the knowledge-base workflow before the interview." } });
  await prisma.application.upsert({ where: { userId_jobId: { userId: user.id, jobId: secondJob.id } }, update: {}, create: { userId: user.id, jobId: secondJob.id, clientName: secondJob.clientName, status: ApplicationStatus.SUBMITTED, appliedAt: new Date("2026-09-01"), expectedValue: 2200 } });
  await prisma.application.upsert({ where: { userId_jobId: { userId: user.id, jobId: thirdJob.id } }, update: {}, create: { userId: user.id, jobId: thirdJob.id, clientName: thirdJob.clientName, status: ApplicationStatus.DECLINED, appliedAt: new Date("2026-08-20"), expectedValue: 3200 } });
  await prisma.notification.deleteMany({ where: { userId: user.id } });
  await prisma.notification.create({ data: { userId: user.id, title: "Interview coming up", message: "Your Northstar Labs interview is scheduled for September 12.", type: NotificationType.APPLICATION } });
  console.log("Seed data ready for FreelanceIQ demo user.");
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
