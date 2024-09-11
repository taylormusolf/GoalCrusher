![goalcrusher](https://github.com/user-attachments/assets/2b28b353-6dbe-40ab-a3d9-5d7fd7d0262b)

### Overview
Goal Crusher is a simple web application designed to help users set, track, and manage their personal or professional goals. The application provides the functionality to create new goals, view existing goals, update their status, and delete them if necessary. It is built with a Python backend and a JavaScript frontend to deliver a smooth user experience.

### Features
1. Add New Goals
Users can create new goals by providing a title and description.

2. View Goals
A list of all created goals can be viewed on the main page.

3. Update Goal Status
Users can update the status of each goal to:
- Not Started
- In Progress
- Completed

4. Delete Goals
Users can delete goals to keep their list organized.

#### Bonus Features
- Deployment: The app is deployed on [Heroku](https://goal-crusher-app-d59414deaeb3.herokuapp.com/).
- OpenAI API Integration: OpenAI’s API used for motivational quotes and goal suggestions.
- Notifications: Toastify used for user friendly notications of goal saving and deleting.

### Tech Stack
#### Backend
- Language: Python
- Framework: FastAPI
- Database: PostgreSQL
#### Frontend
Language: JavaScript
Framework: React
Styling: CSS/SCSS.

### Setup Instructions
1. Clone the Repository

```bash
git clone https://github.com/taylormusolf/goal-crusher.git
cd goal-crusher
```
2. Backend Setup
- Ensure you have Python installed.
- Install the required dependencies:
``` bash
pip install -r requirements.txt
```
- Start the FastAPI server
```bash
uvicorn backend.src.app:app --reload
```
3. Frontend Setup
- Navigate to the frontend directory and install the necessary dependencies:
```bash
cd frontend
npm install
npm run dev
```
4. Database Setup
- Ensure your local PostgreSQL database is up and running.
- Create a .env file in the backend folder
- Set the DATABASE_URL in the env file to point to your PostgreSQL instance.
- Run migrations:
```bash
alembic upgrade head
```
5. OpenAI API Setup
To use the OpenAI API, you need to set your API key in the .env file:
```shell
OPENAI_API_KEY=your_api_key_here
```
6. Deployment Instructions
The application is deployed on Heroku.
- For Heroku deployment:
1. Set up the required environment variables such as DATABASE_URL, OPENAI_API_KEY, and ENVIRONMENT.
2. Add build and release commands to your Procfile for running migrations and seeding the database.
3. 
### Usage
After starting the backend and frontend, open your browser and visit http://localhost:3000 (or your deployment URL).
You can add, edit, delete, and track goals easily from the UI.

### Future Enhancements
Reminder Notifications for upcoming or due goals.
Social Sharing to share progress on social media.
User Authentication to allow multiple users to track their goals independently.

### Screenshots
![goals](https://github.com/user-attachments/assets/4bc82a17-aab8-4e60-a818-0905721c8aac)
![suggestions](https://github.com/user-attachments/assets/08472d1a-aadf-49e3-966f-bc238d4e2ad2)
![notificationsPNG](https://github.com/user-attachments/assets/51259b23-9da6-4b73-9fc3-724f856cf8f0)


### License
This project is licensed under the MIT License.

