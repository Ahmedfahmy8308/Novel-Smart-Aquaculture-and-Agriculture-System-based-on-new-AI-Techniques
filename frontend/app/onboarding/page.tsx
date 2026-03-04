/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ModuleCard,
    FullDashboardButton,
    ONBOARDING_MODULES,
} from "@/components/shared/OnboardingCards";

export default function OnboardingPage() {
    const [userName] = useState(() => {
        if (typeof window === "undefined") return "Mohamed";
        const stored = sessionStorage.getItem("agromind_name");
        return stored ? stored.split(" ")[0] : "Mohamed";
    });

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                background: "#03160A",
                overflow: "hidden",
            }}
        >
            {/* ── Background Image ──────────────────────────────── */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 0,
                }}
            >
                <Image
                    src="/onboarding-bg.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                        opacity: 0.55,
                    }}
                />
            </div>

            {/* ── Main Content ─────────────────────────────────── */}
            <div
                className="ob-main-content"
                style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    minHeight: "100vh",
                    boxSizing: "border-box",
                }}
            >
                {/* ── Logo ──────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "-22px" }}
                >
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textDecoration: "none",
                        }}
                    >
                        <Image
                            src="/logo.svg"
                            alt="AgroMind"
                            width={200}
                            height={160}
                            priority
                        />
                    </Link>
                </motion.div>

                {/* ── Welcome Heading ───────────────────────────── */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingBottom: "clamp(28px, 6vw, 80px)",
                        width: "100%",
                        maxWidth: "768px",
                        gap: "clamp(10px, 2.5vw, 24px)",
                    }}
                >
                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        style={{
                            margin: 0,
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 400,
                            fontSize: "clamp(32px, 5.5vw, 72px)",
                            lineHeight: "1.1",
                            textAlign: "center",
                            color: "#FFFFFF",
                        }}
                    >
                        Welcome, {userName}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{
                            margin: 0,
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: "clamp(13px, 2vw, 20px)",
                            lineHeight: "1.5",
                            textAlign: "center",
                            letterSpacing: "0.5px",
                            color: "rgba(255,255,255,0.5)",
                        }}
                    >
                        System operational. Select a command module to begin.
                    </motion.p>
                </div>

                {/* ── Cards Grid (2×2) ─────────────────────────── */}
                <div
                    className="onboarding-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "40px",
                        width: "100%",
                        maxWidth: "1060px",
                        marginBottom: "-22px",
                        alignItems: "stretch",
                    }}
                >
                    {ONBOARDING_MODULES.map((card, i) => (
                        <ModuleCard key={card.id} card={card} index={i} />
                    ))}
                </div>

                {/* ── Explore Full Platform Dashboard ───────────── */}
                <FullDashboardButton />
            </div>
        </div>
    );
}
