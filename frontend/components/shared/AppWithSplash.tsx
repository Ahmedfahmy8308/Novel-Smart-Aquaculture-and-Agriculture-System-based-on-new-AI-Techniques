/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const SplashScreen = dynamic(() => import("@/components/shared/SplashScreen"), {
  ssr: false,
});

export default function AppWithSplash({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.5s ease-in",
        }}
      >
        {children}
      </div>
    </>
  );
}
