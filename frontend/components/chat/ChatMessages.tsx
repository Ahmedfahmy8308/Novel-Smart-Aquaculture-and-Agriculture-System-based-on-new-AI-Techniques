/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";
import type { ChatTheme } from "@/lib/chat-themes";
import type { ChatMessage } from "@/types";

interface Props {
  theme: ChatTheme;
  messages: ChatMessage[];
}

export default function ChatMessages({ theme, messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 768,
        width: "100%",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
      className="chat-messages-scroll chat-messages-container"
    >
      {messages.map((msg, idx) => {
        const isAi = msg.role === "ai";

        return (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: isAi ? "row" : "row-reverse",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: isAi ? theme.aiAvatarBg : theme.userAvatarBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isAi ? (
                <Bot size={16} color="#FFFFFF" />
              ) : (
                <User size={16} color="#FFFFFF" />
              )}
            </div>

            {/* Bubble */}
            <div
              className="chat-bubble"
              style={{
                maxWidth: "75%",
                padding: "12px 16px",
                borderRadius: isAi ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
                background: isAi ? theme.aiBubbleBg : theme.userBubbleBg,
                border: isAi
                  ? theme.aiBubbleBorder
                    ? `1px solid ${theme.aiBubbleBorder}`
                    : undefined
                  : theme.userBubbleBorder
                  ? `1px solid ${theme.userBubbleBorder}`
                  : undefined,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'DM Sans', 'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: "21px",
                  color: isAi ? theme.aiMessageTextColor : theme.userMessageTextColor,
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </p>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />

      <style>{`
        .chat-messages-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .chat-messages-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 2px;
        }
        @media (max-width: 767px) {
          .chat-messages-container {
            padding: 16px 12px !important;
          }
          /* Wider bubbles on narrow screens */
          .chat-bubble {
            max-width: 88% !important;
          }
        }
      `}</style>
    </div>
  );
}
