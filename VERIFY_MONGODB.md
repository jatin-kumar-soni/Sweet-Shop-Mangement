How to Verify MongoDB Installation

Quick Verification Steps

Step 1: Check MongoDB Service Status

Open PowerShell and run:
   Get-Service MongoDB

Expected Output:
   Status    Name               DisplayName
   ------    ----               -----------
   Running   MongoDB            MongoDB

If Status shows "Running", MongoDB service is active.

Step 2: Test Connection with mongosh (if available)

If mongosh is in your PATH, try:
   mongosh

If it connects, you'll see:
   Current Mongosh Log ID: ...
   Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2
   Using MongoDB: 8.2.1
   Using Mongosh: 2.0.2
   
   test>

Type "exit" to close the connection.

If mongosh is not found, that's okay - Compass or the application will still work.

Step 3: Verify with MongoDB Compass

Open MongoDB Compass (if you installed it).

1. You should see "localhost:27017" in the left sidebar under CONNECTIONS
   
2. Click on "localhost:27017" to connect
   
3. After connecting, you should see a list of databases
   
4. Initially, you'll see default databases like:
   - admin
   - config
   - local
   
5. Once you run your application and create data, you'll see:
   - sweet-shop (your application database)

Step 4: Verify from Your Application

1. Navigate to backend directory and create .env file:
   cd backend
   
   Create .env with:
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/sweet-shop
   JWT_SECRET=your-secret-key-change-this-in-production
   NODE_ENV=development

2. Install backend dependencies (if not done):
   npm install

3. Create admin user:
   npm run create-admin

   Expected output:
   Connected to MongoDB
   Admin user created: admin@example.com
   Username: admin
   Password: admin123

4. Start backend server:
   npm run dev

   Expected output:
   Connected to MongoDB
   Server running on port 3001

   If you see "Connected to MongoDB", your installation is working perfectly!

Step 5: Verify Database Creation

After running the application:

1. Open MongoDB Compass
2. Click on "localhost:27017"
3. Look for "sweet-shop" database
4. Expand "sweet-shop" to see collections:
   - users (contains your admin user)
   - sweets (will contain sweets when you add them)

5. Click on "users" collection to verify admin user exists:
   You should see a document with:
   - username: "admin"
   - email: "admin@example.com"
   - role: "admin"

Step 6: Test Full Application Connection

1. From root directory, start the application:
   npm run dev

2. Backend should show: "Connected to MongoDB"
3. Frontend should start on http://localhost:3000
4. Try logging in with:
   - Email: admin@example.com
   - Password: admin123

If login works, MongoDB is fully functional!

Troubleshooting

If Get-Service shows "Stopped":
   Start MongoDB service:
   net start MongoDB

If connection fails in Compass:
   - Check MongoDB service is running
   - Verify port 27017 is not blocked
   - Try restarting MongoDB service

If backend can't connect:
   - Verify MONGODB_URI in .env file is correct
   - Check MongoDB service is running
   - Ensure no firewall is blocking port 27017

Common Issues

Issue: "Cannot connect to MongoDB"
   Solution: Check if MongoDB service is running with Get-Service MongoDB

Issue: "Authentication failed"
   Solution: If using local MongoDB, no authentication is needed. Make sure MONGODB_URI doesn't include username/password for local setup.

Issue: Compass shows "No databases"
   Solution: This is normal until you create data. Run create-admin script and start the backend to create the database.

Success Indicators

You'll know MongoDB is working correctly if:
   ✓ Get-Service MongoDB shows "Running"
   ✓ Compass can connect to localhost:27017
   ✓ Backend server shows "Connected to MongoDB"
   ✓ Admin user can be created successfully
   ✓ You can login to the application

