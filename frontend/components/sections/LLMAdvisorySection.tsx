/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useRef, useEffect, useState } from "react";
import { CheckCircle2, Send, Bot, User } from "lucide-react";
import { CHAT_MESSAGES, LLM_FEATURES } from "@/lib/constants";

export function LLMAdvisorySection() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [inputVal, setInputVal] = useState("");

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
        <section id="ai-advisor" ref={ref} className="py-24 overflow-hidden" style={{ background: "#0D2B1A" }}>
            <div className="max-w-6xl mx-auto px-5 md:px-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Left: Text */}
                    <div
                        className="flex-1"
                        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-40px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
                    >
                        <p className="mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "#6EC84A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            LLM Cognitive Layer
                        </p>
                        <h2 className="mb-5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "clamp(30px, 4vw, 42px)", color: "#FFFFFF", lineHeight: 1.15 }}>
                            Your Intelligent Farm Advisor
                        </h2>
                        <p className="mb-8" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "16px", color: "#8FA898", lineHeight: 1.7 }}>
                            Ask AgroMind anything. Get real-time, context-aware advice in your language — backed by your live sensor data, weather forecasts, and market intelligence.
                        </p>

                        <div className="space-y-3">
                            {LLM_FEATURES.map((f) => (
                                <div key={f} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} style={{ color: "#6EC84A" }} />
                                    <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "15px", color: "#E8F0E9" }}>{f}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            id="llm-advisor-cta"
                            className="mt-10 px-7 py-3.5 rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "15px", background: "linear-gradient(135deg,#3A8C2F,#6EC84A)", boxShadow: "0 4px 20px rgba(58,140,47,0.35)" }}
                        >
                            Try AI Advisor Free
                        </button>
                    </div>

                    {/* Right: Chat UI */}
                    <div
                        className="flex-1 w-full max-w-lg"
                        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}
                    >
                        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(110,200,74,0.2)", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
                            {/* Chat header */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "rgba(110,200,74,0.15)" }}>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3A8C2F,#6EC84A)" }}>
                                    <Bot size={18} color="white" />
                                </div>
                                <div>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "14px", color: "#FFFFFF" }}>AgroMind AI</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#6EC84A" }} />
                                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "12px", color: "#6EC84A" }}>Online · 12 models active</span>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="chat-scroll px-5 py-4 space-y-4 max-h-80 overflow-y-auto">
                                {CHAT_MESSAGES.map((msg, i) => (
                                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: msg.role === "ai" ? "linear-gradient(135deg,#3A8C2F,#6EC84A)" : "rgba(110,200,74,0.15)" }}>
                                            {msg.role === "ai" ? <Bot size={14} color="white" /> : <User size={14} style={{ color: "#6EC84A" }} />}
                                        </div>
                                        <div className="max-w-[80%] px-4 py-3 rounded-2xl" style={{ background: msg.role === "ai" ? "rgba(58,140,47,0.12)" : "rgba(255,255,255,0.07)", border: msg.role === "ai" ? "1px solid rgba(110,200,74,0.2)" : "1px solid rgba(255,255,255,0.08)" }}>
                                            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "13px", color: msg.role === "ai" ? "#E8F0E9" : "#FFFFFF", lineHeight: 1.6 }}>
                                                {msg.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="px-4 pb-4">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(110,200,74,0.2)" }}>
                                    <input
                                        id="llm-chat-input"
                                        type="text"
                                        placeholder="Ask about your farm..."
                                        value={inputVal}
                                        onChange={(e) => setInputVal(e.target.value)}
                                        className="flex-1 bg-transparent outline-none"
                                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: "#FFFFFF" }}
                                    />
                                    <button className="p-1.5 rounded-lg transition-all hover:scale-110" style={{ background: "linear-gradient(135deg,#3A8C2F,#6EC84A)" }} onClick={() => setInputVal("")}>
                                        <Send size={14} color="white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

