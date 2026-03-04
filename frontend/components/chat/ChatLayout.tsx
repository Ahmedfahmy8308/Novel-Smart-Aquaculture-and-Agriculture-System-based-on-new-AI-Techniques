/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ChatSidebar from "./ChatSidebar";
import ChatMobileHeader from "./ChatMobileHeader";
import ChatWelcome from "./ChatWelcome";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import type { ChatTheme } from "@/lib/chat-themes";
import type { ChatMessage } from "@/types";

interface Props {
  theme: ChatTheme;
}

export default function ChatLayout({ theme }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = { role: "user", text };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      // Simulated AI response (replace with real API call)
      await new Promise((r) => setTimeout(r, 1200));
      const aiMsg: ChatMessage = {
        role: "ai",
        text: `How can i Help you?`,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    },
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="chat-root"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#F8FAF8",
      }}
    >
      {/* ── Sidebar ──────────────────────────────────── */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "contents" }}
      >
        <ChatSidebar
          theme={theme}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      </motion.div>

      {/* ── Main Area ─────────────────────────────────── */}
      <motion.main
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: theme.mainBg,
          borderLeft: `1px solid ${theme.mainBorder}`,
          overflow: "hidden",
          position: "relative",
          minWidth: 0,
        }}
        className="chat-main-area"
      >
        {/* Mobile top bar */}
        <div className="chat-mobile-header-wrap">
          <ChatMobileHeader
            theme={theme}
            onMenuOpen={() => setMobileOpen(true)}
          />
        </div>

        {/* Messages / Welcome */}
        {messages.length === 0 && !isLoading ? (
          <ChatWelcome theme={theme} />
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            <ChatMessages theme={theme} messages={messages} />

            {/* Loading indicator */}
            {isLoading && (
              <div
                style={{
                  padding: "0 96px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  maxWidth: 768 + 96 * 2,
                  margin: "0 auto",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                className="chat-loading"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: theme.titleAccent,
                      display: "inline-block",
                      animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                      opacity: 0.75,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input bar */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChatInput
            theme={theme}
            onSend={handleSend}
            disabled={isLoading}
          />
        </motion.div>
      </motion.main>

      {/* Global styles */}
      <style>{`
        /* ── Mobile ─────────────────────────────── */
        @media (max-width: 767px) {
          .chat-mobile-header-wrap {
            display: flex !important;
            flex-direction: column;
          }
          .chat-main-area {
            border-left: none !important;
          }
          .chat-loading {
            padding: 0 16px 8px !important;
          }
          /* Use dynamic viewport height so nav bars don't overflow */
          .chat-root {
            height: 100dvh !important;
          }
        }
        /* ── Desktop ─────────────────────────────── */
        @media (min-width: 768px) {
          .chat-mobile-header-wrap {
            display: none !important;
          }
        }
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
}
