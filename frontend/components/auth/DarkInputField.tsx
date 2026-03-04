/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import type { ElementType, ReactNode } from "react";

interface DarkInputFieldProps {
    id?: string;
    label: string;
    icon: ElementType;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    onBlur?: () => void;
    error?: string;
    rightEl?: ReactNode;
}

/** Dark-themed input field with label, left icon, optional right element, and inline error */
export function DarkInputField({
    id,
    label,
    icon: Icon,
    placeholder,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    rightEl,
}: DarkInputFieldProps) {
    const [focused, setFocused] = useState(false);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
                htmlFor={id}
                style={{
                    display: "block",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "rgba(255,255,255,0.9)",
                }}
            >
                {label}
            </label>
            <div className="relative">
                {/* Left icon */}
                <div
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: error ? "#F87171" : focused ? "#6EC84A" : "#8FA898" }}
                >
                    <Icon size={16} />
                </div>
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                        setFocused(false);
                        onBlur?.();
                    }}
                    autoComplete="new-password"
                    data-form-type="other"
                    data-lpignore="true"
                    className="w-full outline-none transition-all duration-200"
                    style={{
                        height: "50px",
                        paddingLeft: "44px",
                        paddingRight: rightEl ? "48px" : "16px",
                        background: "#0D2B1A",
                    outline: "none",
                    border: error
                            ? "1px solid rgba(248,113,113,0.7)"
                            : focused
                            ? "1px solid rgba(110,200,74,0.55)"
                            : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        boxShadow: "none",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                        caretColor: "#6EC84A",
                        touchAction: "manipulation",
                    }}
                />
                {rightEl && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer">
                        {rightEl}
                    </div>
                )}
            </div>
            {error && (
                <p
                    style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "12px",
                        color: "#F87171",
                    }}
                >
                    {error}
                </p>
            )}
        </div>
    );
}
