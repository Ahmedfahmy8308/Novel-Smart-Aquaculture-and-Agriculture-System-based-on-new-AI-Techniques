# Agromind — Novel Smart Aquaculture & Agriculture System Based on New AI Techniques

> **Graduation Project — 2025 / 2026**
>
> Faculty of Computers and Information — Kafrelsheikh University

## Overview

**Agromind** is a distributed AI-powered smart farming platform designed to unify **agriculture**, **aquaculture**, **environmental analytics**, **energy optimization**, and **cognitive intelligence** into a single integrated ecosystem.

The system follows a **layered hybrid architecture** composed of:

- Web Application (Next.js)
- Mobile Application (Flutter)
- Central Business Backend (ASP.NET Core)
- AI Intelligence Backend (FastAPI — Python)
- Cognitive LLM Backend (LLaMA-based)
- PostgreSQL + TimescaleDB Data Layer

The architecture ensures scalability, modularity, and clear separation between presentation, business logic, predictive intelligence, and reasoning capabilities.

## Key Features

- **Aquaculture Intelligence** — Fish disease detection (CNN/ResNet), water quality forecasting, fish growth prediction, feeding optimization, harvest planning, and fish counting (YOLOv8).
- **Agriculture Intelligence** — Plant disease classification, nutrient deficiency analysis, crop & fertilizer recommendation, yield prediction, soil quality evaluation, and plant growth forecasting.
- **Weather & Environmental Intelligence** — Weather forecasting (LSTM/GRU/ARIMA/Prophet), drought & flood prediction, sensor anomaly detection, air quality monitoring, and climate impact modeling.
- **Energy & Smart Resource Optimization** — Energy consumption forecasting, smart pump scheduling (RL), solar energy prediction, battery & storage optimization, dynamic pricing, and microgrid management.
- **LLM & Cognitive Intelligence Layer** — Conversational AI chatbot, RAG-based knowledge retrieval, explainable AI reasoning (SHAP), strategic planning, and cross-domain advisory support.
- **Multi-Platform Access** — Next.js web dashboard with role-based access (Customer / Admin) and Flutter mobile app for field usage.
- **102 AI Models** across 5 intelligence modules powering the entire platform.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                              │
│   ┌──────────────────┐              ┌──────────────────┐           │
│   │  Web App (Next.js)│              │ Mobile App (Flutter)│        │
│   │  • Customer Dashboard│           │ • Farm/Pond Mgmt  │         │
│   │  • Admin Dashboard   │           │ • AI Predictions  │         │
│   └────────┬─────────┘              └────────┬─────────┘           │
│            └──────────────┬──────────────────┘                     │
│                           ▼                                        │
│            ┌──────────────────────────┐                            │
│            │  .NET Core Backend (API) │                            │
│            │  • Auth (JWT) & Roles    │                            │
│            │  • CRUD & Business Logic │                            │
│            │  • Workflow Orchestration │                            │
│            └─────┬──────────┬────────┘                            │
│                  │          │                                      │
│         ┌───────▼──┐  ┌───▼────────────┐                         │
│         │ AI Backend│  │ LLM Backend    │                         │
│         │ (FastAPI) │  │ (FastAPI+LLaMA)│                         │
│         │ 4 Modules │  │ Reasoning &    │                         │
│         │ 102 Models│  │ Advisory       │                         │
│         └─────┬─────┘  └───────┬───────┘                         │
│               └────────┬───────┘                                  │
│                        ▼                                          │
│         ┌──────────────────────────┐                              │
│         │ PostgreSQL + TimescaleDB │                              │
│         │ Structured + Time-Series │                              │
│         └──────────────────────────┘                              │
└─────────────────────────────────────────────────────────────────────┘
```

## AI Modules Summary

| Module | # Models | Key AI Types | Core Purpose |
| ------ | -------- | ------------ | ------------ |
| Aquaculture Intelligence | 28 | CNN, LSTM, XGBoost, Regression | Fish health, water quality, feeding optimization |
| Agriculture Intelligence | 30 | CNN, Random Forest, Gradient Boosting, Time-Series | Crop disease, yield prediction, irrigation |
| Weather & Environmental | 22 | LSTM, ARIMA, Prophet, Regression | Weather forecasting, environmental risk detection |
| Energy & Resource Optimization | 18 | RL, LP, ML Regression, Forecasting | Solar prediction, energy load, smart irrigation |
| LLM & Cognitive Layer | 4 | LLM, RAG, NLP, Prompt Engineering | Advisory, reasoning, smart reporting |
| **Total** | **102** | **Hybrid AI Architecture** | **Fully Integrated Smart Agro-Aqua Platform** |

## Repository Structure

```
.
├── Docs/                  # Project documentation & research papers
│   ├── Agromind AI Models.pdf
│   ├── Agromind System Architecture.pdf
│   └── Agromind System Overview.pdf
├── frontend/              # Web application (Next.js)
├── ui-ux/                 # UI/UX design assets & prototypes
├── backend-core/          # Main backend (.NET Core — Business Logic & API)
├── backend-intelligence/  # AI Intelligence backend (FastAPI — ML/DL Models)
├── backend-cognitive/     # LLM Cognitive backend (FastAPI — LLaMA Reasoning)
├── mobile/                # Mobile application (Flutter)
├── LICENSE                # Project license
└── README.md              # This file
```

## Tech Stack

| Layer | Technology | Role |
| ----- | ---------- | ---- |
| Web App | Next.js | User interface & dashboards |
| Mobile App | Flutter | Field interface for farmers & fishers |
| Main Backend | ASP.NET Core | Business logic, auth (JWT), orchestration |
| AI Backend | FastAPI (Python) | ML/DL models & optimization (102 models) |
| LLM Backend | FastAPI + LLaMA | Cognitive reasoning & advisory |
| Database | PostgreSQL + TimescaleDB | Structured & time-series storage |
| AI / ML | TensorFlow · PyTorch · Scikit-learn · XGBoost · YOLOv8 | Model training & inference |
| DevOps | Docker · CI/CD · Cloud | Deployment & scaling |

## System Communication Flow

1. User interacts with **Web** or **Mobile** app
2. Request sent to **.NET backend**
3. Backend validates role & data
4. If AI prediction required → forwarded to **AI Intelligence backend**
5. If explanation required → forwarded to **LLM backend**
6. Responses aggregated
7. Stored in **database**
8. Final result returned to user dashboard

## Getting Started

> Detailed setup instructions will be added to each sub-folder as development progresses.

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd "Novel Smart Aquaculture and Agriculture System based on new AI Techniques"
   ```
2. Navigate to the sub-project you want to work on (e.g., `frontend/`, `backend-core/`, `mobile/`).
3. Follow the local `README.md` inside each folder for environment setup and running instructions.

## Team

| Member | Role | GitHub |
| ------ | ---- | ------ |
| Ahmed Fahmy | Backend Developer | [@Ahmedfahmy8308](https://github.com/Ahmedfahmy8308) |
| Mohamed Samy | Frontend Developer | [@mohamedsamy04](https://github.com/mohamedsamy04) |
| Mohamed Mohsen | Backend Developer | [@Mohamedmohsen179](https://github.com/Mohamedmohsen179) |
| Malak Alsyed | Flutter Developer | [@Malak308](https://github.com/Malak308) |
| Marwa Eldeep | AI Developer | [@MarwaEl-deeb](https://github.com/MarwaEl-deeb) |

## Supervisor

- *TBD*

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## Acknowledgements

We would like to thank our university, supervisors, and all contributors who supported this graduation project.

---

*© 2025–2026 Agromind Team — Faculty of Computers and Information, Kafrelsheikh University. All rights reserved.*
