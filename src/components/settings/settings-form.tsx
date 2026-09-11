"use client";

import { useState } from "react";
import { updatePreferences } from "@/lib/workspace-actions";

export function SettingsForm({ initial }: { initial: { theme: "SYSTEM" | "LIGHT" | "DARK"; notificationsEnabled: boolean; defaultAiProvider: string; defaultModel: string } }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setMessage("");
    const data = new FormData(event.currentTarget);
    const result = await updatePreferences({ theme: data.get("theme") as "SYSTEM" | "LIGHT" | "DARK", notificationsEnabled: data.get("notifications") === "on", defaultAiProvider: String(data.get("provider") ?? ""), defaultModel: String(data.get("model") ?? "") });
    setBusy(false); setMessage(result.ok ? "Settings updated successfully." : result.message);
  }
  return <form onSubmit={submit} className="mt-6 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div><label className="mb-2 block text-sm font-medium" htmlFor="theme">Theme</label><select id="theme" name="theme" defaultValue={initial.theme} className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950"><option>SYSTEM</option><option>LIGHT</option><option>DARK</option></select></div><label className="mt-5 flex items-center gap-3 text-sm"><input name="notifications" type="checkbox" defaultChecked={initial.notificationsEnabled} /> Enable in-app notifications</label><div className="mt-5"><label className="mb-2 block text-sm font-medium" htmlFor="provider">AI provider</label><input id="provider" name="provider" defaultValue={initial.defaultAiProvider} placeholder="Ollama" className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div><div className="mt-5"><label className="mb-2 block text-sm font-medium" htmlFor="model">AI model</label><input id="model" name="model" defaultValue={initial.defaultModel} placeholder="llama3.1" className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950" /></div><div className="mt-6 flex items-center gap-4"><button type="submit" disabled={busy} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{busy ? "Saving..." : "Save settings"}</button>{message ? <span role="status" className="text-sm text-emerald-600">{message}</span> : null}</div></form>;
}