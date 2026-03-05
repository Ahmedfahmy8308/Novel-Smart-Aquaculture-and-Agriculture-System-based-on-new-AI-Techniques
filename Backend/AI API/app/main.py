from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.modules.aquaculture.routes import router as aquaculture_router
from app.modules.agriculture.routes import router as agriculture_router
from app.modules.weather.routes import router as weather_router
from app.modules.energy.routes import router as energy_router


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="AI Intelligence Backend — ML/DL model inference for Aquaculture, Agriculture, Weather & Energy",
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
    app.include_router(aquaculture_router, prefix="/api/aquaculture", tags=["Aquaculture"])
    app.include_router(agriculture_router, prefix="/api/agriculture", tags=["Agriculture"])
    app.include_router(weather_router, prefix="/api/weather", tags=["Weather"])
    app.include_router(energy_router, prefix="/api/energy", tags=["Energy"])

    @app.get("/health", tags=["Health"])
    async def health_check():
        return {"status": "healthy", "service": settings.APP_NAME}

    return app
