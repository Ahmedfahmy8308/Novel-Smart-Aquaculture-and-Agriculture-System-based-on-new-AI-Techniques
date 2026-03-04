/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useRef, useEffect, useState } from "react";
import { STEPS } from "@/lib/constants";

export function HowItWorksSection() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="how-it-works" ref={ref} className="py-24" style={{ background: "#0A1F12" }}>
            <div className="max-w-6xl mx-auto px-5 md:px-10">
                <div className="text-center mb-16">
                    <p className="mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "#6EC84A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        How It Works
                    </p>
                    <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "clamp(32px, 5vw, 48px)", color: "#FFFFFF", lineHeight: 1.15 }}>
                        From Farm Data to Smart Action
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "16px", color: "#8FA898", lineHeight: 1.6 }}>
                        Get operational in minutes. AgroMind&apos;s streamlined pipeline turns raw sensor data into actionable intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.step}
                                className="relative flex flex-col items-center text-center"
                                style={{
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? "translateY(0)" : "translateY(32px)",
                                    transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                                }}
                            >
                                <div className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center mb-6 z-10" style={{ background: `${s.color}15`, border: `2px solid ${s.color}50` }}>
                                    <Icon size={24} style={{ color: s.color }} />
                                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: s.color, fontFamily: "JetBrains Mono, monospace", fontWeight: 600, fontSize: "10px", color: "#0D2B1A" }}>
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 className="mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "18px", color: "#FFFFFF" }}>
                                    {s.title}
                                </h3>
                                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "14px", color: "#8FA898", lineHeight: 1.65 }}>
                                    {s.desc}
                                </p>
                                {i < STEPS.length - 1 && (
                                    <div className="md:hidden mt-6 text-2xl" style={{ color: "rgba(110,200,74,0.4)" }}>↓</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

