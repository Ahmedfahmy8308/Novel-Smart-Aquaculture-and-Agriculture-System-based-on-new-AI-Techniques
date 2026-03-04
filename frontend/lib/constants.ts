/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
import {
    Fish,
    Wheat,
    Cloud,
    Zap,
    Brain,
    Database,
    BrainCircuit,
    Lightbulb,
    Rocket,
    CloudRain,
} from "lucide-react";
import type {
    NavLink,
    Stat,
    DetailedStat,
    ModelType,
    Feature,
    Module,
    Step,
    ChatMessage,
    Role,
    OnboardingModule,
} from "@/types";
import { BarChart2, Briefcase } from "lucide-react";

// ── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Modules", href: "#modules" },
    { label: "AI Advisor", href: "#ai-advisor" },
    { label: "How It Works", href: "#how-it-works" },
];

// ── Hero stats ───────────────────────────────────────────────────────────────
export const HERO_STATS: Stat[] = [
    { value: "102", label: "AI Models" },
    { value: "5", label: "Smart Modules" },
    { value: "500+", label: "Active Farms" },
    { value: "99.7%", label: "Uptime SLA" },
];

// ── Platform stats ────────────────────────────────────────────────────────────
export const PLATFORM_STATS: DetailedStat[] = [
    { value: 102, suffix: "", label: "Total AI Models", sub: "Trained & production-ready" },
    { value: 5, suffix: "", label: "Modules Covered", sub: "End-to-end agriculture stack" },
    { value: 4, suffix: "", label: "Intelligence Layers", sub: "ML, CV, Forecast, LLM" },
    { value: 500, suffix: "+", label: "Active Farms", sub: "Across 12 countries" },
];

// ── Model architecture breakdown ──────────────────────────────────────────────
export const MODEL_TYPES: ModelType[] = [
    { label: "CNN", value: 18, color: "#6EC84A" },
    { label: "LSTM", value: 22, color: "#1ABFA1" },
    { label: "XGBoost", value: 15, color: "#3A8C2F" },
    { label: "Transformer", value: 12, color: "#6EC84A" },
    { label: "RL", value: 10, color: "#F5A623" },
    { label: "LLM", value: 4, color: "#1ABFA1" },
    { label: "Optimization", value: 21, color: "#8FA898" },
];

// ── Features strip ────────────────────────────────────────────────────────────
export const FEATURES: Feature[] = [
    {
        icon: Fish,
        title: "Aquaculture Intelligence",
        count: "30",
        desc: "Real-time monitoring of water quality, fish health, and pond ecosystems with precision AI.",
        color: "#1ABFA1",
    },
    {
        icon: Wheat,
        title: "Agriculture Intelligence",
        count: "28",
        desc: "Crop disease detection, yield prediction, soil analysis powered by computer vision.",
        color: "#6EC84A",
    },
    {
        icon: Cloud,
        title: "Weather & Environmental",
        count: "22",
        desc: "Hyper-local forecasting and climate risk models for optimal farm decision-making.",
        color: "#3A8C2F",
    },
    {
        icon: Zap,
        title: "Energy & Resource Optimization",
        count: "18",
        desc: "Smart resource allocation and energy efficiency using reinforcement learning.",
        color: "#F5A623",
    },
    {
        icon: Brain,
        title: "LLM Cognitive Layer",
        count: "4",
        desc: "Multilingual AI advisors with RAG evidence-based recommendations for every farmer.",
        color: "#6EC84A",
    },
];

