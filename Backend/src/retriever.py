def get_retriever(vector_store, question=None):

    question = (question or "").lower()

    # Questions that need a broader understanding of the document
    overview_keywords = [
        "summary",
        "summarize",
        "overview",
        "about",
        "describe",
        "explain",
        "main points",
        "key points",
        "key takeaways",
        "what is this pdf about",
        "what is this document about",
        "tell me about this document",
        "tell me about the pdf",
    ]

    is_overview = any(keyword in question for keyword in overview_keywords)

    if is_overview:
        # Retrieve more diverse chunks
        return vector_store.as_retriever(
            search_type="mmr",
            search_kwargs={
                "k": 10,
                "fetch_k": 25,
                "lambda_mult": 0.7,
            },
        )

    # Default retriever for specific questions
    return vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={
            "k": 4,
        },
    )