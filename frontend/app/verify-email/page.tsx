/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, RefreshCw } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { AuthCard, AuthCardHeader } from "@/components/auth/AuthCard";
import { OTPBoxes } from "@/components/auth/OTPBoxes";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import { validateOTP } from "@/lib/auth-validation";

const RESEND_COOLDOWN = 60;

function VerifyEmailContent() {
    const router = useRouter();
    const params = useSearchParams();
    const mode = params.get("mode"); // "reset" | null (registration)

    const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
    const [touched, setTouched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [email] = useState(() => {
        if (typeof window === "undefined") return "your email";
        return (
            (mode === "reset"
                ? sessionStorage.getItem("agromind_reset_email")
                : sessionStorage.getItem("agromind_email")) ?? "your email"
        );
    });

    // Countdown timer for resend
    useEffect(() => {
        if (cooldown <= 0) return;
        const id = setInterval(() => setCooldown((c) => c - 1), 1000);
        return () => clearInterval(id);
    }, [cooldown]);

    const otpError = touched ? validateOTP(digits).error : undefined;
    const isComplete = digits.every((d) => d !== "");

    const handleVerify = () => {
        setTouched(true);
        const result = validateOTP(digits);
        if (!result.valid) return;
        setLoading(true);
        setTimeout(() => {
            if (mode === "reset") {
                router.push("/reset-password");
            } else {
                router.push("/onboarding");
            }
        }, 900);
    };

    const handleResend = () => {
        if (cooldown > 0) return;
        setDigits(Array(6).fill(""));
        setTouched(false);
        setCooldown(RESEND_COOLDOWN);
    };

    return (
        <AuthPageLayout>
            <AuthCard>
                <AuthCardHeader
                    title="Verify Your Email"
                    subtitle={`Enter the 6-digit code sent to ${email}`}
                />

                <div className="space-y-6">
                    <OTPBoxes
                        digits={digits}
                        onChange={setDigits}
                        error={otpError}
                    />

                    <AuthSubmitButton
                        label="Verify Code"
                        icon={<CheckCircle size={16} />}
                        onClick={handleVerify}
                        loading={loading}
                        disabled={!isComplete}
                    />
                </div>
            </AuthCard>

            {/* Resend */}
            <div className="mt-5 text-center" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.38)" }}>
                <span>Didn&apos;t receive the code?</span>
                <br />
                <button
                    onClick={handleResend}
                    disabled={cooldown > 0}
                    className="flex items-center gap-1.5 mx-auto mt-1.5 transition-opacity"
                    style={{
                        color: cooldown > 0 ? "rgba(255,255,255,0.25)" : "#6EC84A",
                        fontWeight: 500,
                        cursor: cooldown > 0 ? "not-allowed" : "pointer",
                    }}
                >
                    <span>Resend{cooldown > 0 ? ` (${cooldown}s)` : ""}</span>
                    <RefreshCw
                        size={13}
                        style={{
                            animation: cooldown > 0 ? "spin 1s linear infinite" : "none",
                        }}
                    />
                </button>
            </div>
        </AuthPageLayout>
    );
}

import { Suspense } from "react";

export default function VerifyEmailPage() {
    return (
        <Suspense>
            <VerifyEmailContent />
        </Suspense>
    );
}
