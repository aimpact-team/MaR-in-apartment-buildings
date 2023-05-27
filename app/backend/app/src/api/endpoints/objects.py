from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException
from src.api import deps
from src.schema.objects import MKDDetail, PredictResult
from src.crud.objects import get as get_objects
from src.crud.objects import get_object_by_id

router = APIRouter()


@router.get("/", response_model=list[PredictResult])
async def object_list(
    limit: int = 10, offset: int = 0, session: AsyncSession = Depends(deps.get_db)
):
    """
    Get predicted list of objects
    """
    return await get_objects(limit=limit, offset=offset, session=session)


@router.get("/{id}", response_model=MKDDetail)
async def object_profile(id: int, session: AsyncSession = Depends(deps.get_db)):
    """
    Detailed description of some object
    """
    return await get_object_by_id(id=id, session=session)
