🔐 Authentication System (Access & Refresh Tokens)

This project demonstrates a secure authentication system using JWT Access Tokens and Refresh Tokens. It includes both frontend (client) and backend (server) setup.

1️⃣ Clone the repository
git clone <your-repo-url>
cd <project-folder>

📦 Install Dependencies
🔹 Backend
cd backend
npm install
🔹 Frontend
cd frontend
npm install


▶️ Run the Project
🔹 Start Backend Server
cd backend
npm run dev
🔹 Start Frontend Client
cd frontend
npm run dev

🔑 Environment Variables Setup

Create a .env file inside the backend folder and add the following:

PORT=5000
DB_URI=mongodb://127.0.0.1:27017/authDB
JWT_SECRET=mySuperSecretKey123
REFRESH_TOKEN=refreshTokenSecret456
ACCESS_TOKEN=accessTokenSecret789
JWT_EXPIRE=3
CLOUDINARY_NAME=demo_cloud
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_SECRET_KEY=abcdefg1234567
