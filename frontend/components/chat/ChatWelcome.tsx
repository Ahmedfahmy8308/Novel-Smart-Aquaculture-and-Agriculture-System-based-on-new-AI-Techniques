/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { Tractor, Waves, Cloud, Sun, Leaf, Fish, Zap, Droplets } from "lucide-react";
import type { ChatTheme, ChatThemeId } from "@/lib/chat-themes";

interface Props {
  theme: ChatTheme;
}

/* ── Theme-specific decorative corner icons ── */
function DecorIcons({ id, color }: { id: ChatThemeId; color: string }) {
  const base: React.CSSProperties = {
    position: "absolute",
    opacity: 0.05,
    pointerEvents: "none",
    color,
  };

  const maps: Record<ChatThemeId, React.ReactNode> = {
    agriculture: (
      <>
        <Tractor size={108} style={{ ...base, top: 64, left: 54 }} />
        <Cloud size={88} style={{ ...base, top: 48, right: 48 }} />
        <Leaf size={53} style={{ ...base, bottom: 128, left: 64 }} />
        <Tractor size={85} style={{ ...base, bottom: 128, right: 64 }} />
      </>
    ),
    aquaculture: (
      <>
        <Fish size={110} style={{ ...base, top: 90, left: 85 }} />
        <Waves size={107} style={{ ...base, top: 160, right: 160 }} />
        <Fish size={83} style={{ ...base, bottom: 160, left: 240 }} />
        <Waves size={81} style={{ ...base, bottom: 80, right: 80 }} />
      </>
    ),
    weather: (
      <>
        <Cloud size={158} style={{ ...base, top: 74, left: 51 }} />
        <Sun size={161} style={{ ...base, top: 40, right: 40 }} />
        <Droplets size={113} style={{ ...base, bottom: 160, left: 80 }} />
        <Cloud size={127} style={{ ...base, bottom: 128, right: 48 }} />
      </>
    ),
    energy: (
      <>
        <Sun size={110} style={{ ...base, top: 70, left: 82 }} />
        <Zap size={90} style={{ ...base, top: 160, right: 160 }} />
        <Zap size={70} style={{ ...base, bottom: 160, left: 240 }} />
        <Sun size={50} style={{ ...base, bottom: 80, right: 80 }} />
      </>
    ),
  };

  return <>{maps[id]}</>;
}

export default function ChatWelcome({ theme }: Props) {
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      {/* Decorative corner icons — hidden on mobile */}
      <div className="chat-decor-icons">
        <DecorIcons id={theme.id} color={theme.decorColor} />
      </div>

      {/* Center text */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: "0 20px",
          maxWidth: 560,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 4vw, 36px)",
            lineHeight: 1.15,
            color: "#FFFFFF",
          }}
        >
          {`I'm your `}
          <span style={{ color: theme.titleAccent }}>{theme.aiLabel.replace("I'm your ", "")}</span>
        </h1>

        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 1.5vw, 18px)",
            lineHeight: "1.65",
            color: theme.subtitleColor,
            maxWidth: 496,
          }}
        >
          {theme.welcomeSubtitle}
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .chat-decor-icons {
            display: none;
          }
        }
        @media (min-width: 768px) {
          .chat-decor-icons {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}
