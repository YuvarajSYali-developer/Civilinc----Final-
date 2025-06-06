from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from app.core.ml_service import MLService
from app.core.cache import Cache
from app.core.logging import Logger
from app.schemas.ml_model import MLModelInput, MLModelOutput
from app.core.auth import get_current_user

router = APIRouter()
ml_service = MLService()
cache = Cache()
logger = Logger()

@router.post("/run", response_model=MLModelOutput)
async def run_model(
    input_data: MLModelInput,
    current_user = Depends(get_current_user)
):
    try:
        # Check cache first
        cache_key = f"ml_model_{input_data.model_name}_{hash(str(input_data.input_data))}"
        cached_result = cache.get(cache_key)
        if cached_result:
            logger.info(f"Cache hit for model {input_data.model_name}")
            return cached_result

        # Preprocess input
        preprocessed_data = ml_service.preprocess(input_data.input_data)
        
        # Run model
        result = await ml_service.run_model(
            model_name=input_data.model_name,
            input_data=preprocessed_data
        )
        
        # Cache result
        cache.set(cache_key, result, ttl=3600)  # Cache for 1 hour
        
        return result
    except Exception as e:
        logger.error(f"Model execution failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/models")
async def list_models(current_user = Depends(get_current_user)):
    try:
        return ml_service.list_available_models()
    except Exception as e:
        logger.error(f"Failed to list models: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    try:
        return ml_service.check_health()
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 