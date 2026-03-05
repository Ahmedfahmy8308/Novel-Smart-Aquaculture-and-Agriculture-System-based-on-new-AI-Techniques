from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def advisory_index():
    return {"module": "advisory", "status": "active"}
