import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreelanceIQ | AI-Powered Freelance Workflow",
  description:
    "AI-powered freelance job intelligence and workflow management for freelancers.",
  icons: {
    icon: "/branding/freelanceiq-logo.png",
    shortcut: "/branding/freelanceiq-logo.png",
    apple: "/branding/freelanceiq-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
