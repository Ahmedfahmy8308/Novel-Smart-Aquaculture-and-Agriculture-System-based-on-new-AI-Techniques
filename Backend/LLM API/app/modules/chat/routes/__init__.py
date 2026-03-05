from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def chat_index():
    return {"module": "chat", "status": "active"}
