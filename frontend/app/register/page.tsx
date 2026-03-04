/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { AuthCard, AuthCardHeader } from "@/components/auth/AuthCard";
import { DarkInputField } from "@/components/auth/DarkInputField";
import { AuthSubmitButton, AuthFooterLink, AuthCheckbox } from "@/components/auth/AuthSubmitButton";
import { validateEmail, validatePassword, validateFullName } from "@/lib/auth-validation";

export default function RegisterPage() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const [touchedName, setTouchedName] = useState(false);
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [touchedTerms, setTouchedTerms] = useState(false);

    const nameError = touchedName ? validateFullName(fullName).error : undefined;
    const emailError = touchedEmail ? validateEmail(email).error : undefined;
    const passwordError = touchedPassword ? validatePassword(password).error : undefined;
    const termsError = touchedTerms && !agreed ? "You must agree to continue" : undefined;

    const isValid =
        validateFullName(fullName).valid &&
        validateEmail(email).valid &&
        validatePassword(password).valid &&
        agreed;

    const handleCreate = () => {
        setTouchedName(true);
        setTouchedEmail(true);
        setTouchedPassword(true);
        setTouchedTerms(true);
        if (!isValid) return;
        setLoading(true);
        setTimeout(() => {
            sessionStorage.setItem("agromind_name", fullName.trim());
            router.push("/verify-email");
        }, 900);
    };

    return (
        <AuthPageLayout>
            <AuthCard>
                <AuthCardHeader
                    title="Create Your Account"
                    subtitle="Join the future of AI-driven agriculture"
                />

                <div className="space-y-6">
                    {/* Full Name */}
                    <DarkInputField
                        id="register-name"
                        label="Full Name"
                        icon={User}
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={setFullName}
                        onBlur={() => setTouchedName(true)}
                        error={nameError}
                    />

                    {/* Email */}
                    <DarkInputField
                        id="register-email"
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
                        id="register-password"
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

                    {/* Terms */}
                    <div>
                        <AuthCheckbox id="agree-terms" checked={agreed} onChange={(v) => { setAgreed(v); setTouchedTerms(true); }}>
                            I agree to the{" "}
                            <a href="#" style={{ color: "#6EC84A" }}>Terms of Service</a>
                            {" "}and{" "}
                            <a href="#" style={{ color: "#6EC84A" }}>Privacy Policy</a>.
                        </AuthCheckbox>
                        {termsError && (
                            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "12px", color: "#F87171", marginTop: "4px" }}>
                                {termsError}
                            </p>
                        )}
                    </div>

                    <AuthSubmitButton
                        label="Create Account"
                        icon={<ArrowRight size={16} />}
                        onClick={handleCreate}
                        loading={loading}
                    />
                </div>
            </AuthCard>

            <AuthFooterLink prompt="Already have an account?" label="Login" href="/login" />
        </AuthPageLayout>
    );
}
