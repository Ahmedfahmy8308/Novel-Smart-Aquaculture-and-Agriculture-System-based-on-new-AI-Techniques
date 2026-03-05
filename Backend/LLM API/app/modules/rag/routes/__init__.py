from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def rag_index():
    return {"module": "rag", "status": "active"}
