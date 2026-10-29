import type { Metadata } from "next";
import "./globals.css";
import "./landing.css";
import "./docx/docx.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: { default: "DevAcademy — Learn to Code Step by Step", template: "%s · DevAcademy" },
  description: "Master programming concepts, test live code examples, and practice hands-on exercises with DevAcademy.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/devacademy-icon-square.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

