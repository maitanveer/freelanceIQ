import { AppShell } from "@/components/dashboard/app-shell";
import { ProposalManager } from "@/components/proposals/proposal-manager";
import { getRequiredUserId } from "@/lib/access";
import { getProposals } from "@/lib/data";

export default async function ProposalsPage() {
  const userId = await getRequiredUserId();
  const proposals = await getProposals(userId);
  return <AppShell><div className="p-6 sm:p-8"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-3xl font-semibold">Proposals</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Turn strong job matches into focused, personalized proposals.</p></div><ProposalManager proposals={proposals} /></div></div></AppShell>;
}
