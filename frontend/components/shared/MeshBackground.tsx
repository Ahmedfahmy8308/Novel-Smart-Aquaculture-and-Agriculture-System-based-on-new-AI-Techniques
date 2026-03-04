/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
/** Shared mesh gradient background used on auth + onboarding pages */
export function MeshBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden" style={{ background: "#F5F9F0" }}>
            {/* Corner radial gradients */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse 55% 55% at 0% 0%,   rgba(58,140,47,0.25)   0%, transparent 60%),
            radial-gradient(ellipse 55% 55% at 100% 0%,  rgba(227,242,246,0.60) 0%, transparent 60%),
            radial-gradient(ellipse 45% 50% at 0% 100%,  rgba(143,102,74,0.20)  0%, transparent 55%),
            radial-gradient(ellipse 55% 55% at 100% 100%,rgba(255,225,201,0.55) 0%, transparent 60%)
          `,
                }}
            />
            {/* Floating orbs */}
            <div
                className="absolute -top-32 -left-32 rounded-full pointer-events-none"
                style={{ width: 500, height: 500, background: "rgba(58,140,47,0.15)", filter: "blur(120px)" }}
            />
            <div
                className="absolute -bottom-24 -right-24 rounded-full pointer-events-none"
                style={{ width: 420, height: 420, background: "rgba(255,225,201,0.40)", filter: "blur(100px)" }}
            />
            <div
                className="absolute -top-20 -right-20 rounded-full pointer-events-none"
                style={{ width: 300, height: 300, background: "rgba(227,242,246,0.35)", filter: "blur(90px)" }}
            />
            {/* Decorative SVG icons */}
            <div className="absolute top-12 left-12 pointer-events-none select-none" style={{ opacity: 0.06, transform: "rotate(-15deg)" }}>
                <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
                    <line x1="50" y1="120" x2="50" y2="10" stroke="#3A8C2F" strokeWidth="3" strokeLinecap="round" />
                    {[20, 35, 50, 65, 80].map((y, i) => (
                        <ellipse key={i} cx={i % 2 === 0 ? 38 : 62} cy={y} rx="10" ry="6" fill="#3A8C2F" transform={`rotate(${i % 2 === 0 ? -20 : 20} ${i % 2 === 0 ? 38 : 62} ${y})`} />
                    ))}
                </svg>
            </div>
            <div className="absolute top-16 right-16 pointer-events-none select-none" style={{ opacity: 0.07, transform: "rotate(12deg)" }}>
                <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                    <path d="M40 5 C40 5 10 40 10 60 C10 78.5 23.5 92 40 92 C56.5 92 70 78.5 70 60 C70 40 40 5 40 5Z" fill="#E3F2F6" />
                </svg>
            </div>
            <div className="absolute bottom-16 right-20 pointer-events-none select-none" style={{ opacity: 0.07, transform: "rotate(-8deg)" }}>
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                    <circle cx="45" cy="45" r="20" fill="#FFE1C9" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                        <line key={i} x1="45" y1="45" x2={45 + 38 * Math.cos((deg * Math.PI) / 180)} y2={45 + 38 * Math.sin((deg * Math.PI) / 180)} stroke="#FFE1C9" strokeWidth="3.5" strokeLinecap="round" />
                    ))}
                </svg>
            </div>
            <div className="absolute bottom-20 left-16 pointer-events-none select-none" style={{ opacity: 0.06, transform: "rotate(10deg)" }}>
                <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
                    <line x1="35" y1="90" x2="35" y2="30" stroke="#8F664A" strokeWidth="4" strokeLinecap="round" />
                    <path d="M35 55 C20 45 8 28 18 12 C28 20 38 38 35 55Z" fill="#8F664A" />
                    <path d="M35 45 C50 35 62 18 52 5 C42 12 32 30 35 45Z" fill="#8F664A" />
                </svg>
            </div>
            {/* Noise texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px 200px",
                }}
            />
        </div>
    );
}
