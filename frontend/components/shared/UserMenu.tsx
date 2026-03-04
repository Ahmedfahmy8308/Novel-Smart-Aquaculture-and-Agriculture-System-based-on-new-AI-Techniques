/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Settings, LayoutDashboard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserMenuProps {
    name: string;
}

export function UserMenu({ name }: UserMenuProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const items = [
        { icon: User, label: "My Profile" },
        { icon: Settings, label: "Settings" },
        { icon: LayoutDashboard, label: "Switch Module" },
    ];

    return (
        <div ref={ref} className="relative">
            <button
                id="user-menu-toggle"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-2xl transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(143,102,74,0.15)", backdropFilter: "blur(10px)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(58,140,47,0.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(143,102,74,0.15)"; }}
            >
                <div className="flex items-center justify-center rounded-full" style={{ width: "34px", height: "34px", background: "linear-gradient(135deg,#3A8C2F,#5AB347)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "13px", color: "#FFFFFF", flexShrink: 0 }}>
                    {initials}
                </div>
                <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "14px", color: "#1C2B1A" }}>{name}</span>
                <ChevronDown size={15} style={{ color: "#7A8C78", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-52 overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,0.9)", borderRadius: "16px", boxShadow: "0 12px 40px rgba(0,0,0,0.12)", zIndex: 100 }}
                    >
                        <div className="p-1.5">
                            {items.map(({ icon: Icon, label }) => (
                                <button
                                    key={label}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 text-left"
                                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "14px", color: "#1C2B1A" }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(58,140,47,0.07)")}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                                    onClick={() => setOpen(false)}
                                >
                                    <Icon size={15} style={{ color: "#7A8C78" }} />
                                    {label}
                                </button>
                            ))}
                            <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "4px 8px" }} />
                            <button
                                id="user-menu-signout"
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 text-left"
                                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "14px", color: "#C0392B" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(192,57,43,0.07)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                                onClick={() => { setOpen(false); router.push("/login"); }}
                            >
                                <LogOut size={15} />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

