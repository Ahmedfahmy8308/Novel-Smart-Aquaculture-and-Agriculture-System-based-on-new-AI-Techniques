/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { AuthCard, AuthCardHeader } from "@/components/auth/AuthCard";
import { DarkInputField } from "@/components/auth/DarkInputField";
import { AuthSubmitButton, AuthFooterLink } from "@/components/auth/AuthSubmitButton";
import { validatePassword } from "@/lib/auth-validation";

export default function ResetPasswordPage() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const [touchedPw, setTouchedPw] = useState(false);
    const [touchedConfirm, setTouchedConfirm] = useState(false);

    const pwValidation = validatePassword(password);
    const passwordError = touchedPw ? pwValidation.error : undefined;
    const confirmError =
        touchedConfirm && confirm !== password ? "Passwords do not match" : undefined;

    const isValid = pwValidation.valid && password === confirm;

    const handleReset = () => {
        setTouchedPw(true);
        setTouchedConfirm(true);
        if (!isValid) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDone(true);
            setTimeout(() => router.push("/login"), 1200);
        }, 900);
    };

    return (
        <AuthPageLayout>
            <AuthCard>
                <AuthCardHeader
                    title="Reset your password"
                    subtitle="Choose a strong new password for your account."
                />

                <div className="space-y-6">
                    {/* New Password */}
                    <DarkInputField
                        id="reset-password"
                        label="New Password"
                        icon={Lock}
                        placeholder="••••••••"
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={setPassword}
                        onBlur={() => setTouchedPw(true)}
                        error={passwordError}
                        rightEl={
                            <button
                                type="button"
                                onClick={() => setShowPw((p) => !p)}
                                aria-label={showPw ? "Hide password" : "Show password"}
                                style={{ color: "rgba(255,255,255,0.40)" }}
                            >
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        }
                    />

                    {/* Confirm Password */}
                    <DarkInputField
                        id="reset-confirm"
                        label="Confirm Password"
                        icon={Lock}
                        placeholder="••••••••"
                        type={showConfirm ? "text" : "password"}
                        value={confirm}
                        onChange={setConfirm}
                        onBlur={() => setTouchedConfirm(true)}
                        error={confirmError}
                        rightEl={
                            <button
                                type="button"
                                onClick={() => setShowConfirm((p) => !p)}
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                                style={{ color: "rgba(255,255,255,0.40)" }}
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        }
                    />

                    {done && (
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
                            Password updated! Redirecting to login…
                        </p>
                    )}

                    <AuthSubmitButton
                        label="Update Password"
                        icon={<ShieldCheck size={16} />}
                        onClick={handleReset}
                        loading={loading}
                        disabled={done}
                    />
                </div>
            </AuthCard>

            <AuthFooterLink prompt="Remembered your password?" label="Login" href="/login" />
        </AuthPageLayout>
    );
}
