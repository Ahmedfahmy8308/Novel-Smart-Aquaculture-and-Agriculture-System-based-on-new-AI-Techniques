/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { InputField, SocialDivider, SocialButtons, SubmitButton } from "@/components/shared/AuthFormElements";
import { ROLES } from "@/lib/constants";

export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);

    const handleSignIn = () => {
        sessionStorage.setItem("agromind_name", "Mohamed Samy");
        router.push("/onboarding");
    };

    return (
        <div className="space-y-4">
            <InputField id="login-email" icon={Mail} placeholder="your@email.com" type="email" value={email} onChange={setEmail} />
            <div className="space-y-1">
                <InputField
                    id="login-password"
                    icon={Lock}
                    placeholder="••••••••"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={setPassword}
                    rightEl={
                        <button type="button" onClick={() => setShowPw(!showPw)} style={{ color: "#7A8C78" }}>
                            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    }
                />
                <div className="flex justify-end">
                    <button type="button" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: "#3A8C2F" }}>Forgot password?</button>
                </div>
            </div>
            <SubmitButton onClick={handleSignIn} label="Sign In" />
            <SocialDivider />
            <SocialButtons onSocial={handleSignIn} />
            <p className="text-center pt-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: "#7A8C78" }}>
                Don&apos;t have an account?{" "}
                <button type="button" onClick={onSwitch} style={{ color: "#3A8C2F", fontWeight: 500 }}>Sign up →</button>
            </p>
        </div>
    );
}

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    const handleCreate = () => {
        const name = [firstName, lastName].filter(Boolean).join(" ") || "New User";
        sessionStorage.setItem("agromind_name", name);
        router.push("/onboarding");
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <InputField id="register-firstname" icon={User} placeholder="First name" value={firstName} onChange={setFirstName} />
                <InputField id="register-lastname" icon={User} placeholder="Last name" value={lastName} onChange={setLastName} />
            </div>
            <InputField id="register-email" icon={Mail} placeholder="your@email.com" type="email" value={email} onChange={setEmail} />
            <InputField
                id="register-password"
                icon={Lock}
                placeholder="Create password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={setPassword}
                rightEl={
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ color: "#7A8C78" }}>
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                }
            />
            <div>
                <p className="mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, fontSize: "13px", color: "#1C2B1A" }}>I am a…</p>
                <div className="grid grid-cols-2 gap-2.5">
                    {ROLES.map((r) => {
                        const selected = role === r.id;
                        const Icon = r.icon;
                        return (
                            <button
                                key={r.id}
                                id={`role-${r.id}`}
                                type="button"
                                onClick={() => setRole(r.id)}
                                className="flex items-center gap-2.5 p-3 rounded-xl text-left transition-all duration-200"
                                style={{ background: selected ? "rgba(58,140,47,0.08)" : "rgba(255,255,255,0.6)", border: selected ? "1.5px solid #3A8C2F" : "1.5px solid rgba(143,102,74,0.15)", boxShadow: selected ? "0 2px 8px rgba(58,140,47,0.15)" : "none" }}
                            >
                                <Icon size={18} style={{ color: selected ? r.color : "#7A8C78", flexShrink: 0 }} />
                                <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: selected ? 600 : 400, fontSize: "13px", color: selected ? "#3A8C2F" : "#7A8C78" }}>{r.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
            <SubmitButton onClick={handleCreate} label="Create Account" />
            <SocialDivider />
            <SocialButtons onSocial={handleCreate} />
            <p className="text-center pt-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: "#7A8C78" }}>
                Already have an account?{" "}
                <button type="button" onClick={onSwitch} style={{ color: "#3A8C2F", fontWeight: 500 }}>Sign in →</button>
            </p>
        </div>
    );
}

