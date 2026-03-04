/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

export function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#3A8C2F,#6EC84A)" }}>
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />

            <div className="relative max-w-3xl mx-auto px-5 md:px-10 text-center">
                <p className="mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Get Started Today
                </p>
                <h2 className="mb-5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 52px)", color: "#FFFFFF", lineHeight: 1.12 }}>
                    Ready to transform your farm with AI?
                </h2>
                <p className="mb-10" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                    Join hundreds of operators already using AgroMind to increase yield, reduce costs, and make smarter decisions every day.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        id="cta-get-started"
                        href="/register"
                        className="group flex items-center gap-2 px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "16px", color: "#3A8C2F", background: "#FFFFFF", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
                    >
                        Get Started for Free
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <button
                        id="cta-schedule-demo"
                        className="px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "16px", color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.5)", background: "transparent" }}
                    >
                        Schedule a Demo
                    </button>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                    {TRUST_BADGES.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.6)" }} />
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

