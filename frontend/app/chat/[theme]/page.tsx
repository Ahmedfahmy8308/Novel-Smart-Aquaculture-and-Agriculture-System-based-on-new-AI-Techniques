/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
import { notFound } from "next/navigation";
import ChatLayout from "@/components/chat/ChatLayout";
import { getChatTheme, CHAT_THEMES } from "@/lib/chat-themes";

interface PageProps {
  params: Promise<{ theme: string }>;
}

export function generateStaticParams() {
  return Object.keys(CHAT_THEMES).map((id) => ({ theme: id }));
}

export default async function ChatPage({ params }: PageProps) {
  const { theme: themeId } = await params;

  const validIds = Object.keys(CHAT_THEMES);
  if (!validIds.includes(themeId)) {
    notFound();
  }

  const theme = getChatTheme(themeId);

  return <ChatLayout theme={theme} />;
}
