/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
import type { Metadata } from "next";
import AppWithSplash from "@/components/shared/AppWithSplash";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgroMind — AI Intelligence for Every Farm & Pond",
  description:
    "102 specialized AI models powering smarter decisions in aquaculture, agriculture, weather, energy, and advisory.",
  keywords: "AI farming, aquaculture AI, agriculture intelligence, smart farm, AgroMind",
  authors: [{ name: "Mohamed Samy", url: "https://mohamedsamy.software/" }],
  creator: "Mohamed Samy",
  openGraph: {
    title: "AgroMind — AI Intelligence for Every Farm & Pond",
    description:
      "102 specialized AI models powering smarter decisions in aquaculture, agriculture, weather, energy, and advisory.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ── Favicons ── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="/android-chrome-192x192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/android-chrome-512x512.png" type="image/png" sizes="512x512" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Theme ── */}
        <meta name="theme-color" content="#0D2B1A" />
        <meta name="msapplication-TileColor" content="#0D2B1A" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />

        {/* ── Fonts ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppWithSplash>{children}</AppWithSplash>
      </body>
    </html>
  );
}
