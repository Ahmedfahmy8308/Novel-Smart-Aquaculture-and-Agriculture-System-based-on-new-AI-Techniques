from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def aquaculture_index():
    return {"module": "aquaculture", "status": "active"}
