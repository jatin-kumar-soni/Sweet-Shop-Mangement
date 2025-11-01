require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-shop';

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };

    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Existing user updated to admin:', adminData.email);
    } else {
      const admin = new User(adminData);
      await admin.save();
      console.log('Admin user created:', adminData.email);
      console.log('Username:', adminData.username);
      console.log('Password:', adminData.password);
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();

