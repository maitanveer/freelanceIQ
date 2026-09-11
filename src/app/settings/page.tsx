import { getRequiredUserId } from "@/lib/access";
import { getPreferences } from "@/lib/data";
import { SettingsForm } from "@/components/settings/settings-form";

export default async function SettingsPage() {
  const userId = await getRequiredUserId();
  const preferences = await getPreferences(userId);
  return <main className="p-6 sm:p-8"><h1 className="text-3xl font-semibold">Settings</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Manage preferences that affect your FreelanceIQ workspace.</p><SettingsForm initial={{ theme: preferences?.theme ?? "SYSTEM", notificationsEnabled: preferences?.notificationsEnabled ?? true, defaultAiProvider: preferences?.defaultAiProvider ?? "Ollama", defaultModel: preferences?.defaultModel ?? "" }} /></main>;
}
