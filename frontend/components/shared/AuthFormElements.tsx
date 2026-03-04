/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import type { ElementType, ReactNode } from "react";
import type { InputFieldProps } from "@/types";

export function InputField({ icon: Icon, placeholder, type = "text", value, onChange, rightEl, id }: InputFieldProps & { id?: string }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused ? "#3A8C2F" : "#7A8C78" }}>
                <Icon size={16} />
            </div>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full outline-none transition-all duration-200"
                style={{
                    height: "48px",
                    paddingLeft: "42px",
                    paddingRight: rightEl ? "44px" : "14px",
                    border: focused ? "1.5px solid #3A8C2F" : "1.5px solid rgba(143,102,74,0.18)",
                    borderRadius: "12px",
                    background: focused ? "#FFFFFF" : "rgba(255,255,255,0.8)",
                    boxShadow: focused ? "0 0 0 3px rgba(58,140,47,0.10)" : "none",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#1C2B1A",
                    touchAction: "manipulation",
                }}
            />
            {rightEl && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer">{rightEl}</div>
            )}
        </div>
    );
}

export function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
        </svg>
    );
}

export function FacebookIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect width="18" height="18" rx="4" fill="#1877F2" />
            <path d="M12.5 9H10.5V16H7.5V9H6V6.5H7.5V5C7.5 3.34 8.34 2 10.5 2H12.5V4.5H11.25C10.7 4.5 10.5 4.7 10.5 5.25V6.5H12.5L12.5 9Z" fill="white" />
        </svg>
    );
}

export function SocialDivider() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(143,102,74,0.15)" }} />
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "12px", color: "#7A8C78", whiteSpace: "nowrap" }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: "rgba(143,102,74,0.15)" }} />
        </div>
    );
}

export function SocialButtons({ onSocial }: { onSocial: () => void }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {([{ icon: <GoogleIcon />, label: "Google" }, { icon: <FacebookIcon />, label: "Facebook" }] as const).map((s) => (
                <button
                    key={s.label}
                    onClick={onSocial}
                    className="flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-px"
                    style={{ height: "46px", borderRadius: "12px", background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(143,102,74,0.18)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "14px", color: "#1C2B1A" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(143,102,74,0.35)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.8)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(143,102,74,0.18)"; }}
                >
                    {s.icon}
                    {s.label}
                </button>
            ))}
        </div>
    );
}

export function SubmitButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className="w-full transition-all duration-200 hover:-translate-y-px"
            style={{ height: "50px", borderRadius: "14px", background: "linear-gradient(135deg,#3A8C2F,#5AB347)", boxShadow: "0 6px 20px rgba(58,140,47,0.35)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "15px", color: "#FFFFFF" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(58,140,47,0.45)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(58,140,47,0.35)"; }}
        >
            {label}
        </button>
    );
}

