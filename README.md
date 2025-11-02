Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory with user authentication, admin controls, and interactive purchasing features. Built using Node.js, Express, MongoDB, React, and Tailwind CSS.

Project Overview

This application allows users to browse, search, and purchase sweets from an online sweet shop. Administrators have additional capabilities to add, update, delete, and restock sweets in the inventory. The system implements JWT-based authentication to secure API endpoints and protect admin-only operations.

Features

Backend Features

- User registration and login with JWT authentication
- Protected API endpoints for sweets management
- CRUD operations for sweets (Create, Read, Update, Delete)
- Search and filter functionality by name, category, and price range
- Purchase functionality that decreases inventory quantity
- Restock functionality for admin users
- Role-based access control (User and Admin roles)
- Comprehensive test coverage with Jest and Supertest

Frontend Features

- User registration and login forms
- Dashboard displaying all available sweets
- Real-time search and filter capabilities
- Interactive purchase functionality with quantity selection
- Admin panel for managing sweets (Add, Edit, Delete)
- Restock functionality for admin users
- Responsive design with Tailwind CSS
- Modern UI with smooth transitions and visual feedback

Technology Stack

Backend

- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcryptjs for password hashing
- Express Validator for input validation
- Jest and Supertest for testing
- CORS for cross-origin resource sharing

Frontend

- React 18 with functional components and hooks
- React Router for navigation
- Axios for API communication
- Tailwind CSS for styling
- Vite as build tool

Database

- MongoDB (local or MongoDB Atlas for deployment)

Project Structure

```
incopyte/
├── backend/
│   ├── __tests__/
│   │   ├── auth.test.js
│   │   └── sweets.test.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── sweetController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Sweet.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── sweets.js
│   ├── .env.example
│   ├── .gitignore
│   ├── jest.config.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddSweetModal.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditSweetModal.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── SweetCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

Setup Instructions

Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn package manager
- MongoDB (local installation or MongoDB Atlas account)

Checking MongoDB Status

Before starting the application, verify MongoDB is installed and running locally.

Windows (PowerShell):
```
Get-Service MongoDB
```
If Status shows Running, MongoDB is active.

Alternatively, try connecting:
```
mongosh
```
If connection succeeds, MongoDB is installed and running.

If you get errors like "Cannot find any service" or "mongosh is not recognized":
MongoDB is NOT installed. See MongoDB Installation Options below.

Mac/Linux:
```
ps aux | grep mongod
```
Or check service status (Linux):
```
sudo systemctl status mongod
```

MongoDB Installation Options

Option 1: MongoDB Atlas (Recommended - Cloud Database, Free Tier)

Easiest option, no local installation required:

1. Visit https://www.mongodb.com/cloud/atlas/register
2. Create a free account and cluster (M0 Sandbox)
3. Create a database user and whitelist your IP
4. Get connection string and use in backend .env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sweet-shop
   ```

Option 2: Install MongoDB Locally (Windows)

1. Download from https://www.mongodb.com/try/download/community
2. Run MSI installer, choose "Complete" installation
3. Install as Windows Service (recommended)
4. MongoDB will start automatically after installation
5. Verify with: `Get-Service MongoDB`

If MongoDB is installed but not running:

Windows:
```
net start MongoDB
```

Mac (Homebrew):
```
brew services start mongodb-community
```

Linux:
```
sudo systemctl start mongod
```

Quick Start (Single Command)

1. Install all dependencies from root directory:

```
npm run install:all
```

2. Configure backend .env file:

Navigate to backend directory and create .env:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet-shop
```

3. Create admin user:

```
npm run create-admin
```

4. Start both backend and frontend with one command:

```
npm run dev
```

This starts:
- Backend on http://localhost:3001
- Frontend on http://localhost:3000

Manual Setup (Alternative)

Backend Setup

1. Navigate to the backend directory:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a .env file in the backend directory and configure the environment variables:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

For MongoDB Atlas, use your connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet-shop
```

4. Make sure MongoDB is running on your system (see MongoDB Status section above).