// ── Modules ────────────────────────────────────────────────────────────────────
export const MODULES: Module[] = [
    {
        id: "aquaculture",
        icon: Fish,
        color: "#1ABFA1",
        name: "Aquaculture Intelligence",
        description:
            "Monitor water quality, fish behavior, and pond health in real time. AgroMind's 30 specialized models detect anomalies before they become problems.",
        bullets: [
            "Real-time dissolved oxygen & pH monitoring",
            "Fish biomass estimation via computer vision",
            "Disease outbreak early-warning system",
            "Feed optimization with waste reduction",
        ],
        tags: ["CNN", "LSTM", "XGBoost", "SVM"],
        image: "/model-01.png",
    },
    {
        id: "agriculture",
        icon: Wheat,
        color: "#6EC84A",
        name: "Agriculture Intelligence",
        description:
            "From seed to harvest, 28 AI models analyze soil, crops, pests, and yield forecasts to maximize every acre's potential.",
        bullets: [
            "Crop disease detection via satellite & drone imagery",
            "Soil health & nutrient deficiency analysis",
            "Yield prediction with multi-season learning",
            "Pest and weed identification at field scale",
        ],
        tags: ["YOLOv8", "ResNet", "Transformer", "Random Forest"],
        image: "/model-02.png",
    },
    {
        id: "weather",
        icon: Cloud,
        color: "#3A8C2F",
        name: "Weather & Environmental",
        description:
            "22 hyper-local weather and climate models give farmers the precision forecasts needed to make timely, high-stakes decisions.",
        bullets: [
            "72-hour precision microclimate forecasting",
            "Flood & drought risk alert system",
            "Evapotranspiration & irrigation scheduling",
            "Seasonal climate anomaly detection",
        ],
        tags: ["LSTM", "Prophet", "GRU", "Ensemble"],
        image: "/model-03.png",
    },
    {
        id: "energy",
        icon: Zap,
        color: "#F5A623",
        name: "Energy & Resource Optimization",
        description:
            "18 reinforcement learning and optimization models reduce water usage, electricity consumption, and operating costs across your entire operation.",
        bullets: [
            "Smart pump & aerator scheduling",
            "Solar and grid energy optimization",
            "Water usage efficiency analysis",
            "Operating cost reduction modeling",
        ],
        tags: ["RL", "Linear Programming", "MILP", "XGBoost"],
        image: "/model-04.png",
    },
    {
        id: "llm",
        icon: Brain,
        color: "#6EC84A",
        name: "LLM Cognitive Layer",
        description:
            "4 large language models synthesize all sensor data, forecasts, and knowledge to deliver plain-language advisory — like having an expert agronomist on-call 24/7.",
        bullets: [
            "Multilingual farm advisory conversations",
            "Evidence-based RAG recommendations",
            "Explainable AI decision summaries",
            "Strategic planning & market insights",
        ],
        tags: ["GPT-4o", "RAG", "Fine-tuned LLaMA", "Chain-of-Thought"],
        image: "/model-05.png",
    },
];

// ── How It Works steps ────────────────────────────────────────────────────────
export const STEPS: Step[] = [
    {
        step: "01",
        icon: Database,
        title: "Connect Data",
        desc: "Link your IoT sensors, drones, satellites, and manual logs. AgroMind ingests all data types in real time.",
        color: "#1ABFA1",
    },
    {
        step: "02",
        icon: BrainCircuit,
        title: "AI Analysis",
        desc: "102 specialized models run continuously — detecting anomalies, forecasting outcomes, and correlating patterns across your operation.",
        color: "#6EC84A",
    },
    {
        step: "03",
        icon: Lightbulb,
        title: "Smart Insights",
        desc: "Receive precision alerts, visual dashboards, and plain-language summaries tailored to your crops, ponds, and climate zone.",
        color: "#3A8C2F",
    },
    {
        step: "04",
        icon: Rocket,
        title: "Take Action",
        desc: "Approve automated actions or act on AI recommendations. Track outcomes and let the system continuously improve.",
        color: "#F5A623",
    },
];

