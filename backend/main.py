from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models, schemas, database

# Cria a tabela no banco de dados (se não existir)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Configuração do CORS
origins = [
    "https://marifer.com.br",
    "https://www.marifer.com.br",
    "https://marifer.onrender.com"
] # Em produção, seria ideal restringir ao domínio do seu site

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependência para obter a sessão do banco de dados
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Servidor do site de casamento está no ar!"}

@app.post("/api/rsvp", response_model=schemas.Guest)
def create_rsvp(guest: schemas.GuestCreate, db: Session = Depends(get_db)):
    # Verifica se o convidado já não confirmou presença
    db_guest = db.query(models.Guest).filter(models.Guest.email == guest.email).first()
    if db_guest:
        raise HTTPException(status_code=400, detail="Este e-mail já foi usado para confirmar presença.")
    
    new_guest = models.Guest(**guest.dict())
    db.add(new_guest)
    db.commit()
    db.refresh(new_guest)
    return new_guest
