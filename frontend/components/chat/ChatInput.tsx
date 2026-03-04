/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState, useRef, useCallback } from "react";
import { MessageSquare, Send } from "lucide-react";
import type { ChatTheme } from "@/lib/chat-themes";

interface Props {
  theme: ChatTheme;
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ theme, onSend, disabled = false }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submit = useCallback(() => {
    const msg = value.trim();
    if (!msg || disabled) return;
    onSend(msg);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Auto-grow
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  return (
    <div
      style={{
        padding: "16px 96px 32px",
        flexShrink: 0,
      }}
      className="chat-input-wrapper"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 768,
          margin: "0 auto",
        }}
      >
        {/* ── Input row ── */}
        <div style={{ position: "relative" }}>
          {/* Glow blur behind the input */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-4px",
              background: theme.inputGlowGradient,
              opacity: 0.25,
              filter: "blur(4px)",
              borderRadius: 24,
              pointerEvents: "none",
            }}
          />

          {/* The actual input container */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 0,
              background: theme.inputBg,
              border: `1px solid ${theme.inputBorder}`,
              borderRadius: 24,
              padding: "12px 12px 12px 20px",
              boxSizing: "border-box",
            }}
          >
            {/* Message icon */}
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                paddingRight: 12,
                opacity: 0.7,
              }}
            >
              <MessageSquare size={19} color={theme.inputTextColor} />
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Type your message here..."
              value={value}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="chat-textarea"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                resize: "none",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 16, /* 16px minimum prevents iOS Safari auto-zoom */
                lineHeight: "1.5",
                color: theme.inputTextColor,
                overflowY: "hidden",
                padding: 0,
              }}
            />

            {/* Send button */}
            <button
              onClick={submit}
              disabled={!value.trim() || disabled}
              aria-label="Send message"
              className="chat-send-btn"
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: 16,
                background:
                  value.trim() && !disabled
                    ? theme.sendGradient
                    : "rgba(255,255,255,0.1)",
                border: "none",
                cursor: value.trim() && !disabled ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                marginLeft: 8,
              }}
            >
              <Send
                size={16}
                color="#FFFFFF"
              />
            </button>
          </div>
        </div>

        {/* ── Hint text ── */}
        <div style={{ textAlign: "center" }} className="chat-hint-text">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "1.1px",
              textTransform: "uppercase",
              color: theme.hintColor,
              opacity: 0.7,
            }}
          >
            Press Enter to send, Shift+Enter for new line
          </span>
        </div>
      </div>

      {/* Responsive padding */}
      <style>{`
        @media (max-width: 767px) {
          .chat-input-wrapper {
            padding: 10px 12px 16px !important;
          }
          .chat-hint-text {
            display: none !important;
          }
        }
        /* iOS: prevents tap highlight on send button */
        .chat-send-btn {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        /* iOS: prevent auto-zoom on textarea focus */
        .chat-textarea {
          font-size: 16px !important;
        }
      `}</style>
    </div>
  );
}
