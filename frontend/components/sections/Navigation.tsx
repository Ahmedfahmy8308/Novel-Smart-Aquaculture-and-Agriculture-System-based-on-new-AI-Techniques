/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";
import { useHeroTheme } from "@/lib/hero-theme-context";

const TRANSITION = "background 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease";

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");
    const { theme } = useHeroTheme();
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
        const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    const top = visible.reduce((a, b) =>
                        a.boundingClientRect.top < b.boundingClientRect.top ? a : b
                    );
                    setActiveSection(`#${top.target.id}`);
                }
            },
            { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
        );

        sections.forEach((s) => observerRef.current!.observe(s));
        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-24 xl:px-40 2xl:px-64 pt-4">
            <nav
                className="transition-all duration-300"
                style={{
                    background: scrolled ? theme.navScrolledBg : theme.navDefaultBg,
                    backdropFilter: "blur(16px)",
                    border: `1px solid ${theme.navBorder}`,
                    borderRadius: "30px",
                    transition: TRANSITION,
                }}
            >
                <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-14 md:h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.svg" alt="AgroMind" width={140} height={36} priority />
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.href;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="transition-colors duration-200 relative"
                                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "15px", color: isActive ? "#FFFFFF" : "#8FA898" }}
                                    onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href); }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#8FA898"; }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                                            style={{ background: theme.primaryGrad }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-5 py-2 rounded-full transition-all duration-200"
                            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "14px", color: "#8FA898" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8FA898")}
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2.5 rounded-full text-white transition-all duration-200"
                            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "15px", background: theme.primaryGrad, boxShadow: `0 2px 16px ${theme.primaryShadow}`, transition: TRANSITION }}
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        id="nav-mobile-toggle"
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <span
                            style={{
                                display: "block",
                                transform: mobileOpen ? "rotate(90deg) scale(1.1)" : "rotate(0deg) scale(1)",
                                transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </span>
                    </button>
                </div>

                {/* Mobile menu — animated */}
                <div
                    className="md:hidden overflow-hidden"
                    style={{
                        maxHeight: mobileOpen ? "500px" : "0px",
                        opacity: mobileOpen ? 1 : 0,
                        transition: mobileOpen
                            ? "max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease"
                            : "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
                    }}
                >
                    <div
                        className="border-t flex flex-col px-5 py-4 gap-1"
                        style={{
                            borderColor: theme.navBorder,
                            borderBottomLeftRadius: "24px",
                            borderBottomRightRadius: "24px",
                        }}
                    >
                        {NAV_LINKS.map((link, i) => {
                            const isActive = activeSection === link.href;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="py-2.5 px-2 rounded-xl"
                                    style={{
                                        fontFamily: "Plus Jakarta Sans, sans-serif",
                                        fontWeight: 500,
                                        color: isActive ? "#FFFFFF" : "#8FA898",
                                        background: isActive ? "rgba(110,200,74,0.08)" : "transparent",
                                        transform: mobileOpen ? "translateY(0px)" : "translateY(-10px)",
                                        opacity: mobileOpen ? 1 : 0,
                                        transition: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.08 + i * 0.06}s, opacity 0.35s ease ${0.08 + i * 0.06}s`,
                                    }}
                                    onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href); setMobileOpen(false); }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#8FA898"; }}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                        <div
                            className="flex gap-2 mt-3 pb-1"
                            style={{
                                transform: mobileOpen ? "translateY(0px)" : "translateY(-10px)",
                                opacity: mobileOpen ? 1 : 0,
                                transition: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.08 + NAV_LINKS.length * 0.06}s, opacity 0.35s ease ${0.08 + NAV_LINKS.length * 0.06}s`,
                            }}
                        >
                            <Link
                                href="/login"
                                className="flex-1 px-4 py-3 rounded-full text-center"
                                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, color: "#8FA898", border: `1px solid ${theme.navBorder}`, transition: TRANSITION }}
                                onClick={() => setMobileOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="flex-1 px-4 py-3 rounded-full text-white text-center"
                                style={{ background: theme.primaryGrad, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, transition: TRANSITION }}
                                onClick={() => setMobileOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

