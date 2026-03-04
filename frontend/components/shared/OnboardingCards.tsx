/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ── Data ──────────────────────────────────────────────── */
export interface OnboardingCard {
    id: string;
    image: string;
    title: string;
    description: string;
    tags: string[];
    aiEngine: string;
    accentColor: string;
    accentColorRgb: string;
}

export const ONBOARDING_MODULES: OnboardingCard[] = [
    {
        id: "agriculture",
        image: "/onboarding-agriculture.png",
        title: "Agriculture",
        description: "Autonomous crop monitoring, soil fertility analysis, and automated irrigation control systems.",
        tags: ["CROP YIELD", "DISEASE DETECTION", "SOIL HEALTH"],
        aiEngine: "AI ENGINE V4.2",
        accentColor: "#3A8C2F",
        accentColorRgb: "58,140,47",
    },
    {
        id: "aquaculture",
        image: "/onboarding-aquaculture.png",
        title: "Aquaculture",
        description: "Precision water chemistry monitoring, automated feeding schedules, and stock health tracking.",
        tags: ["WATER QUALITY", "BIO-SECURITY"],
        aiEngine: "AI ENGINE V3.8",
        accentColor: "#83B5B5",
        accentColorRgb: "131,181,181",
    },
    {
        id: "weather",
        image: "/onboarding-weather.png",
        title: "Weather",
        description: "Hyper-local climate intelligence, predictive storm modeling, and frost risk mitigation alerts.",
        tags: ["MICRO-CLIMATE", "RISK FORECAST"],
        aiEngine: "AI ENGINE V5.0",
        accentColor: "#C06722",
        accentColorRgb: "192,103,34",
    },
    {
        id: "energy",
        image: "/onboardding-energy.png",
        title: "Energy",
        description: "Solar and wind yield optimization, storage efficiency management, and grid load balancing.",
        tags: ["GRID STABILITY", "RENEWABLES"],
        aiEngine: "AI ENGINE V3.4",
        accentColor: "#B78462",
        accentColorRgb: "183,132,98",
    },
];

/* ── Arrow SVG ────────────────────────────────────────── */
function ArrowSvg({ color }: { color: string }) {
    return (
        <svg className="ob-arrow-svg" width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2 12H44M38 6L44 12L38 18"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* ── Module Card ──────────────────────────────────────── */
interface ModuleCardProps {
    card: OnboardingCard;
    index: number;
}

export function ModuleCard({ card, index }: ModuleCardProps) {
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.7,
                delay: 0.45 + index * 0.15,
            }}
            onClick={() => router.push(`/chat/${card.id}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="cursor-pointer"
            style={{ padding: "1px", height: "100%" }}
        >
            {/* ─ Card body ─ */}

            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "rgba(15, 35, 25, 0.4)",
                    border: `1px solid rgba(${card.accentColorRgb}, ${hovered ? 0.45 : 0.18})`,
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                    borderRadius: "24px",
                    boxShadow: hovered
                        ? `0 8px 40px -8px rgba(${card.accentColorRgb}, 0.22), 0 2px 8px rgba(0,0,0,0.4)`
                        : "0 2px 8px rgba(0,0,0,0.25)",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                    transform: hovered ? "translateY(-4px)" : "translateY(0)",
                    height: "100%",
                }}
            >
                {/* ─ Top gradient overlay (top 60%) ─ */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        bottom: "40%",
                        background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
                        borderRadius: "24px 24px 0 0",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />

                {/* ─ Content container ─ */}
                <div
                    className="ob-card-content"
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "32px",
                        boxSizing: "border-box",
                    }}
                >
                    {/* Image */}
                    <div className="ob-card-img" style={{ paddingBottom: "32px" }}>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                aspectRatio: "514 / 321",
                                borderRadius: "16px",
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                sizes="(max-width: 768px) 50vw, 530px"
                                style={{ objectFit: "cover" }}
                            />
                            <div
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "rgba(255,255,255,0.002)",
                                    boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
                                    borderRadius: "16px",
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="ob-card-title-wrap" style={{ paddingBottom: "12px" }}>
                        <h3
                            className="ob-card-title"
                            style={{
                                margin: 0,
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 700,
                                fontSize: "24px",
                                lineHeight: "32px",
                                color: "#FFFFFF",
                            }}
                        >
                            {card.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <div className="ob-card-desc" style={{ paddingBottom: "32px" }}>
                        <p
                            style={{
                                margin: 0,
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 400,
                                fontSize: "15px",
                                lineHeight: "24px",
                                color: "rgba(255,255,255,0.6)",
                            }}
                        >
                            {card.description}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="ob-card-tags" style={{ paddingBottom: "64px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {card.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="ob-tag"
                                    style={{
                                        boxSizing: "border-box",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "6px 12px",
                                        background: "rgba(255,255,255,0.05)",
                                        border: `1px solid rgba(${card.accentColorRgb}, 0.4)`,
                                        borderRadius: "9999px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontWeight: 700,
                                            fontSize: "10px",
                                            lineHeight: "1",
                                            letterSpacing: "1px",
                                            textTransform: "uppercase",
                                            color: card.accentColor,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* AI Engine — bottom-left */}
                    <span
                        className="ob-card-engine"
                        style={{
                            position: "absolute",
                            left: "32px",
                            bottom: "24px",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 400,
                            fontSize: "10px",
                            lineHeight: "15px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.3)",
                        }}
                    >
                        {card.aiEngine}
                    </span>

                    {/* Arrow — bottom-right */}
                    <div
                        className="ob-card-arrow"
                        style={{
                            position: "absolute",
                            right: "32px",
                            bottom: "32px",
                            transition: "transform 0.25s ease",
                            transform: hovered ? "translateX(4px)" : "translateX(0)",
                        }}
                    >
                        <ArrowSvg color={card.accentColor} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Full Dashboard Button ────────────────────────────── */
export function FullDashboardButton() {
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="ob-btn-wrap"
            style={{ paddingTop: "140px", paddingBottom: "64px" }}
        >
            <div
                className="ob-btn-outer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => router.push("/dashboard")}
                style={{
                    borderRadius: "9999px",
                    padding: "2px",
                    background: hovered
                        ? "linear-gradient(90deg, #3A8C2F 0%, #83B5B5 35%, #C06722 70%, #B78462 100%)"
                        : "linear-gradient(90deg, rgba(58,140,47,0.5) 0%, rgba(131,181,181,0.4) 35%, rgba(192,103,34,0.4) 70%, rgba(183,132,98,0.4) 100%)",
                    transition: "all 0.35s ease",
                    cursor: "pointer",
                }}
            >
                <button
                    id="explore-full-dashboard"
                    className="ob-btn"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        height: "46px",
                        background: "rgba(10, 31, 18, 0.81)",
                        borderRadius: "9999px",
                        border: "none",
                        cursor: "pointer",
                        boxSizing: "border-box",
                    }}
                >
                    <LayoutGrid
                        size={13}
                        style={{ color: "rgba(255,255,255,0.9)", flexShrink: 0 }}
                    />
                    <span
                        className="ob-btn-text"
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "1",
                            letterSpacing: "0.4px",
                            color: "#FFFFFF",
                        }}
                    >
                        Explore Full Platform Dashboard
                    </span>
                </button>
            </div>
        </motion.div>
    );
}
