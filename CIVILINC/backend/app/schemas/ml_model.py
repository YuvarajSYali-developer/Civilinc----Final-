from typing import Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime

class MLModelInput(BaseModel):
    model_name: str
    input_data: Dict[str, Any]

class MLModelOutput(BaseModel):
    model_name: str
    output_data: Dict[str, Any]
    processing_time: float
    confidence_score: Optional[float] = None

class MLModelInteractionBase(BaseModel):
    model_name: str
    input_data: Dict[str, Any]
    output_data: Dict[str, Any]

class MLModelInteractionCreate(MLModelInteractionBase):
    user_id: int

class MLModelInteraction(MLModelInteractionBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True 