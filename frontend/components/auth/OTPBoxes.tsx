/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useRef } from "react";

interface OTPBoxesProps {
    digits: string[];
    onChange: (digits: string[]) => void;
    error?: string;
}

/** 6-box OTP input with auto-advance and backspace support */
export function OTPBoxes({ digits, onChange, error }: OTPBoxesProps) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, raw: string) => {
        const val = raw.replace(/\D/g, "").slice(-1);
        const next = [...digits];
        next[index] = val;
        onChange(next);
        if (val && index < 5) refs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (digits[index]) {
                const next = [...digits];
                next[index] = "";
                onChange(next);
            } else if (index > 0) {
                refs.current[index - 1]?.focus();
            }
        }
        if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
        if (e.key === "ArrowRight" && index < 5) refs.current[index + 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = Array(6).fill("");
        pasted.split("").forEach((c, i) => { next[i] = c; });
        onChange(next);
        const focusIndex = Math.min(pasted.length, 5);
        refs.current[focusIndex]?.focus();
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2 justify-between">
                {digits.map((d, i) => (
                    <input
                        key={i}
                        ref={(el) => { refs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        className="outline-none text-center transition-all duration-200"
                        style={{
                            width: "clamp(38px, 12vw, 50px)",
                            height: "clamp(44px, 12vw, 56px)",
                            borderRadius: "12px",
                            background: d ? "rgba(110,200,74,0.08)" : "#0D2B1A",
                            border: error
                                ? "1px solid rgba(248,113,113,0.7)"
                                : d
                                ? "1px solid rgba(110,200,74,0.55)"
                                : "1px solid rgba(255,255,255,0.1)",
                            fontFamily: "DM Sans, sans-serif",
                            fontWeight: 700,
                            fontSize: "22px",
                            color: "#FFFFFF",
                            caretColor: "#6EC84A",
                        }}
                        onFocus={(e) =>
                            ((e.currentTarget as HTMLElement).style.border =
                                "1px solid rgba(110,200,74,0.7)")
                        }
                        onBlur={(e) => {
                            const val = (e.currentTarget as HTMLInputElement).value;
                            (e.currentTarget as HTMLElement).style.border = val
                                ? "1px solid rgba(110,200,74,0.55)"
                                : "1px solid rgba(255,255,255,0.1)";
                        }}
                    />
                ))}
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
