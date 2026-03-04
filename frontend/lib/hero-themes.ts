/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
export interface ThemeColors {
    bg: string;
    primary: string;
    primaryGrad: string;
    primaryShadow: string;
    primaryBorder: string;
    statColor: string;
    badgeBg: string;
    badgeBorder: string;
    navBorder: string;
    navDefaultBg: string;
    navScrolledBg: string;
    overlay: string;
    glow: string;
}

export const HERO_THEMES: ThemeColors[] = [
    {
        // 0 — green  (agromind-bg.png)
        bg: "/agromind-bg.png",
        primary: "#6EC84A",
        primaryGrad: "linear-gradient(135deg,#3A8C2F,#6EC84A)",
        primaryShadow: "rgba(58,140,47,0.45)",
        primaryBorder: "rgba(110,200,74,0.55)",
        statColor: "#6EC84A",
        badgeBg: "rgba(58,140,47,0.18)",
        badgeBorder: "rgba(110,200,74,0.35)",
        navBorder: "rgba(110,200,74,0.15)",
        navDefaultBg: "rgba(10,31,18,0.85)",
        navScrolledBg: "rgba(10,31,18,0.98)",
        overlay:
            "linear-gradient(180deg, rgba(5,18,8,0.50) 0%, rgba(8,24,14,0.60) 50%, rgba(13,43,26,0.78) 100%)",
        glow: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(58,140,47,0.10) 0%, transparent 70%)",
    },
    {
        // 1 — teal  (agromind-bg-3.png)
        bg: "/agromind-bg-3.png",
        primary: "#1ABFA1",
        primaryGrad: "linear-gradient(135deg,#1D4949,#1ABFA1)",
        primaryShadow: "rgba(26,191,161,0.40)",
        primaryBorder: "rgba(119,203,203,0.55)",
        statColor: "#77CBCB",
        badgeBg: "rgba(26,191,161,0.18)",
        badgeBorder: "rgba(119,203,203,0.35)",
        navBorder: "rgba(119,203,203,0.15)",
        navDefaultBg: "rgba(4,18,22,0.85)",
        navScrolledBg: "rgba(4,18,22,0.98)",
        overlay:
            "linear-gradient(180deg, rgba(3,14,18,0.45) 0%, rgba(5,20,26,0.55) 50%, rgba(8,28,35,0.75) 100%)",
        glow: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(26,191,161,0.10) 0%, transparent 70%)",
    },
    {
        // 2 — orange  (agromind-bg-2.png)
        bg: "/agromind-bg-2.png",
        primary: "#EDA268",
        primaryGrad: "linear-gradient(135deg,#C06722,#EDA268)",
        primaryShadow: "rgba(192,103,34,0.45)",
        primaryBorder: "rgba(202,157,123,0.55)",
        statColor: "#C06722",
        badgeBg: "rgba(192,103,34,0.18)",
        badgeBorder: "rgba(237,162,104,0.35)",
        navBorder: "rgba(202,157,123,0.20)",
        navDefaultBg: "rgba(24,12,4,0.85)",
        navScrolledBg: "rgba(24,12,4,0.98)",
        overlay:
            "linear-gradient(180deg, rgba(18,8,3,0.40) 0%, rgba(24,12,4,0.55) 50%, rgba(30,15,5,0.75) 100%)",
        glow: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,103,34,0.12) 0%, transparent 70%)",
    },
    {
        // 3 — sandy  (agromind-bg-4.png)
        bg: "/agromind-bg-4.png",
        primary: "#C5A787",
        primaryGrad: "linear-gradient(135deg,#B78462,#FFDEBB)",
        primaryShadow: "rgba(183,132,98,0.45)",
        primaryBorder: "rgba(197,167,135,0.55)",
        statColor: "#B78462",
        badgeBg: "rgba(183,132,98,0.18)",
        badgeBorder: "rgba(197,167,135,0.35)",
        navBorder: "rgba(197,167,135,0.20)",
        navDefaultBg: "rgba(20,14,8,0.85)",
        navScrolledBg: "rgba(20,14,8,0.98)",
        overlay:
            "linear-gradient(180deg, rgba(18,12,6,0.40) 0%, rgba(22,15,8,0.55) 50%, rgba(28,18,10,0.75) 100%)",
        glow: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(183,132,98,0.10) 0%, transparent 70%)",
    },
];
