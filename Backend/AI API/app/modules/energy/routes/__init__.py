from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def energy_index():
    return {"module": "energy", "status": "active"}
