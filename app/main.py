from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import os
from datetime import datetime, timezone
from starlette_exporter import PrometheusMiddleware

app = FastAPI(title="DevOps Full Stack AWS API")

app.add_middleware(PrometheusMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_prefix = "/api"

@app.get("/metrics")
async def metrics():
    from starlette_exporter import generate_latest
    return Response(generate_latest(), media_type="text/plain")

@app.get("/")
async def read_root():
    return {
        "message": "DevOps Stack Running",
        "version": os.getenv("APP_VERSION", "1.0.0")
    }

@app.get(f"{api_prefix}/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get(f"{api_prefix}/info")
async def get_info():
    return {
        "aws_region": os.getenv("AWS_REGION", "unknown"),
        "environment": os.getenv("ENVIRONMENT", "dev"),
        "app_version": os.getenv("APP_VERSION", "1.0.0")
    }
