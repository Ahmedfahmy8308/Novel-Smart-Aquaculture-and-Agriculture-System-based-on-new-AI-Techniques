/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
// ── Chat Theme Configuration ───────────────────────────────
// 4 themes: agriculture | aquaculture | weather | energy

export type ChatThemeId = "agriculture" | "aquaculture" | "weather" | "energy";

export interface ChatTheme {
  id: ChatThemeId;

  // Welcome screen
  aiLabel: string; // e.g. "Agriculture AI"
  welcomeSubtitle: string;

  // Sidebar
  sidebarBg: string;

  // New Chat button
  newChatGradient: string;

  // Search bar
  searchBg: string;
  searchTextColor: string;
  searchIconColor: string;

  // History section
  historyTextColor: string;
  historyIconColor: string;

  // Empty state
  emptyIconBg: string;
  emptyTitleColor: string;
  emptyDescColor: string;

  // Bottom actions border & logout button border
  bottomBorderColor: string;
  logoutBorderColor: string;

  // Main content area
  mainBg: string;
  mainBorder: string;

  // Decorative corner icons color (very low opacity, themed)
  decorColor: string;

  // Chat input
  inputBg: string;
  inputBorder: string;
  inputGlowGradient: string;
  inputTextColor: string;

  // Send button
  sendGradient: string;

  // Keyboard hint text
  hintColor: string;

  // "xxxxxx AI" accent color in title
  titleAccent: string;

  // Subtitle / description text color on welcome
  subtitleColor: string;

  // Message bubbles
  aiBubbleBg: string;
  aiBubbleBorder?: string;
  userBubbleBg: string;
  userBubbleBorder?: string;
  aiAvatarBg: string;
  userAvatarBg: string;
  aiMessageTextColor: string;
  userMessageTextColor: string;
}

