/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import type { ReactNode } from "react";

interface AuthSubmitButtonProps {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit";
}

/** Full-width green gradient submit button with animated arrow icon */
export function AuthSubmitButton({
    label,
    icon,
    onClick,
    disabled = false,
    loading = false,
    type = "button",
}: AuthSubmitButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-2.5 group transition-opacity duration-200"
            style={{
                height: "56px",
                borderRadius: "12px",
                background: disabled
                    ? "rgba(58,140,47,0.35)"
                    : "#3E9B32",
                boxShadow: "none",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#FFFFFF",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
            }}
        >
            <span>{label}</span>
            {icon && (
                <span
                    className="flex items-center transition-transform duration-300"
                    style={{
                        transform: loading ? "translateX(6px)" : "translateX(0)",
                    }}
                >
                    {icon}
                </span>
            )}
        </button>
    );
}

/** Small footer link row below the card */
export function AuthFooterLink({
    prompt,
    label,
    href,
}: {
    prompt: string;
    label: string;
    href: string;
}) {
    return (
        <p
            className="text-center mt-5"
            style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.38)",
            }}
        >
            {prompt}{" "}
            <a href={href} style={{ color: "#6EC84A", fontWeight: 500 }}>
                {label}
            </a>
        </p>
    );
}

/** Custom styled checkbox */
export function AuthCheckbox({
    id,
    checked,
    onChange,
    children,
}: {
    id: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    children: React.ReactNode;
}) {
    return (
        <label
            htmlFor={id}
            className="flex items-start gap-2.5 cursor-pointer select-none"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", lineHeight: "16px", color: "#8FA898" }}
        >
            {/* Hidden native input */}
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only"
            />
            {/* Custom visual box */}
            <span
                aria-hidden="true"
                style={{
                    flexShrink: 0,
                    marginTop: "1px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "4px",
                    border: checked ? "1.5px solid #6EC84A" : "1.5px solid rgba(255,255,255,0.18)",
                    background: checked ? "rgba(110,200,74,0.15)" : "#0D2B1A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.15s, background 0.15s",
                }}
            >
                {checked && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="#6EC84A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
            <span style={{ lineHeight: 1.5 }}>{children}</span>
        </label>
    );
}
