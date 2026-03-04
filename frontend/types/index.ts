/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
import type { ElementType, ReactNode } from "react";

export interface NavLink {
    label: string;
    href: string;
}

export interface Stat {
    value: string;
    label: string;
}

export interface DetailedStat {
    value: number;
    suffix: string;
    label: string;
    sub: string;
}

export interface ModelType {
    label: string;
    value: number;
    color: string;
}

export interface Feature {
    icon: ElementType;
    title: string;
    count: string;
    desc: string;
    color: string;
}

export interface Module {
    id: string;
    icon: ElementType;
    color: string;
    name: string;
    description: string;
    bullets: string[];
    tags: string[];
    image: string;
}

export interface Step {
    step: string;
    icon: ElementType;
    title: string;
    desc: string;
    color: string;
}

export interface ChatMessage {
    role: "user" | "ai";
    text: string;
}

export interface FooterLink {
    label: string;
    href: string;
}

export interface Role {
    id: string;
    icon: ElementType;
    label: string;
    color: string;
}

export interface OnboardingModule {
    id: string;
    accent: string;
    accentRgb: string;
    hoverStrip: string;
    icon: ElementType;
    title: string;
    subtitle: string;
    tags: string[];
    models: string;
}

export interface InputFieldProps {
    icon: ElementType;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    rightEl?: ReactNode;
}
