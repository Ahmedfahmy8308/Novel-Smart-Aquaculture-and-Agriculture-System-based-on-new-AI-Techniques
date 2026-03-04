/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useRef, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { MODULES } from "@/lib/constants";
import type { Module } from "@/types";

function ModuleRow({ mod, index }: { mod: Module; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [imgHovered, setImgHovered] = useState(false);
    const reversed = index % 2 === 1;
    const Icon = mod.icon;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-16 mb-24`}
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
        >
            {/* Text side */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${mod.color}18` }}>
                        <Icon size={24} style={{ color: mod.color }} />
                    </div>
                    <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: mod.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Module 0{index + 1}
                    </span>
                </div>

                <h3 className="mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "clamp(26px, 3.5vw, 36px)", color: "#FFFFFF", lineHeight: 1.15 }}>
                    {mod.name}
                </h3>

                <p className="mb-6" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "16px", color: "#8FA898", lineHeight: 1.7 }}>
                    {mod.description}
                </p>

                <ul className="mb-6 space-y-3">
                    {mod.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                            <CheckCircle2 size={18} style={{ color: mod.color, marginTop: "2px", flexShrink: 0 }} />
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "15px", color: "#E8F0E9" }}>{b}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                    {mod.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-full" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "12px", color: "#6EC84A", background: "rgba(58,140,47,0.15)", border: "1px solid rgba(110,200,74,0.2)" }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Image side */}
            <div className="flex-1 w-full">
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{ border: `1px solid ${mod.color}30`, boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 40px ${mod.color}10` }}
                    onMouseEnter={() => setImgHovered(true)}
                    onMouseLeave={() => setImgHovered(false)}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={mod.image}
                        alt={mod.name}
                        className="w-full h-72 md:h-80 object-cover"
                        style={{
                            transform: imgHovered ? "scale(1.07)" : "scale(1)",
                            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${mod.color}18 0%, rgba(0,0,0,0.3) 100%)` }} />
                    <div className="absolute top-4 right-4 px-3 py-2 rounded-xl" style={{ background: "rgba(10,31,18,0.9)", border: `1px solid ${mod.color}40`, backdropFilter: "blur(8px)" }}>
                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600, fontSize: "20px", color: mod.color, lineHeight: 1.1 }}>{mod.tags.length * 7 + 2}+</div>
                        <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "11px", color: "#8FA898" }}>Models Active</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ModulesSection() {
    return (
        <section id="modules" className="py-24" style={{ background: "#0D2B1A" }}>
            <div className="max-w-6xl mx-auto px-5 md:px-10">
                <div className="text-center mb-20">
                    <p className="mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "#6EC84A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        Deep Dive
                    </p>
                    <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "clamp(32px, 5vw, 48px)", color: "#FFFFFF", lineHeight: 1.15 }}>
                        Explore Every Module
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "16px", color: "#8FA898", lineHeight: 1.6 }}>
                        Each module is purpose-built with specialized AI architectures, trained on domain-specific datasets from real farms worldwide.
                    </p>
                </div>
                {MODULES.map((mod, i) => (
                    <ModuleRow key={mod.id} mod={mod} index={i} />
                ))}
            </div>
        </section>
    );
}

