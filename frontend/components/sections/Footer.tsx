/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { Twitter, Linkedin, Youtube, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, MODULE_LINKS, LEGAL_LINKS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";

const SOCIAL_ICONS = [Twitter, Linkedin, Youtube];

function FooterLink({ label, href = "#" }: { label: string; href?: string }) {
    const isAnchor = href.startsWith("#");
    return (
        <li>
            <a
                href={href}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "14px", color: "#8FA898", textDecoration: "none", transition: "color 0.2s" }}
                onClick={isAnchor ? (e) => { e.preventDefault(); smoothScrollTo(href); } : undefined}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6EC84A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8FA898")}
            >
                {label}
            </a>
        </li>
    );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="mb-5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "14px", color: "#FFFFFF", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {children}
        </h4>
    );
}

export function Footer() {
    return (
        <footer style={{ background: "#0A1F12" }}>
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <div className="mb-5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/logo.svg" alt="AgroMind" className="h-10 w-auto origin-left" style={{ transform: "scale(2.7)" }} />
                        </div>
                        <p className="mb-6" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "14px", color: "#8FA898", lineHeight: 1.65 }}>
                            AI Intelligence for every farm and pond. 102 specialized models powering the future of agriculture and aquaculture.
                        </p>
                        <div className="flex gap-3">
                            {SOCIAL_ICONS.map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    style={{ background: "rgba(110,200,74,0.1)", border: "1px solid rgba(110,200,74,0.2)" }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(110,200,74,0.2)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(110,200,74,0.1)"; }}
                                >
                                    <Icon size={15} style={{ color: "#6EC84A" }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <FooterHeading>Quick Links</FooterHeading>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => <FooterLink key={link.label} label={link.label} href={link.href} />)}
                        </ul>
                    </div>

                    {/* Modules */}
                    <div>
                        <FooterHeading>Modules</FooterHeading>
                        <ul className="space-y-3">
                            {MODULE_LINKS.map((link) => <FooterLink key={link} label={link} />)}
                        </ul>
                    </div>

                    {/* Contact + Newsletter */}
                    <div>
                        <FooterHeading>Contact</FooterHeading>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-start gap-3">
                                <Mail size={16} style={{ color: "#6EC84A", marginTop: "2px", flexShrink: 0 }} />
                                <a href="mailto:hello@agromind.ai" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "14px", color: "#8FA898", textDecoration: "none" }}>
                                    hello@agromind.ai
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={16} style={{ color: "#6EC84A", marginTop: "2px", flexShrink: 0 }} />
                                <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "14px", color: "#8FA898", lineHeight: 1.5 }}>
                                    Baltim Kafr El Sheikh
                                </span>
                            </div>
                        </div>
                        <p className="mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "#E8F0E9" }}>
                            Get AI farming updates
                        </p>
                        <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(110,200,74,0.25)" }}>
                            <input
                                id="footer-newsletter-email"
                                type="email"
                                placeholder="your@email.com"
                                autoComplete="off"
                                data-lpignore="true"
                                data-form-type="other"
                                className="flex-1 px-3 py-2.5 bg-transparent outline-none min-w-0"
                                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "16px", color: "#FFFFFF", touchAction: "manipulation" }}
                            />
                            <button className="px-4 py-2.5 text-white text-sm flex-shrink-0" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", background: "linear-gradient(135deg,#3A8C2F,#6EC84A)" }}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t" style={{ borderColor: "rgba(110,200,74,0.1)" }}>
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 400, fontSize: "13px", color: "#8FA898" }}>
                        © 2026 AgroMind. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {LEGAL_LINKS.map((item) => (
                            <a key={item} href="#"
                                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: "#8FA898", textDecoration: "none", transition: "color 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#6EC84A")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#8FA898")}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

