const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const connectDB = require('../../config/database');
const request = supertest(app);

describe('users EndPoints', () => {
  beforeAll(async () => {
    await connectDB();
    // await createUser({
    //   firstName: 'prueba',
    //   lastName: 'test',
    //   email: 'pruebauser@test.com',
    //   password: '123',
    //   phone: '3214567895',
    // });
  });
  afterAll(async () => {
    //await users.deleteMany();

    await mongoose.connection.close();
  })
  describe('GET /api/users', () => {
    test('should respond with a 200 status code GET', async () => {
      const res = await request.get('/api/users');

      expect(res.statusCode).toEqual(200);
    });

    test('should respond with an array of users GET', async () => {
      const res = await request.get('/api/users');

      expect(res.body).toBeInstanceOf(Array);
    });
  });

});