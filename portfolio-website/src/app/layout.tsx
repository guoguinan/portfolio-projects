import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "郭贵南 Henry Guo - Senior Frontend Engineer",
  description:
    "Portfolio of 郭贵南 (Henry Guo), a senior frontend engineer specializing in React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "frontend engineer",
    "react developer",
    "next.js",
    "typescript",
    "web development",
    "remote work",
  ],
  authors: [{ name: "郭贵南 Henry Guo" }],
  openGraph: {
    title: "郭贵南 Henry Guo - Senior Frontend Engineer",
    description: "Building exceptional digital experiences with modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-900 text-slate-900 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
