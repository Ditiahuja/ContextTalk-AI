import os
import docx2txt
import easyocr

from PIL import Image
from langchain_core.documents import Document
from langchain_community.document_loaders import PyPDFLoader


# Initialize OCR only once
reader = easyocr.Reader(["en"])


# -----------------------------
# PDF Loader
# -----------------------------
def load_pdf(file_path):
    loader = PyPDFLoader(file_path)
    return loader.load()


# -----------------------------
# DOCX Loader
# -----------------------------
def load_docx(file_path):
    text = docx2txt.process(file_path)

    return [
        Document(
            page_content=text,
            metadata={
                "source": file_path
            }
        )
    ]


# -----------------------------
# Image Loader (OCR)
# -----------------------------
def load_image(file_path):

    results = reader.readtext(file_path)

    extracted_text = "\n".join(
        result[1]
        for result in results
    )

    return [
        Document(
            page_content=extracted_text,
            metadata={
                "source": file_path
            }
        )
    ]


# -----------------------------
# Generic Loader
# -----------------------------
def load_document(file_path):

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        return load_pdf(file_path)

    elif extension == ".docx":
        return load_docx(file_path)

    elif extension in [".png", ".jpg", ".jpeg"]:
        return load_image(file_path)

    else:
        raise ValueError(
            f"Unsupported file type: {extension}"
        )