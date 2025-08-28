from sqlalchemy import Boolean, Column, Integer, String, Text

from database import Base

class Guest(Base):
    __tablename__ = "guests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    attending = Column(Boolean)
    dietary_restrictions = Column(Text, nullable=True)
    plus_one_name = Column(String, nullable=True)
    # Para crianças, uma abordagem simples é um campo de texto.
    # Uma abordagem complexa seria uma tabela separada.
    children_info = Column(String, nullable=True)
