from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from stylist_ai import HauteCoutureStylist
from trend_forecaster import TrendForecaster

app = FastAPI(
    title="luxury.Raw AI Haute Couture Stylist & Neural Fashion Engine",
    description="Python FastAPI service providing AI outfit curation, visual recommendations, and runway trend forecasting.",
    version="2.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stylist = HauteCoutureStylist()
forecaster = TrendForecaster()

class StylingRequest(BaseModel):
    aesthetic: str = "Architectural Brutalism"
    occasion: str = "Private Art Biennale Opening"
    budget_range: Optional[str] = "$5,000 - $15,000"
    climate: Optional[str] = "Autumn Chill"

@app.get("/api/v1/stylist/health")
def health():
    return {
        "service": "luxury.Raw Python AI Haute Couture Stylist",
        "language": "Python 3.11 / FastAPI",
        "status": "HEALTHY",
        "neuralModel": "LuxNeuro-v4-Transformer",
        "catalogItemCount": len(stylist.catalog)
    }

@app.post("/api/v1/stylist/curate")
def curate(req: StylingRequest):
    try:
        result = stylist.curate_capsule(
            aesthetic=req.aesthetic,
            occasion=req.occasion,
            budget_range=req.budget_range or "$5,000+",
            climate=req.climate or "Temperate"
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/stylist/trends")
def get_trends():
    return forecaster.predict_macro_trends()

if __name__ == "__main__":
    print("🐍 [Python AI Stylist] luxury.Raw Neural Stylist Hub active on port 8084")
    uvicorn.run(app, host="0.0.0.0", port=8084)
