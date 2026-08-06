from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
import os

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

COLLECTION_NAME = "contexttalk"


def create_vector_store(chunks, persist_directory, reset=False):

    os.makedirs(persist_directory, exist_ok=True)

    if reset:
        vector_store = Chroma(
            persist_directory=persist_directory,
            embedding_function=embedding_model,
            collection_name=COLLECTION_NAME,
        )

        try:
            vector_store.delete_collection()
        except Exception:
            pass

        vector_store = Chroma.from_documents(
            documents=chunks,
            embedding=embedding_model,
            persist_directory=persist_directory,
            collection_name=COLLECTION_NAME,
        )

    else:
        vector_store = Chroma(
            persist_directory=persist_directory,
            embedding_function=embedding_model,
            collection_name=COLLECTION_NAME,
        )

        vector_store.add_documents(chunks)

    return vector_store


def load_vector_store(persist_directory):

    return Chroma(
        persist_directory=persist_directory,
        embedding_function=embedding_model,
        collection_name=COLLECTION_NAME,
    )