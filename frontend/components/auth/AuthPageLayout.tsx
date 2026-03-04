/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
import Link from "next/link";
import Image from "next/image";

/** Dark full-screen layout wrapper used on all auth pages */
export function AuthPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="auth-dark h-screen overflow-y-auto flex flex-col items-center justify-center px-4 py-6 sm:py-10 relative"
            style={{
                background: "#0A1F12",
                fontFamily: "DM Sans, sans-serif",
            }}
        >
            {/* Glow behind the card */}
            <div
                aria-hidden="true"
                className="auth-glow-animate"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "900px",
                    height: "700px",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, rgba(28,90,42,0.75) 0%, transparent 68%)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Logo */}
            <Link href="/" className="auth-logo-animate flex flex-col items-center mb-4 select-none relative z-10">
                <div style={{ transform: "scale(1.5)", transformOrigin: "center center" }}>
                    <Image src="/logo.svg" alt="AgroMind" width={148} height={32} priority />
                </div>
                <p
                    style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.38)",
                        marginTop: "14px",
                        letterSpacing: "0.3px",
                    }}
                >
                    Precision Farming Intelligence
                </p>
            </Link>

            <div className="auth-card-animate relative z-10 w-full flex flex-col items-center">
                {children}
            </div>
        </div>
    );
}
