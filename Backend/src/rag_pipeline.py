from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

from src.prompt import prompt
from src.llm import llm


def format_docs(docs):
    return "\n\n".join(
        doc.page_content
        for doc in docs
    )


def create_rag_chain(retriever):

    rag_chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough(),
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    return rag_chain