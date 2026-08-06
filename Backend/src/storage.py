from pathlib import Path

BASE_DIR = Path("storage/users")


def get_user_storage(user_id: int):
    user_dir = BASE_DIR / str(user_id)

    uploads = user_dir / "uploads"
    vectordb = user_dir / "vectordb"

    uploads.mkdir(parents=True, exist_ok=True)
    vectordb.mkdir(parents=True, exist_ok=True)

    return {
        "root": user_dir,
        "uploads": uploads,
        "vectordb": vectordb,
    }