const mongoose = require('mongoose');

beforeAll(async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-shop-test';
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

