/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useRef, useEffect, useState } from "react";
import { FEATURES } from "@/lib/constants";
import type { Feature } from "@/types";

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const Icon = feature.icon;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); }
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className="flex flex-col p-6 rounded-2xl cursor-pointer group transition-all duration-300 h-full"
            style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: `2px solid ${feature.color}`,
                boxShadow: `0 0 24px rgba(0,0,0,0.3), inset 0 1px 0 ${feature.color}18`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `linear-gradient(160deg, ${feature.color}0D 0%, rgba(255,255,255,0.03) 100%)`;
                el.style.borderColor = `${feature.color}40`;
                el.style.borderTopColor = feature.color;
                el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${feature.color}20, inset 0 1px 0 ${feature.color}25`;
                el.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 100%)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.borderTopColor = feature.color;
                el.style.boxShadow = `0 0 24px rgba(0,0,0,0.3), inset 0 1px 0 ${feature.color}18`;
                el.style.transform = visible ? "translateY(0)" : "translateY(24px)";
            }}
        >
            {/* Icon circle */}
            <div
                className="flex items-center justify-center rounded-xl mb-4 flex-shrink-0"
                style={{ width: 52, height: 52, background: `${feature.color}18` }}
            >
                <Icon size={24} style={{ color: feature.color }} />
            </div>

            {/* AI Models badge */}
            <span
                className="self-start mb-3 px-3 py-1 rounded-full"
                style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 500,
                    fontSize: "11px",
                    color: feature.color,
                    background: `${feature.color}18`,
                    border: `1px solid ${feature.color}30`,
                }}
            >
                {feature.count} AI Models
            </span>

            {/* Title */}
            <h3
                className="mb-2"
                style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                }}
            >
                {feature.title}
            </h3>

            {/* Description */}
            <p
                style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#8FA898",
                    lineHeight: 1.65,
                }}
            >
                {feature.desc}
            </p>
        </div>
    );
}

export function FeaturesStrip() {
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Split: first 3 on top row, last 2 on bottom row
    const topRow = FEATURES.slice(0, 3);
    const bottomRow = FEATURES.slice(3);

    return (
        <section id="features" className="py-24" style={{ background: "#0A1F12" }}>
            <div className="max-w-6xl mx-auto px-5 md:px-10">

                {/* Header */}
                <div
                    ref={headerRef}
                    className="text-center mb-14"
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    <p
                        className="mb-3"
                        style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                            fontWeight: 500,
                            fontSize: "13px",
                            color: "#6EC84A",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                        }}
                    >
                        Platform Modules
                    </p>
                    <h2
                        style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                            fontWeight: 700,
                            fontSize: "clamp(36px, 5vw, 52px)",
                            color: "#FFFFFF",
                            lineHeight: 1.1,
                        }}
                    >
                        Five Pillars of Intelligence
                    </h2>
                </div>

                {/* Top row — 3 equal cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 items-stretch">
                    {topRow.map((f, i) => (
                        <FeatureCard key={f.title} feature={f} delay={i * 100} />
                    ))}
                </div>

                {/* Bottom row — 2 cards each 50% wide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
                    {bottomRow.map((f, i) => (
                        <FeatureCard key={f.title} feature={f} delay={(i + 3) * 100} />
                    ))}
                </div>
            </div>
        </section>
    );
}

