from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

COLLECTION_NAME = "contexttalk"
PERSIST_DIRECTORY = "database"


def create_vector_store(chunks, reset=False):

    if reset:
        # Open existing collection
        vector_store = Chroma(
            persist_directory=PERSIST_DIRECTORY,
            embedding_function=embedding_model,
            collection_name=COLLECTION_NAME,
        )

        # Delete it if it exists
        try:
            vector_store.delete_collection()
        except Exception:
            pass

        # Create a brand new collection with the new document
        vector_store = Chroma.from_documents(
            documents=chunks,
            embedding=embedding_model,
            persist_directory=PERSIST_DIRECTORY,
            collection_name=COLLECTION_NAME,
        )

    else:
        # Open existing collection
        vector_store = Chroma(
            persist_directory=PERSIST_DIRECTORY,
            embedding_function=embedding_model,
            collection_name=COLLECTION_NAME,
        )

        # Add new document(s)
        vector_store.add_documents(chunks)

    return vector_store

def load_vector_store():

    return Chroma(
        persist_directory=PERSIST_DIRECTORY,
        embedding_function=embedding_model,
        collection_name=COLLECTION_NAME,
    )