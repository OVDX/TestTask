# Project Setup Guide

## Prerequisites

Make sure you have Node.js and npm installed on your system.

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd ./backend/
```

Install dependencies:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the backend directory with the following content:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
```

### 4. Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

Generate Prisma client:

```bash
npx prisma generate
```

Seed the database:

```bash
npx prisma db seed
```

### 5. Start Backend Server

```bash
npm run start:dev
```

The backend server will start running on port 3001.

### 6. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd ./frontend/
```

Install dependencies:

```bash
npm install
```

### 7. Start Frontend Development Server

```bash
npm run dev
```

The frontend application will now be running and accessible in your browser.

## Project Structure

```
project/
├── backend/
│   ├── .env
│   └── ... (backend files)
└── frontend/
    └── ... (frontend files)
```

If you encounter any issues:

- if in frontend part turbopack is not working try

```bash
npx next dev --webpack
```

- Make sure all dependencies are properly installed
- Verify that the `.env` file is correctly configured
- Check that ports 3001 (backend) and the frontend port are not being used by other applications
- Ensure Prisma migrations completed successfully
