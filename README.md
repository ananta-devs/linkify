# Linkify - URL Shortener

Linkify is a simple yet powerful URL shortener application built with a Modern Tech Stack. It allows users to convert long URLs into short, manageable links.

## 🚀 Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Compatible with CockroachDB)
- **Styling:** CSS (Standard)

## 🛠️ Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A running instance of PostgreSQL or CockroachDB.

---

## 🏁 Getting Started

### 1. Backend Setup

The backend handles the URL shortening logic and database interactions.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=5000
    DATABASE_URL=postgresql://user:password@localhost:5432/linkify_db
    # If using CockroachDB, ensure the connection string is correct (sslmode=require usually needed)
    ```

4.  **Start the Server:**
    *   **Development:**
        ```bash
        node index.js
        ```
    *   **Production:**
        ```bash
        npm start
        ```

    *The application will automatically attempt to create the necessary database table (`urls`) on startup.*

### 2. Frontend Setup

The frontend provides the user interface for inputting URLs.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (Optional):**
    By default, the frontend expects the backend to be running on `http://localhost:5000` (via Vite proxy in dev) or the same origin in production.
    
    If your backend is hosted separately (e.g., on a different domain), create a `.env` file in the `frontend` directory:
    ```env
    VITE_API_BASE_URL=https://your-backend-api.com
    ```

4.  **Run the Application:**
    *   **Development:**
        ```bash
        npm run dev
        ```
        Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

    *   **Production Build:**
        ```bash
        npm run build
        npm run preview # To test the build locally
        ```

---

## 📦 Deployment Guide

### Deployment Strategy
You can deploy the frontend and backend separately or together.

#### Option A: Separate Deployment (Recommended for Scalability)
1.  **Backend:** Deploy the `backend` folder to a service like **Render**, **Railway**, or **Heroku**.
    *   Set the `DATABASE_URL` environment variable in your cloud provider's dashboard.
2.  **Frontend:** Deploy the `frontend` folder to **Vercel** or **Netlify**.
    *   Set the `VITE_API_BASE_URL` environment variable in your Vercel/Netlify dashboard to point to your deployed backend URL (e.g., `https://my-api.onrender.com`).

#### Option B: Unified Deployment
1.  Build the frontend (`npm run build`).
2.  Configure the backend to serve the static files from `frontend/dist`.
3.  Deploy the entire repo to a Node.js hosting provider.

## 🤝 Contributing
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.
