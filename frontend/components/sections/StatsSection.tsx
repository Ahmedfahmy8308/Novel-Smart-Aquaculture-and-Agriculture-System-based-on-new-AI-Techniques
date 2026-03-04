/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useRef, useEffect, useState } from "react";
import { PLATFORM_STATS, MODEL_TYPES } from "@/lib/constants";
import type { DetailedStat } from "@/types";

function useCountUp(target: number, duration: number, active: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else { setCount(Math.floor(start)); }
        }, 16);
        return () => clearInterval(timer);
    }, [active, target, duration]);
    return count;
}

function StatCard({ stat, active }: { stat: DetailedStat; active: boolean }) {
    const count = useCountUp(stat.value, 1200, active);
    return (
        <div className="text-center px-4">
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600, fontSize: "clamp(40px, 6vw, 64px)", color: "#6EC84A", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {count}{stat.suffix}
            </div>
            <div className="mt-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "18px", color: "#FFFFFF" }}>{stat.label}</div>
            <div className="mt-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "13px", color: "#8FA898" }}>{stat.sub}</div>
        </div>
    );
}

export function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const total = MODEL_TYPES.reduce((a, b) => a + b.value, 0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 relative overflow-hidden"
            style={{
                backgroundImage: "url('/stats-section.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(10,31,18,0.55) 0%, rgba(10,31,18,0.65) 60%, rgba(10,31,18,0.80) 100%)" }} />
            <div className="relative max-w-6xl mx-auto px-5 md:px-10">
                <div className="text-center mb-16">
                    <p className="mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "#6EC84A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        Platform Scale
                    </p>
                    <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "clamp(32px, 5vw, 48px)", color: "#FFFFFF" }}>
                        Built at Scale, Trusted by Thousands
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mb-16">
                    {PLATFORM_STATS.map((s, i) => (
                        <StatCard key={s.label} stat={s} active={active} />
                    ))}
                </div>

                <div className="w-full h-px mb-12" style={{ background: "rgba(110,200,74,0.15)" }} />

                <div>
                    <p className="text-center mb-8" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "14px", color: "#8FA898", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Model Architecture Breakdown
                    </p>
                    <div className="flex rounded-full overflow-hidden h-4 mb-6">
                        {MODEL_TYPES.map((m) => (
                            <div key={m.label} style={{ width: `${(m.value / total) * 100}%`, background: m.color, transition: "width 1s ease" }} />
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        {/* First 6 items */}
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                            {MODEL_TYPES.slice(0, 6).map((m) => (
                                <div key={m.label} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: m.color }} />
                                    <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "#E8F0E9" }}>{m.label}</span>
                                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 500, fontSize: "12px", color: "#8FA898" }}>({m.value})</span>
                                </div>
                            ))}
                        </div>
                        {/* Last item (Optimization) on its own row */}
                        {MODEL_TYPES.slice(6).map((m) => (
                            <div key={m.label} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: m.color }} />
                                <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "#E8F0E9" }}>{m.label}</span>
                                <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 500, fontSize: "12px", color: "#8FA898" }}>({m.value})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

