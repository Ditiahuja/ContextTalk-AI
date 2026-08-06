from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException,
)
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import os
import shutil

from auth.database import Base, engine
from auth.routes import router as auth_router
from auth.dependencies import get_current_user
from auth.models import User
from src.storage import get_user_storage

from src.loader import load_document
from src.splitter import split_documents
from src.vector_store import (
    create_vector_store,
    load_vector_store,
)
from src.retriever import get_retriever
from src.rag_pipeline import create_rag_chain


# --------------------------------------------------
# Database
# --------------------------------------------------

Base.metadata.create_all(bind=engine)

# --------------------------------------------------
# FastAPI
# --------------------------------------------------

app = FastAPI(title="ContextTalk AI API")

app.include_router(auth_router)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "ContextTalk AI Backend Running"
    }


# --------------------------------------------------
# Upload PDF
# --------------------------------------------------

@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    mode: str = Form("single"),
    current_user: User = Depends(get_current_user),
):
    try:

        # ----------------------------
        # User-specific folders
        # ----------------------------

        paths = get_user_storage(current_user.id)

        user_upload_folder = str(paths["uploads"])
        user_database = str(paths["vectordb"])

        # ----------------------------
        # Single Mode
        # ----------------------------

        if mode == "single":

            if os.path.exists(user_upload_folder):
                shutil.rmtree(user_upload_folder)

            if os.path.exists(user_database):
                shutil.rmtree(user_database)

        os.makedirs(user_upload_folder, exist_ok=True)
        os.makedirs(user_database, exist_ok=True)

        # ----------------------------
        # Save PDF
        # ----------------------------

        file_path = os.path.join(
            user_upload_folder,
            file.filename,
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # ----------------------------
        # Load + Split
        # ----------------------------

        documents = load_document(file_path)

        chunks = split_documents(documents)

        for chunk in chunks:
            chunk.metadata["document_name"] = file.filename

        # ----------------------------
        # Create / Update Vector Store
        # ----------------------------

        vector_store = create_vector_store(
            chunks,
            persist_directory=user_database,
            reset=(mode == "single"),
        )

        try:
            vector_store.persist()
        except AttributeError:
            pass

        return {
            "message": "PDF uploaded successfully",
            "filename": file.filename,
            "pages": len(documents),
            "mode": mode,
        }

    except Exception as e:
        import traceback

        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# --------------------------------------------------
# Chat Request
# --------------------------------------------------

class ChatRequest(BaseModel):
    question: str


# --------------------------------------------------
# Chat
# --------------------------------------------------

@app.post("/chat")

async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
):
    try:

        paths = get_user_storage(current_user.id)

        user_database = str(paths["vectordb"])
        if not os.path.exists(user_database):
            return {
                "answer": "Please upload a PDF first."
            }

        vector_store = load_vector_store(
            persist_directory=user_database
        )

        retriever = get_retriever(
            vector_store,
            request.question
        )

        rag_chain = create_rag_chain(
            retriever
        )

        answer = rag_chain.invoke(
            request.question
        )

        return {
            "answer": answer
        }

    except Exception as e:
        import traceback
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# --------------------------------------------------
# Delete Document
# --------------------------------------------------

@app.delete("/documents/{filename}")
async def delete_document(
    filename: str,
    current_user: User = Depends(get_current_user),
):
    try:

        paths = get_user_storage(current_user.id)

        user_upload_folder = str(paths["uploads"])
        user_database = str(paths["vectordb"])

        vector_store = load_vector_store(
            persist_directory=user_database
        )

        vector_store.delete(
            where={
                "document_name": filename
            }
        )

        file_path = os.path.join(
            user_upload_folder,
            filename
        )

        if os.path.exists(file_path):
            os.remove(file_path)

        return {
            "message": f"{filename} deleted successfully."
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )