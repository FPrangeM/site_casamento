# Site de Casamento - Mariana & Fernando

Este é o repositório para o site de casamento, construído com a ajuda do Gemini CLI.

## Arquitetura Geral

O projeto é dividido em duas partes principais:

1.  **Frontend:** Um site estático (HTML, CSS, JavaScript) cujo conteúdo é carregado dinamicamente a partir de um arquivo de configuração JSON. Isso permite edições fáceis sem tocar no código principal.
2.  **Backend:** Uma API em Python (FastAPI) que lida com o formulário de Confirmação de Presença (RSVP), salvando os dados em um banco de dados SQLite.

### Estrutura de Pastas

```
/
├── README.md             # Este arquivo
├── index.html            # Arquivo principal do site
├── data/
│   └── config.json       # ONDE EDITAR TODO O CONTEÚDO DO SITE
├── styles/
│   └── style.css         # Folha de estilos
├── scripts/
│   └── script.js         # Lógica do frontend (carrega o JSON, envia o RSVP)
├── images/               # Onde colocar logos e fotos
└── backend/
    ├── main.py           # Servidor FastAPI
    ├── database.db       # Banco de dados com as confirmações de presença
    ├── database.py       # Configuração do banco de dados
    ├── models.py         # Estrutura da tabela de convidados
    ├── schemas.py        # Validação dos dados do formulário
    └── pyproject.toml    # Dependências do backend (gerenciado pelo `uv`)
```

---

## Como Gerenciar o Site

### Editando o Conteúdo

Para alterar nomes, datas, textos, listas de presentes, ou itens do dress code, **edite o arquivo `data/config.json`**. O site irá refletir as alterações automaticamente ao ser recarregado.

### Rodando o Servidor do Formulário (Backend)

O servidor é necessário para que o formulário de Confirmação de Presença funcione.

1.  **Navegue até a pasta:**
    ```bash
    cd backend
    ```
2.  **Instale as dependências (apenas na primeira vez):**
    ```bash
    # Se o ambiente `uv` não estiver criado
    uv init --bare
    uv add fastapi uvicorn[standard] sqlalchemy
    ```
3.  **Execute o servidor:**
    ```bash
    uv run uvicorn main:app --reload
    ```
    O servidor estará rodando em `http://127.0.0.1:8000`.

### Visualizando as Confirmações de Presença

As confirmações são salvas no arquivo `backend/database.db`.

---

*Este resumo foi gerado pelo Gemini CLI.*