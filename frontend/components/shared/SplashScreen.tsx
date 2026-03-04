/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ─── SVG Icons ─────────────────────────────────────────────── */
function TractorIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="21" r="4.5" stroke="#4ADE80" strokeWidth="1.6" fill="none" />
      <circle cx="9" cy="21" r="1.5" fill="#4ADE80" />
      <circle cx="21.5" cy="22" r="3" stroke="#4ADE80" strokeWidth="1.6" fill="none" />
      <circle cx="21.5" cy="22" r="1" fill="#4ADE80" />
      <path
        d="M13.5 21H18.5M9 21V16.5L13.5 14H21L23 17.5V19M4.5 21H5.5M13.5 14V10.5H18L20.5 14"
        stroke="#4ADE80"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.5 14L15 10H18.5L20.5 14H13.5Z" stroke="#4ADE80" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function TemperatureIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sun rays */}
      <circle cx="15" cy="13" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="rgba(251,191,36,0.15)" />
      <line x1="15" y1="5" x2="15" y2="7.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="18.5" x2="15" y2="21" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="13" x2="9.5" y2="13" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20.5" y1="13" x2="23" y2="13" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.22" y1="7.22" x2="11" y2="9" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="17" x2="20.78" y2="18.78" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20.78" y1="7.22" x2="19" y2="9" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="17" x2="9.22" y2="18.78" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      {/* Thermometer */}
      <rect x="18" y="17" width="5" height="10" rx="2.5" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
      <rect x="19.5" y="18" width="2" height="6" rx="1" fill="rgba(251,191,36,0.4)" />
      <circle cx="20.5" cy="24.5" r="1.5" fill="#F59E0B" opacity="0.8" />
    </svg>
  );
}

function WaterWavesIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 11C6 9 8 9 10 11C12 13 14 13 16 11C18 9 20 9 22 11C24 13 26 13 28 11"
        stroke="#2DD4BF"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 16C6 14 8 14 10 16C12 18 14 18 16 16C18 14 20 14 22 16C24 18 26 18 28 16"
        stroke="#2DD4BF"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 21C6 19 8 19 10 21C12 23 14 23 16 21C18 19 20 19 22 21C24 23 26 23 28 21"
        stroke="#2DD4BF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.6"
        fill="none"
      />
    </svg>
  );
}

function ThunderboltIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 4L7 17H14L13 26L23 13H16L17 4Z"
        stroke="#FB923C"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="rgba(251,146,60,0.15)"
      />
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
const ICONS = [
  { id: "tractor",  Icon: TractorIcon,     delay: 600  },
  { id: "temp",     Icon: TemperatureIcon, delay: 1000 },
  { id: "water",    Icon: WaterWavesIcon,  delay: 1400 },
  { id: "bolt",     Icon: ThunderboltIcon, delay: 1800 },
];

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [visibleIcons, setVisibleIcons] = useState<Set<string>>(new Set());
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    ICONS.forEach(({ id, delay }) => {
      timers.push(
        setTimeout(() => setVisibleIcons((prev) => new Set([...prev, id])), delay)
      );
    });

    // Start exit animation
    timers.push(setTimeout(() => setExiting(true), 2800));
    // Notify parent after fade-out
    timers.push(setTimeout(() => onFinish(), 3500));

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
      style={{
        background: "#0A1F12",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.7s ease-in-out",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* ── Background glow effects ── */}
      <div
        style={{
          position: "absolute",
          width: 384,
          height: 384,
          left: -158,
          top: -120,
          background: "rgba(58, 140, 47, 0.05)",
          filter: "blur(32px)",
          borderRadius: "9999px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 384,
          height: 384,
          right: -183,
          bottom: -210,
          background: "rgba(26, 191, 161, 0.05)",
          filter: "blur(32px)",
          borderRadius: "9999px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 601,
          height: 617,
          left: "calc(50% - 300px)",
          top: "calc(50% - 309px)",
          background:
            "radial-gradient(70.71% 70.71% at 50% 50%, rgba(58, 140, 47, 0.15) 0%, rgba(26, 191, 161, 0.1) 40%, rgba(26, 191, 161, 0) 70%)",
          filter: "blur(32px)",
          borderRadius: "9999px",
        }}
      />

      {/* ── Logo + subtitle ── */}
      <div className="relative z-10 flex flex-col items-center gap-0">
        {/* Logo */}
        <div
          style={{
            animation: "splashFadeUp 0.8s ease-out 0.1s both",
          }}
        >
          <Image
            src="/logo.svg"
            alt="AgroMind"
            width={140}
            height={36}
            priority
            style={{ width: 140, height: "auto", transform: "scale(1.7)", transformOrigin: "center" }}
          />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            color: "#8FA898",
            letterSpacing: "0.02em",
            marginTop: 4,
            animation: "splashFadeUp 0.8s ease-out 0.3s both",
          }}
        >
          Precision Farming Intelligence
        </p>

        {/* ── Icons row ── */}
        <div
          className="flex items-center gap-4.5 mt-13"
          style={{ minHeight: 40 }}
        >
          {ICONS.map(({ id, Icon }) => (
            <div
              key={id}
              style={{
                opacity: visibleIcons.has(id) ? 1 : 0,
                transform: visibleIcons.has(id) ? "scale(1) translateY(0)" : "scale(0.5) translateY(8px)",
                transition: "opacity 0.45s cubic-bezier(0.34,1.56,0.64,1), transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                filter: visibleIcons.has(id) ? "drop-shadow(0 0 8px rgba(74,222,128,0.4))" : "none",
              }}
            >
              <Icon />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