5. Create admin user:

```
npm run create-admin
```

6. Start the backend server:

For development with auto-reload:

```
npm run dev
```

For production:

```
npm start
```

The backend server will start on http://localhost:3001

7. Run tests:

```
npm test
```

For coverage report:

```
npm run test:coverage
```

Frontend Setup

1. Navigate to the frontend directory:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Create a .env file in the frontend directory (optional, defaults to localhost:3001):

```
VITE_API_URL=http://localhost:3001
```

4. Start the development server:

```
npm run dev
```

The frontend will start on http://localhost:3000

5. Build for production:

```
npm run build
```

API Endpoints

Authentication Endpoints

POST /api/auth/register
- Register a new user
- Body: { username, email, password }
- Returns: token and user object

POST /api/auth/login
- Login with existing credentials
- Body: { email, password }
- Returns: token and user object

Sweets Endpoints (Protected - Requires Authentication)

POST /api/sweets
- Create a new sweet (Admin only)
- Headers: Authorization: Bearer <token>
- Body: { name, category, price, quantity }

GET /api/sweets
- Get all sweets
- Headers: Authorization: Bearer <token>
- Returns: Array of sweets

GET /api/sweets/search
- Search sweets by name, category, or price range
- Headers: Authorization: Bearer <token>
- Query params: name, category, minPrice, maxPrice

PUT /api/sweets/:id
- Update a sweet (Admin only)
- Headers: Authorization: Bearer <token>
- Body: { name?, category?, price?, quantity? }

DELETE /api/sweets/:id
- Delete a sweet (Admin only)
- Headers: Authorization: Bearer <token>

POST /api/sweets/:id/purchase
- Purchase a sweet, decreases quantity
- Headers: Authorization: Bearer <token>
- Body: { quantity? } (defaults to 1)

POST /api/sweets/:id/restock
- Restock a sweet, increases quantity (Admin only)
- Headers: Authorization: Bearer <token>
- Body: { quantity }

Sweet Data Model

{
  _id: ObjectId,
  name: String (required, max 100 chars),
  category: String (required, enum: ['chocolate', 'candy', 'cookie', 'cake', 'pastry', 'other']),
  price: Number (required, min 0),
  quantity: Number (required, min 0, default 0),
  createdAt: Date,
  updatedAt: Date
}

User Data Model

{
  _id: ObjectId,
  username: String (required, unique, min 3, max 30 chars),
  email: String (required, unique),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}

Testing

The backend includes comprehensive test coverage using Jest and Supertest. Tests follow TDD principles and cover:

- User registration and login scenarios
- Authentication middleware
- Sweets CRUD operations
- Search and filter functionality
- Purchase and restock operations
- Role-based access control
- Input validation and error handling

To run tests:

```
cd backend
npm test
```

To generate a coverage report:

```
npm run test:coverage
```

Creating Admin Users

By default, new users are created with the 'user' role. To create an admin user, you can:

1. Use MongoDB shell or Compass to update the user document:

