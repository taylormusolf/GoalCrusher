web: uvicorn backend.src.app:app --host=0.0.0.0 --port=$PORT
release: alembic -c backend/alembic.ini upgrade head
release: python backend/seed_db.py
