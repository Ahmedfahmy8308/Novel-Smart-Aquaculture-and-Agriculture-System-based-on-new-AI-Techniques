/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
/** Dark card used on all auth pages — matches the Figma gradient card */
export function AuthCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`w-full ${className}`}
            style={{
                maxWidth: "min(460px, 100%)",
                background: "linear-gradient(143.46deg, #0D2B1A 0%, #123524 100%)",
                border: "1px solid rgba(232,240,233,0.15)",
                borderRadius: "clamp(16px, 3vw, 24px)",
                padding: "clamp(20px, 6vw, 40px) clamp(16px, 6vw, 40px) clamp(20px, 4vw, 32px)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "inset 0px 1px 1px 1px rgba(244,251,240,0.03)",
            }}
        >
            {children}
        </div>
    );
}

/** Title + subtitle block at the top of each auth card */
export function AuthCardHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div style={{ marginBottom: "32px" }}>
            <h1
                style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(20px, 5vw, 30px)",
                    lineHeight: "1.2",
                    color: "#FFFFFF",
                    marginBottom: "8px",
                }}
            >
                {title}
            </h1>
            <p
                style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(13px, 3vw, 16px)",
                    lineHeight: "24px",
                    color: "#8FA898",
                }}
            >
                {subtitle}
            </p>
        </div>
    );
}