```
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

2. Or create a seed script that creates an admin user on application startup

Usage Guide

For Regular Users

1. Register a new account or login with existing credentials
2. Browse the dashboard to see all available sweets
3. Use the search bar to filter sweets by name, category, or price range
4. Click the Purchase button on any sweet to buy it (quantity decreases automatically)
5. Purchase button is disabled when quantity is zero

For Admin Users

1. Login with admin credentials
2. All regular user features are available:
   - Browse and search sweets
   - Purchase sweets (admins can also purchase items)
3. Additional admin management features:
   - Add New Sweet button to create new sweets
   - Edit button on each sweet card to update details
   - Delete button on each sweet card to remove sweets
   - Restock button on each sweet card to increase inventory

Screenshots

The following screenshots demonstrate the application in action:

User Registration
![User Registration](screenshots/register_user.jpg)
The registration page allows new users to create an account with username, email, and password.

User Login
![User Login](screenshots/login_user.jpg)
Users can log in with their credentials to access the dashboard.

Admin Login
![Admin Login](screenshots/login_admin.jpg)
Admin users have special privileges to manage the sweet shop inventory.

User Dashboard
![User Dashboard](screenshots/user_dashboard.jpg)
Regular users can browse all available sweets, search, filter, and purchase items.

Admin Dashboard
![Admin Dashboard](screenshots/admin_dashboard.jpg)
Admin dashboard includes all user features plus management capabilities to add, edit, delete, and restock sweets.

Adding a Sweet
![Add Sweet Modal](screenshots/add_sweet_model.jpg)
Admin users can add new sweets to the inventory with name, category, price, and initial quantity.

Editing a Sweet
![Edit Sweet](screenshots/edit_sweet.jpg)
Admins can update sweet details including name, category, price, and quantity.

Removing a Sweet
![Remove Sweet](screenshots/remove_sweet.jpg)
Admin users can delete sweets from the inventory when they are no longer available.

Filtering Sweets
![Filtering Sweets](screenshots/filtering_sweets.jpg)
Users can filter sweets by name, category, or price range to find specific items.

Filtering Results
![Filtering Results](screenshots/filtering_result.jpg)
The search and filter functionality displays matching results based on the selected criteria.

Out of Stock
![Out of Stock](screenshots/out_of_stock.jpg)
When a sweet's quantity reaches zero, it is marked as out of stock.

Purchase Disabled
![Purchase Disabled](screenshots/purchase_disable.jpg)
The purchase button is automatically disabled for items with zero quantity.

MongoDB Database - Sweets Collection
![Sweets Database](screenshots/sweet_DB.png)
The MongoDB database stores all sweet items with their details.

MongoDB Database - Users Collection
![Users Database](screenshots/mongodb_user_DB.png)
User accounts are stored in the database with role-based access control.

MongoDB Atlas Setup

1. Create a free account on MongoDB Atlas
2. Create a new cluster
3. Create a database user with username and password
4. Whitelist IP address (0.0.0.0/0 for development, or specific IPs for production)
5. Get connection string and use it as MONGODB_URI in backend .env

Troubleshooting

Backend Issues

- Connection refused: Ensure MongoDB is running (for local) or connection string is correct (for Atlas)
- Authentication errors: Verify JWT_SECRET is set in .env
- Port already in use: Change PORT in .env or kill the process using port 3001

Frontend Issues

- API connection failed: Check VITE_API_URL matches backend URL
- CORS errors: Ensure backend CORS is configured correctly
- Build errors: Clear node_modules and reinstall dependencies

Database Issues

- Mongoose connection timeout: Check MongoDB URI format and network connectivity
- Schema validation errors: Ensure all required fields are provided with correct types

Known Limitations

- Admin users must be created manually or through database manipulation
- Password reset functionality is not implemented
- Image uploads for sweets are not supported
- Order history is not tracked
- Payment processing is not integrated

Future Enhancements

- Implement password reset functionality
- Add image upload support for sweets
- Implement order history and tracking
- Add pagination for large inventories
- Implement shopping cart functionality
- Add user profile management
- Integrate payment processing
- Add email notifications for orders
- Implement wishlist functionality
- Add ratings and reviews system

Contributing

This is a project submission for a TDD Kata. If you wish to extend or modify this project:

1. Fork the repository
2. Create a feature branch
3. Write tests first (TDD approach)
4. Implement the feature
5. Ensure all tests pass
6. Commit with clear messages
7. Submit a pull request

License

This project is created for educational purposes as part of a TDD Kata assignment.

My AI Usage

During the development of this Sweet Shop Management System, I utilized AI tools as part of my workflow to improve productivity and code quality. This section documents how AI was integrated into the development process.

AI Tools Used

1. GitHub Copilot - Integrated directly into my code editor
2. ChatGPT - Used for brainstorming and debugging
3. Cursor AI - Assisted with code generation and refactoring

How AI Was Used

Initial Setup and Boilerplate Generation

I used GitHub Copilot extensively during the initial project setup phase. Copilot helped generate:
- Package.json configurations for both backend and frontend
- Basic Express.js server structure
- Mongoose schema definitions with proper field types and validations
- Jest configuration files
- Vite and Tailwind CSS setup files

The AI suggested standard project structures and configurations that aligned with best practices, which saved significant time during project scaffolding.

Test-Driven Development

For the test suite, I leveraged ChatGPT to help brainstorm test cases and edge cases. I would describe the functionality I needed to test, and ChatGPT would suggest comprehensive test scenarios including:
- Positive test cases
- Negative test cases
- Edge cases and boundary conditions
- Authentication and authorization scenarios
- Input validation tests

I then implemented these tests using Jest and Supertest, ensuring high code coverage. The AI suggestions helped me think through scenarios I might have otherwise missed.

API Endpoint Structure

When designing the REST API endpoints, I asked ChatGPT for suggestions on RESTful best practices. The AI provided guidance on:
- Proper HTTP methods and status codes
- Endpoint naming conventions
- Request and response structure
- Error handling patterns

I manually implemented all endpoints based on this guidance, ensuring they followed REST principles.

React Component Architecture

For the frontend React components, Copilot assisted with:
- Generating component boilerplate
- Suggesting React hooks patterns
- Providing Tailwind CSS class combinations for styling
- Creating modal component structures

I reviewed and modified all AI-generated code to ensure it met my requirements and followed React best practices. The components were then connected manually to ensure proper data flow and state management.

Debugging and Problem Solving

When encountering bugs or unexpected behavior, I would:
1. First attempt to debug manually
2. If stuck, describe the issue to ChatGPT and get suggestions for potential causes
3. Use Copilot's inline suggestions when writing fixes
4. Verify the solution works and understand why it works

This approach helped me learn from errors rather than just applying fixes blindly.

Code Refactoring

Cursor AI was particularly useful during refactoring phases. When I noticed code duplication or wanted to improve structure, I would:
- Ask Cursor to suggest refactoring opportunities
- Review suggestions carefully
- Apply refactoring while ensuring tests still pass
- Manually verify the refactored code maintains the same functionality

Documentation and Comments

I wrote all documentation and comments manually. However, when I was unsure about how to explain a complex concept, I would ask ChatGPT for clarification on technical terms or to help structure explanations clearly.

AI Usage Reflection

Impact on Workflow

AI tools significantly accelerated my development process, particularly in:
- Initial project setup and boilerplate generation
- Test case generation and coverage
- Debugging time reduction
- Learning modern best practices

However, I found that AI was most effective when I:
- Had a clear understanding of what I wanted to build
- Used AI suggestions as starting points, not final solutions
- Always reviewed and understood generated code
- Wrote tests to verify AI-generated code worked correctly

Challenges and Learning

One challenge was learning to recognize when AI suggestions were not appropriate. For example:
- Sometimes Copilot would suggest overly complex solutions when simpler ones existed
- ChatGPT might suggest patterns that didn't fit my specific use case
- Generated code sometimes lacked proper error handling

I learned to:
- Always question AI suggestions
- Understand the code I was committing
- Verify functionality with tests
- Refactor when needed to maintain code quality

Responsible AI Usage

I ensured responsible AI usage by:
- Not copying code without understanding it
- Modifying all AI suggestions to fit my specific requirements
- Writing comprehensive tests to catch errors
- Manually reviewing all commits
- Ensuring the final codebase reflects my understanding and choices

All commits where AI was significantly used have been documented with co-author trailers where appropriate.

Conclusion

AI tools were valuable assistants throughout this project, helping me work more efficiently while maintaining code quality. They served as brainstorming partners, code generators, and debugging aids. However, the final codebase, architecture decisions, and all critical logic are my own work, guided by the AI suggestions but ultimately crafted to meet the project requirements.

The project demonstrates my ability to:
- Use modern development tools effectively
- Maintain high code quality standards
- Write comprehensive tests
- Understand and modify generated code
- Build a complete full-stack application

Credits

This project was developed as part of a TDD Kata assignment to demonstrate proficiency in full-stack development, test-driven development, and modern software engineering practices.

