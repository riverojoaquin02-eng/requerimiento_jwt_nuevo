from fastapi import APIRouter, Depends, HTTPException
from ..database import SessionLocal
from sqlalchemy.orm import Session
from ..models.entities import Persona
from ..security.jwt_handler import verify_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/api/v1/personas", tags=["Personas"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    return payload

@router.get("/{cedula}")
def get_persona(cedula: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    persona = db.query(Persona).filter(Persona.cedula == cedula).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Cédula no encontrada")
    return {"cedula": persona.cedula, "nombre": persona.nombre}