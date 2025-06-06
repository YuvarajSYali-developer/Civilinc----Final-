import os
import json
import numpy as np
from typing import Dict, Any, List
import joblib
from app.core.config import settings
from app.core.logging import Logger

logger = Logger()

class MLService:
    def __init__(self):
        self.models = {}
        self.model_path = settings.ML_MODEL_PATH
        self._load_models()

    def _load_models(self):
        """Load all models from the models directory"""
        try:
            for model_file in os.listdir(self.model_path):
                if model_file.endswith('.joblib'):
                    model_name = model_file.replace('.joblib', '')
                    model_path = os.path.join(self.model_path, model_file)
                    self.models[model_name] = joblib.load(model_path)
                    logger.info(f"Loaded model: {model_name}")
        except Exception as e:
            logger.error(f"Failed to load models: {str(e)}")
            raise

    def preprocess(self, input_data: Dict[str, Any]) -> np.ndarray:
        """Preprocess input data for model prediction"""
        try:
            # Convert input to numpy array
            features = np.array(list(input_data.values())).reshape(1, -1)
            return features
        except Exception as e:
            logger.error(f"Preprocessing failed: {str(e)}")
            raise

    async def run_model(self, model_name: str, input_data: np.ndarray) -> Dict[str, Any]:
        """Run model prediction"""
        try:
            if model_name not in self.models:
                raise ValueError(f"Model {model_name} not found")

            model = self.models[model_name]
            prediction = model.predict(input_data)
            probability = model.predict_proba(input_data) if hasattr(model, 'predict_proba') else None

            return {
                "prediction": prediction.tolist(),
                "probability": probability.tolist() if probability is not None else None,
                "model_name": model_name,
                "timestamp": str(np.datetime64('now'))
            }
        except Exception as e:
            logger.error(f"Model prediction failed: {str(e)}")
            raise

    def list_available_models(self) -> List[str]:
        """List all available models"""
        return list(self.models.keys())

    def check_health(self) -> Dict[str, Any]:
        """Check health of ML service"""
        try:
            return {
                "status": "healthy",
                "models_loaded": len(self.models),
                "available_models": self.list_available_models(),
                "model_path": self.model_path
            }
        except Exception as e:
            logger.error(f"Health check failed: {str(e)}")
            return {
                "status": "unhealthy",
                "error": str(e)
            } 