/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HERO_STATS } from "@/lib/constants";
import { HERO_THEMES } from "@/lib/hero-themes";
import { useHeroTheme } from "@/lib/hero-theme-context";

export function HeroSection() {
    const { slideIndex, theme } = useHeroTheme();

    const TRANSITION = "color 0.8s ease, background 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease";

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* ── Background images — all stacked, fade between them ── */}
            {HERO_THEMES.map((t, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    key={t.bg}
                    src={t.bg}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        zIndex: 0,
                        opacity: i === slideIndex ? 1 : 0,
                        transition: "opacity 1.2s ease",
                    }}
                />
            ))}

            {/* ── Dark overlay — fades with theme ── */}
            <div
                className="absolute inset-0"
                style={{
                    background: theme.overlay,
                    zIndex: 1,
                    transition: "background 1.2s ease",
                }}
            />

            {/* ── Radial glow ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: theme.glow,
                    zIndex: 3,
                    transition: "background 1.2s ease",
                }}
            />

            {/* ── Content ── */}
            <div className="relative z-20 max-w-5xl mx-auto px-5 md:px-10 text-center pt-24 pb-16">
                {/* Live badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                    style={{
                        background: theme.badgeBg,
                        border: `1px solid ${theme.badgeBorder}`,
                        transition: TRANSITION,
                    }}
                >
                    <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: theme.primary, transition: TRANSITION }}
                    />
                    <span
                        style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                            fontWeight: 500,
                            fontSize: "13px",
                            color: theme.primary,
                            transition: TRANSITION,
                        }}
                    >
                        102 AI Models · Live Platform
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="mb-6"
                    style={{
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(48px, 8vw, 88px)",
                        lineHeight: 1.0,
                        color: "#FFFFFF",
                        letterSpacing: "-0.03em",
                    }}
                >
                    AI Intelligence for Every Farm &amp; Pond
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="max-w-2xl mx-auto mb-10"
                    style={{
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(16px, 2vw, 20px)",
                        lineHeight: 1.65,
                        color: "rgba(232,240,233,0.85)",
                    }}
                >
                    102 specialized AI models powering smarter decisions in aquaculture,
                    agriculture, weather, energy, and advisory.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        id="hero-cta-start"
                        className="group relative px-8 py-4 rounded-xl text-white overflow-hidden hover:-translate-y-0.5"
                        style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                            fontWeight: 600,
                            fontSize: "16px",
                            background: theme.primaryGrad,
                            boxShadow: `0 4px 24px ${theme.primaryShadow}`,
                            transition: TRANSITION + ", transform 0.2s ease",
                        }}
                    >
                        <span className="relative z-10">Start Free Trial</span>
                        <div
                            className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                            }}
                        />
                    </button>

                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.65 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
                >
                    {HERO_STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div
                                style={{
                                    fontFamily: "JetBrains Mono, monospace",
                                    fontWeight: 600,
                                    fontSize: "28px",
                                    color: theme.statColor,
                                    lineHeight: 1.2,
                                    transition: TRANSITION,
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{
                                    fontFamily: "Plus Jakarta Sans, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "13px",
                                    color: "#8FA898",
                                    marginTop: "4px",
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ color: "#8FA898" }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>

        </section>
    );
}

