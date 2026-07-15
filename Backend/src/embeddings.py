from sentence_transformers import SentenceTransformer

# Load the embedding model once
model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):
    """
    Generates an embedding for each chunk.
    """

    texts = [chunk.page_content for chunk in chunks]

    embeddings = model.encode(texts)

    return embeddings