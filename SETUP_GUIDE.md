Quick Setup Guide

This guide will help you get the Sweet Shop Management System up and running quickly.

Prerequisites

- Node.js 14 or higher installed
- npm or yarn package manager
- MongoDB installed locally OR MongoDB Atlas account

Checking if MongoDB is Installed and Running

Before starting the application, verify MongoDB is installed and running on your system.

Windows:
   Open PowerShell or Command Prompt and run:
   Get-Service MongoDB
   
   If MongoDB is installed and running, you will see Status: Running
   
   Alternatively, try to connect:
   mongosh
   
   If it connects successfully, MongoDB is installed and running.
   
   If you get an error like "Cannot find any service" or "mongosh is not recognized":
   MongoDB is NOT installed on your system. See MongoDB Installation Options below.

Mac:
   Open Terminal and run:
   brew services list | grep mongodb
   
   Or check if mongod process is running:
   ps aux | grep mongod
   
   Alternatively, try to connect:
   mongosh
   
   If it connects successfully, MongoDB is installed and running.

Linux:
   Check MongoDB service status:
   sudo systemctl status mongod
   
   Or check if mongod process is running:
   ps aux | grep mongod
   
   Alternatively, try to connect:
   mongosh
   
   If it connects successfully, MongoDB is installed and running.

MongoDB Installation Options

Option 1: MongoDB Atlas (Recommended - Cloud Database, Free Tier Available)

This is the easiest option and does not require local installation:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 Sandbox)
4. Create a database user (username and password)
5. Whitelist your IP address (Add Current IP Address or 0.0.0.0/0 for all IPs)
6. Get your connection string (Click "Connect" > "Connect your application")
7. Copy the connection string and use it in your backend .env file:
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sweet-shop

Option 2: Install MongoDB Locally (Windows)

1. Download MongoDB Community Server:
   - Visit https://www.mongodb.com/try/download/community
   - Select Windows platform
   - Download the MSI installer

2. Run the installer:
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool, optional but helpful)

3. After installation, MongoDB will start automatically as a service

4. Verify installation:
   Open PowerShell and run:
   Get-Service MongoDB
   
   You should see Status: Running

5. Test connection:
   mongosh
   
   If it connects, you're all set!

Option 3: Install MongoDB Locally (Mac)

Using Homebrew:
   brew tap mongodb/brew
   brew install mongodb-community

Start MongoDB:
   brew services start mongodb-community

Option 4: Install MongoDB Locally (Linux)

Ubuntu/Debian:
   curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod

If MongoDB is installed but not running:

Windows:
   Start MongoDB service:
   net start MongoDB
   
   Or if installed as a service:
   Start-Service MongoDB

Mac (if installed via Homebrew):
   Start MongoDB:
   brew services start mongodb-community

Linux:
   Start MongoDB service:
   sudo systemctl start mongod

Quick Setup Steps

Step 1: Install Dependencies

From the root directory, install all dependencies (backend, frontend, and root):
   npm run install:all

Alternatively, install manually:
   npm install
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..

Step 2: Configure Environment

1. Navigate to backend directory and create a .env file:
   cd backend
   
   Create .env file with:
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/sweet-shop
   JWT_SECRET=your-secret-key-change-this-in-production
   NODE_ENV=development

   For MongoDB Atlas, replace MONGODB_URI with your connection string:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet-shop

2. (Optional) Navigate to frontend directory and create .env file:
   cd ../frontend
   
   Create .env file with:
   VITE_API_URL=http://localhost:3001

Step 3: Start MongoDB

Ensure MongoDB is running locally (see instructions above) or use MongoDB Atlas.

Step 4: Create Admin User

From the root directory:
   npm run create-admin

   This creates an admin user with:
   - Email: admin@example.com
   - Password: admin123

Step 5: Start the Application

Run both backend and frontend with a single command from the root directory:
   npm run dev

   This will start:
   - Backend server on http://localhost:3001
   - Frontend application on http://localhost:3000

   The command will run both servers concurrently.

Alternative: Run Separately

If you prefer to run backend and frontend separately:

Backend (in one terminal):
   cd backend
   npm run dev

Frontend (in another terminal):
   cd frontend
   npm run dev

Using the Application

1. Open http://localhost:3000 in your browser

2. Register a new user or login with admin credentials:
   - Email: admin@example.com
   - Password: admin123

3. As admin, you can:
   - Add new sweets
   - Edit existing sweets
   - Delete sweets
   - Restock inventory

4. As regular user, you can:
   - Browse all sweets
   - Search and filter sweets
   - Purchase sweets (decreases inventory)

Running Tests

Backend Tests:
   npm test

   Or with coverage:
   npm run test:coverage

Frontend:
   Frontend uses React development mode for testing during development

Troubleshooting

If backend won't start:
- Check MongoDB is running (for local)
- Verify MONGODB_URI in .env is correct
- Check port 3001 is not in use

If frontend won't connect to backend:
- Verify backend is running on port 3001
- Check CORS settings in backend
- Verify VITE_API_URL in frontend .env

If authentication fails:
- Verify JWT_SECRET is set in backend .env
- Check token is being stored in localStorage
- Verify axios interceptor is adding token to requests

