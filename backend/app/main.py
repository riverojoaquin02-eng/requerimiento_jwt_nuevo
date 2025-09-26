from fastapi import FastAPI
from .routers import auth, personas
from .database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# Crear tablas
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",  
    "http://localhost:3000",   
    "http://127.0.0.1:3000", 
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           
    allow_credentials=True,
    allow_methods=["*"],              
    allow_headers=["*"],             
)

app.include_router(auth.router)
app.include_router(personas.router)
