from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def explainability_index():
    return {"module": "explainability", "status": "active"}
