/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
            style={{ background: "linear-gradient(135deg,#0D2B1A,#0A1F12)" }}
        >
            <Link href="/" className="flex flex-col items-center mb-8 select-none">
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

            <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600, fontSize: "clamp(80px, 15vw, 140px)", color: "#6EC84A", lineHeight: 1, letterSpacing: "-0.04em" }}>
                404
            </div>

            <h1 className="mt-4 mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fontSize: "clamp(24px, 4vw, 36px)", color: "#FFFFFF" }}>
                Page Not Found
            </h1>
            <p className="mb-10 max-w-md" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", color: "#8FA898", lineHeight: 1.6 }}>
                Looks like this field hasn&apos;t been cultivated yet. Let&apos;s get you back to familiar ground.
            </p>

            <Link
                href="/"
                className="px-8 py-4 rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "16px", background: "linear-gradient(135deg,#3A8C2F,#6EC84A)", boxShadow: "0 4px 24px rgba(58,140,47,0.4)" }}
            >
                Back to Home
            </Link>
        </div>
    );
}
