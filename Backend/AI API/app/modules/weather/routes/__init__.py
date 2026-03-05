from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def weather_index():
    return {"module": "weather", "status": "active"}
