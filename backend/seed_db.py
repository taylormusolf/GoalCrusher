from sqlalchemy.orm import Session
from src.models import User
from src.database import engine 

def seed_data():
    # Connect to the database
    session = Session(bind=engine)
    existing_data = session.query(User).filter_by(username="taylor").first()
    if not existing_data:
        user = User(
            username="taylor",
        )

        # Add and commit data to the database
        session.add(user)
        session.commit()

    # Close session
    session.close()

if __name__ == "__main__":
    seed_data()
