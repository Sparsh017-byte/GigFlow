# GigFlow

GigFlow is a full-stack gig marketplace web application built using **MERN stack** (MongoDB, Express, React, Node.js) with real-time functionality via **Socket.IO**. Users can post gigs, browse gigs, place bids, and manage their dashboard. Authentication is handled using **JWT tokens stored in HTTP-only cookies**.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Features

- User registration and login with JWT authentication
- Create, view, and manage gigs
- Place and view bids
- Real-time notifications using Socket.IO
- Protected routes for authenticated users
- Logout functionality

---

## Technologies

- **Frontend:** React.js, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
- **Realtime:** Socket.IO
- **Other:** dotenv, cookie-parser, cors, bcryptjs

---

## Setup

### Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend root with the following variables:

env
Copy code
PORT=5000
MONGO_URI=mongodb://0.0.0.0/gigFlowDatabase
JWT_SECRET=supersecretkey
CLIENT_URL=http://localhost:5173
Start the backend server:

bash
Copy code
npm start
The backend will run at http://localhost:5000.

Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the frontend root with the following variables:

env
Copy code
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
Start the frontend:

bash
Copy code
npm run dev
The frontend will run at http://localhost:5173.

Running the Project
Start the backend (npm start) and ensure MongoDB is running.

Start the frontend (npm run dev).

Open the app in your browser at: http://localhost:5173.

Note: Make sure to use the same environment variable values as specified above to ensure cookies and authentication work correctly, especially CLIENT_URL and VITE_API_URL.

Important Notes
Authentication: JWT tokens are stored in HTTP-only cookies for security.

Protected Routes: Only logged-in users can access dashboard, gigs, post-gig, and gig details pages.

Socket.IO: Real-time events are connected on login and disconnected on logout.

Deployment: When deploying to platforms like Vercel or Render, make sure CLIENT_URL matches your frontend domain and that cookies are set with sameSite: "none" and secure: true.