// ── Chat messages ─────────────────────────────────────────────────────────────
export const CHAT_MESSAGES: ChatMessage[] = [
    {
        role: "user",
        text: "What's causing the low DO levels in Pond B this morning?",
    },
    {
        role: "ai",
        text: "Based on overnight sensor data, Pond B shows DO at 3.2 mg/L — below the 5 mg/L threshold. Contributing factors: water temperature rose to 32°C overnight (reduces O₂ solubility) and feed load was 40% above optimal yesterday. I recommend activating Aerator 3 immediately and reducing feed by 25% for the next 48 hours.",
    },
    {
        role: "user",
        text: "Should I harvest this week or wait?",
    },
    {
        role: "ai",
        text: "Market price forecast shows a 12% increase in the next 10 days. Fish are at 87% of target weight. My recommendation: wait 7–10 days for optimal revenue — projected gain of ~$4,200 on your current inventory. However, if DO stress continues, early harvest may be the safer option.",
    },
];

// ── LLM Advisory features ─────────────────────────────────────────────────────
export const LLM_FEATURES = [
    "Multilingual",
    "Evidence-based (RAG)",
    "Explainable AI",
    "Strategic Planning",
];

// ── Footer links ──────────────────────────────────────────────────────────────
export const QUICK_LINKS = ["Home", "Features", "Modules", "Pricing", "About", "Blog"];

export const MODULE_LINKS = [
    "Aquaculture Intelligence",
    "Agriculture Intelligence",
    "Weather & Environmental",
    "Energy Optimization",
    "LLM Advisory",
];

export const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

// ── Auth roles ────────────────────────────────────────────────────────────────
export const ROLES: Role[] = [
    { id: "farmer", icon: Wheat, label: "Farmer", color: "#3A8C2F" },
    { id: "aquaculture", icon: Fish, label: "Aquaculture", color: "#1ABFA1" },
    { id: "agritech", icon: BarChart2, label: "Agri-Tech", color: "#3A8C2F" },
    { id: "investor", icon: Briefcase, label: "Investor", color: "#8F664A" },
];

// ── CTA trust badges ──────────────────────────────────────────────────────────
export const TRUST_BADGES = ["No credit card required", "14-day free trial", "Cancel anytime"];

// ── Onboarding modules ────────────────────────────────────────────────────────
export const ONBOARDING_MODULES: OnboardingModule[] = [
    {
        id: "agriculture",
        accent: "#3A8C2F",
        accentRgb: "58,140,47",
        hoverStrip: "linear-gradient(90deg,#3A8C2F,#6EC84A)",
        icon: Wheat,
        title: "Agriculture",
        subtitle: "Crop monitoring, yield prediction & soil intelligence",
        tags: ["Crop Yield", "Disease Detection", "Irrigation", "Soil Analysis"],
        models: "30 AI Models Active",
    },
    {
        id: "aquaculture",
        accent: "#1ABFA1",
        accentRgb: "26,191,161",
        hoverStrip: "linear-gradient(90deg,#1ABFA1,#2EDAB9)",
        icon: Fish,
        title: "Aquaculture",
        subtitle: "Fish & shrimp health, water quality & feeding optimization",
        tags: ["Disease Detection", "Water Quality", "Feeding AI", "Biomass"],
        models: "28 AI Models Active",
    },
    {
        id: "weather",
        accent: "#4A9FD4",
        accentRgb: "74,159,212",
        hoverStrip: "linear-gradient(90deg,#4A9FD4,#6AB8E8)",
        icon: CloudRain,
        title: "Weather & Environment",
        subtitle: "Climate forecasting, drought risk & environmental monitoring",
        tags: ["Rainfall", "Drought Risk", "Flood Alert", "Heatwave"],
        models: "22 AI Models Active",
    },
    {
        id: "energy",
        accent: "#F5A623",
        accentRgb: "245,166,35",
        hoverStrip: "linear-gradient(90deg,#F5A623,#FFBF55)",
        icon: Zap,
        title: "Energy & Resources",
        subtitle: "Solar forecasting, smart irrigation & energy cost optimization",
        tags: ["Solar Power", "Pump Control", "Energy Cost", "Smart Irrigation"],
        models: "18 AI Models Active",
    },
];
