/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { AuthCard, AuthCardHeader } from "@/components/auth/AuthCard";
import { DarkInputField } from "@/components/auth/DarkInputField";
import { AuthSubmitButton, AuthFooterLink, AuthCheckbox } from "@/components/auth/AuthSubmitButton";
import { validateEmail } from "@/lib/auth-validation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);

    const emailError = touchedEmail && !validateEmail(email).valid ? validateEmail(email).error : undefined;
    const passwordError = touchedPassword && !password ? "Password is required" : undefined;

    const isValid = validateEmail(email).valid && password.length > 0;

    const handleSignIn = () => {
        setTouchedEmail(true);
        setTouchedPassword(true);
        if (!isValid) return;
        setLoading(true);
        setTimeout(() => {
            sessionStorage.setItem("agromind_name", "Mohamed Samy");
            router.push("/onboarding");
        }, 900);
    };

    return (
        <AuthPageLayout>
            <AuthCard>
                <AuthCardHeader
                    title="Welcome Back"
                    subtitle="Enter your credentials to access your account"
                />

                <div className="space-y-6">
                    {/* Email */}
                    <DarkInputField
                        id="login-email"
                        label="Email Address"
                        icon={Mail}
                        placeholder="farmer@agromind.ai"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        onBlur={() => setTouchedEmail(true)}
                        error={emailError}
                    />

                    {/* Password */}
                    <DarkInputField
                        id="login-password"
                        label="Password"
                        icon={Lock}
                        placeholder="••••••••"
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={setPassword}
                        onBlur={() => setTouchedPassword(true)}
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

                    {/* Remember me + Forgot password */}
                    <div className="flex items-center justify-between">
                        <AuthCheckbox id="remember-me" checked={rememberMe} onChange={setRememberMe}>
                            Remember me
                        </AuthCheckbox>
                        <a
                            href="/forgot-password"
                            style={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                                fontSize: "12.5px",
                                color: "#6EC84A",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                            }}
                        >
                            Forgot password?
                        </a>
                    </div>

                    <AuthSubmitButton
                        label="Sign In"
                        icon={<ArrowRight size={16} />}
                        onClick={handleSignIn}
                        loading={loading}
                        disabled={false}
                    />
                </div>
            </AuthCard>

            <AuthFooterLink prompt="Don't have an account?" label="Sign Up" href="/register" />
        </AuthPageLayout>
    );
}
