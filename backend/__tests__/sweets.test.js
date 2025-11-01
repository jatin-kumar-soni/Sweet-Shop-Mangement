const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Sweet = require('../models/Sweet');
const jwt = require('jsonwebtoken');

describe('Sweets API', () => {
  let userToken;
  let adminToken;
  let adminUser;
  let regularUser;

  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-shop-test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await Sweet.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Sweet.deleteMany({});
    await User.deleteMany({});

    regularUser = await User.create({
      username: 'regularuser',
      email: 'regular@example.com',
      password: 'password123',
      role: 'user'
    });

    adminUser = await User.create({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    userToken = jwt.sign({ userId: regularUser._id }, jwtSecret, { expiresIn: '24h' });
    adminToken = jwt.sign({ userId: adminUser._id }, jwtSecret, { expiresIn: '24h' });
  });

  describe('POST /api/sweets', () => {
    test('should create a new sweet as admin', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.50,
          quantity: 100
        });

      expect(response.status).toBe(201);
      expect(response.body.sweet.name).toBe('Chocolate Bar');
      expect(response.body.sweet.category).toBe('chocolate');
      expect(response.body.sweet.price).toBe(2.50);
      expect(response.body.sweet.quantity).toBe(100);
    });

    test('should not create sweet without authentication', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.50
        });

      expect(response.status).toBe(401);
    });

    test('should not create sweet as regular user', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.50
        });

      expect(response.status).toBe(403);
    });

    test('should not create sweet with invalid category', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'invalid',
          price: 2.50
        });

      expect(response.status).toBe(400);
    });

    test('should not create sweet with negative price', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: -10
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Chocolate Bar', category: 'chocolate', price: 2.50, quantity: 100 },
        { name: 'Gummy Bears', category: 'candy', price: 1.50, quantity: 50 }
      ]);
    });

    test('should get all sweets with authentication', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.sweets).toHaveLength(2);
    });

    test('should not get sweets without authentication', async () => {
      const response = await request(app)
        .get('/api/sweets');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/sweets/search', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Chocolate Bar', category: 'chocolate', price: 2.50, quantity: 100 },
        { name: 'Dark Chocolate', category: 'chocolate', price: 3.00, quantity: 80 },
        { name: 'Gummy Bears', category: 'candy', price: 1.50, quantity: 50 }
      ]);
    });

    test('should search sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search?name=Chocolate')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.sweets).toHaveLength(2);
      expect(response.body.sweets[0].name).toContain('Chocolate');
    });

    test('should search sweets by category', async () => {
      const response = await request(app)
        .get('/api/sweets/search?category=chocolate')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.sweets).toHaveLength(2);
      expect(response.body.sweets[0].category).toBe('chocolate');
    });

    test('should search sweets by price range', async () => {
      const response = await request(app)
        .get('/api/sweets/search?minPrice=2&maxPrice=3')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.sweets.length).toBeGreaterThan(0);
      response.body.sweets.forEach(sweet => {
        expect(sweet.price).toBeGreaterThanOrEqual(2);
        expect(sweet.price).toBeLessThanOrEqual(3);
      });
    });
  });

  describe('PUT /api/sweets/:id', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.50,
        quantity: 100
      });
    });

    test('should update sweet as admin', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Updated Chocolate Bar',
          price: 3.00
        });

      expect(response.status).toBe(200);
      expect(response.body.sweet.name).toBe('Updated Chocolate Bar');
      expect(response.body.sweet.price).toBe(3.00);
    });

    test('should not update sweet as regular user', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Updated Chocolate Bar'
        });

      expect(response.status).toBe(403);
    });

    test('should return 404 for non-existent sweet', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .put(`/api/sweets/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Updated'
        });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.50,
        quantity: 100
      });
    });

    test('should delete sweet as admin', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);

      const deletedSweet = await Sweet.findById(sweet._id);
      expect(deletedSweet).toBeNull();
    });

    test('should not delete sweet as regular user', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.50,
        quantity: 100
      });
    });

    test('should purchase sweet successfully', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 5 });

      expect(response.status).toBe(200);
      expect(response.body.sweet.quantity).toBe(95);

      const updatedSweet = await Sweet.findById(sweet._id);
      expect(updatedSweet.quantity).toBe(95);
    });

    test('should not purchase more than available', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 150 });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Insufficient quantity');
    });

    test('should purchase default quantity of 1', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.sweet.quantity).toBe(99);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.50,
        quantity: 100
      });
    });

    test('should restock sweet as admin', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 50 });

      expect(response.status).toBe(200);
      expect(response.body.sweet.quantity).toBe(150);

      const updatedSweet = await Sweet.findById(sweet._id);
      expect(updatedSweet.quantity).toBe(150);
    });

    test('should not restock sweet as regular user', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 50 });

      expect(response.status).toBe(403);
    });

    test('should not restock with invalid quantity', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: -10 });

      expect(response.status).toBe(400);
    });
  });
});

