from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil

from src.loader import load_document
from src.splitter import split_documents
from src.vector_store import create_vector_store
from src.retriever import get_retriever
from src.rag_pipeline import create_rag_chain
from fastapi import HTTPException
from src.vector_store import load_vector_store 



app = FastAPI(title="ContextTalk AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Global objects
vector_store = None


@app.get("/")
def home():
    return {"message": "ContextTalk AI Backend Running"}


@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    mode: str = Form("single")
):
    
    global vector_store

    try:
        # -----------------------------
        # Single Document Mode
        # -----------------------------
        if mode == "single":

            if os.path.exists(UPLOAD_FOLDER):
                shutil.rmtree(UPLOAD_FOLDER)

            os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        # -----------------------------
        # Workspace Mode
        # -----------------------------
        else:
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        # Save PDF
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Load PDF
        documents = load_document(file_path)

        # Split
        chunks = split_documents(documents)
        
        for chunk in chunks:
            chunk.metadata["document_name"] = file.filename

        # Create / Update Vector Store
        vector_store = create_vector_store(
            chunks,
            reset=(mode == "single")
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

        return {
            "error": str(e)
        }


# -------------------------
# Chat Request Model
# -------------------------
class ChatRequest(BaseModel):
    question: str


@app.post("/chat")
async def chat(request: ChatRequest):
    global vector_store

    if vector_store is None:
        return {
            "answer": "Please upload a PDF first."
        }

    try:
        # Create retriever dynamically based on question
        retriever = get_retriever(
            vector_store,
            request.question
        )

        # Create RAG chain
        rag_chain = create_rag_chain(retriever)

        # Generate answer
        answer = rag_chain.invoke(request.question)

        return {
            "answer": answer
        }

    except Exception as e:
        import traceback
        traceback.print_exc()

        return {
            "answer": f"Error: {str(e)}"
        }
        
    
@app.delete("/documents/{filename}")
async def delete_document(filename: str):
    global vector_store

    try:
        vector_store = load_vector_store()

        vector_store.delete(
            where={
                "document_name": filename
            }
        )

        # Remove the physical PDF as well
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        if os.path.exists(file_path):
            os.remove(file_path)

        return {
            "message": f"{filename} deleted successfully."
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )