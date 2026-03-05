from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.modules.chat.routes import router as chat_router
from app.modules.rag.routes import router as rag_router
from app.modules.explainability.routes import router as explainability_router
from app.modules.advisory.routes import router as advisory_router


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="LLM Cognitive Backend — LLaMA-based reasoning, RAG, explainability & advisory",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register module routers
    app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
    app.include_router(rag_router, prefix="/api/rag", tags=["RAG"])
    app.include_router(explainability_router, prefix="/api/explainability", tags=["Explainability"])
    app.include_router(advisory_router, prefix="/api/advisory", tags=["Advisory"])

    @app.get("/health", tags=["Health"])
    async def health_check():
        return {"status": "healthy", "service": settings.APP_NAME}

    return app
