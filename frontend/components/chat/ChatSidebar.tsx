/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Plus,
  Search,
  Clock,
  MessageSquare,
  Home,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { ChatTheme } from "@/lib/chat-themes";

interface ChatSidebarProps {
  theme: ChatTheme;
  /** Desktop: whether sidebar is collapsed to icon-only rail */
  collapsed: boolean;
  onToggleCollapse: () => void;
  /** Mobile: controlled open/close */
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function ChatSidebar({
  theme,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}: ChatSidebarProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const sidebarWidth = collapsed ? 72 : 320;

  /* ── Inner content (shared between desktop & mobile) ── */
  const inner = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* ── Header: Logo + collapse button ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "20px 0" : "20px 24px",
          minHeight: 72,
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <Image
            src="/logo.svg"
            alt="AgroMind"
            width={70}
            height={22}
            priority
            style={{ scale: "2.1", transformOrigin: "left center" }}
          />
        )}

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="sidebar-collapse-btn sidebar-collapse-btn--desktop"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "rgba(255,255,255,0.08)",
            border: "none",
            cursor: "pointer",
            color: "#FFFFFF",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* ── New Chat Button ── */}
      <div style={{ padding: collapsed ? "0 12px 12px" : "0 24px 12px", flexShrink: 0 }}>
        <button
          onClick={() => router.refresh()}
          aria-label="New Chat"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "center",
            gap: 8,
            width: "100%",
            height: 42,
            background: theme.newChatGradient,
            border: "none",
            borderRadius: 9999,
            cursor: "pointer",
            color: "#FFFFFF",
          }}
        >
          <Plus size={14} strokeWidth={2.5} />
          {!collapsed && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              New Chat
            </span>
          )}
        </button>
      </div>

      {/* ── Search ── */}
      {!collapsed && (
        <div
          style={{
            padding: "0 24px 4px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: theme.searchIconColor,
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: 40,
                background: theme.searchBg,
                border: "none",
                borderRadius: 16,
                padding: "0 16px 0 38px",
                fontFamily: "'Inter', sans-serif",
                /* 16px minimum prevents iOS Safari auto-zoom */
                fontSize: 16,
                color: theme.searchTextColor,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Chat History ── */}
      <div
        style={{
          flex: 1,
          padding: collapsed ? "24px 0 0" : "28px 24px 0",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: collapsed ? 0 : 20,
        }}
      >
        {!collapsed && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Clock size={11} color={theme.historyIconColor} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                color: theme.historyTextColor,
              }}
            >
              Chat History
            </span>
          </div>
        )}

        {/* Empty state */}
        {!collapsed && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 0",
              gap: 12,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 24,
                background: theme.emptyIconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <MessageSquare size={24} color="#FFFFFF" />
            </div>

            {/* Title */}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: theme.emptyTitleColor,
                textAlign: "center",
              }}
            >
              No conversations yet
            </span>

            {/* Description */}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 12,
                lineHeight: "20px",
                color: theme.emptyDescColor,
                textAlign: "center",
                maxWidth: 200,
              }}
            >
              Start a new conversation and begin your agricultural journey with
              us
            </span>
          </div>
        )}

        {/* Collapsed: chat icon centered */}
        {collapsed && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <MessageSquare size={20} color={theme.historyIconColor} opacity={0.5} />
          </div>
        )}
      </div>

      {/* ── Bottom Actions ── */}
      <div
        style={{
          borderTop: `1px solid ${theme.bottomBorderColor}`,
          padding: collapsed ? "16px 12px" : "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* Home */}
        <button
          onClick={() => router.push("/")}
          aria-label="Home"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 12,
            width: "100%",
            height: 40,
            background: "transparent",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            color: "#FFFFFF",
            padding: collapsed ? 0 : "0 16px",
          }}
        >
          <Home size={14} />
          {!collapsed && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Home
            </span>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={() => router.push("/login")}
          aria-label="Logout"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 12,
            width: "100%",
            height: 42,
            background: "transparent",
            border: `1px solid ${theme.logoutBorderColor}`,
            borderRadius: 8,
            cursor: "pointer",
            color: "#FFFFFF",
            padding: collapsed ? 0 : "0 16px",
            boxSizing: "border-box",
          }}
        >
          <LogOut size={14} />
          {!collapsed && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ────────────────────────────── */}
      <aside
        className="chat-sidebar-desktop"
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          height: "100%",
          background: theme.sidebarBg,
          borderRight: `1px solid rgba(0,0,0,0.05)`,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s ease, min-width 0.25s ease",
          overflow: "hidden",
          boxSizing: "border-box",
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
        }}
      >
        {inner}
      </aside>

      {/* ── Mobile overlay backdrop ────────────────────── */}
      {mobileOpen && (
        <div
          className="chat-sidebar-backdrop"
          onClick={onMobileClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      {/* ── Mobile slide-in sidebar ───────────────────── */}
      <aside
        className="chat-sidebar-mobile"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 280,
          height: "100%",
          background: theme.sidebarBg,
          zIndex: 50,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Close button */}
        <button
          onClick={onMobileClose}
          aria-label="Close sidebar"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: 8,
            color: "#FFFFFF",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <X size={16} />
        </button>

        {inner}
      </aside>

      {/* ── CSS: hide desktop sidebar on mobile ───────── */}
      <style>{`
        @media (max-width: 767px) {
          .chat-sidebar-desktop { display: none !important; }
        }
        @media (min-width: 768px) {
          .chat-sidebar-mobile { display: none !important; }
          .chat-sidebar-backdrop { display: none !important; }
        }
        .sidebar-collapse-btn:hover {
          background: rgba(255,255,255,0.15) !important;
        }
        @media (max-width: 767px) {
          .sidebar-collapse-btn--desktop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