export const CHAT_THEMES: Record<ChatThemeId, ChatTheme> = {
  /* ── Agriculture ─────────────────────────────────────── */
  agriculture: {
    id: "agriculture",
    aiLabel: "Agriculture AI",
    welcomeSubtitle:
      "Ask me about crops, soil, irrigation, yield prediction and more.",

    sidebarBg: "#0A1F12",

    newChatGradient: "linear-gradient(135deg, #3A8C2F 0%, #6EC84A 100%)",

    searchBg: "#0D2B1A",
    searchTextColor: "#E0E8E8",
    searchIconColor: "#94A3B8",

    historyTextColor: "#E0E8E8",
    historyIconColor: "#E0E8E8",

    emptyIconBg: "#6EC84A",
    emptyTitleColor: "#6EC84A",
    emptyDescColor: "#E0E8E8",

    bottomBorderColor: "#6EC84A",
    logoutBorderColor: "#6EC84A",

    mainBg: "rgba(10, 32, 18, 0.98)",
    mainBorder: "rgba(255,255,255,0.1)",

    decorColor: "#6EC84A",

    inputBg: "#0D2B1A",
    inputBorder: "rgba(255,255,255,0.1)",
    inputGlowGradient:
      "linear-gradient(90deg, rgba(58,140,47,0.2) 0%, rgba(58,140,47,0.05) 100%)",
    inputTextColor: "#E0E8E8",

    sendGradient: "linear-gradient(135deg, #3A8C2F 0%, #6EC84A 100%)",

    hintColor: "#E0E8E8",
    titleAccent: "#6EC84A",
    subtitleColor: "#E0E8E8",

    aiBubbleBg: "rgba(58,140,47,0.12)",
    aiBubbleBorder: "rgba(110,200,74,0.2)",
    userBubbleBg: "rgba(255,255,255,0.07)",
    userBubbleBorder: "rgba(255,255,255,0.08)",
    aiAvatarBg: "linear-gradient(135deg, #3A8C2F 0%, #6EC84A 100%)",
    userAvatarBg: "rgba(110,200,74,0.15)",
    aiMessageTextColor: "#E8F0E9",
    userMessageTextColor: "#FFFFFF",
  },

  /* ── Aquaculture ─────────────────────────────────────── */
  aquaculture: {
    id: "aquaculture",
    aiLabel: "Aquaculture AI",
    welcomeSubtitle:
      "Ask me about fish health, water quality, feeding optimization, and pond management. I'm here to help your farm thrive.",

    sidebarBg: "#02161F",

    newChatGradient:
      "linear-gradient(135deg, #2B7777 17.31%, #77CBCB 63.94%)",

    searchBg: "rgba(131,181,181,0.1)",
    searchTextColor: "#FFFFFF",
    searchIconColor: "#FFFFFF",

    historyTextColor: "#FFFFFF",
    historyIconColor: "#E0E8E8",

    emptyIconBg: "#61AAAA",
    emptyTitleColor: "#7AD2D2",
    emptyDescColor: "#E0E8E8",

    bottomBorderColor: "#7AD2D2",
    logoutBorderColor: "#61AAAA",

    mainBg: "#052331",
    mainBorder: "#0B4D6C",

    decorColor: "rgba(119,203,203,0.9)",

    inputBg: "rgba(0,2,3,0.21)",
    inputBorder: "rgba(226,232,240,0.1)",
    inputGlowGradient:
      "linear-gradient(90deg, rgba(52,196,196,0.16) 0%, rgba(43,119,119,0.05) 100%)",
    inputTextColor: "#FFFFFF",

    sendGradient: "linear-gradient(135deg, #2B7777 0%, #77CBCB 100%)",

    hintColor: "#E0E8E8",
    titleAccent: "#7AD2D2",
    subtitleColor: "#E0E8E8",

    aiBubbleBg: "rgba(2,22,31,0.6)",
    aiBubbleBorder: "#02161F",
    userBubbleBg: "rgba(255,255,255,0.09)",
    userBubbleBorder: "rgba(255,255,255,0.08)",
    aiAvatarBg: "linear-gradient(135deg, #2B7777 0%, #77CBCB 100%)",
    userAvatarBg: "rgba(119,203,203,0.15)",
    aiMessageTextColor: "#E8F0E9",
    userMessageTextColor: "#FFFFFF",
  },

  /* ── Weather ─────────────────────────────────────────── */
  weather: {
    id: "weather",
    aiLabel: "Weather AI",
    welcomeSubtitle:
      "Ask me about forecasts, drought risk, flood alerts and climate impact on your farming operations.",

    sidebarBg: "#A84E09",

    newChatGradient: "linear-gradient(135deg, #C06722 0%, #EDA268 100%)",

    searchBg: "rgba(215,103,17,0.31)",
    searchTextColor: "#FFFFFF",
    searchIconColor: "#FFFFFF",

    historyTextColor: "#FFFFFF",
    historyIconColor: "#FFFFFF",

    emptyIconBg: "#EDA268",
    emptyTitleColor: "#FF750B",
    emptyDescColor: "#E0E8E8",

    bottomBorderColor: "#FF750B",
    logoutBorderColor: "#FF750B",

    mainBg: "rgba(145,86,34,0.47)",
    mainBorder: "#FF750B",

    decorColor: "#A84900",

    inputBg: "rgba(165,89,32,0.16)",
    inputBorder: "rgba(192,103,34,0.25)",
    inputGlowGradient:
      "linear-gradient(90deg, rgba(165,89,32,0.5) 0%, rgba(165,89,32,0.05) 100%)",
    inputTextColor: "#FFFFFF",

    sendGradient: "linear-gradient(135deg, #C06722 0%, #EDA268 100%)",

    hintColor: "#FFFFFF",
    titleAccent: "#FF750B",
    subtitleColor: "#FFFFFF",

    aiBubbleBg: "rgba(168,78,9,0.15)",
    aiBubbleBorder: "rgba(168,78,9,0.2)",
    userBubbleBg: "rgba(255,255,255,0.12)",
    userBubbleBorder: "rgba(255,255,255,0.08)",
    aiAvatarBg: "linear-gradient(135deg, rgba(192,103,34,0.75) 0%, #EDA268 100%)",
    userAvatarBg: "rgba(255,117,11,0.1)",
    aiMessageTextColor: "#E8F0E9",
    userMessageTextColor: "#FFFFFF",
  },

  /* ── Energy ──────────────────────────────────────────── */
  energy: {
    id: "energy",
    aiLabel: " ",
    welcomeSubtitle:
      "Ask me about solar power, pump scheduling, energy costs and smart irrigation. I'll help you maximize efficiency and reduce costs instantly.",

    sidebarBg: "#714836",

    newChatGradient:
      "linear-gradient(135deg, #543419 0%, #98775C 70.19%, #BC9A7E 100%)",

    searchBg: "rgba(197,167,135,0.22)",
    searchTextColor: "#FFFFFF",
    searchIconColor: "#FFFFFF",

    historyTextColor: "#FFFFFF",
    historyIconColor: "#FFFFFF",

    emptyIconBg: "rgba(188,154,126,0.78)",
    emptyTitleColor: "#2A1605",
    emptyDescColor: "#FFFFFF",

    bottomBorderColor: "#2A1605",
    logoutBorderColor: "#2A1605",

    mainBg: "rgba(113,72,54,0.72)",
    mainBorder: "#47281A",

    decorColor: "rgba(42,22,5,0.25)",

    inputBg: "rgba(42,21,5,0.14)",
    inputBorder: "rgba(67,38,13,0.22)",
    inputGlowGradient:
      "linear-gradient(90deg, rgba(67,38,13,0.54) 0%, rgba(67,38,13,0.05) 100%)",
    inputTextColor: "#FFFFFF",

    sendGradient: "linear-gradient(135deg, #430D15 0%, #BC9A7E 100%)",

    hintColor: "#FFFFFF",
    titleAccent: "#2A1605",
    subtitleColor: "#FFFFFF",

    aiBubbleBg: "rgba(70,40,20,0.8)",
    aiBubbleBorder: "rgba(188,154,126,0.2)",
    userBubbleBg: "rgba(255,255,255,0.1)",
    userBubbleBorder: "rgba(255,255,255,0.08)",
    aiAvatarBg: "linear-gradient(135deg, #543419 0%, #BC9A7E 100%)",
    userAvatarBg: "rgba(188,154,126,0.2)",
    aiMessageTextColor: "#E8F0E9",
    userMessageTextColor: "#FFFFFF",
  },
};

export function getChatTheme(id: string): ChatTheme {
  return CHAT_THEMES[id as ChatThemeId] ?? CHAT_THEMES.agriculture;
}
