/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Send } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { AuthCard, AuthCardHeader } from "@/components/auth/AuthCard";
import { DarkInputField } from "@/components/auth/DarkInputField";
import { AuthSubmitButton, AuthFooterLink } from "@/components/auth/AuthSubmitButton";
import { validateEmail } from "@/lib/auth-validation";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [touched, setTouched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const validation = validateEmail(email);
    const emailError = touched && !validation.valid ? validation.error : undefined;

    const handleSend = () => {
        setTouched(true);
        if (!validation.valid) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSent(true);
            sessionStorage.setItem("agromind_reset_email", email);
            setTimeout(() => router.push("/verify-email?mode=reset"), 1200);
        }, 900);
    };

    return (
        <AuthPageLayout>
            <AuthCard>
                <AuthCardHeader
                    title="Forgot your password?"
                    subtitle="Enter your email to receive a verification code."
                />

                <div className="space-y-6">
                    <DarkInputField
                        id="forgot-email"
                        label="Email Address"
                        icon={Mail}
                        placeholder="farmer@agromind.ai"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        onBlur={() => setTouched(true)}
                        error={emailError}
                    />

                    {sent && (
                        <p
                            style={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                                fontSize: "13px",
                                color: "#6EC84A",
                                background: "rgba(110,200,74,0.08)",
                                border: "1px solid rgba(110,200,74,0.25)",
                                borderRadius: "10px",
                                padding: "10px 14px",
                            }}
                        >
                            Verification code sent! Redirecting…
                        </p>
                    )}

                    <AuthSubmitButton
                        label="Send Verification Code"
                        icon={<Send size={15} />}
                        onClick={handleSend}
                        loading={loading}
                        disabled={sent}
                    />
                </div>
            </AuthCard>

            <AuthFooterLink prompt="Remembered your password?" label="Login" href="/login" />
        </AuthPageLayout>
    );
}
