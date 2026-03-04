/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { HERO_THEMES, ThemeColors } from "@/lib/hero-themes";

interface HeroThemeContextValue {
    slideIndex: number;
    theme: ThemeColors;
}

const HeroThemeContext = createContext<HeroThemeContextValue>({
    slideIndex: 0,
    theme: HERO_THEMES[0],
});

export function useHeroTheme() {
    return useContext(HeroThemeContext);
}

export function HeroThemeProvider({ children }: { children: ReactNode }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [frozen, setFrozen] = useState(false);

    // Auto-rotate every 3s while the user hasn't scrolled
    // Initial delay of 4.5s to let the splash screen finish before rotating
    useEffect(() => {
        if (frozen) return;
        let id: ReturnType<typeof setInterval>;
        const initDelay = setTimeout(() => {
            id = setInterval(() => {
                setSlideIndex((prev) => (prev + 1) % HERO_THEMES.length);
            }, 3000);
        }, 4500);
        return () => {
            clearTimeout(initDelay);
            clearInterval(id);
        };
    }, [frozen]);

    // Once the user starts scrolling → freeze on agromind-bg (index 0)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0 && !frozen) {
                setFrozen(true);
                setSlideIndex(0);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [frozen]);

    return (
        <HeroThemeContext.Provider value={{ slideIndex, theme: HERO_THEMES[slideIndex] }}>
            {children}
        </HeroThemeContext.Provider>
    );
}
