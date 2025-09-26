from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..security.jwt_handler import create_access_token
from ..security.password_handler import verify_password, hash_password
from ..models.entities import Usuario

router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.username == username).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

#  Función para crear usuarios (solo admin debería usarlo)
@router.post("/register")
def register(username: str, password: str, db: Session = Depends(get_db)):
    hashed = hash_password(password)
    userformat = username.join(username.split()).lower()
    new_user = Usuario(username=userformat, password_hash=hashed)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"username": new_user.username, "msg": "Usuario creado exitosamente"}