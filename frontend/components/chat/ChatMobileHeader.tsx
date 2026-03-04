/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import Image from "next/image";
import { Menu, User } from "lucide-react";
import type { ChatTheme } from "@/lib/chat-themes";

interface Props {
  theme: ChatTheme;
  onMenuOpen: () => void;
}

export default function ChatMobileHeader({ theme, onMenuOpen }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        background: theme.sidebarBg,
        borderBottom: `1px solid ${theme.bottomBorderColor}20`,
        flexShrink: 0,
      }}
    >
      {/* Hamburger */}
      <button
        onClick={onMenuOpen}
        aria-label="Open menu"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#FFFFFF",
          borderRadius: 8,
        }}
      >
        <Menu size={22} />
      </button>

      {/* Logo */}
      <Image
        src="/logo.svg"
        alt="AgroMind"
        width={70}
        height={22}
        priority
        style={{ scale: "1.8", transformOrigin: "center" }}
      />

      {/* User avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${theme.titleAccent}40`,
        }}
      >
        <User size={18} color="#FFFFFF" />
      </div>
    </div>
  );
}
