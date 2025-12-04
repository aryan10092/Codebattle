 # Codebattle
 
 Lightweight realtime coding challenge platform (frontend + backend). This repository contains a Vite + React frontend and an Express + Node backend using MongoDB and WebSockets (Socket.IO) for realtime features.
 
 **Quick overview**
 - **Backend:** `backend/` — Node.js + Express, connects to MongoDB, exposes REST + WebSocket endpoints.
 - **Frontend:** `frontend/` — Vite + React app served in development by Vite.
 - **Docker:** `docker-compose.yml` for running both services together.
 
 **Ports**
 - Backend: `5000`
 - Frontend (Vite dev server): `5173`
 
 **Prerequisites**
 - Node.js (v18+ recommended)
 - npm
 - Docker & Docker Compose (if using containers)
 - A MongoDB instance (Atlas or self-hosted)
 
 **Environment**
 Create a `.env` file at the repository root (or provide env variables to Docker). The project expects at least:
 
 ```
 MONGODB_URI=<your-mongodb-connection-string>
 JWT_SECRET=<a-secret-for-jwt>
 ```
 
 The backend reads `MONGODB_URI` and `JWT_SECRET`. The frontend uses Vite environment variables (prefixed with `VITE_`) when needed.
 
 # Run locally (manual / dev)
 
 1) Backend
 
 Open a terminal, change into the `backend` directory, install dependencies and start the server:
 
 ```powershell
 cd backend
 npm install
 # create a .env (or export env vars) then:
 npm start
 ```
 
 If you prefer bash / WSL:
 
 ```bash
 cd backend
 npm install
 # set env vars then
 npm start
 ```
 
 2) Frontend
 
 Open a separate terminal, change into `frontend`, install dependencies and run the Vite dev server:
 
 ```powershell
 cd frontend
 npm install
 npm run dev -- --host
 ```
 
 In bash/WSL the same commands apply.
 
 Visit `http://localhost:5173` for the frontend (the frontend will talk to the backend at `http://localhost:5000` if configured).
 
 # Run with Docker / docker-compose
 
 This repo includes a `docker-compose.yml` that builds and starts both services. To run with Docker Compose:
 
 ```powershell
 # from repo root (PowerShell)
 # Create a .env at repo root or set environment variables in your shell
 # then:
 docker-compose up --build
 ```
 
 ```powershell
 docker-compose up -d --build
 ```
 
 To stop and remove containers:
 
 ```powershell
 docker-compose down
 ```
 
 Alternative: build and run each image manually
 
 ```powershell
 # Build backend
 docker build -t codebattle-backend ./backend
 # Run backend (PowerShell multiline with backtick as continuation):
 docker run -p 5000:5000 `
	 -e MONGODB_URI="<your-mongo-uri>" `
	 -e JWT_SECRET="<your-jwt-secret>" `
     -e OPENAI_API_KEY="<ypur-openapi-key>" `
	 codebattle-backend
 
 # Build frontend
 docker build -t codebattle-frontend ./frontend
 # Run frontend (Vite dev server runs on 5173 inside container):
 docker run -p 5173:5173 -e VITE_BACKEND_URL="http://localhost:5000" 
 -e VITE_KEY="<ypur-openapi-key>" codebattle-frontend
 ```
 
 For PowerShell single-line commands, ensure quoting/escaping is correct (or set environment variables in the host shell first and reference them with `-e` flags).
 
 **Troubleshooting**
 - `ENOENT: no such file or directory, open '/app/package.json'` — Docker didn't copy the `package.json` into the image. Confirm `frontend/package.json` exists and there's no `.dockerignore` excluding it. Also ensure `context` in `docker-compose.yml` points to `./frontend` and `docker-compose` is run from repo root.
 - `docker: invalid reference format` — usually caused by malformed `docker run` arguments or stray line breaks. Use PowerShell backtick ` to continue lines, or put the entire command on a single line.
 - If the frontend cannot reach the backend inside Docker, use service name `http://backend:5000` in container-to-container calls or set `VITE_BACKEND_URL` to `http://localhost:5000` when testing from host.
 
 **Security**
 - Do not commit `.env` or secrets to source control. Use environment variables for production and secure secret storage.
 
 **Next steps / development tips**
 - Add a `.dockerignore` to speed image builds and ensure you don't accidentally exclude `package.json`.
 - Add a README section for tests if/when tests are added.
 
 If you want, I can:
 - add a `.dockerignore` to the `frontend/` to avoid accidentally excluding files,
 - run and validate `docker-compose up` in this environment and fix any remaining issues.
 
 ---

