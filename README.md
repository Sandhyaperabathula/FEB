# Valentine's Website

A romantic interactive website built with React and Node.js.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Framer Motion, Canvas Confetti
- **Backend:** Node.js, Express

## Project Structure
- `/client`: React frontend
- `/server`: Node.js backend

## Installation & Setup

### Prerequisites
- Node.js installed

### 1. Install Dependencies
**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

## Running the Application

### Development Mode
Run frontend and backend in separate terminals.

**Backend:**
```bash
cd server
npm start
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:5173 (usually)
```

### Production Mode (Serve from Backend)
1. Build the frontend:
```bash
cd client
npm run build
```

2. Start the backend:
```bash
cd server
npm start
```
Access the application at `http://localhost:5000`.

## Features
- Interactive "No" button that moves away
- "Yes" button triggering confetti and floating hearts
- Dynamic message from backend API
- Responsive design
