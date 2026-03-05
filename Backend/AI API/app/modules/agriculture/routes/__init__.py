from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def agriculture_index():
    return {"module": "agriculture", "status": "active"}
