"use server";

import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address.").transform((value) => value.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type RegistrationResult =
  | { ok: true }
  | { ok: false; message: string; field?: "name" | "email" | "password" };

export async function registerUser(input: unknown): Promise<RegistrationResult> {
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue.path[0];
    return {
      ok: false,
      message: issue.message,
      field: field === "name" || field === "email" || field === "password" ? field : undefined,
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
    if (existingUser) return { ok: false, message: "An account with this email already exists.", field: "email" };

    const passwordHash = await hashPassword(parsed.data.password);
    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        profile: { create: { profileCompleteness: 10 } },
        preferences: { create: {} },
      },
    });

    return { ok: true };
  } catch {
    return { ok: false, message: "We could not create your account. Please try again." };
  }
}
